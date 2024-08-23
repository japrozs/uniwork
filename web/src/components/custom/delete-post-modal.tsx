import {
    GetUserQuery,
    PostSnippetFragment,
    useDeletePostMutation,
} from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { Transition, Dialog, DialogPanel } from "@headlessui/react";
import React, {
    Dispatch,
    Fragment,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import { SimpleButton } from "./simple-button";
import { useRouter } from "next/router";

type UserPosts = GetUserQuery["getUser"]["posts"];
type PostType = UserPosts[number];

interface DeletePostModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    post: PostSnippetFragment | PostType;
}

export const DeletePostModal: React.FC<DeletePostModalProps> = ({
    open,
    setOpen,
    post,
}) => {
    const [deletePostMutation, { loading }] = useDeletePostMutation();
    const client = useApolloClient();
    const router = useRouter();

    const deletePost = async () => {
        const resp = await deletePostMutation({
            variables: {
                postId: post.id,
            },
        });

        if (resp) {
            toast.success("This post is now deleted");
            router.push(`/app`);
            await client.resetStore();
            setOpen(false);
        } else {
            toast.error("Unable to delete post");
        }
    };
    return (
        <Transition appear show={open}>
            <Transition.Child
                as={Fragment}
                enter="transition-all ease-in-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-all ease-in-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    className="relative z-50"
                >
                    {/* The backdrop, rendered as a fixed sibling to the panel container */}
                    <div
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                    />

                    {/* Full-screen container to center the panel */}
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        {/* The actual dialog panel  */}
                        <DialogPanel
                            style={{
                                maxHeight: "44rem",
                            }}
                            className="w-full overflow-y-scroll py-4 max-w-lg rounded-lg p-5 bg-white"
                        >
                            <div className="flex items-center mb-2">
                                <p className="text-lg font-semibold">
                                    Are you sure?
                                </p>
                                <div
                                    onClick={() => setOpen(false)}
                                    className="cursor-pointer ml-auto mr-0 hover:bg-gray-100 rounded-full p-1"
                                >
                                    <IoMdClose className="text-xl text-gray-700" />
                                </div>
                            </div>
                            <p className="text-sm text-slate-500">
                                This can’t be undone and it will be removed from
                                your profile, the timeline of any accounts that
                                follow you, and from search results.
                            </p>
                            <div className="mt-5 flex items-center">
                                <div className="ml-auto flex items-center">
                                    <button
                                        disabled={loading}
                                        onClick={deletePost}
                                        className={`transition-all ease-soft-spring flex items-center ml-auto text-center ${
                                            loading
                                                ? "cursor-disabled bg-gray-100 border border-gray-100 text-gray-300 cursor-not-allowed"
                                                : "bg-red-500 border border-red-500 hover:bg-opacity-[0.94] text-white cursor-pointer"
                                        } hover:bg-opacity-[0.96] rounded-md py-1.5 px-8 whitespace-nowrap font-medium text-sm`}
                                    >
                                        {loading ? "Loading..." : "Delete"}
                                    </button>
                                    <SimpleButton
                                        onClick={() => setOpen(false)}
                                        className="ml-5"
                                        label="Cancel"
                                    />
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition.Child>
        </Transition>
    );
};
