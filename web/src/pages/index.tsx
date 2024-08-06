import { Button } from "@/components/custom/button";
import { Navbar } from "@/components/custom/navbar";
import { PostCard } from "@/components/custom/post-card";
import { Spinner } from "@/components/custom/spinner";
import { Wrapper } from "@/components/custom/wrapper";
import {
    PostSnippetFragment,
    RegularCommentFragment,
    useGetPostsQuery,
    useMeQuery,
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
import { LuImage } from "react-icons/lu";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import TextareaAutosize from "react-textarea-autosize";
import EmojiPicker from "emoji-picker-react";
import { EmojiSelector } from "@/components/ui/emoji-selector";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
    const { data: meData } = useMeQuery();
    const { data, loading } = useGetPostsQuery();
    const [query, setQuery] = useState("");
    const [isActive, setIsActive] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const [postBody, setPostBody] = useState("");
    const [postInputActive, setPostInputActive] = useState(false);

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
                                className="pt-3 sticky top-0 bg-white pb-4 relative"
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
                                    className={`
                                        absolute mt-0.5 left-0 right-0 bg-white border border-gray-100 rounded-md shadow-sm z-10 overflow-y-auto
                                        transition-opacity ease-in-out
                                        ${
                                            isActive
                                                ? "opacity-100 max-h-60 visible"
                                                : "opacity-0 max-h-0 invisible pointer-events-none"
                                        }
                                    `}
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
                            <div className="">
                                <div className="flex items-start space-x-3 p-3 border border-gray-100 rounded-md mb-3">
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
                                        {/* TODO:  make this an autoexpandable text area */}
                                        {/* <input
                                            
                                        /> */}
                                        <TextareaAutosize
                                            placeholder="What is happening?!?"
                                            className="text-sm font-medium text-black py-1.5 pl-1 rounded-md w-full focus:outline-none textarea break-words cursor-text resize-none"
                                            onChange={(e) =>
                                                setPostBody(e.target.value)
                                            }
                                            onFocus={() =>
                                                setPostInputActive(true)
                                            }
                                            onBlur={() =>
                                                setPostInputActive(false)
                                            }
                                            value={postBody}
                                        />
                                        {/* TODO: add tooltips */}
                                        <hr
                                            className={`mt-0 mb-2 ${
                                                !postInputActive && "opacity-0"
                                            }`}
                                        />
                                        <div className="flex items-start">
                                            <div className="p-1 hover:bg-gray-100  mr-1.5 rounded-full text-primary-color cursor-pointer">
                                                <LuImage className="text-xl" />
                                            </div>
                                            <EmojiSelector
                                                text={postBody}
                                                setText={setPostBody}
                                            />
                                            <button
                                                className={`ml-auto mr-0 bg-primary-color ${
                                                    postBody.length === 0 &&
                                                    "bg-opacity-60 cursor-not-allowed"
                                                } py-1.5 px-6 font-medium rounded-md text-white text-sm`}
                                                disabled={postBody.length === 0}
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* <hr className="mt-2 mb-5" /> */}
                            </div>
                            {data?.getPosts.map(
                                (p: PostSnippetFragment, idx: number) => (
                                    <PostCard key={idx} post={p} />
                                )
                            )}
                        </div>
                    )}
                </div>
                <div className="w-[30%] overflow-y-auto pt-3.5 pl-2 sticky top-0">
                    {meData?.me ? (
                        <div className="flex items-center space-x-5 mb-6">
                            <UserProfileDropdown />
                        </div>
                    ) : (
                        <p>login please</p>
                    )}
                    <p className="text-sm font-semibold">Sidebar Section</p>
                </div>
            </div>
        </Wrapper>
    );
};

export default Home;
