import { GetUserQuery, PostSnippetFragment } from "@/generated/graphql";
import React from "react";

type UserPosts = GetUserQuery["getUser"]["posts"];
type PostType = UserPosts[number];

interface ImagePreviewProps {
    post: PostSnippetFragment | PostType;
    noClick?: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
    post,
    noClick,
}) => {
    const maxVisibleImages = 4;
    const remainingImagesCount = post.attachments.length - maxVisibleImages;
    return (
        <>
            {/* <div className="mt-1.5">
                {post.attachments.map((a: string, i: number) => (
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${a}`}
                        alt={`preview ${i}`}
                        className="w-auto h-44 object-cover rounded"
                    />
                ))}
            </div> */}
            {post.attachments.length > 0 && (
                <div
                    className={`mt-1.5 ${
                        post.attachments.length === 1
                            ? ""
                            : post.attachments.length === 2
                            ? "grid grid-cols-2 gap-1.5"
                            : "grid grid-cols-2 grid-rows-2 gap-1.5"
                    }`}
                >
                    {post.attachments.map((a: string, i: number) => (
                        <img
                            onClick={() => {
                                if (noClick) return;
                                alert(123);
                            }}
                            key={i}
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${a}`}
                            alt={`preview ${i}`}
                            className={`transition-all ${
                                post.attachments.length === 1
                                    ? "w-auto h-auto max-h-96"
                                    : "w-full h-44"
                            } cursor-pointer hover:opacity-[.98] hover:bg-gray-900/5 object-cover rounded-md border border-gray-100`}
                        />
                    ))}
                </div>
            )}
        </>
    );
};
