import { PostSnippetFragment } from "@/generated/graphql";
import Image from "next/image";
import React from "react";
import { GoHeart } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { RiShare2Line } from "react-icons/ri";
import { TbMessage } from "react-icons/tb";

interface PostCardProps {
    post: PostSnippetFragment;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className="flex items-start space-x-3 p-3 rounded-md mb-3 border border-gray-100">
            <div>
                <Image
                    src="https://api.dicebear.com/9.x/notionists-neutral/png?seed=japrozs&flip=true"
                    className="min-w-8 ml-auto mr-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                    height={20}
                    width={20}
                    alt="avatar"
                />
            </div>
            <div className="w-full">
                <div className="flex items-start">
                    <div>
                        <p className="text-sm font-semibold w-max hover:underline cursor-pointer">
                            {post.creator.name}
                        </p>
                        <div className="flex items-center mb-1.5 text-gray-500">
                            <p className="text-xs menlo hover:text-blue-500 hover:underline cursor-pointer">
                                @{post.creator.username}
                            </p>
                            <span className="text-xs mx-1">•</span>
                            <p className="text-xs line-clamp-1">
                                {post.creator.bio}
                            </p>
                        </div>
                    </div>
                    <div className="ml-auto mr-0">
                        <div className="hover:bg-gray-100 p-1 rounded-full">
                            <IoIosMore className="" />
                        </div>
                    </div>
                </div>
                <p className="text-sm font-medium">{post.body}</p>
                <hr className="border-t border-gray-100 my-2.5" />
                <div className="flex items-center">
                    <GoHeart />
                    <TbMessage />
                    <RiShare2Line />
                </div>
            </div>
        </div>
    );
};
