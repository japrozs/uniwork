import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    fullWidth?: boolean;
    shadow?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    fullWidth,
    shadow,
    ...props
}) => {
    const [field, { error }] = useField(props as any);
    return (
        <div className={"mt-3 flex flex-col"}>
            <label
                className={"text-xs text-slate-600 font-medium text-opacity-70"}
                htmlFor={field.name}
            >
                {label}
            </label>
            <input
                className={`${
                    fullWidth ? "w-full" : "w-80"
                } text-gray-700 transition-all border ${
                    shadow && "shadow-sm"
                } placeholder-gray-300 text-smol py-1.5 px-3 mt-1.5 mb-1.5 bg-white rounded-md outline-none focus:ring-2 focus:ring-border-blue-100 ${
                    !!error ? "border-red-500" : "border-gray-300"
                }`}
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder}
            />
            {error && (
                <span className={"mt-1 font-medium text-sm text-red-500"}>
                    {error}
                </span>
            )}
        </div>
    );
};
