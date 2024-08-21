import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Transition, Dialog, DialogPanel } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { SimpleButton } from "./simple-button";

interface EditProfileModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
    open,
    setOpen,
}) => {
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
                            className="w-full overflow-y-scroll py-3 px-3.5 max-w-lg rounded-lg bg-white"
                        >
                            <div className="flex items-center mb-5">
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
                                />
                            </div>
                            <p className="text-sm text-slate-500">
                                This action{" "}
                                <span className="font-medium">
                                    cannot be undone
                                </span>
                                . Your booking will be cancelled permanently and
                                forever. To confirm this action, please type the
                                booking number (
                                <span className="text-sm menlo text-pink-500 bg-pink-50 py-0.5 px-1 rounded-md">
                                    243938248927
                                </span>
                                ) of your booking below
                            </p>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition.Child>
        </Transition>
    );
};
