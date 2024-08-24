import { RegularFollowFragment } from "@/generated/graphql";
import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { IoPerson } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import { LuArrowDownLeft } from "react-icons/lu";
import { useRouter } from "next/router";
import { UserHoverCard } from "./user-hover-card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { FollowiButton } from "./followi-button";

interface ConnectionsViewProps {
    followers: RegularFollowFragment[];
    following: RegularFollowFragment[];
}

export const ConnectionsView: React.FC<ConnectionsViewProps> = ({
    followers,
    following,
}) => {
    const router = useRouter();
    if (followers.length === 0 && following.length === 0) {
        return <></>;
    }
    return (
        <div className="py-2 px-2.5 border border-gray-100 rounded-md mb-5">
            <p className="text-base font-semibold pb-1.5">Connections</p>
            <TabGroup defaultIndex={followers.length === 0 ? 1 : 0}>
                <TabList className="flex gap-4 border-b border-gray-200">
                    <Tab className="flex items-center justify-center w-full py-1.5 px-6 text-sm font-medium border-b-[1.5px] border-black border-opacity-0 text-gray-500 data-[selected]:text-gray-900 focus:outline-none data-[selected]:border-opacity-100">
                        <LuArrowDownLeft className="text-lg mr-1.5" />
                        Followers
                    </Tab>
                    <Tab className="flex items-center justify-center w-full py-1.5 px-6 text-sm font-medium border-b-[1.5px] border-black border-opacity-0 text-gray-500 data-[selected]:text-gray-900 focus:outline-none data-[selected]:border-opacity-100">
                        <MdOutlineArrowOutward className="text-lg mr-1.5" />
                        Following
                    </Tab>
                </TabList>
                <TabPanels className="h-48 overflow-y-scroll">
                    <TabPanel className={"pt-4"}>
                        {followers.map(
                            (f: RegularFollowFragment, i: number) => (
                                <div
                                    key={i}
                                    className={`flex items-start space-x-3 ${
                                        i !== followers.length - 1 &&
                                        "border-b border-gray-100 mb-2"
                                    } pb-2 `}
                                >
                                    <img
                                        src={
                                            `${process.env.NEXT_PUBLIC_API_URL}/${f.follower.avatar}` ||
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
                                                    href={`/app/u/${f.follower.username}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    className="text-sm font-semibold hover:underline cursor-pointer truncate block"
                                                >
                                                    {f.follower.name}
                                                </Link>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="p-0">
                                                <UserHoverCard
                                                    creator={f.follower}
                                                />
                                            </HoverCardContent>
                                        </HoverCard>
                                        <p className="text-xs text-gray-500 menlo truncate">
                                            @{f.follower.username}
                                        </p>
                                    </div>
                                    <div className="ml-auto mr-0">
                                        <FollowiButton user={f.follower} />
                                    </div>
                                </div>
                            )
                        )}
                    </TabPanel>
                    <TabPanel className={"pt-4"}>
                        {following.map(
                            (f: RegularFollowFragment, i: number) => (
                                <div
                                    key={i}
                                    className={`flex items-start space-x-3 ${
                                        i !== following.length - 1 &&
                                        "border-b border-gray-100 mb-2"
                                    } pb-2 `}
                                >
                                    <img
                                        src={
                                            `${process.env.NEXT_PUBLIC_API_URL}/${f.following.avatar}` ||
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
                                                    href={`/app/u/${f.following.username}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    className="text-sm font-semibold hover:underline cursor-pointer truncate block"
                                                >
                                                    {f.following.name}
                                                </Link>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="p-0">
                                                <UserHoverCard
                                                    creator={f.following}
                                                />
                                            </HoverCardContent>
                                        </HoverCard>
                                        <p className="text-xs text-gray-500 menlo truncate">
                                            @{f.following.username}
                                        </p>
                                    </div>
                                    <div className="ml-auto mr-0">
                                        <FollowiButton user={f.following} />
                                    </div>
                                </div>
                            )
                        )}
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
};
