import { RegularUserFragment, useFollowMutation } from "@/generated/graphql";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { Spinner } from "./spinner-wrapper";
import { toast } from "sonner";
import { useApolloClient } from "@apollo/client";

interface FollowiButtonProps {
    user: RegularUserFragment;
}

export const FollowiButton: React.FC<FollowiButtonProps> = ({ user }) => {
    const [followMutation, { loading }] = useFollowMutation();
    const client = useApolloClient();

    const follow = async () => {
        await followMutation({
            variables: {
                id: user.id,
            },
        });
        await client.resetStore();
    };

    return (
        <button
            onClick={follow}
            disabled={loading}
            className={`${
                loading && "cursor-not-allowed opacity-50"
            } transition-all flex items-center ml-auto mr-0 bg-white py-1.5 px-6 font-medium rounded-md text-black border border-gray-200 hover:bg-gray-50 text-sm`}
        >
            <>
                {user.followThisUser && (
                    <IoMdCheckmark className="text-lg mr-1.5" />
                )}
                {user.followThisUser ? "Following" : "Follow"}
            </>
        </button>
    );
};
