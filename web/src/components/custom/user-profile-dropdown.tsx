import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation, useMeQuery } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { TbSettings, TbLogout2 } from "react-icons/tb";

interface UserProfileDropdownProps {}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({}) => {
    const { data } = useMeQuery();
    const router = useRouter();
    const [logout] = useLogoutMutation();
    const client = useApolloClient();

    const logUserOut = async () => {
        await logout();
        router.push("/");
        await client.resetStore();
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-gray-100 rounded-sm p-1 flex items-center w-full focus:outline-none ml-auto mr-0">
                <Image
                    src={
                        `${process.env.NEXT_PUBLIC_API_URL}/${data?.me?.avatar}` ||
                        "https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                    }
                    className="h-7 w-7 rounded-full"
                    height={20}
                    width={20}
                    alt="avatar"
                />
                <div className="ml-2.5">
                    <p className="text-sidebar-item text-sm line-clamp-1 truncate text-ellipsis g-sans font-medium text-gray-800">
                        {data?.me?.name}
                    </p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-1 shadow-sm">
                <DropdownMenuLabel>
                    <div className="flex items-center">
                        <div className="mr-0.5">
                            <p className="text-md line-clamp-1 truncate text-ellipsis g-sans font-medium text-gray-800">
                                {data?.me?.name}
                            </p>
                            <p className="text-xs menlo line-clamp-1 font-medium text-gray-400">
                                @{data?.me?.username}
                            </p>
                        </div>
                        {/* <p className=" bg-[#00395D] text-[#00AEEF] font-medium text-md   g-sans">
                                        A
                                    </p> */}
                        <Image
                            src={
                                `${process.env.NEXT_PUBLIC_API_URL}/${data?.me?.avatar}` ||
                                "https://i.ibb.co/ZLw7SsS/icons8-test-account-96.png"
                            }
                            className="min-w-7 ml-auto mr-0 w-7 h-7 flex items-center justify-center rounded-md"
                            height={20}
                            width={20}
                            alt="avatar"
                        />
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/app/u/${data?.me?.username}`}>
                    <DropdownMenuItem className="cursor-pointer flex w-full text-sm items-center gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600">
                        <CgProfile className="text-lg " />
                        View Profile
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600">
                    <TbSettings className="text-lg " />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={logUserOut}
                    className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:bg-red-400/15 text-red-500"
                >
                    <TbLogout2 className="text-lg " />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
