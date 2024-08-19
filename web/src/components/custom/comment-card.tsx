import { RegularCommentFragment } from "@/generated/graphql";
import { formatPostTime } from "@/utils";
import Image from "next/image";
import React from "react";

interface CommentCardProps {
    comment: RegularCommentFragment;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (
        <div className="p-3 flex items-stretch space-x-3 border-b border-gray-100">
            <div>
                <Image
                    src="https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                    className="min-w-8 ml-auto mr-0 w-8 h-8 flex items-center justify-center rounded-full"
                    height={20}
                    width={20}
                    alt="avatar"
                />
            </div>
            <div>
                <div className="flex items-center">
                    <p className="text-sm font-semibold w-max hover:underline cursor-pointer">
                        {comment.creator.name}
                    </p>
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
