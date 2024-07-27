import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TbLogout2, TbSettings } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
import { IoPeople } from "react-icons/io5";
import { Button } from "./button";
import { useMeQuery } from "@/generated/graphql";

interface NavbarProps {
    sticky?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ sticky }) => {
    const { data } = useMeQuery();
    return (
        <div
            className={`${
                sticky && "sticky top-0 z-10"
            } py-2 flex items-center bg-gray-50 border-b border-gray-200`}
        >
            <div className="flex items-center w-full max-w-[76rem] mx-auto">
                <Link href="/app/">
                    <Image
                        src="/logo.svg"
                        className="h-7 w-auto"
                        height={20}
                        width={20}
                        alt="uniwork"
                    />
                </Link>
                <div className="flex items-center ml-auto mr-0 space-x-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
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
                            <DropdownMenuItem className="cursor-pointer flex w-full items-center text-sm gap-3 font-medium rounded-sm py-1.5 px-3 focus:bg-red-400/15 text-red-500">
                                <TbLogout2 className="text-lg " />
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};
