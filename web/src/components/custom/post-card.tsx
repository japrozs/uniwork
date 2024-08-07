import { PostSnippetFragment, useLikeMutation } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { RiShare2Line } from "react-icons/ri";
import { TbMessage } from "react-icons/tb";

interface PostCardProps {
    post: PostSnippetFragment;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [likeMutation] = useLikeMutation();
    const client = useApolloClient();
    const router = useRouter();

    const like = async (postId: string) => {
        await likeMutation({
            variables: {
                postId,
            },
        });
        await client.resetStore();
    };

    return (
        <div
            onClick={() => router.push(`/app/p/${post.id}`)}
            className="hover:bg-gray-50/30 cursor-pointer flex items-start space-x-3 p-3 rounded-md mb-3 border border-gray-100"
        >
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
                <p className="text-sm font-medium">{post.body}</p>
                <hr className="border-t border-gray-100 mt-2.5 mb-1.5" />
                <div className="flex items-center w-full">
                    <div className="flex items-center  text-gray-600 ">
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                like(post.id);
                            }}
                            className="p-1 hover:bg-gray-100  mr-1.5 rounded-full hover:text-black cursor-pointer"
                        >
                            {post.likeStatus ? (
                                <AiFillHeart className="text-xl text-red-500" />
                            ) : (
                                <AiOutlineHeart className="text-xl hover:fill-red-500" />
                            )}
                        </div>
                        <p className="text-sm font-semibold text-black">
                            {post.likes}
                        </p>
                    </div>
                    <div className="ml-6 flex items-center text-gray-600">
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                alert("comment on post");
                            }}
                            className="p-1 hover:bg-gray-100  mr-1.5 rounded-full hover:text-black cursor-pointer"
                        >
                            <TbMessage className="text-xl" />
                        </div>
                        <p className="text-sm font-semibold text-black">
                            {post.comments.length}
                        </p>
                    </div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            alert("share post");
                        }}
                        className="ml-auto mr-0 flex items-center hover:bg-gray-100 text-gray-600 hover:text-black p-1 rounded-full cursor-pointer"
                    >
                        <RiShare2Line className="text-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};
