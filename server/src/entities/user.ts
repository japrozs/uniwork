import { Field, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Post } from "./post";
import { Comment } from "./comment";
import { Like } from "./like";
import { Follow } from "./follow";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ unique: true })
    username: string;

    @Field()
    @Column({
        default: "Hi there 👋🏻",
    })
    bio: string;

    @Field()
    @Column({ default: "https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png" })
    avatar: string;

    @Field()
    @Column({ default: "uploads/bliss.jpg" })
    bg: string;

    // @Field()
    // @Column({ default: false })
    // verified: boolean;

    // @Column()
    // verificationCode: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password!: string;

    @Field()
    @Column({ default: "" })
    uni: string;

    @Field(() => [Post])
    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[];

    @Field(() => [Comment])
    @OneToMany(() => Comment, (comment) => comment.creator)
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @Field(() => [Follow])
    @OneToMany(() => Follow, (follow) => follow.follower)
    following: Follow[]; // Users this user is following

    @Field(() => [Follow])
    @OneToMany(() => Follow, (follow) => follow.following)
    followers: Follow[]; // Users following this user

    @Field(() => Int, { nullable: true })
    followThisUser: number | null;

    @Field()
    @Column({ default: 0 })
    followerCount: number;

    @Field()
    @Column({ default: 0 })
    followingCount: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
