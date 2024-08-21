import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class Follow extends BaseEntity {
    @Field()
    @PrimaryColumn()
    followerId: number; // The user who is following

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.following, { onDelete: "CASCADE" })
    follower: User;

    @Field()
    @PrimaryColumn()
    followingId: number; // The user who is being followed

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.followers, { onDelete: "CASCADE" })
    following: User;
}
