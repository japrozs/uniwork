import { Comment } from "../entities/comment";
import { isAuth } from "../middleware/is-auth";
import { Context } from "../types";
import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";

@Resolver(Comment)
export class CommentResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Comment)
    async createComment(
        @Arg("postId") postId: string,
        @Arg("body") body: string,
        @Ctx() { req }: Context
    ) {
        return Comment.create({
            creatorId: req.session.userId,
            postId,
            body,
        }).save();
    }

    @UseMiddleware(isAuth)
    @Query(() => [Comment])
    async getComments(@Arg("id", () => Int!) id: number) {
        return Comment.find({
            where: { postId: id },
            relations: ["creator"],
            order: { createdAt: "DESC" },
        });
    }
}
