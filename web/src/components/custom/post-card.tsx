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
import moment from "moment";
import { formatPostTime, shortenText, shouldShortenText } from "@/utils";

interface PostCardProps {
    post: PostSnippetFragment;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [likeMutation] = useLikeMutation();
    const client = useApolloClient();
    const router = useRouter();
    const [showFullBody, setShowFullBody] = useState(false);

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
                    src="https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                    className="min-w-8 ml-auto mr-0 w-8 h-8 flex items-center justify-center rounded-full"
                    height={20}
                    width={20}
                    alt="avatar"
                />
            </div>
            <div className="w-full">
                <div className="flex items-start">
                    <div>
                        <div className="flex items-center">
                            <p className="text-sm font-semibold w-max hover:underline cursor-pointer">
                                {post.creator.name}
                            </p>
                            {/* <p className="ml-1.5 text-xs menlo hover:text-blue-500 hover:underline cursor-pointer  text-gray-500">
                                @{post.creator.username}
                            </p> */}
                            <span className="text-xs mx-1 text-gray-500">
                                •
                            </span>
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
                {shouldShortenText(post.body) ? (
                    <>
                        {showFullBody ? (
                            <pre className="text-sm font-medium whitespace-pre-wrap break-words">
                                {post.body}
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowFullBody(!showFullBody);
                                    }}
                                    className="text-blue-500 font-medium text-sm hover:bg-blue-50 py-0.5 px-1 rounded-md cursor-pointer"
                                >
                                    Show less
                                </span>
                            </pre>
                        ) : (
                            <pre className="text-sm font-medium whitespace-pre-wrap break-words">
                                {shortenText(post.body)}...
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowFullBody(!showFullBody);
                                    }}
                                    className="text-blue-500 font-medium text-sm hover:bg-blue-50 py-0.5 px-1 rounded-md cursor-pointer"
                                >
                                    Show more
                                </span>
                            </pre>
                        )}
                    </>
                ) : (
                    <pre className="text-sm font-medium whitespace-pre-wrap break-words">
                        {post.body}
                    </pre>
                )}
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
                        <div className="p-1 hover:bg-gray-100  mr-1.5 rounded-full hover:text-black cursor-pointer">
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
