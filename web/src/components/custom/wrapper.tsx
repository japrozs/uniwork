import React from "react";
import { Navbar } from "./navbar";
import { FiCompass } from "react-icons/fi";
import { Sidebar } from "./sidebar";

interface WrapperProps {
    children: [React.ReactNode, React.ReactNode];
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const [mainContent, rightSidebar] = children;
    return (
        <div className="flex flex-col h-screen">
            {/* <Navbar sticky /> */}
            <main className="flex flex-1 max-w-[76rem] w-full mx-auto overflow-hidden">
                <div className="w-[20%] flex flex-col">
                    <Sidebar />
                </div>
                <div className="flex overflow-y-auto w-[80%]">
                    <div className="flex w-[65%] items-start">
                        <div className="w-full">{mainContent}</div>
                    </div>
                    <div className="w-[35%] overflow-y-auto pl-2 pt-4 sticky top-0">
                        <div className="w-full">{rightSidebar}</div>
                    </div>
                </div>
                {/* {children} */}
            </main>
        </div>
    );
};
