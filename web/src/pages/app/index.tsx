import { Button } from "@/components/custom/button";
import { useIsAuth } from "@/utils/use-is-auth";
import React from "react";

interface AppIndexPageProps {}

const AppIndexPage: React.FC<AppIndexPageProps> = ({}) => {
    useIsAuth();
    return (
        <div>
            <p>hi there</p>
        </div>
    );
};

export default AppIndexPage;
