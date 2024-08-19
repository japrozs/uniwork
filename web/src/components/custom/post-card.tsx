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
import { PostDisplayActionTray } from "./post-display-action-tray";
import { PostActionTray } from "./post-action-tray";

interface PostCardProps {
    post: PostSnippetFragment;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const router = useRouter();
    const [showFullBody, setShowFullBody] = useState(false);
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
                <PostDisplayActionTray post={post} />
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
                                    className="ml-1.5 text-blue-500 font-medium text-sm hover:bg-blue-50 py-0.5 px-1 rounded-md cursor-pointer"
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
                <PostActionTray post={post} />
            </div>
        </div>
    );
};
