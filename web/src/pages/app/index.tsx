import { Button } from "@/components/custom/button";
import { Navbar } from "@/components/custom/navbar";
import { PostCard } from "@/components/custom/post-card";
import { Spinner } from "@/components/custom/spinner";
import { Wrapper } from "@/components/custom/wrapper";
import {
    PostSnippetFragment,
    RegularCommentFragment,
    useGetPostsQuery,
} from "@/generated/graphql";
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
import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { TbSettings, TbLogout2 } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { UserProfileDropdown } from "@/components/custom/user-profile-dropdown";

interface AppIndexPageProps {}

const AppIndexPage: React.FC<AppIndexPageProps> = ({}) => {
    const { data: meData } = useIsAuth();
    const { data, loading } = useGetPostsQuery();
    const [query, setQuery] = useState("");
    const [isActive, setIsActive] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setIsActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
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
                            <div
                                ref={searchRef}
                                className="pt-2 sticky top-0 bg-white pb-4 relative"
                            >
                                <div className="mx-0.5 focus-within:ring-2 flex items-center bg-gray-100 p-2 rounded-md">
                                    <IoSearchOutline className="ml-1.5 mr-3.5 text-gray-500 text-xl" />
                                    <input
                                        value={query}
                                        className="bg-gray-100 w-full focus:outline-none text-sm font-medium"
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        onFocus={() => setIsActive(true)}
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
                                <div
                                    className={`${
                                        isActive ? "opacity-100" : "opacity-0"
                                    } transition-all absolute mt-0.5 left-0 right-0 bg-white border border-gray-100 rounded-md shadow-sm z-10 max-h-60 overflow-y-auto`}
                                >
                                    <div className="px-3 py-2.5">
                                        <p className="text-sm font-semibold">
                                            Search results
                                        </p>
                                        <p className="text-sm font-semibold">
                                            Blah
                                        </p>
                                        <p className="text-sm font-semibold">
                                            Blah Bla
                                        </p>
                                        <p className="text-sm font-semibold">
                                            Blah Bla Bla
                                        </p>
                                        <p className="text-sm font-semibold">
                                            Blah Bla Bla Bla
                                        </p>
                                        <p className="text-sm font-semibold">
                                            Blah Bla Bla Bla Bla
                                        </p>
                                        <p className="text-sm font-semibold">
                                            Blah Bla Bla Bla Bla Bla
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {data?.getPosts.map(
                                (p: PostSnippetFragment, idx: number) => (
                                    <PostCard key={idx} post={p} />
                                )
                            )}
                        </div>
                    )}
                </div>
                <div className="w-[30%] overflow-y-auto pt-2 pl-2 sticky top-0">
                    <div className="flex items-center space-x-5 mb-5">
                        <UserProfileDropdown />
                    </div>
                    <p className="text-sm font-semibold">Sidebar Section</p>
                </div>
            </div>
        </Wrapper>
    );
};

export default AppIndexPage;
