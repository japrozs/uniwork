import { PostSnippetFragment, RegularUserFragment } from "@/generated/graphql";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@radix-ui/react-hover-card";
import Image from "next/image";
import router from "next/router";
import React from "react";

interface UserHoverCardProps {
    creator: RegularUserFragment;
}

export const UserHoverCard: React.FC<UserHoverCardProps> = ({ creator }) => {
    return (
        <div className="p-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center">
                <div>
                    <Image
                        src="https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                        className="min-w-8 ml-auto mr-0 w-14 h-14 flex items-center justify-center rounded-full"
                        height={20}
                        width={20}
                        alt="avatar"
                    />
                </div>
                <button
                    className={`transition-all  ml-auto mr-0 bg-white py-1.5 px-6 font-medium rounded-md text-black border border-gray-200 hover:bg-gray-50 text-sm`}
                >
                    Follow
                </button>
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
                    <p className="text-sm font-semibold text-black">12</p>
                    <p className="ml-1 text-sm font-medium text-gray-500">
                        Following
                    </p>
                </div>
                <div className="flex items-center">
                    <p className="text-sm font-semibold text-black">2.3k</p>
                    <p className="ml-1 text-sm font-medium text-gray-500">
                        Followers
                    </p>
                </div>
            </div>
        </div>
    );
};
