import { GetUserQuery, PostSnippetFragment } from "@/generated/graphql";
import { formatPostTime } from "@/utils";
import React from "react";
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
import { IoPersonAdd } from "react-icons/io5";
import Link from "next/link";

type UserPosts = GetUserQuery["getUser"]["posts"];
type PostType = UserPosts[number];

interface PostDisplayActionTrayProps {
    post: PostSnippetFragment | PostType;
}

export const PostDisplayActionTray: React.FC<PostDisplayActionTrayProps> = ({
    post,
}) => {
    const router = useRouter();
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
                        className="hover:bg-gray-100 p-1 rounded-full cursor-pointer"
                    >
                        <IoIosMore />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        onClick={async (e) => {
                            e.stopPropagation();
                            alert("hi there");
                        }}
                        className="w-56 p-1 shadow-sm"
                    >
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                // TODO: implement this
                            }}
                            className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600"
                        >
                            <IoPersonAdd className="text-lg " />
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                                Follow @{post.creator.username}
                            </p>
                        </DropdownMenuItem>
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
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
