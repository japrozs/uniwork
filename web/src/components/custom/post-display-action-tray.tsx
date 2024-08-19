import { PostSnippetFragment } from "@/generated/graphql";
import { formatPostTime } from "@/utils";
import React from "react";
import { IoIosMore } from "react-icons/io";

interface PostDisplayActionTrayProps {
    post: PostSnippetFragment;
}

export const PostDisplayActionTray: React.FC<PostDisplayActionTrayProps> = ({
    post,
}) => {
    return (
        <div className="flex items-start">
            <div>
                <div className="flex items-center">
                    <p className="text-sm font-semibold w-max hover:underline cursor-pointer">
                        {post.creator.name}
                    </p>
                    {/* <p className="ml-1.5 text-xs menlo hover:text-blue-500 hover:underline cursor-pointer  text-gray-500">
                                @{post.creator.username}
                            </p> */}
                    <span className="text-xs mx-1 text-gray-500">•</span>
                    <p className="text-xs line-clamp-1 font-medium text-gray-500">
                        {formatPostTime(post.createdAt)}
                    </p>
                </div>
                <div className="flex items-center mb-1.5 text-gray-500">
                    <p className="text-xs line-clamp-1 font-medium">
                        {post.creator.bio}
                    </p>
                </div>
            </div>
            <div className="ml-auto mr-0">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        alert("info on post");
                    }}
                    className="hover:bg-gray-100 p-1 rounded-full cursor-pointer"
                >
                    <IoIosMore />
                </div>
            </div>
        </div>
    );
};
