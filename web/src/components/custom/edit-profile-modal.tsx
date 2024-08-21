import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Transition, Dialog, DialogPanel } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { SimpleButton } from "./simple-button";
import {
    RegularUserFragment,
    useUpdateProfileMutation,
} from "@/generated/graphql";
import { Form, Formik } from "formik";
import { InputField } from "./input-field";
import { Button } from "@primer/react";
import { useApolloClient } from "@apollo/client";
import { DropDown } from "./dropdown";
import { AMERICA_COLLEGES_LIST } from "@/data";
import { toast } from "sonner";
import Select from "react-select";

interface EditProfileModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    user: RegularUserFragment;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
    open,
    setOpen,
    user,
}) => {
    const [uni, setUni] = useState<
        | {
              value: string;
              label: string;
          }
        | undefined
    >(AMERICA_COLLEGES_LIST.find(({ value }) => value === user.uni));
    const [updateProfileMutation, { loading }] = useUpdateProfileMutation();
    const client = useApolloClient();
    return (
        <Transition appear show={open}>
            <Transition.Child
                as={Fragment}
                enter="transition-all ease-in-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-all ease-in-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    className="relative z-50"
                >
                    {/* The backdrop, rendered as a fixed sibling to the panel container */}
                    <div
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                    />

                    {/* Full-screen container to center the panel */}
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        {/* The actual dialog panel  */}
                        <DialogPanel
                            style={{
                                maxHeight: "44rem",
                            }}
                            className="w-full overflow-y-scroll py-3 max-w-xl rounded-lg bg-white"
                        >
                            <Formik
                                initialValues={{
                                    name: user.name,
                                    bio: user.bio,
                                }}
                                onSubmit={async (values, { setErrors }) => {
                                    console.log({ ...values, uni });
                                    if (values.name.trim().length === 0) {
                                        toast.error("Name cannot be empty");
                                        return;
                                    }
                                    const resp = await updateProfileMutation({
                                        variables: {
                                            name: values.name,
                                            bio: values.bio,
                                            uni: uni?.value || "",
                                        },
                                    });
                                    if (resp) {
                                        await client.resetStore();
                                        setOpen(!open);
                                        toast.success(
                                            "Profile updated successfully"
                                        );
                                    } else {
                                        toast.error("An error occured.");
                                    }
                                }}
                            >
                                {({ isSubmitting, submitForm }) => (
                                    <>
                                        <div className="flex items-center mb-2 px-3.5">
                                            <div
                                                onClick={() => setOpen(false)}
                                                className="cursor-pointer mr-2.5 hover:bg-gray-100 rounded-full p-1"
                                            >
                                                <IoMdClose className="text-xl text-gray-700" />
                                            </div>
                                            <p className="text-base font-semibold">
                                                Edit profile
                                            </p>
                                            <SimpleButton
                                                className="ml-auto mr-0"
                                                label="Save"
                                                onClick={submitForm}
                                                loading={
                                                    loading || isSubmitting
                                                }
                                            />
                                        </div>
                                        <div>
                                            <img
                                                className="w-full max-h-44 object-cover"
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/${user.bg}`}
                                            />
                                            <img
                                                src={user.avatar}
                                                className="h-20 w-20 border-2 border-gray-100 rounded-full mt-[-40px] ml-3"
                                            />
                                            <Form className="px-3 mt-1.5">
                                                <InputField
                                                    name="name"
                                                    placeholder="Dwight Schrute"
                                                    label="Name"
                                                    fullWidth
                                                />
                                                <InputField
                                                    name="bio"
                                                    placeholder="that's what she said..."
                                                    label="Bio"
                                                    fullWidth
                                                    textarea
                                                    notResizable
                                                />
                                                {/* <DropDown
                                                    options={{
                                                        "": "Unspecified",
                                                        ...AMERICA_COLLEGES_LIST,
                                                    }}
                                                    name="uni"
                                                    label="University"
                                                    state={uni}
                                                    setState={setUni}
                                                /> */}
                                                <div className="z-20 mb-20">
                                                    <label
                                                        htmlFor="cars"
                                                        className={`w-full flex items-center mt-1.5 text-xs text-slate-600 font-medium text-opacity-70 mb-1.5`}
                                                    >
                                                        University
                                                    </label>
                                                    <Select
                                                        className="w-full ml-auto mr-0 text-sm transition-all cursor-pointer bg-white outline-none text-gray-500 font-medium  rounded-md"
                                                        onChange={(e) => {
                                                            setUni(e as any);
                                                        }}
                                                        styles={{
                                                            control: (
                                                                styles
                                                            ) => ({
                                                                ...styles,
                                                                minHeight:
                                                                    "10px",
                                                            }),
                                                        }}
                                                        classNamePrefix={
                                                            "react-select-dropdown"
                                                        }
                                                        // @ts-ignore
                                                        defaultValue={uni}
                                                        value={uni}
                                                        // @ts-ignore
                                                        options={
                                                            AMERICA_COLLEGES_LIST
                                                        }
                                                    />
                                                </div>
                                            </Form>
                                        </div>
                                    </>
                                )}
                            </Formik>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition.Child>
        </Transition>
    );
};
