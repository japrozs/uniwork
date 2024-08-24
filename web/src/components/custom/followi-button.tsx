import { RegularUserFragment, useFollowMutation } from "@/generated/graphql";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { toast } from "sonner";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

interface FollowiButtonProps {
    user: RegularUserFragment;
    noCacheReset?: boolean;
    pushToProfile?: boolean;
}

export const FollowiButton: React.FC<FollowiButtonProps> = ({
    user,
    noCacheReset,
    pushToProfile,
}) => {
    const [followMutation, { loading }] = useFollowMutation();
    const client = useApolloClient();
    const router = useRouter();

    const follow = async () => {
        await followMutation({
            variables: {
                id: user.id,
            },
        });
        if (!noCacheReset) {
            await client.resetStore();
        }
        if (pushToProfile) {
            router.push(`/app/u/${user.username}`);
        }
    };

    return (
        <button
            onClick={follow}
            disabled={loading}
            className={`${
                loading && "cursor-not-allowed opacity-50"
            } transition-all flex items-center bg-primary-color py-1.5 px-6 font-medium rounded-md text-white hover:bg-primary-color/95 text-sm`}
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
