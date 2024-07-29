import { ObjectType, Field } from "type-graphql";
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { User } from "./user";
import { Comment } from "./comment";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => String)
    @Column()
    body: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.posts)
    creator: User;

    @Field()
    @Column()
    creatorId: number;

    @Field(() => [Comment])
    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
