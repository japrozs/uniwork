import { Button } from "@/components/custom/button";
import { Navbar } from "@/components/custom/navbar";
import { PostCard } from "@/components/custom/post-card";
import { SpinnerWrapper } from "@/components/custom/spinner-wrapper";
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
import Axios from "axios";
import { SuggestUsersToFollow } from "@/components/custom/suggest-users-to-follow";
import { ConnectionsView } from "@/components/custom/connections-view";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
    const { data: meData } = useIsAuth();
    const { data, loading } = useGetPostsQuery();
    const [postBody, setPostBody] = useState("");
    const [postInputActive, setPostInputActive] = useState(false);
    const client = useApolloClient();
    const router = useRouter();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [submitLoading, setSubmitLoading] = useState(false);

    const createPost = async () => {
        setSubmitLoading(true);
        const formData = new FormData();
        formData.append("body", postBody);

        selectedImages.forEach((image) => {
            formData.append("files", image);
        });

        try {
            const res = await Axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/upload/post`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            if (res.data.message) {
                // an error occured
                toast.error("An error occured");
            } else {
                router.push(`/app/p/${res.data?.id}`);
                setPostBody("");
                await client.resetStore();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitLoading(false); // Set loading to false after finishing
        }
    };

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newImages = Array.from(event.target.files);
            if (selectedImages.length + newImages.length > 4) {
                console.error(
                    "Error: You can only upload a maximum of 4 images."
                );
                toast.error("Please choose a maximum of 4 images.");
                return;
            }
            setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        }
    };

    return (
        <Wrapper>
            <div>
                {!data && loading ? (
                    <div className="w-full mx-auto mt-[10vh]">
                        {/* try skeleton loaders instead of spinners */}
                        <SpinnerWrapper />
                    </div>
                ) : (
                    <div className="pt-3.5">
                        <div>
                            <div className="flex items-start space-x-3 p-3 border border-gray-100 rounded-md mb-3">
                                <div>
                                    <img
                                        src={
                                            `${process.env.NEXT_PUBLIC_API_URL}/${meData?.me?.avatar}` ||
                                            "https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                                        }
                                        className="min-w-8 ml-auto object-cover mr-0 w-8 h-8 flex items-center justify-center rounded-full"
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
                                        onFocus={() => setPostInputActive(true)}
                                        onBlur={() => setPostInputActive(false)}
                                        value={postBody}
                                    />
                                    {selectedImages.length > 0 && (
                                        <div className="flex flex-wrap mt-2">
                                            {selectedImages.map(
                                                (image, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative m-1"
                                                    >
                                                        <img
                                                            src={URL.createObjectURL(
                                                                image
                                                            )}
                                                            alt={`preview ${index}`}
                                                            className="w-auto h-44 object-cover rounded"
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                setSelectedImages(
                                                                    (images) =>
                                                                        images.filter(
                                                                            (
                                                                                _,
                                                                                i
                                                                            ) =>
                                                                                i !==
                                                                                index
                                                                        )
                                                                )
                                                            }
                                                            className="absolute top-3 right-3 bg-gray-800 text-white rounded-full p-0.5"
                                                        >
                                                            <RxCross2 className="text-lg" />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                    <hr
                                        className={`mt-0 mb-2 ${
                                            !postInputActive && "opacity-0"
                                        }`}
                                    />
                                    <div className="flex items-start">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            max="4"
                                            onChange={handleImageSelect}
                                            style={{ display: "none" }}
                                            id="image-input"
                                        />
                                        <label
                                            htmlFor="image-input"
                                            className="p-1 hover:bg-blue-50  mr-1.5 rounded-full text-primary-color cursor-pointer"
                                        >
                                            <LuImage className="text-xl" />
                                        </label>
                                        <EmojiSelector
                                            text={postBody}
                                            setText={setPostBody}
                                        />
                                        <button
                                            onClick={createPost}
                                            className={`ml-auto mr-0 bg-primary-color ${
                                                (postBody.length === 0 ||
                                                    submitLoading) &&
                                                "bg-opacity-60 cursor-not-allowed"
                                            } py-1.5 px-6 font-medium rounded-md text-white text-sm`}
                                            disabled={
                                                postBody.length === 0 ||
                                                submitLoading
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
            <div className="">
                <Search />
                <SuggestUsersToFollow />
            </div>
        </Wrapper>
    );
};

export default Home;
