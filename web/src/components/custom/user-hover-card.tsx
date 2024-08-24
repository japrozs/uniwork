import {
    PostSnippetFragment,
    RegularUserFragment,
    useMeQuery,
} from "@/generated/graphql";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@radix-ui/react-hover-card";
import Image from "next/image";
import router from "next/router";
import React from "react";
import { FollowiButton } from "./followi-button";

interface UserHoverCardProps {
    creator: RegularUserFragment;
}

export const UserHoverCard: React.FC<UserHoverCardProps> = ({ creator }) => {
    const { data: meData, loading } = useMeQuery();
    return (
        <div className="p-3 bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center">
                <div>
                    <img
                        src={
                            `${process.env.NEXT_PUBLIC_API_URL}/${creator.avatar}` ||
                            "https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                        }
                        className="min-w-8 ml-auto mr-0 object-cover w-14 h-14 flex items-center justify-center rounded-full"
                        height={20}
                        width={20}
                        alt="avatar"
                    />
                </div>
                {creator.id !== meData?.me?.id && (
                    <div className="ml-auto mr-0">
                        <FollowiButton user={creator} />
                    </div>
                )}
            </div>
            <div className="mt-3" />
            <a href={`/app/u/${creator.username}`}>
                <p className="text-sm font-medium text-black hover:underline">
                    {creator.name}
                </p>
                <p className="text-gray-500 menlo text-xs font-medium">
                    @{creator.username}
                </p>
            </a>
            <p className="text-xs mt-1.5 font-medium text-gray-800">
                {creator.bio}
            </p>
            <div className="mt-3 flex items-center space-x-3">
                <div className="flex items-center">
                    <p className="text-sm font-semibold text-black">
                        {creator.followingCount}
                    </p>
                    <p className="ml-1 text-sm font-medium text-gray-500">
                        Following
                    </p>
                </div>
                <div className="flex items-center">
                    <p className="text-sm font-semibold text-black">
                        {creator.followerCount}
                    </p>
                    <p className="ml-1 text-sm font-medium text-gray-500">
                        Followers
                    </p>
                </div>
            </div>
        </div>
    );
};
