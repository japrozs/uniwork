import { Wrapper } from "@/components/custom/wrapper";
import { Search } from "@/components/ui/search";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { LuArrowDownLeft, LuSchool } from "react-icons/lu";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useIsAuth } from "@/utils/use-is-auth";
import { useGetUserQuery, useMeQuery } from "@/generated/graphql";
import { SpinnerWrapper } from "@/components/custom/spinner-wrapper";
import { FollowiButton } from "@/components/custom/followi-button";

interface NetworkProps {}

const Network: React.FC<NetworkProps> = ({}) => {
    const { data: meData } = useIsAuth();
    const { data, loading } = useGetUserQuery({
        variables: {
            username: meData?.me?.username || "",
        },
    });
    const router = useRouter();
    return (
        <Wrapper>
            <div className="w-full border-l border-r border-gray-100 min-h-screen">
                <div className="pt-3 pb-2 z-10 flex items-center px-3 sticky top-0 bg-white/90 backdrop-blur-md  mb-3 border-b border-gray-100 w-full">
                    <div
                        onClick={() => router.back()}
                        className="p-1 hover:bg-gray-100 hover:text-primary-color rounded-full cursor-pointer"
                    >
                        <IoMdArrowBack className="text-xl" />
                    </div>
                    <p className="text-md font-semibold ml-3.5">Network</p>
                </div>
                {data && !loading ? (
                    <div>
                        <TabGroup
                            defaultIndex={
                                data.getUser.followers.length === 0 ? 1 : 0
                            }
                        >
                            <TabList className="flex border-b border-gray-200">
                                <Tab className="flex items-center justify-center w-full py-1.5 px-6 text-sm font-medium border-b-[1.5px] border-black border-opacity-0 text-gray-500 data-[selected]:text-gray-900 focus:outline-none data-[selected]:border-opacity-100">
                                    <LuArrowDownLeft className="text-lg mr-1.5" />
                                    Followers
                                </Tab>
                                <Tab className="flex items-center justify-center w-full py-1.5 px-6 text-sm font-medium border-b-[1.5px] border-black border-opacity-0 text-gray-500 data-[selected]:text-gray-900 focus:outline-none data-[selected]:border-opacity-100">
                                    <MdOutlineArrowOutward className="text-lg mr-1.5" />
                                    Following
                                </Tab>
                                <Tab className="flex items-center justify-center w-full py-1.5 px-6 text-sm font-medium border-b-[1.5px] border-black border-opacity-0 text-gray-500 data-[selected]:text-gray-900 focus:outline-none data-[selected]:border-opacity-100">
                                    <LuSchool className="text-lg mr-2" />
                                    University
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel className={"pt-0 w-full"}>
                                    {data.getUser.followers.map(
                                        (f, id: number) => (
                                            <div
                                                key={id}
                                                className="w-full flex items-start space-x-3 pt-3 py-2 px-2.5 border-b border-gray-100"
                                            >
                                                <img
                                                    src={
                                                        `${process.env.NEXT_PUBLIC_API_URL}/${f.follower.avatar}` ||
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
                                                            href={`/app/u/${f.follower.username}`}
                                                            className="block w-full overflow-hidden"
                                                        >
                                                            <p className="text-sm font-medium text-black hover:underline truncate">
                                                                {
                                                                    f.follower
                                                                        .name
                                                                }{" "}
                                                            </p>
                                                            <p className="text-gray-500 menlo text-xs font-medium truncate">
                                                                @
                                                                {
                                                                    f.follower
                                                                        .username
                                                                }
                                                            </p>
                                                        </a>
                                                        {f.follower.id !==
                                                            meData?.me?.id && (
                                                            <div className="">
                                                                <FollowiButton
                                                                    nonColor
                                                                    user={
                                                                        f.follower
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-[0.8rem] mt-2.5 font-medium text-gray-800">
                                                        {f.follower.bio}
                                                    </p>
                                                    <div className="mt-1.5 mb-0.5 flex items-center space-x-3">
                                                        <div className="flex items-center">
                                                            <p className="text-sm font-semibold text-black">
                                                                {
                                                                    f.follower
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
                                                                    f.follower
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
                                        )
                                    )}
                                </TabPanel>
                                <TabPanel className={"pt-0"}>
                                    <p>following</p>
                                </TabPanel>
                                <TabPanel className={"pt-0"}>
                                    <p>university</p>
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </div>
                ) : (
                    <div className="w-full mx-auto mt-[10vh]">
                        {/* try skeleton loaders instead of spinners */}
                        <SpinnerWrapper />
                    </div>
                )}
            </div>
            <div className="w-full">
                <Search />
            </div>
        </Wrapper>
    );
};

export default Network;
