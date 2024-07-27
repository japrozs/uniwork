import { getConnection, LessThan } from "typeorm";
import { Post } from "../entities/post";
import { isAuth } from "../middleware/is-auth";
import { Context } from "../types";
import {
    Arg,
    Ctx,
    Field,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";

@ObjectType()
class PaginatedPosts {
    @Field(() => [Post])
    posts: Post[];
    @Field()
    hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
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
        return Post.find({ relations: ["creator"] });
    }
}
