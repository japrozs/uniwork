import { Button } from "@/components/custom/button";
import { Navbar } from "@/components/custom/navbar";
import { PostCard } from "@/components/custom/post-card";
import { Spinner } from "@/components/custom/spinner";
import { Wrapper } from "@/components/custom/wrapper";
import { PostSnippetFragment, useGetPostsQuery } from "@/generated/graphql";
import { useIsAuth } from "@/utils/use-is-auth";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface AppIndexPageProps {}

const AppIndexPage: React.FC<AppIndexPageProps> = ({}) => {
    useIsAuth();
    const { data, loading } = useGetPostsQuery();
    const [showCommentsData, setShowCommentsData] = useState<{
        message?: string;
    }>({});
    const [showLikesData, setShowLikesData] = useState<{ message?: string }>(
        {}
    );
    return (
        <Wrapper>
            <div className="flex overflow-y-auto w-[80%] pt-2">
                <div className="flex w-[70%] items-start">
                    {!data && loading ? (
                        <div>
                            <Spinner />
                        </div>
                    ) : (
                        <div>
                            {data?.getPosts.map(
                                (p: PostSnippetFragment, idx: number) => (
                                    <PostCard
                                        key={idx}
                                        post={p}
                                        setShowCommentsData={
                                            setShowCommentsData
                                        }
                                        setShowLikesData={setShowLikesData}
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
                <div className="w-[30%] overflow-y-auto pl-2 sticky top-0">
                    <RxCross2
                        onClick={() => {
                            setShowCommentsData({});
                            setShowLikesData({});
                        }}
                    />
                    {showCommentsData.message && (
                        <p>{showCommentsData.message}</p>
                    )}
                    {showLikesData.message && <p>{showLikesData.message}</p>}
                    {!showCommentsData.message && !showLikesData.message && (
                        <>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>hi there C</p>
                            <p>abc there C</p>
                        </>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default AppIndexPage;
