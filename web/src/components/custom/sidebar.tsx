import { useMeQuery } from "@/generated/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidInbox } from "react-icons/bi";
import { FiCompass } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { IoNotifications, IoPeople } from "react-icons/io5";
import { UserProfileDropdown } from "./user-profile-dropdown";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
    const { data } = useMeQuery();
    return (
        <div className="pr-2 pt-3.5">
            <Link href="/app/">
                <Image
                    src="/logo.svg"
                    className="h-7 w-auto mb-6"
                    height={20}
                    width={20}
                    alt="uniwork"
                />
            </Link>
            <a href="/app">
                <div className="flex items-center text-slate-800 cursor-pointer mb-1.5 p-1.5 bg-gray-100 rounded-sm">
                    <GoHomeFill className="mr-4 text-xl " />{" "}
                    <p className="font-medium text-sm">Home</p>
                </div>
            </a>
            <a href="/app/network">
                <div className="flex items-center text-slate-600 cursor-pointer mb-1.5 p-1.5 hover:bg-gray-100 rounded-sm">
                    <IoPeople className="mr-4 text-xl text-slate-500" />{" "}
                    <p className="font-medium text-sm">Network</p>
                </div>
            </a>
            <a href="/app/explore">
                <div className="flex items-center text-slate-600 cursor-pointer mb-1.5 p-1.5 hover:bg-gray-100 rounded-sm">
                    <FiCompass className="mr-4 text-xl text-slate-500" />{" "}
                    <p className="font-medium text-sm">Explore</p>
                </div>
            </a>
            <a href="/app/inbox">
                <div className="flex items-center text-slate-600 cursor-pointer mb-1.5 p-1.5 hover:bg-gray-100 rounded-sm">
                    <BiSolidInbox className="mr-4 text-xl text-slate-500" />{" "}
                    <p className="font-medium text-sm">Inbox</p>
                </div>
            </a>
            <a href="/app/notifications">
                <div className="flex items-center text-slate-600 cursor-pointer mb-1.5 p-1.5 hover:bg-gray-100 rounded-sm">
                    <IoNotifications className="mr-4 text-xl text-slate-500" />{" "}
                    <p className="font-medium text-sm">Notifications</p>
                </div>
            </a>
            <div className="mt-5 mb-1.5 h-px bg-gray-100" />
            <UserProfileDropdown />
        </div>
    );
};
