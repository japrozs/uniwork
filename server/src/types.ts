import { Request, Response } from "express";
import session from "express-session";
import { Redis } from "ioredis";
import { createLikeLoader } from "./utils/create-like-loader";
import { createFollowLoader } from "./utils/create-follow-loader";

declare module "express-session" {
    interface SessionData {
        userId: any;
    }
}

export type Context = {
    req: Request & { session: session.Session };
    redis: Redis;
    res: Response;
    likeLoader: ReturnType<typeof createLikeLoader>;
    followLoader: ReturnType<typeof createFollowLoader>;
};
