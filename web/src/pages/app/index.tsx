import { Button } from "@/components/custom/button";
import { Navbar } from "@/components/custom/navbar";
import { PostCard } from "@/components/custom/post-card";
import { Spinner } from "@/components/custom/spinner";
import { Wrapper } from "@/components/custom/wrapper";
import { PostSnippetFragment, useGetPostsQuery } from "@/generated/graphql";
import { useIsAuth } from "@/utils/use-is-auth";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { TbSettings, TbLogout2 } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";

interface AppIndexPageProps {}

const AppIndexPage: React.FC<AppIndexPageProps> = ({}) => {
    const { data: meData } = useIsAuth();
    const { data, loading } = useGetPostsQuery();
    const [showCommentsData, setShowCommentsData] = useState<{
        message?: string;
    }>({});
    const [showLikesData, setShowLikesData] = useState<{ message?: string }>(
        {}
    );
    const [query, setQuery] = useState("");
    return (
        <Wrapper>
            <div className="flex overflow-y-auto w-[80%]">
                <div className="flex w-[70%] items-start">
                    {!data && loading ? (
                        <div>
                            <Spinner />
                        </div>
                    ) : (
                        <div>
                            <div className="pt-2 sticky top-0 bg-white pb-4">
                                <div className="mx-0.5 focus-within:ring-2 flex items-center bg-gray-100 p-2 rounded-md">
                                    <IoSearchOutline className="ml-1.5 mr-3.5 text-gray-500 text-xl" />
                                    <input
                                        value={query}
                                        className="bg-gray-100 w-full focus:outline-none text-sm font-medium"
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="Michael Scott, Dunder Mifflin Inc."
                                    />
                                    {query.length !== 0 && (
                                        <RxCross2
                                            className="text-xl text-gray-500 hover:text-primary-color cursor-pointer"
                                            onClick={() => {
                                                setQuery("");
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            {data?.getPosts.map(
                                (p: PostSnippetFragment, idx: number) => (
                                    <PostCard
                                        key={idx}
                                        post={p}
                                        setShowCommentsData={
                                            setShowCommentsData
                                        }
                                        setShowLikesData={setShowLikesData}
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
                <div className="w-[30%] overflow-y-auto pt-2 pl-2 sticky top-0">
                    {showCommentsData.message && (
                        <p>{showCommentsData.message}</p>
                    )}
                    {showLikesData.message && <p>{showLikesData.message}</p>}
                    {!showCommentsData.message && !showLikesData.message && (
                        <>
                            <div className="flex items-center space-x-5">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="focus:outline-none ml-auto mr-0">
                                        <Image
                                            src="https://api.dicebear.com/9.x/notionists-neutral/png?seed=japrozs&flip=true"
                                            className="h-7 w-7 rounded-md border border-gray-300"
                                            height={20}
                                            width={20}
                                            alt="avatar"
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-52 p-1 shadow-sm">
                                        <DropdownMenuLabel>
                                            <div className="flex items-center">
                                                <div className="mr-0.5">
                                                    <p className="text-md line-clamp-1 truncate text-ellipsis g-sans font-medium text-gray-800">
                                                        {meData?.me?.name}
                                                    </p>
                                                    <p className="text-xs menlo line-clamp-1 font-medium text-gray-400">
                                                        @{meData?.me?.username}
                                                    </p>
                                                </div>
                                                {/* <p className=" bg-[#00395D] text-[#00AEEF] font-medium text-md   g-sans">
                                        A
                                    </p> */}
                                                <Image
                                                    src="https://api.dicebear.com/9.x/notionists-neutral/png?seed=japrozs&flip=true"
                                                    className="min-w-7 ml-auto mr-0 w-7 h-7 flex items-center justify-center rounded-md border border-gray-300"
                                                    height={20}
                                                    width={20}
                                                    alt="avatar"
                                                />
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer flex w-full text-sm items-center gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600">
                                            <CgProfile className="text-lg " />
                                            View Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600">
                                            <TbSettings className="text-lg " />
                                            Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:bg-red-400/15 text-red-500">
                                            <TbLogout2 className="text-lg " />
                                            Sign out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </>
                    )}
                    <RxCross2
                        onClick={() => {
                            setShowCommentsData({});
                            setShowLikesData({});
                        }}
                    />
                </div>
            </div>
        </Wrapper>
    );
};

export default AppIndexPage;
