import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { TbSettings, TbLogout2 } from "react-icons/tb";

interface EmojiSelectorProps {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

export const EmojiSelector: React.FC<EmojiSelectorProps> = ({
    text,
    setText,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="p-1 hover:bg-gray-100  mr-1.5 rounded-full text-primary-color cursor-pointer">
                <HiOutlineEmojiHappy className="text-xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 m-0 border-none">
                <EmojiPicker
                    autoFocusSearch
                    searchPlaceholder="Search emojis"
                    className="emoji-selector-root"
                    onEmojiClick={(e) => {
                        setText(text.concat(e.emoji));
                    }}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
