import React from "react";

type SimpleButtonProps = {
    label: string;
    className?: string;
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export const SimpleButton: React.FC<SimpleButtonProps> = ({
    label,
    className,
    ...props
}) => {
    return (
        <button
            className={`${className} transition-all flex items-center ml-auto mr-0 bg-white py-1.5 px-6 font-medium rounded-md text-black border border-gray-200 hover:bg-gray-50 text-sm`}
            {...props}
        >
            {label}
        </button>
    );
};
