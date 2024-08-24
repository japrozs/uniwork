import {
    RegularUserFragment,
    useSuggestUsersToFollowQuery,
} from "@/generated/graphql";
import React from "react";
import { SpinnerWrapper } from "./spinner-wrapper";
import { UserHoverCard } from "./user-hover-card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { FollowiButton } from "./followi-button";
import { useRouter } from "next/router";

interface SuggestUsersToFollowProps {
    noAfterFn?: boolean;
}

export const SuggestUsersToFollow: React.FC<SuggestUsersToFollowProps> = ({
    noAfterFn,
}) => {
    const { data, loading } = useSuggestUsersToFollowQuery();
    const router = useRouter();

    if (data?.suggestUsersToFollow.length === 0) {
        return <></>;
    }
    return (
        <div>
            {data && !loading ? (
                <div>
                    <div className="py-2 px-2.5 border border-gray-100 rounded-md">
                        <p className="text-base font-semibold pb-4">
                            Suggested follows
                        </p>
                        {data.suggestUsersToFollow.map(
                            (u: RegularUserFragment, i: number) => (
                                <div
                                    key={i}
                                    className={`flex items-start space-x-3 ${
                                        i !== 4 &&
                                        "border-b border-gray-100 mb-2"
                                    } pb-2 `}
                                >
                                    <img
                                        src={
                                            `${process.env.NEXT_PUBLIC_API_URL}/${u.avatar}` ||
                                            "https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                                        }
                                        className="min-w-8 object-cover w-8 h-8 flex items-center justify-center rounded-full"
                                        height={20}
                                        width={20}
                                        alt="avatar"
                                    />
                                    <div className="flex-grow min-w-0">
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <Link
                                                    href={`/app/u/${u.username}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    className="text-sm font-semibold hover:underline cursor-pointer truncate block"
                                                >
                                                    {u.name}
                                                </Link>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="p-0">
                                                <UserHoverCard creator={u} />
                                            </HoverCardContent>
                                        </HoverCard>
                                        <p className="text-xs text-gray-500 menlo truncate">
                                            @{u.username}
                                        </p>
                                    </div>
                                    <div className="ml-auto mr-0">
                                        <FollowiButton
                                            user={u}
                                            {...(!noAfterFn && {
                                                pushToProfile: true,
                                            })}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full mx-auto mt-10">
                    {/* try skeleton loaders instead of spinners */}
                    <SpinnerWrapper />
                </div>
            )}
        </div>
    );
};
