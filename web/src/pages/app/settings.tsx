import { Wrapper } from "@/components/custom/wrapper";
import { Search } from "@/components/ui/search";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
    const router = useRouter();
    return (
        <Wrapper>
            <div className="flex overflow-y-auto w-[80%]">
                <div className="flex w-[65%] flex-col items-start border-l border-r border-gray-100">
                    <div className="pt-3 pb-2 flex items-center px-3 sticky top-0 bg-white/90 backdrop-blur-md  mb-3 border-b border-gray-100 w-full">
                        <div
                            onClick={() => router.back()}
                            className="p-1 hover:bg-gray-100 hover:text-primary-color rounded-full cursor-pointer"
                        >
                            <IoMdArrowBack className="text-xl" />
                        </div>
                        <p className="text-md font-semibold ml-3.5">Settings</p>
                    </div>
                </div>
                <div className="w-[35%] overflow-y-auto pl-2 pt-3 sticky top-0">
                    <Search />
                </div>
            </div>
        </Wrapper>
    );
};

export default Settings;
