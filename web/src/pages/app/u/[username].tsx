import { SpinnerWrapper } from "@/components/custom/spinner-wrapper";
import { Wrapper } from "@/components/custom/wrapper";
import { Search } from "@/components/ui/search";
import {
    PostSnippetFragment,
    RegularCommentFragment,
    useGetUserCommentsQuery,
    useGetUserQuery,
} from "@/generated/graphql";
import { useIsAuth } from "@/utils/use-is-auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoIosMore, IoMdArrowBack } from "react-icons/io";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { RiGridLine, RiShare2Line } from "react-icons/ri";
import { HiOutlineReply, HiViewGrid } from "react-icons/hi";
import { PostCard } from "@/components/custom/post-card";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { copyToClipboard } from "@/utils";
import { toast } from "sonner";
import { LuLink2, LuSchool } from "react-icons/lu";
import { FollowiButton } from "@/components/custom/followi-button";
import { SimpleButton } from "@/components/custom/simple-button";
import { EditProfileModal } from "@/components/custom/edit-profile-modal";
import { AMERICA_COLLEGES_LIST } from "@/data";
import { CommentCard } from "@/components/custom/comment-card";
import Link from "next/link";
import { MdOutlineCameraAlt } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { SuggestUsersToFollow } from "@/components/custom/suggest-users-to-follow";
import { ConnectionsView } from "@/components/custom/connections-view";

interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = ({}) => {
    const { data: meData } = useIsAuth();
    const router = useRouter();
    const username =
        typeof router.query.username == "string" ? router.query.username : "-1";
    const { data, loading } = useGetUserQuery({
        variables: {
            username,
        },
    });
    const [open, setOpen] = useState(false);
    console.log(data?.getUser.following);

    const { data: commentsData, loading: commentsLoading } =
        useGetUserCommentsQuery({
            variables: {
                id: data?.getUser.id || -1,
            },
        });
    return (
        <Wrapper>
            <div className="">
                {data && !loading ? (
                    <div className="w-full border-x border-gray-100">
                        <div className="pt-3 pb-2 z-10 flex items-center px-3 sticky top-0 bg-white/90 backdrop-blur-md  border-b border-gray-100 w-full">
                            <div
                                onClick={() => router.back()}
                                className="p-1 hover:bg-gray-100 hover:text-primary-color rounded-full cursor-pointer"
                            >
                                <IoMdArrowBack className="text-xl" />
                            </div>
                            <div>
                                <p className="text-md font-semibold ml-3.5">
                                    {data.getUser.name}{" "}
                                </p>
                            </div>
                        </div>
                        <img
                            className="w-full max-h-44 object-cover"
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${data.getUser.bg}`}
                        />
                        <div className="">
                            <div className="flex items-end">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${data.getUser.avatar}`}
                                    className="h-20 w-20 border-2 border-gray-100 rounded-full mt-[-40px] ml-3  object-cover"
                                />
                                <div className="ml-auto mr-3 flex items-center">
                                    {/* TODO: show a pencil icon here for editing options options */}
                                    {data.getUser.id !== meData?.me?.id ? (
                                        <>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    className="focus:outline-none mr-3 flex items-center hover:bg-gray-100 text-gray-600 hover:text-black p-1 rounded-full cursor-pointer"
                                                >
                                                    <IoIosMore className="text-xl" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        // TODO: UPDATE THIS URL
                                                        const resp =
                                                            await copyToClipboard(
                                                                `${window.location.protocol}//${window.location.host}/app/u/${data.getUser.username}`
                                                            );

                                                        if (
                                                            resp
                                                                .toLowerCase()
                                                                .startsWith(
                                                                    "failed"
                                                                )
                                                        ) {
                                                            toast.error(resp);
                                                        } else {
                                                            toast.success(resp);
                                                        }
                                                    }}
                                                    className="w-48 p-1 shadow-sm"
                                                >
                                                    <DropdownMenuItem className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600">
                                                        <LuLink2 className="text-lg " />
                                                        Copy link to profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={async (e) => {
                                                            e.stopPropagation();
                                                            if (
                                                                navigator.share
                                                            ) {
                                                                try {
                                                                    // TODO: check this before deployment
                                                                    await navigator.share(
                                                                        {
                                                                            title: `${data.getUser.name} (@${data.getUser.username}) on UniWork`,
                                                                            text: `${data.getUser.name} (@${data.getUser.username}) on UniWork`,
                                                                            url: `${window.location.protocol}//${window.location.host}/app/u/${data.getUser.username}`,
                                                                        }
                                                                    );
                                                                } catch (error) {}
                                                            } else {
                                                                toast.error(
                                                                    "Sharing is not supported in your browser."
                                                                );
                                                            }
                                                        }}
                                                        className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600"
                                                    >
                                                        <RiShare2Line className="text-lg " />
                                                        Share profile via...
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <FollowiButton
                                                user={data.getUser}
                                            />
                                        </>
                                    ) : (
                                        <SimpleButton
                                            onClick={() => setOpen(true)}
                                            label={"Edit profile"}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="px-3">
                                <p className="mt-2.5 text-md font-semibold">
                                    {data.getUser.name}
                                    <span className="ml-1.5 text-xs font-semibold border border-blue-100 text-blue-500 py-0.5 px-2 rounded-md bg-blue-50">
                                        #{data.getUser.id}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500 menlo">
                                    @{data.getUser.username}{" "}
                                    {meData?.me?.id !== data.getUser.id &&
                                        data.getUser.following.find(
                                            (f) =>
                                                f.followingId === meData?.me?.id
                                        ) && (
                                            <span
                                                style={{
                                                    fontFamily: "Inter",
                                                }}
                                                className="text-xs font-medium py-0.5 px-1 rounded-md bg-gray-200"
                                            >
                                                Follows you
                                            </span>
                                        )}
                                </p>
                                <p className="mt-2 text-sm font-medium text-gray-800">
                                    {data.getUser.bio}
                                </p>
                                <div className="mt-3 flex items-center space-x-3">
                                    <div className="flex items-center">
                                        <p className="text-sm font-semibold text-black">
                                            {data.getUser.followingCount}
                                        </p>
                                        <p className="ml-1 text-sm font-medium text-gray-500">
                                            Following
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-sm font-semibold text-black">
                                            {data.getUser.followerCount}
                                        </p>
                                        <p className="ml-1 text-sm font-medium text-gray-500">
                                            Followers
                                        </p>
                                    </div>
                                    {data.getUser.uni.trim().length !== 0 && (
                                        <div className="flex items-center">
                                            <span className="text-xs mr-2.5 text-gray-500">
                                                •
                                            </span>
                                            <div className="flex items-center">
                                                <LuSchool className="text-gray-500 text-lg mr-2" />
                                                <p className="text-gray-800 text-sm font-medium">
                                                    {
                                                        AMERICA_COLLEGES_LIST.find(
                                                            ({ value }) =>
                                                                value ===
                                                                data.getUser.uni
                                                        )?.label
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )}
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
                                            {data.getUser.posts.length ===
                                                0 && (
                                                <div className="w-full text-center mx-auto mt-[10vh]">
                                                    <div>
                                                        <MdOutlineCameraAlt className="mx-auto mb-2 text-gray-400 text-2xl" />
                                                        <p className="text-sm font-semibold uppercase text-gray-400">
                                                            NO POSTS YET
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </TabPanel>
                                        <TabPanel>
                                            {commentsData && !loading ? (
                                                <div>
                                                    {commentsData.getUserComments.map(
                                                        (
                                                            c: RegularCommentFragment,
                                                            i: number
                                                        ) => (
                                                            <Link
                                                                key={i}
                                                                href={`/app/p/${c.postId}`}
                                                            >
                                                                <CommentCard
                                                                    comment={c}
                                                                />
                                                            </Link>
                                                        )
                                                    )}
                                                    {commentsData
                                                        .getUserComments
                                                        .length === 0 && (
                                                        <div className="w-full text-center mx-auto mt-[10vh]">
                                                            <div>
                                                                <BiCommentDetail className="mx-auto mb-2 text-gray-400 text-2xl" />
                                                                <p className="text-sm font-semibold uppercase text-gray-400">
                                                                    NO REPLIES
                                                                    YET
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="w-full mx-auto mt-[10vh]">
                                                    {/* try skeleton loaders instead of spinners */}
                                                    <SpinnerWrapper />
                                                </div>
                                            )}
                                        </TabPanel>
                                    </TabPanels>
                                </TabGroup>
                            </div>
                        </div>
                        <EditProfileModal
                            open={open}
                            setOpen={setOpen}
                            user={data.getUser}
                        />
                    </div>
                ) : (
                    <div className="w-full mx-auto mt-[10vh]">
                        {/* try skeleton loaders instead of spinners */}
                        <SpinnerWrapper />
                    </div>
                )}
            </div>
            <div>
                <Search />
                {meData?.me && data && !loading ? (
                    <>
                        {data.getUser.id === meData.me.id && (
                            <>
                                <ConnectionsView
                                    followers={data.getUser.followers}
                                    following={data.getUser.following}
                                />
                                {meData.me.uni.trim().length === 0 && (
                                    <div className="py-2 px-2.5 border border-gray-100 rounded-md mb-5">
                                        <p className="text-base font-semibold pb-1">
                                            Add your university
                                        </p>
                                        <p className="text-xs font-medium text-gray-600 pb-2">
                                            Update your profile and university
                                            info to unlock exclusive groups and
                                            features on UniWork.
                                        </p>
                                        <SimpleButton
                                            onClick={() => {
                                                setOpen(true);
                                            }}
                                            label="Add university"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                        <SuggestUsersToFollow noAfterFn />
                    </>
                ) : (
                    <div className="w-full mx-auto mt-20">
                        {/* try skeleton loaders instead of spinners */}
                        <SpinnerWrapper />
                    </div>
                )}
            </div>
        </Wrapper>
    );
};

export default UserPage;
