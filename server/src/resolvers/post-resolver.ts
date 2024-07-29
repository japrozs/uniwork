import { getConnection, getManager, LessThan } from "typeorm";
import { Post } from "../entities/post";
import { isAuth } from "../middleware/is-auth";
import { Context } from "../types";
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
import { Like } from "../entities/like";

@ObjectType()
class PaginatedPosts {
    @Field(() => [Post])
    posts: Post[];
    @Field()
    hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
    @FieldResolver(() => Int, { nullable: true })
    async likeStatus(@Root() post: Post, @Ctx() { likeLoader, req }: Context) {
        if (!req.session.userId) {
            return null;
        }
        const like = await likeLoader.load({
            postId: post.id,
            userId: req.session.userId,
        });

        return like ? 1 : null;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Post)
    async createPost(@Arg("body") body: string, @Ctx() { req }: Context) {
        if (body.trim().length == 0) {
            return false;
        }
        return Post.create({
            body,
            creatorId: req.session.userId,
        }).save();
    }

    // @Query(() => PaginatedPosts)
    // async getPosts(
    //     @Arg("limit", () => Int) limit: number,
    //     @Arg("cursor", () => String, { nullable: true }) cursor: string | null
    // ): Promise<PaginatedPosts> {
    //     // 20 -> 21
    //     const realLimit = Math.min(50, limit);
    //     const reaLimitPlusOne = realLimit + 1;

    //     const replacements: any[] = [reaLimitPlusOne];

    //     if (cursor) {
    //         replacements.push(new Date(parseInt(cursor)));
    //     }

    //     const posts = await Post.find({
    //         ...(cursor
    //             ? {
    //                   where: {
    //                       createdAt: LessThan(replacements[1]),
    //                   },
    //               }
    //             : {}),
    //         order: {
    //             createdAt: "DESC",
    //         },
    //         relations: ["creator"],
    //         take: replacements[0],
    //     });

    //     return {
    //         posts: posts.slice(0, realLimit),
    //         hasMore: posts.length === reaLimitPlusOne,
    //     };
    // }

    @Query(() => [Post])
    async getPosts() {
        return Post.find({
            relations: ["creator", "comments", "comments.creator"],
            order: {
                createdAt: "DESC",
            },
        });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async like(@Arg("postId") postId: string, @Ctx() { req }: Context) {
        const { userId } = req.session;

        return await getManager().transaction(
            async (transactionalEntityManager) => {
                const likeRepository =
                    transactionalEntityManager.getRepository(Like);
                const postRepository =
                    transactionalEntityManager.getRepository(Post);

                const existingLike = await likeRepository.findOne({
                    where: { userId, postId },
                });

                if (existingLike) {
                    // Unlike: Remove like and decrement post likes
                    await likeRepository.remove(existingLike);
                    await postRepository.decrement({ id: postId }, "likes", 1);
                } else {
                    // Like: Add new like and increment post likes
                    const newLike = likeRepository.create({
                        userId,
                        postId,
                        value: 1,
                    });
                    await likeRepository.save(newLike);
                    await postRepository.increment({ id: postId }, "likes", 1);
                }

                return true;
            }
        );
    }
}
