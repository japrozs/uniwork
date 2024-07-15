// import { Meta } from "@/components/shared/meta";
import { Button } from "@/components/custom/button";
import { InputField } from "@/components/custom/input-field";
import { useRegisterMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/to-error-map";
import { useIsAuth } from "@/utils/use-is-auth";
import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface SignupProps {}

const Signup: React.FC<SignupProps> = ({}) => {
    useIsAuth();
    const [registerMut] = useRegisterMutation();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const client = useApolloClient();
    return (
        <div>
            {/* <Head>
                <Meta title={"Signup - Lumos"} />
                <title>Signup – Lumos</title>
            </Head> */}
            <div className="h-screen">
                <div className="px-6 py-5 z-10">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            className="h-8 w-auto"
                            height={20}
                            width={20}
                            alt="logo"
                        />
                    </Link>
                </div>
                <div
                    style={{
                        marginTop: "8.8vh",
                    }}
                    className="w-80 ml-auto mr-auto  flex flex-col items-center justify-center"
                >
                    <p className="text-xl mr-auto ml-0 font-semibold">
                        Think it. Make it.
                    </p>
                    <p className="text-xl mr-auto ml-0 mb-2 font-medium text-slate-500">
                        Create your Uniwork account
                    </p>
                    <Formik
                        initialValues={{ name: "", email: "", password: "" }}
                        onSubmit={async (values, { setErrors }) => {
                            const res = await registerMut({
                                variables: {
                                    options: values,
                                },
                            });
                            if (res.data?.register.errors) {
                                setErrors(toErrorMap(res.data.register.errors));
                            } else if (res.data?.register.user) {
                                setLoading(true);
                                router.push("/app");
                                await client.resetStore();
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <InputField
                                    name="name"
                                    placeholder="Dwight Schrute"
                                    label="Name"
                                />
                                <InputField
                                    name="email"
                                    placeholder="dwight@dundermifflin.com"
                                    label="Email"
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="bears, beets, battlestar galactica!"
                                    label="Password"
                                />
                                <Button
                                    loading={isSubmitting || loading}
                                    colored
                                    type="submit"
                                    label="Continue"
                                    className="mt-5"
                                />
                            </Form>
                        )}
                    </Formik>
                    <p className="text-gray-400 text-sm font-medium mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="hover:text-primary-color transition-all"
                        >
                            Log in
                        </Link>
                    </p>
                    {/* TODO – add functionality to forget your password, if that makes sense */}
                    {/* <p className="text-gray-600 text-smol mt-2">
                        <a
                            href="/forgot-password"
                            className="underline hover:text-primary-color transition-all"
                        >
                            Forgot password?
                        </a>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default Signup;
