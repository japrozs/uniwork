import { DetailedHTMLProps } from "react";
import {
    GetUserQuery,
    PostSnippetFragment,
    useLikeMutation,
} from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiShare2Line } from "react-icons/ri";
import { TbMessage } from "react-icons/tb";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LuLink2 } from "react-icons/lu";
import { MdIosShare } from "react-icons/md";
import { copyToClipboard } from "@/utils";
import { useRouter } from "next/router";
import { toast } from "sonner";

type UserPosts = GetUserQuery["getUser"]["posts"];
type PostType = UserPosts[number];

type PostActionTrayProps = {
    post: PostSnippetFragment | PostType;
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
                    <div className="p-1 hover:bg-gray-100  mr-1.5 rounded-full hover:text-blue-500 cursor-pointer">
                        <TbMessage className="text-xl" />
                    </div>
                    <p className="text-sm font-semibold text-black">
                        {post.comments.length}
                    </p>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="focus:outline-none ml-auto mr-0 flex items-center hover:bg-gray-100 text-gray-600 hover:text-black p-1 rounded-full cursor-pointer"
                    >
                        <RiShare2Line className="text-xl" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        onClick={async (e) => {
                            e.stopPropagation();
                            // TODO: UPDATE THIS URL
                            const resp = await copyToClipboard(
                                `${window.location.protocol}//${window.location.host}/app/p/${post.id}`
                            );

                            if (resp.toLowerCase().startsWith("failed")) {
                                toast.error(resp);
                            } else {
                                toast.success(resp);
                            }
                        }}
                        className="w-48 p-1 shadow-sm"
                    >
                        <DropdownMenuItem className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600">
                            <LuLink2 className="text-lg " />
                            Copy link
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={async (e) => {
                                e.stopPropagation();
                                if (navigator.share) {
                                    try {
                                        // TODO: check this before deployment
                                        await navigator.share({
                                            title: `${post.creator.name} (@${post.creator.username}) on UniWork`,
                                            text: `${post.creator.name} (@${post.creator.username}) on UniWork`,
                                            url: `${window.location.protocol}//${window.location.host}/app/p/${post.id}`,
                                        });
                                    } catch (error) {}
                                }
                            }}
                            className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600"
                        >
                            <RiShare2Line className="text-lg " />
                            Share post via...
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
