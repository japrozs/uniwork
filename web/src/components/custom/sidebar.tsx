import { useMeQuery } from "@/generated/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidHomeAlt2, BiSolidInbox } from "react-icons/bi";
import { FiCompass } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoNotifications, IoPeople } from "react-icons/io5";
import { UserProfileDropdown } from "./user-profile-dropdown";
import { usePathname } from "next/navigation";
import { MdBookmark } from "react-icons/md";
import { SidebarItem } from "./sidebar-item";
import { TiHome } from "react-icons/ti";
import { AiFillHome } from "react-icons/ai";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
    const pathname = usePathname();
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
            {/* <a href="/app">
                <div
                    className={`flex items-center text-slate-800 cursor-pointer mb-1.5 p-1.5 ${
                        pathname == "/app" ? "bg-gray-100" : "hover:bg-gray-100"
                    } rounded-sm`}
                >
                    <GoHomeFill className="mr-4 text-xl " />{" "}
                    <p className="font-medium text-sm">Home</p>
                </div>
            </a> */}
            <SidebarItem href="/app" label="Home" icon={AiFillHome} />
            <SidebarItem href="/app/network" label="Network" icon={IoPeople} />
            <SidebarItem href="/app/explore" label="Explore" icon={FiCompass} />
            <SidebarItem
                href="/app/bookmarks"
                label="Bookmarks"
                icon={MdBookmark}
            />
            <SidebarItem href="/app/inbox" label="Inbox" icon={BiSolidInbox} />
            <SidebarItem
                href="/app/notifications"
                label="Notifications"
                icon={IoNotifications}
            />
            <div className="mt-5 mb-1.5 h-px bg-gray-100" />
            <UserProfileDropdown />
        </div>
    );
};
