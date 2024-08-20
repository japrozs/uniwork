import { Spinner } from "@/components/custom/spinner";
import { Wrapper } from "@/components/custom/wrapper";
import { Search } from "@/components/ui/search";
import { PostSnippetFragment, useGetUserQuery } from "@/generated/graphql";
import { useIsAuth } from "@/utils/use-is-auth";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { RiGridLine } from "react-icons/ri";
import { HiOutlineReply, HiViewGrid } from "react-icons/hi";
import { PostCard } from "@/components/custom/post-card";

interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = ({}) => {
    useIsAuth();
    const router = useRouter();
    const username =
        typeof router.query.username == "string" ? router.query.username : "-1";
    const { data, loading } = useGetUserQuery({
        variables: {
            username,
        },
    });
    return (
        <Wrapper>
            <div className="flex overflow-y-auto w-[80%]">
                <div className="flex w-[65%] flex-col items-start">
                    {data && !loading ? (
                        <div className="w-full border-x border-gray-100">
                            <div className="pt-3 pb-2 flex items-center px-3 sticky top-0 bg-white/90 backdrop-blur-md  border-b border-gray-100 w-full">
                                <div
                                    onClick={() => router.back()}
                                    className="p-1 hover:bg-gray-100 hover:text-primary-color rounded-full cursor-pointer"
                                >
                                    <IoMdArrowBack className="text-xl" />
                                </div>
                                <p className="text-md font-semibold ml-3.5">
                                    {data.getUser.name}
                                </p>
                            </div>
                            <img
                                className="w-full max-h-32 object-cover"
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${data.getUser.bg}`}
                            />
                            <div className="">
                                <div className="flex items-end">
                                    <img
                                        src={data.getUser.avatar}
                                        className="h-20 w-20 border-2 border-gray-100 rounded-full mt-[-40px] ml-3"
                                    />
                                    <div className="ml-auto mr-3">
                                        <button
                                            className={`transition-all  ml-auto mr-0 bg-white py-1.5 px-6 font-medium rounded-md text-black border border-gray-200 hover:bg-gray-50 text-sm`}
                                        >
                                            Follow
                                        </button>
                                    </div>
                                </div>
                                <div className="px-3">
                                    <p className="mt-2.5 text-md font-semibold">
                                        {data.getUser.name}
                                    </p>
                                    <p className="text-sm text-gray-500 menlo">
                                        @{data.getUser.username}
                                    </p>
                                    <p className="mt-2 text-sm font-medium text-gray-800">
                                        {data.getUser.bio}
                                    </p>
                                    <div className="mt-3 flex items-center space-x-3">
                                        <div className="flex items-center">
                                            <p className="text-sm font-semibold text-black">
                                                12
                                            </p>
                                            <p className="ml-1 text-sm font-medium text-gray-500">
                                                Following
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-sm font-semibold text-black">
                                                2.3k
                                            </p>
                                            <p className="ml-1 text-sm font-medium text-gray-500">
                                                Followers
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-3">
                                    <TabGroup>
                                        <TabList className="flex gap-4 border-b border-gray-200">
                                            <Tab className="flex items-center justify-center w-full py-1.5 px-6 text-sm/6 font-semibold border-b-[1.5px] border-black border-opacity-0 text-gray-500 data-[selected]:text-gray-900 focus:outline-none data-[selected]:border-opacity-100">
                                                <HiViewGrid className="mr-1.5" />
                                                POSTS
                                            </Tab>
                                            <Tab className="flex items-center justify-center w-full py-1.5 px-6 text-sm/6 font-semibold border-b-[1.5px] border-black border-opacity-0 text-gray-500 data-[selected]:text-gray-900 focus:outline-none data-[selected]:border-opacity-100">
                                                <HiOutlineReply className="mr-1.5" />
                                                REPLIES
                                            </Tab>
                                        </TabList>
                                        <TabPanels className="">
                                            <TabPanel>
                                                {data.getUser.posts.map(
                                                    (p, i: number) => (
                                                        <PostCard
                                                            post={p}
                                                            key={i}
                                                            minimal
                                                        />
                                                    )
                                                )}
                                            </TabPanel>
                                            <TabPanel>
                                                <p>replies panel</p>
                                            </TabPanel>
                                        </TabPanels>
                                    </TabGroup>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full mx-auto mt-[10vh]">
                            {/* try skeleton loaders instead of spinners */}
                            <Spinner />
                        </div>
                    )}
                </div>
                <div className="w-[35%] overflow-y-auto pl-2 pt-3 sticky top-0">
                    <div className="w-full">
                        <Search />
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default UserPage;
