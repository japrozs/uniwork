import { RegularCommentFragment } from "@/generated/graphql";
import Image from "next/image";
import React from "react";

interface CommentCardProps {
    comment: RegularCommentFragment;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (
        <div className="p-3 flex items-stretch space-x-3">
            <div>
                <Image
                    src="https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                    className="min-w-8 ml-auto mr-0 w-8 h-8 flex items-center justify-center rounded-full"
                    height={20}
                    width={20}
                    alt="avatar"
                />
            </div>
            <p>{comment.body}</p>
        </div>
    );
};
