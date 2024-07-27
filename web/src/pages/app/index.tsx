import { Button } from "@/components/custom/button";
import { Navbar } from "@/components/custom/navbar";
import { PostCard } from "@/components/custom/post-card";
import { Spinner } from "@/components/custom/spinner";
import { Wrapper } from "@/components/custom/wrapper";
import { PostSnippetFragment, useGetPostsQuery } from "@/generated/graphql";
import { useIsAuth } from "@/utils/use-is-auth";
import React from "react";

interface AppIndexPageProps {}

const AppIndexPage: React.FC<AppIndexPageProps> = ({}) => {
    useIsAuth();
    const { data, loading } = useGetPostsQuery();
    return (
        <Wrapper>
            <div className="flex overflow-y-auto w-[80%] pt-2">
                <div className="flex w-[70%] items-start">
                    {!data && loading ? (
                        <div>
                            <Spinner />
                        </div>
                    ) : (
                        <div className="no-scrollbar">
                            {data?.getPosts.map(
                                (p: PostSnippetFragment, idx: number) => (
                                    <PostCard key={idx} post={p} />
                                )
                            )}
                        </div>
                    )}
                </div>
                <div className="w-[30%] overflow-y-auto pl-2">
                    <p>hi there C</p>
                </div>
            </div>
        </Wrapper>
    );
};

export default AppIndexPage;
