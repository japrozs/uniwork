import { useIsAuth } from "@/utils/use-is-auth";
import React from "react";

export default function Home() {
    useIsAuth();
    return (
        <div>
            <img src="logo.png" className="w-auto h-8" />
            <a href={"/login"} className="menlo text-red-500 hover:underline">
                login
            </a>
            <br />
            <a href={"/signup"} className="menlo text-red-500 hover:underline">
                signup
            </a>
        </div>
    );
}
