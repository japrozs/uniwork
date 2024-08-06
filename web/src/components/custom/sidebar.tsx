import { useMeQuery } from "@/generated/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidInbox } from "react-icons/bi";
import { FiCompass } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { IoNotifications, IoPeople } from "react-icons/io5";

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
                    <p className="font-medium text-sidebar-item">Home</p>
                </div>
            </a>
            <a href="/app/network">
                <div className="flex items-center text-slate-600 cursor-pointer mb-1.5 p-1.5 hover:bg-gray-100 rounded-sm">
                    <IoPeople className="mr-4 text-xl text-slate-500" />{" "}
                    <p className="font-medium text-sidebar-item">Network</p>
                </div>
            </a>
            <a href="/app/explore">
                <div className="flex items-center text-slate-600 cursor-pointer mb-1.5 p-1.5 hover:bg-gray-100 rounded-sm">
                    <FiCompass className="mr-4 text-xl text-slate-500" />{" "}
                    <p className="font-medium text-sidebar-item">Explore</p>
                </div>
            </a>
            <a href="/app/inbox">
                <div className="flex items-center text-slate-600 cursor-pointer mb-1.5 p-1.5 hover:bg-gray-100 rounded-sm">
                    <BiSolidInbox className="mr-4 text-xl text-slate-500" />{" "}
                    <p className="font-medium text-sidebar-item">Inbox</p>
                </div>
            </a>
            <a href="/app/notifications">
                <div className="flex items-center text-slate-600 cursor-pointer mb-1.5 p-1.5 hover:bg-gray-100 rounded-sm">
                    <IoNotifications className="mr-4 text-xl text-slate-500" />{" "}
                    <p className="font-medium text-sidebar-item">
                        Notifications
                    </p>
                </div>
            </a>
            {data?.me && (
                <>
                    <div className="mt-5 mb-1.5 h-px bg-gray-100" />
                    <div className="hover:bg-gray-100 rounded-sm  mb-1.5 p-1.5 cursor-pointer">
                        <div className="flex items-center">
                            <Image
                                src="https://api.dicebear.com/9.x/notionists-neutral/png?seed=japrozs&flip=true"
                                className="min-w-7 w-7 h-7 flex items-center justify-center rounded-md border border-gray-300"
                                height={20}
                                width={20}
                                alt="avatar"
                            />
                            <div className="ml-2.5">
                                <p className="text-sidebar-item line-clamp-1 truncate text-ellipsis g-sans font-medium text-gray-800">
                                    {data?.me?.name}
                                </p>
                                {/* <p className="text-xs line-clamp-1 font-medium text-gray-400">
                        Standard User
                    </p> */}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
