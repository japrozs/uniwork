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
            <DropdownMenuTrigger className="focus:outline-none ml-auto mr-0">
                <Image
                    src="https://api.dicebear.com/9.x/notionists-neutral/png?seed=japrozs&flip=true"
                    className="h-7 w-7 rounded-md border border-gray-300"
                    height={20}
                    width={20}
                    alt="avatar"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 p-1 shadow-sm">
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
                            src="https://api.dicebear.com/9.x/notionists-neutral/png?seed=japrozs&flip=true"
                            className="min-w-7 ml-auto mr-0 w-7 h-7 flex items-center justify-center rounded-md border border-gray-300"
                            height={20}
                            width={20}
                            alt="avatar"
                        />
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer flex w-full text-sm items-center gap-3 font-medium rounded-sm py-1.5 px-3 focus:text-black focus:bg-gray-100 text-gray-600">
                    <CgProfile className="text-lg " />
                    View Profile
                </DropdownMenuItem>
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
