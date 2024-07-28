import React from "react";
import { Navbar } from "./navbar";
import { FiCompass } from "react-icons/fi";
import { Sidebar } from "./sidebar";

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            {/* <Navbar sticky /> */}
            <main className="flex flex-1 max-w-[76rem] w-full mx-auto overflow-hidden">
                <div className="w-[20%] flex flex-col">
                    <Sidebar />
                </div>
                {children}
            </main>
        </div>
    );
};
