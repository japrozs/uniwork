import { Transition, DialogPanel, Dialog } from "@headlessui/react";
import React, {
    Dispatch,
    Fragment,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { IoMdClose } from "react-icons/io";
import { SimpleButton } from "./simple-button";
import { GetUserQuery, PostSnippetFragment } from "@/generated/graphql";
import { LuImage } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { EmojiSelector } from "../ui/emoji-selector";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { toast } from "sonner";
import TextareaAutosize from "react-textarea-autosize";
import Axios from "axios";

type UserPosts = GetUserQuery["getUser"]["posts"];
type PostType = UserPosts[number];

interface EditPostModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    post: PostSnippetFragment | PostType;
}

export const EditPostModal: React.FC<EditPostModalProps> = ({
    open,
    setOpen,
    post,
}) => {
    const [postBody, setPostBody] = useState(post.body);
    const client = useApolloClient();
    const router = useRouter();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [submitLoading, setSubmitLoading] = useState(false);

    const updatePost = async () => {
        setSubmitLoading(true);
        const formData = new FormData();
        formData.append("body", postBody);
        formData.append("postId", post.id);

        selectedImages.forEach((image) => {
            formData.append("files", image);
        });

        try {
            const res = await Axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/upload/update`,
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
                await client.resetStore();
                setOpen(false);
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

    useEffect(() => {
        async function fetchAndSetFiles() {
            const files = await Promise.all(
                post.attachments.map(async (url) => {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/${url}`
                    );
                    const blob = await response.blob();
                    return new File([blob], url.split("/").pop()!, {
                        type: blob.type,
                    });
                })
            );
            setSelectedImages(files);
        }

        fetchAndSetFiles();
    }, []);

    console.log(post.attachments);
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
                            className="w-full overflow-y-scroll py-4 max-w-2xl rounded-lg p-5 bg-white"
                        >
                            <div className="flex items-center mb-1">
                                <p className="text-lg font-semibold">
                                    Edit post
                                </p>
                                <div
                                    onClick={() => setOpen(false)}
                                    className="cursor-pointer ml-auto mr-0 hover:bg-gray-100 rounded-full p-1"
                                >
                                    <IoMdClose className="text-xl text-gray-700" />
                                </div>
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
                                    value={postBody}
                                />
                                {selectedImages.length > 0 && (
                                    <div className="flex flex-wrap mt-2">
                                        {selectedImages.map((image, index) => (
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
                                                                    (_, i) =>
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
                                        ))}
                                    </div>
                                )}
                                <div className="mt-2 flex items-start">
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
                                        onClick={updatePost}
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
                                        Update
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition.Child>
        </Transition>
    );
};
