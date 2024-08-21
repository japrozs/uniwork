import DataLoader from "dataloader";
import { Follow } from "../entities/follow";

export const createFollowLoader = () =>
    new DataLoader<{ followerId: number; followingId: number }, Follow | null>(
        async (keys) => {
            const follows = await Follow.findByIds(keys as any);
            const followIdsToFollow: Record<string, Follow> = {};

            follows.forEach((follow) => {
                followIdsToFollow[
                    `${follow.followerId}|${follow.followingId}`
                ] = follow;
            });

            return keys.map(
                (key) =>
                    followIdsToFollow[`${key.followerId}|${key.followingId}`]
            );
        }
    );
