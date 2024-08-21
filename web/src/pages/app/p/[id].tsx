import { CommentCard } from "@/components/custom/comment-card";
// import { Spinner } from "@/components/custom/spinner";
import { Spinner } from "@primer/react";
import { UserProfileDropdown } from "@/components/custom/user-profile-dropdown";
import { Wrapper } from "@/components/custom/wrapper";
import { EmojiSelector } from "@/components/ui/emoji-selector";
import TextareaAutosize from "react-textarea-autosize";
import { Search } from "@/components/ui/search";
import {
    RegularCommentFragment,
    useCreateCommentMutation,
    useGetPostQuery,
    useLikeMutation,
} from "@/generated/graphql";
import { formatPostTime } from "@/utils";
import { useApolloClient } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { comment } from "postcss";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoIosMore, IoMdArrowBack } from "react-icons/io";
import { LuImage } from "react-icons/lu";
import { RiShare2Line } from "react-icons/ri";
import { TbMessage } from "react-icons/tb";
import { toast } from "sonner";
import { PostDisplayActionTray } from "@/components/custom/post-display-action-tray";
import { PostActionTray } from "@/components/custom/post-action-tray";
import { useIsAuth } from "@/utils/use-is-auth";
import Link from "next/link";
import { ImagePreview } from "@/components/custom/image-preview";
import { FollowiButton } from "@/components/custom/followi-button";
import { SpinnerWrapper } from "@/components/custom/spinner-wrapper";

interface PostPageProps {}

const PostPage: React.FC<PostPageProps> = ({}) => {
    const { data: meData } = useIsAuth();
    const router = useRouter();
    const client = useApolloClient();
    const id =
        typeof router.query.id == "string"
            ? router.query.id
            : "00000000-0000-0000-0000-000000000000";
    const { data, loading } = useGetPostQuery({
        variables: {
            id,
        },
    });
    const [commentBody, setCommentBody] = useState("");
    const [createCommentMutation, { loading: commentLoading }] =
        useCreateCommentMutation();

    const createComment = async () => {
        if (commentBody.trim().length > 200) {
            toast.error("Replies cannot be more than 200 characters long.");
        }
        const resp = await createCommentMutation({
            variables: {
                postId: id,
                body: commentBody,
            },
        });

        if (resp.errors) {
            toast.error("An error occured");
        } else {
            setCommentBody("");
            await client.resetStore();
        }
    };

    return (
        <Wrapper>
            <div className="flex overflow-y-auto w-[80%]">
                <div className="flex w-[65%] flex-col items-start border-l border-r border-gray-100">
                    <div className="pt-3 pb-2 flex items-center px-3 sticky top-0 bg-white/90 backdrop-blur-md  mb-3 border-b border-gray-100 w-full">
                        <div
                            onClick={() => router.back()}
                            className="p-1 hover:bg-gray-100 hover:text-primary-color rounded-full cursor-pointer"
                        >
                            <IoMdArrowBack className="text-xl" />
                        </div>
                        <p className="text-md font-semibold ml-3.5">Post</p>
                    </div>
                    {data && !loading ? (
                        <div>
                            <div className="flex items-start space-x-3 p-3">
                                <div>
                                    <img
                                        src={
                                            `${process.env.NEXT_PUBLIC_API_URL}/${data.getPost.creator.avatar}` ||
                                            "https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                                        }
                                        className="min-w-8 ml-auto mr-0 w-8 h-8 flex items-center justify-center object-cover rounded-full"
                                        height={20}
                                        width={20}
                                        alt="avatar"
                                    />
                                </div>
                                <div className="w-full">
                                    <PostDisplayActionTray
                                        post={data.getPost}
                                    />
                                    <pre className="text-sm font-medium whitespace-pre-wrap break-words">
                                        {data.getPost.body}
                                    </pre>
                                    <ImagePreview post={data.getPost} />
                                    <PostActionTray
                                        post={data.getPost}
                                        className="text-red-500 mt-3"
                                    />
                                </div>
                            </div>
                            <hr className="border-t border-gray-100 my-1.5 mb-0" />
                            <div>
                                <div className="flex items-start space-x-3 p-3 rounded-md">
                                    <div>
                                        <img
                                            src={
                                                `${process.env.NEXT_PUBLIC_API_URL}/${meData?.me?.avatar}` ||
                                                "https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                                            }
                                            className="min-w-8 ml-auto mr-0 w-8 h-8 flex items-center justify-center rounded-full object-cover"
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
                                            placeholder="Post your reply"
                                            className="text-sm font-medium text-black pt-1.5 pl-1 rounded-md w-full focus:outline-none textarea break-words cursor-text resize-none"
                                            onChange={(e) =>
                                                setCommentBody(e.target.value)
                                            }
                                            value={commentBody}
                                            maxLength={200}
                                        />
                                        <div className="flex items-center">
                                            <EmojiSelector
                                                text={commentBody}
                                                setText={setCommentBody}
                                                noMargin
                                            />
                                            <span className="text-xs mr-1.5 text-gray-500">
                                                •
                                            </span>
                                            <p className="text-xs font-medium text-slate-600">
                                                Replying to
                                                <Link
                                                    href={`/app/u/${data.getPost.creator.username}`}
                                                    className="ml-0.5 text-blue-500 whitespace-nowrap py-0.5 px-1 hover:bg-blue-50 rounded-md cursor-pointer"
                                                >
                                                    @
                                                    {
                                                        data.getPost.creator
                                                            .username
                                                    }
                                                </Link>
                                            </p>
                                            <button
                                                onClick={createComment}
                                                className={`ml-auto mr-0 bg-primary-color ${
                                                    (commentBody.length === 0 ||
                                                        commentLoading) &&
                                                    "bg-opacity-60 cursor-not-allowed"
                                                } py-1.5 px-6 font-medium rounded-md text-white text-sm`}
                                                disabled={
                                                    commentBody.length === 0 ||
                                                    commentLoading
                                                }
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* <hr className="mt-2 mb-5" /> */}
                                <hr className="border-t border-gray-100 mt-0 my-1.5" />
                            </div>
                            {data.getPost.comments.map(
                                (c: RegularCommentFragment, i: number) => (
                                    <CommentCard comment={c} key={i} />
                                )
                            )}
                            <div className="pt-52" />
                        </div>
                    ) : (
                        <div className="w-full mx-auto mt-[10vh]">
                            {/* try skeleton loaders instead of spinners */}
                            <SpinnerWrapper />
                        </div>
                    )}
                </div>
                <div className="w-[35%] overflow-y-auto pl-2 pt-3 sticky top-0">
                    <Search />
                    {data && !loading ? (
                        <div className="py-2 px-2.5 border border-gray-100 rounded-md">
                            <p className="text-sm font-semibold">
                                Relevant people
                            </p>
                            <div className="flex items-start space-x-3 py-3">
                                <img
                                    src={
                                        `${process.env.NEXT_PUBLIC_API_URL}/${data.getPost.creator.avatar}` ||
                                        "https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                                    }
                                    className="min-w-7 ml-auto mr-0 w-7 h-7 flex items-center justify-center rounded-md  object-cover"
                                    height={20}
                                    width={20}
                                    alt="avatar"
                                />
                                <div className="w-full">
                                    <div className="flex items-start">
                                        <a
                                            href={`/app/u/${data.getPost.creator.username}`}
                                        >
                                            <p className="text-sm font-medium text-black hover:underline">
                                                {data.getPost.creator.name}
                                            </p>
                                            <p className="text-gray-500 menlo text-xs font-medium">
                                                @{data.getPost.creator.username}
                                            </p>
                                        </a>
                                        {data.getPost.creator.id !==
                                            meData?.me?.id && (
                                            <FollowiButton
                                                user={data.getPost.creator}
                                            />
                                        )}
                                    </div>
                                    <p className="text-xs mt-2.5 font-medium text-gray-800">
                                        {data.getPost.creator.bio}
                                    </p>
                                    <div className="mt-3 flex items-center space-x-3">
                                        <div className="flex items-center">
                                            <p className="text-sm font-semibold text-black">
                                                {
                                                    data.getPost.creator
                                                        .followingCount
                                                }
                                            </p>
                                            <p className="ml-1 text-sm font-medium text-gray-500">
                                                Following
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-sm font-semibold text-black">
                                                {
                                                    data.getPost.creator
                                                        .followerCount
                                                }
                                            </p>
                                            <p className="ml-1 text-sm font-medium text-gray-500">
                                                Followers
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full mx-auto mt-[10vh]">
                            {/* try skeleton loaders instead of spinners */}
                            <SpinnerWrapper />
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default PostPage;
