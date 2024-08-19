import { DetailedHTMLProps } from "react";
import { PostSnippetFragment, useLikeMutation } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiShare2Line } from "react-icons/ri";
import { TbMessage } from "react-icons/tb";

type PostActionTrayProps = {
    post: PostSnippetFragment;
} & DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const PostActionTray: React.FC<PostActionTrayProps> = ({
    post,
    ...props
}) => {
    const [likeMutation] = useLikeMutation();
    const client = useApolloClient();

    const like = async (postId: string) => {
        await likeMutation({
            variables: {
                postId,
            },
        });
        await client.resetStore();
    };
    return (
        <div {...props}>
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
    );
};
