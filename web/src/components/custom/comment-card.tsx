import { RegularCommentFragment } from "@/generated/graphql";
import { formatPostTime } from "@/utils";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "../ui/hover-card";
import Image from "next/image";
import router from "next/router";
import React from "react";
import { UserHoverCard } from "./user-hover-card";

interface CommentCardProps {
    comment: RegularCommentFragment;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (
        <div className="p-3 flex items-stretch space-x-3 border-b border-gray-100">
            <div>
                <img
                    src={
                        `${process.env.NEXT_PUBLIC_API_URL}/${comment.creator.avatar}` ||
                        "https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                    }
                    className="min-w-8 ml-auto mr-0 w-8 h-8 object-cover flex items-center justify-center rounded-full"
                    height={20}
                    width={20}
                    alt="avatar"
                />
            </div>
            <div>
                <div className="flex items-center">
                    <HoverCard>
                        <HoverCardTrigger>
                            <p className="text-sm font-semibold w-max hover:underline cursor-pointer">
                                {comment.creator.name}
                            </p>
                        </HoverCardTrigger>
                        <HoverCardContent className="p-0">
                            <UserHoverCard creator={comment.creator} />
                        </HoverCardContent>
                    </HoverCard>
                    {/* <p className="ml-1.5 text-xs menlo hover:text-blue-500 hover:underline cursor-pointer  text-gray-500">
                                @{post.creator.username}
                            </p> */}
                    <span className="text-xs mx-1 text-gray-500">•</span>
                    <p className="text-xs line-clamp-1 font-medium text-gray-500">
                        {formatPostTime(comment.updatedAt)}
                    </p>
                </div>
                <p className="text-sm text-gray-700 font-medium">
                    {comment.body}
                </p>
            </div>
        </div>
    );
};
