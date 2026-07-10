import {
    ChevronDown,
    Check,
    BriefcaseBusiness,
} from "lucide-react";

import {
    useState,
    useRef,
    useEffect,
} from "react";


export default function CustomSelect({
    options = [],
    value,
    onChange,
    placeholder = "Select an option",
    label,
}) {

    const [open, setOpen] = useState(false);

    const containerRef = useRef(null);

    const disabled = options.length === 0;


    useEffect(() => {

        function handleOutside(e) {

            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
            ) {
                setOpen(false);
            }

        }


        document.addEventListener(
            "mousedown",
            handleOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutside
            );

        };

    }, []);


    function handleToggle() {

        if (disabled) return;

        setOpen(prev => !prev);

    }


    function handleSelect(option) {

        onChange(option);

        setOpen(false);

    }


    return (
        <div
            ref={containerRef}
            className="relative min-w-0"
        >

            {/* LABEL */}

            {label && (

                <label className="block mb-2 text-xs font-semibold text-gray-500">
                    {label}
                </label>

            )}


            {/* TRIGGER */}

            <button
                type="button"
                onClick={handleToggle}
                disabled={disabled}
                aria-expanded={open}
                className={`group w-full h-[58px] flex items-center gap-3 px-3 rounded-[15px] border text-left transition-all ${open ? "bg-white border-black/15" : "bg-[#F5F5F2] border-transparent hover:bg-[#F0F0ED]"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >

                {/* ICON */}

                <div className={`w-9 h-9 rounded-[11px] flex items-center justify-center shrink-0 transition-colors ${open ? "bg-[#C7F36B]" : "bg-white border border-black/[0.05]"}`}>

                    <BriefcaseBusiness
                        size={15}
                        className="text-black"
                    />

                </div>


                {/* VALUE */}

                <div className="flex-1 min-w-0">

                    <span className={`block text-sm font-semibold truncate ${value ? "text-black" : "text-gray-400"}`}>
                        {value || placeholder}
                    </span>

                </div>


                {/* ARROW */}

                <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 transition-colors ${open ? "bg-black text-white" : "text-gray-400 group-hover:text-black"}`}>

                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />

                </div>

            </button>



            {/* DROPDOWN */}

            {open && !disabled && (

                <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-black/[0.07] rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">

                    {/* SMALL HEADER */}

                    <div className="px-4 pt-3.5 pb-2">

                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                            Choose {label?.toLowerCase() || "option"}
                        </p>

                    </div>


                    {/* OPTIONS */}

                    <div className="max-h-[260px] overflow-y-auto p-1.5 pt-0">

                        {options.map((option) => {

                            const selected = value === option;


                            return (

                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={`group w-full min-h-[46px] px-3 py-2.5 rounded-[12px] flex items-center justify-between gap-3 text-left transition-colors ${selected ? "bg-[#EDF8D8]" : "hover:bg-[#F5F5F2]"}`}
                                >

                                    <div className="flex items-center gap-3 min-w-0">

                                        <span className={`w-2 h-2 rounded-full shrink-0 ${selected ? "bg-[#7FAF2C]" : "bg-gray-200 group-hover:bg-gray-300"}`}></span>


                                        <span className={`text-sm truncate ${selected ? "font-semibold text-black" : "font-medium text-gray-600"}`}>
                                            {option}
                                        </span>

                                    </div>


                                    {selected && (

                                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">

                                            <Check
                                                size={13}
                                                strokeWidth={3}
                                            />

                                        </div>

                                    )}

                                </button>

                            );

                        })}

                    </div>

                </div>

            )}


            {/* DISABLED HELPER */}

            {disabled && (

                <p className="mt-1.5 text-[11px] font-medium text-gray-400">
                    Select a profession first
                </p>

            )}

        </div>
    );
}