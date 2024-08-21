import { useField } from "formik";
import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

interface DropDownProps {
    name: string;
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    label: string;
    maxWidth?: boolean;
    hoverText?: string;
    options: {
        [key: string]: string;
    };
}

export const DropDown: React.FC<DropDownProps> = ({
    state,
    setState,
    hoverText,
    label,
    maxWidth,
    options,
    ...props
}) => {
    const [field, { error }] = useField(props as any);
    return (
        <div
            className={`${
                maxWidth ? "w-max" : "w-full"
            } text-dark-compliment mb-1.5 mt-3  flex flex-col items-center`}
        >
            <label
                htmlFor="cars"
                className={`w-full flex items-center ml-1.5 text-xs text-slate-600 font-medium text-opacity-70 mb-1.5`}
            >
                {label}
                {hoverText && hoverText.trim().length !== 0 && (
                    <div className="has-tooltip">
                        <span className="transition-all tooltip rounded shadow-lg p-1.5 border border-gray-300 bg-gray-100 text-dark-compliment -mt-8">
                            {hoverText}
                        </span>
                        <AiOutlineQuestionCircle className="transition-all text-lg ml-2 cursor-pointer hover:text-blue-500" />
                    </div>
                )}
            </label>
            {error && (
                <span
                    className={
                        "ml-0 mb-1 mr-auto code text-sm text-red-500 truncate"
                    }
                >
                    {error}
                </span>
            )}
            <select
                className={`w-full ml-auto mr-0 text-sm transition-all cursor-pointer outline-none text-gray-500 font-medium bg-white py-1.5 px-2 border ${
                    error ? "border-red-500" : "border-gray-300"
                } rounded-md hover:bg-gray-50`}
                value={state}
                name="sort_by"
                id="sort_by"
                onChange={(e) => {
                    setState(e.target.value);
                }}
            >
                {/* <option selected={true} disabled={true}>
                    Choose Airline
                </option> */}
                {Object.keys(options).map((key, idx) => (
                    <option key={idx} value={key}>
                        {options[key]}
                    </option>
                ))}
            </select>
        </div>
    );
};
