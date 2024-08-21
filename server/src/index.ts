import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { User } from "./entities/user";
import { UserResolver } from "./resolvers/user-resolver";
import { Post } from "./entities/post";
import { PostResolver } from "./resolvers/post-resolver";
import { faker } from "@faker-js/faker";
import { Comment } from "./entities/comment";
import { CommentResolver } from "./resolvers/comment-resolver";
import { Like } from "./entities/like";
import { createLikeLoader } from "./utils/create-like-loader";
import postUpload from "./upload/post-upload";
import { Follow } from "./entities/follow";
import { createFollowLoader } from "./utils/create-follow-loader";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User, Post, Comment, Like, Follow],
    });
    await conn.runMigrations();

    // const posts = await Post.find({});

    // for (let i = 0; i < posts.length; i++) {
    //     console.log("here");
    //     const p = posts[i];
    //     const len = Math.floor(Math.random() * 10) + 1;

    //     for (let k = 0; k < len; k++) {
    //         await Comment.create({
    //             postId: p.id,
    //             creatorId: 1,
    //             body: faker.hacker.phrase(),
    //         }).save();
    //     }
    // }

    // for (let _ = 0; _ < 100; _++) {
    //     await Post.create({
    //         creatorId: 1,
    //         body: faker.lorem.sentences(),
    //     }).save();
    // }

    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        })
    );

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax",
                secure: __prod__,
                domain: __prod__ ? ".japroz.me" : undefined,
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, PostResolver, CommentResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            likeLoader: createLikeLoader(),
            followLoader: createFollowLoader(),
        }),
    });

    app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
    app.use("/upload/", postUpload);

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    // app.get("/verify/:code", expressIsAuth, async (req, res) => {
    //     const code = req.params.code;
    //     const user: User = await User.findOne(req.session.userId);
    //     if (user.verificationCode === code) {
    //         await User.update(
    //             { id: req.session.userId },
    //             {
    //                 verified: true,
    //             }
    //         );
    //         return res.redirect(`${process.env.CORS_ORIGIN}/app`);
    //     }
    //     return res.redirect(`${process.env.CORS_ORIGIN}/incorrect`);
    // });

    app.listen(parseInt(process.env.PORT), () => {
        console.log(`🚀 Server started on localhost:${process.env.PORT}`);
    });
};

main().catch((err: Error) => {
    console.error(err.message);
});
