import React, { useEffect, useRef, useState } from "react";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

interface SearchProps {}

export const Search: React.FC<SearchProps> = ({}) => {
    const [query, setQuery] = useState("");
    const [isActive, setIsActive] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setIsActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="flex items-center space-x-5 w-full">
            <div
                ref={searchRef}
                className="sticky top-0 bg-white pb-4 relative w-full"
            >
                <div className="mx-0.5 focus-within:ring-2 flex items-center bg-gray-100 p-2 rounded-md">
                    <IoSearch className="ml-1 mr-3 text-gray-400 text-xl" />
                    <input
                        value={query}
                        className="bg-gray-100 w-full focus:outline-none text-sm font-medium"
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsActive(true)}
                        placeholder="Search"
                    />
                    {query.length !== 0 && (
                        <RxCross2
                            className="text-xl text-gray-500 hover:text-primary-color cursor-pointer"
                            onClick={() => {
                                setQuery("");
                            }}
                        />
                    )}
                </div>
                <div
                    className={`
                                        absolute mt-0.5 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-md z-10 overflow-y-auto
                                        transition-opacity ease-in-out
                                        ${
                                            isActive
                                                ? "opacity-100 max-h-60 visible"
                                                : "opacity-0 max-h-0 invisible pointer-events-none"
                                        }
                                    `}
                >
                    <div className="px-3 py-2.5">
                        {query.trim().length === 0 && (
                            <p className="text-sm font-semibold text-center text-black my-3">
                                Try searching for people
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
