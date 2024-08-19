import { Button } from "@/components/custom/button";
import { Navbar } from "@/components/custom/navbar";
import { PostCard } from "@/components/custom/post-card";
import { Spinner } from "@/components/custom/spinner";
import { Wrapper } from "@/components/custom/wrapper";
import {
    PostSnippetFragment,
    RegularCommentFragment,
    useCreatePostMutation,
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
import { Search } from "@/components/ui/search";
import { toast } from "sonner";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
    const { data: meData } = useIsAuth();
    const { data, loading } = useGetPostsQuery();
    const [postBody, setPostBody] = useState("");
    const [postInputActive, setPostInputActive] = useState(false);
    const [createPostMutation, { loading: postLoading }] =
        useCreatePostMutation();
    const client = useApolloClient();
    const router = useRouter();

    const createPost = async () => {
        const resp = await createPostMutation({
            variables: {
                body: postBody,
            },
        });

        if (resp.errors) {
            toast.error("An error occured");
        } else {
            router.push(`/app/p/${resp.data?.createPost.id}`);
            setPostBody("");
            await client.resetStore();
        }
    };

    return (
        <Wrapper>
            <div className="flex overflow-y-auto w-[80%] pt-3.5">
                <div className="flex w-[70%] items-start">
                    {!data && loading ? (
                        <div className="w-full mx-auto mt-[10vh]">
                            {/* try skeleton loaders instead of spinners */}
                            <Spinner />
                        </div>
                    ) : (
                        <div className="w-full">
                            <div>
                                <div className="flex items-start space-x-3 p-3 border border-gray-100 rounded-md mb-3">
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
                                            <div className="p-1 hover:bg-blue-50  mr-1.5 rounded-full text-primary-color cursor-pointer">
                                                <LuImage className="text-xl" />
                                            </div>
                                            <EmojiSelector
                                                text={postBody}
                                                setText={setPostBody}
                                            />
                                            <button
                                                onClick={createPost}
                                                className={`ml-auto mr-0 bg-primary-color ${
                                                    (postBody.length === 0 ||
                                                        postLoading) &&
                                                    "bg-opacity-60 cursor-not-allowed"
                                                } py-1.5 px-6 font-medium rounded-md text-white text-sm`}
                                                disabled={
                                                    postBody.length === 0 ||
                                                    postLoading
                                                }
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
                <div className="w-[30%] overflow-y-auto pl-2 pt-0.5 sticky top-0">
                    <Search />
                    <p className="text-sm font-semibold">Sidebar Section</p>
                </div>
            </div>
        </Wrapper>
    );
};

export default Home;
