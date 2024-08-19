import { Field, ObjectType } from "type-graphql";
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
        default: "",
    })
    bio: string;

    @Field()
    @Column({ default: "https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png" })
    avatar: string;

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

    @Field(() => [Post])
    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[];

    @Field(() => [Comment])
    @OneToMany(() => Comment, (comment) => comment.creator)
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
