import argon2 from "argon2";
import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from "type-graphql";
import { getConnection, getManager, getRepository } from "typeorm";
import { v4 } from "uuid";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { User } from "../entities/user";
import { isAuth } from "../middleware/is-auth";
import { UserInput } from "../schemas/user-input";
import { Context } from "../types";
import { sendEmail } from "../utils/send-email";
import { validateRegister } from "../utils/validate-register";
import { Follow } from "../entities/follow";
import { Comment } from "../entities/comment";

@ObjectType()
export class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver(User)
export class UserResolver {
    @FieldResolver(() => Int, { nullable: true })
    async followThisUser(
        @Root() user: User,
        @Ctx() { followLoader, req }: Context
    ) {
        const currentUserId = req.session.userId;

        if (!currentUserId) {
            return null;
        }

        // If the current user is viewing their own profile, no need to load follow status
        if (user.id === currentUserId) {
            return null;
        }

        const follow = await followLoader.load({
            followerId: currentUserId,
            followingId: user.id,
        });

        return follow ? 1 : null;
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg("token") token: string,
        @Arg("newPassword") newPassword: string,
        @Ctx() { redis, req }: Context
    ): Promise<UserResponse> {
        if (newPassword.length <= 2) {
            return {
                errors: [
                    {
                        field: "newPassword",
                        message: "length must be greater than 2",
                    },
                ],
            };
        }

        const key = FORGET_PASSWORD_PREFIX + token;
        const userId = await redis.get(key);
        if (!userId) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "token expired",
                    },
                ],
            };
        }

        const userIdNum = parseInt(userId);
        const user = await User.findOne(userIdNum, {
            relations: [],
        });

        if (!user) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "user no longer exists",
                    },
                ],
            };
        }

        await User.update(
            { id: userIdNum },
            {
                password: await argon2.hash(newPassword),
            }
        );

        await redis.del(key);

        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string,
        @Ctx() { redis }: Context
    ) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return false;
        }

        const token = v4();

        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            "ex",
            1000 * 60 * 60 * 24 * 3
        ); // 3 days

        await sendEmail({
            subject: "Change your password",
            to: email,
            html: `<a href="${process.env.CORS_ORIGIN}/changepass/${token}">reset password</a>`,
        });

        return true;
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: Context) {
        // you are not logged in
        if (!req.session.userId) {
            return null;
        }

        return User.findOne(req.session.userId, {
            relations: [],
        });
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UserInput,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }

        if (await User.findOne({ where: { email: options.email } })) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "email already taken",
                    },
                ],
            };
        }

        const hashedPassword = await argon2.hash(options.password);
        let user;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    name: options.name,
                    email: options.email,
                    password: hashedPassword,
                    username: options.username,
                })
                .returning("*")
                .execute();
            user = result.raw[0];
        } catch (err) {
            // duplicate username error
            if (err.code === "23505") {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "username already taken",
                        },
                    ],
                };
            }
        }

        req.session.userId = user.id;
        const us = await User.findOne(user.id, {
            relations: [],
        });

        // sendEmail({
        //     subject: "Verify your email",
        //     to: us.email,
        //     html: `<a href="http://localhost:4000/verify/${code}">verify email</a>`,
        // });

        return { user: us };
    }

    @UseMiddleware(isAuth)
    @Query(() => User)
    async getUser(
        @Arg("username", () => String) username: string,
        @Ctx() { req }: Context
    ) {
        return await getRepository(User)
            .createQueryBuilder("user")
            .where("user.username = :username", { username })
            .leftJoinAndSelect("user.posts", "posts")
            .leftJoinAndSelect("user.following", "following")
            .leftJoinAndSelect("user.followers", "followers")
            .leftJoinAndSelect("posts.creator", "postsCreator")
            .leftJoinAndSelect("posts.comments", "postsCoimments")
            .orderBy({
                "posts.createdAt": "DESC",
            })
            .getOne();
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const user = await User.findOne({
            where: { email },
            relations: [],
        });
        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "No account with that email exists",
                    },
                ],
            };
        }
        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Incorrect password",
                    },
                ],
            };
        }

        req.session.userId = user.id;

        return {
            user,
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: Context) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }

                resolve(true);
            })
        );
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateProfile(
        @Arg("name") name: string,
        @Arg("bio") bio: string,
        @Arg("uni") uni: string,
        @Ctx() { req }: Context
    ) {
        await User.update(
            { id: req.session.userId },
            {
                name,
                bio,
                uni,
            }
        );
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async follow(@Arg("id", () => Int) id: number, @Ctx() { req }: Context) {
        const { userId } = req.session;

        if (userId === id) {
            console.error("You cannot follow yourself");
            return false;
        }

        return await getManager().transaction(
            async (transactionalEntityManager) => {
                const followRepository =
                    transactionalEntityManager.getRepository(Follow);
                const userRepository =
                    transactionalEntityManager.getRepository(User);

                const existingFollow = await followRepository.findOne({
                    where: { followerId: userId, followingId: id },
                });

                if (existingFollow) {
                    // Unfollow: Remove follow and decrement follower/following counts
                    await followRepository.remove(existingFollow);
                    await userRepository.decrement({ id }, "followerCount", 1);
                    await userRepository.decrement(
                        { id: userId },
                        "followingCount",
                        1
                    );
                } else {
                    // Follow: Add new follow and increment follower/following counts
                    const newFollow = followRepository.create({
                        followerId: userId,
                        followingId: id,
                    });
                    await followRepository.save(newFollow);
                    await userRepository.increment({ id }, "followerCount", 1);
                    await userRepository.increment(
                        { id: userId },
                        "followingCount",
                        1
                    );
                }

                return true;
            }
        );
    }

    @Query(() => [Comment])
    async getUserComments(@Ctx() { req }: Context) {
        // return Comment.find({
        //     creatorId: req.session.userId
        // }, {
        //     relations: ["creator", "post"],
        // });
        return Comment.find({
            where: {
                creatorId: req.session.userId,
            },
            relations: ["creator", "post"],
        });
    }

    // @UseMiddleware(isAuth)
    // @Mutation(() => Boolean)
    // async verifyUser(@Arg("code") code: string, @Ctx() { req }: Context) {
    //     const user: User = await User.findOne(req.session.userId);
    //     if (user.verificationCode === code) {
    //         await User.update(
    //             { id: req.session.userId },
    //             {
    //                 verified: true,
    //             }
    //         );
    //         return true;
    //     }
    //     return false;
    // }
}
