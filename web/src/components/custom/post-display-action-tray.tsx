import {
    GetUserQuery,
    PostSnippetFragment,
    useFollowMutation,
    useMeQuery,
} from "@/generated/graphql";
import { formatPostTime } from "@/utils";
import React, { useState } from "react";
import { IoIosMore } from "react-icons/io";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRouter } from "next/router";
import { UserHoverCard } from "./user-hover-card";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LuFlag } from "react-icons/lu";
import { toast } from "sonner";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import Link from "next/link";
import { HiOutlineTrash } from "react-icons/hi";
import { DeletePostModal } from "./delete-post-modal";
import { useApolloClient } from "@apollo/client";
import { TbPencil } from "react-icons/tb";
import { EditPostModal } from "./edit-post-modal";

type UserPosts = GetUserQuery["getUser"]["posts"];
type PostType = UserPosts[number];

interface PostDisplayActionTrayProps {
    post: PostSnippetFragment | PostType;
}

export const PostDisplayActionTray: React.FC<PostDisplayActionTrayProps> = ({
    post,
}) => {
    const { data, loading } = useMeQuery();
    const [open, setOpen] = useState(false);
    const [postOpen, setPostOpen] = useState(false);
    const [followMutation] = useFollowMutation();
    const client = useApolloClient();

    const follow = async () => {
        const resp = await followMutation({
            variables: {
                id: post.creator.id,
            },
        });
        await client.resetStore();
        if (!resp) {
            toast.error("An error occured.");
        }
    };
    return (
        <div className="flex items-start">
            <div>
                <div className="flex items-center">
                    <HoverCard>
                        <HoverCardTrigger>
                            <Link
                                href={`/app/u/${post.creator.username}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className="text-sm font-semibold w-max hover:underline cursor-pointer"
                            >
                                {post.creator.name}
                            </Link>
                        </HoverCardTrigger>
                        <HoverCardContent className="p-0">
                            <UserHoverCard creator={post.creator} />
                        </HoverCardContent>
                    </HoverCard>
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
                <DropdownMenu>
                    <DropdownMenuTrigger
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="hover:bg-gray-100 p-1 rounded-full cursor-pointer focus:outline-none"
                    >
                        <IoIosMore />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        onClick={async (e) => {
                            e.stopPropagation();
                        }}
                        className="w-56 p-1 shadow-sm"
                    >
                        {!loading && post.creator.id !== data?.me?.id && (
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    follow();
                                }}
                                className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600"
                            >
                                {post.creator.followThisUser ? (
                                    <IoPersonRemove className="text-lg " />
                                ) : (
                                    <IoPersonAdd className="text-lg " />
                                )}
                                <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    {post.creator.followThisUser
                                        ? "Unfollow"
                                        : "Follow"}{" "}
                                    @{post.creator.username}
                                </p>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                toast.error("Post has been reported.");
                            }}
                            className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600"
                        >
                            <LuFlag className="text-lg " />
                            Report post
                        </DropdownMenuItem>
                        {!loading && post.creator.id === data?.me?.id && (
                            <>
                                <DropdownMenuItem
                                    onClick={() => setPostOpen(true)}
                                    className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600"
                                >
                                    <TbPencil className="text-lg " />
                                    Edit post
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setOpen(true)}
                                    className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:bg-red-400/15 text-red-500"
                                >
                                    <HiOutlineTrash className="text-xl " />
                                    Delete
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <DeletePostModal open={open} setOpen={setOpen} post={post} />
            <EditPostModal open={postOpen} setOpen={setPostOpen} post={post} />
        </div>
    );
};
