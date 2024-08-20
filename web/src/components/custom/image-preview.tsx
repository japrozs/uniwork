import { PostSnippetFragment } from "@/generated/graphql";
import React from "react";

interface ImagePreviewProps {
    post: PostSnippetFragment;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ post }) => {
    return (
        <div>
            {post.attachments.map((a: string, i: number) => (
                <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${a}`}
                    alt={`preview ${i}`}
                    className="w-auto h-44 object-cover rounded"
                />
            ))}
        </div>
    );
};
