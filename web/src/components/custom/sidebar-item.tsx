import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib";

interface SidebarItemProps {
    label: string;
    href: string;
    icon: IconType;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    href,
    icon: Icon,
}) => {
    const pathname = usePathname();
    return (
        <a href={href}>
            <div
                className={`flex items-center  cursor-pointer mb-1.5 p-1.5 ${
                    pathname == href
                        ? "bg-gray-100 text-slate-800"
                        : "hover:bg-gray-100 text-slate-700"
                } rounded-sm`}
            >
                <Icon
                    className={`mr-4 text-xl ${
                        pathname !== href && "text-slate-500"
                    }`}
                />{" "}
                <p className="font-medium text-sm">{label}</p>
            </div>
        </a>
    );
};
