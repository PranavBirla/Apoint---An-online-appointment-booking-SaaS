import { useEffect, useRef, useState } from "react";

import AvailabilityToggleModal from "./AvailabilityToggleModal";
import AvailabilityTimeSheet from "./AvailabilityTimeSheet";

import {
    Clock3,
    ChevronDown,
    ChevronRight,
    Check,
} from "lucide-react";


export default function AvailabilityDayCard({
    day,
    existingAvailability,
    slotDuration,
    onSave,
    isLast,
}) {

    const [showTimeSheet, setShowTimeSheet] = useState(false);

    const [isActive, setIsActive] = useState(
        existingAvailability?.isActive ?? false
    );

    const [startTime, setStartTime] = useState(
        existingAvailability?.startTime || "09:00"
    );

    const [endTime, setEndTime] = useState(
        existingAvailability?.endTime || "17:00"
    );

    const [isEditing, setIsEditing] = useState(false);

    const [showToggleModal, setShowToggleModal] = useState(false);


    const startRef = useRef(null);
    const endRef = useRef(null);


    const hasAvailability = !!existingAvailability;


    useEffect(() => {

        setIsActive(
            existingAvailability?.isActive ?? false
        );

    }, [existingAvailability]);


    function openPicker(ref) {

        try {

            ref.current?.showPicker();

        } catch {

            ref.current?.focus();

        }

    }


    function handleToggle() {

        if (isActive && existingAvailability) {

            setShowToggleModal(true);
            return;

        }


        if (!isActive && existingAvailability) {

            setIsActive(true);

            onSave({
                availabilityId: existingAvailability._id,
                dayOfWeek: day,
                startTime,
                endTime,
                slotDuration,
                isActive: true,
            });

            return;

        }


        const nextState = !isActive;

        setIsActive(nextState);

        if (nextState) {

            if (window.innerWidth < 640) {
                setShowTimeSheet(true);
            } else {
                setIsEditing(true);
            }

        }

    }


    async function handleSave() {

        await onSave({
            availabilityId: existingAvailability?._id,
            dayOfWeek: day,
            startTime,
            endTime,
            slotDuration,
            isActive,
        });

        setIsEditing(false);

    }


    return (
        <>
            <div className={`${!isLast ? "border-b border-black/[0.06]" : ""}`}>


                {/* DAY SUMMARY */}

                <div className="flex items-center gap-3 sm:gap-5 px-1 sm:px-6 py-4 sm:py-5">


                    {/* DAY */}

                    <div className="w-[78px] sm:w-[120px] shrink-0">

                        <p className="text-sm sm:text-base font-semibold">
                            {day}
                        </p>

                        <p className={`mt-1 text-[10px] sm:text-xs font-semibold ${isActive ? "text-[#659423]" : "text-gray-400"}`}>
                            {isActive ? "Available" : "Unavailable"}
                        </p>

                    </div>



                    {/* SCHEDULE */}

                    <button
                        type="button"
                        disabled={!isActive}
                        onClick={() => {
                            if (window.innerWidth < 640) {
                                setShowTimeSheet(true);
                            } else {
                                setIsEditing(!isEditing);
                            }
                        }}
                        className="flex-1 min-w-0 text-left disabled:cursor-default"
                    >
                        {isActive ? (

                            <div className="flex items-center gap-2 sm:gap-3">

                                <Clock3
                                    size={15}
                                    className="text-gray-400 shrink-0"
                                />

                                <span className="text-sm font-medium truncate">
                                    {formatTime(startTime)}

                                    <span className="mx-2 text-gray-300">
                                        —
                                    </span>

                                    {formatTime(endTime)}
                                </span>

                                <ChevronRight
                                    size={15}
                                    className="sm:hidden ml-auto text-gray-300 shrink-0"
                                />

                            </div>

                        ) : (

                            <span className="text-sm text-gray-400">
                                No hours
                            </span>

                        )}
                    </button>



                    {/* EDIT */}

                    {isActive && (

                        <button
                            type="button"
                            onClick={() => setIsEditing(!isEditing)}
                            className={`hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-semibold transition-colors ${isEditing ? "bg-black text-white" : "bg-[#F2F2EF] text-gray-600 hover:text-black"}`}
                        >
                            {isEditing ? "Close" : "Edit"}

                            <ChevronDown
                                size={14}
                                className={`transition-transform ${isEditing ? "rotate-180" : ""}`}
                            />
                        </button>

                    )}



                    {/* TOGGLE */}

                    <button
                        type="button"
                        onClick={handleToggle}
                        aria-label={`${isActive ? "Disable" : "Enable"} ${day}`}
                        className={`relative w-12 h-7 rounded-full shrink-0 transition-colors ${isActive ? "bg-black" : "bg-gray-200"}`}
                    >
                        <span className={`absolute top-1 w-5 h-5 rounded-full transition-all ${isActive ? "left-6 bg-[#C7F36B]" : "left-1 bg-white shadow-sm"}`}></span>
                    </button>

                </div>



                {/* EDITOR */}

                {isActive && isEditing && (
                    <div className="hidden sm:block px-1 sm:px-6 pb-5">

                        <div className="bg-[#F5F5F2] rounded-[20px] p-3 sm:p-4">

                            <div className="grid grid-cols-2 gap-2.5">


                                {/* START */}

                                <TimeControl
                                    label="From"
                                    value={startTime}
                                    inputRef={startRef}
                                    onClick={() => openPicker(startRef)}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />


                                {/* END */}

                                <TimeControl
                                    label="To"
                                    value={endTime}
                                    inputRef={endRef}
                                    onClick={() => openPicker(endRef)}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />

                            </div>


                            <div className="mt-3 flex items-center justify-between gap-3">

                                <span className="text-xs font-medium text-gray-500">
                                    {slotDuration} min slots
                                </span>


                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="h-10 px-4 rounded-xl bg-black text-white flex items-center gap-2 text-xs font-semibold hover:bg-black/85 active:scale-[0.98] transition-all"
                                >
                                    <Check size={15} />

                                    {hasAvailability
                                        ? "Save changes"
                                        : "Add day"}
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

            <AvailabilityTimeSheet
                open={showTimeSheet}
                day={day}
                startTime={startTime}
                endTime={endTime}
                slotDuration={slotDuration}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                hasAvailability={hasAvailability}
                onClose={() => setShowTimeSheet(false)}
                onSave={async () => {

                    await onSave({
                        availabilityId: existingAvailability?._id,
                        dayOfWeek: day,
                        startTime,
                        endTime,
                        slotDuration,
                        isActive,
                    });

                    setShowTimeSheet(false);

                }}
            />

            <AvailabilityToggleModal
                open={showToggleModal}
                day={day}
                onClose={() => setShowToggleModal(false)}
                onConfirm={() => {

                    setIsActive(false);

                    onSave({
                        availabilityId: existingAvailability?._id,
                        dayOfWeek: day,
                        startTime,
                        endTime,
                        slotDuration,
                        isActive: false,
                    });

                    setShowToggleModal(false);

                }}
            />

        </>
    );
}



function TimeControl({
    label,
    value,
    inputRef,
    onClick,
    onChange,
}) {

    return (
        <button
            type="button"
            onClick={onClick}
            className="relative min-w-0 bg-white border border-black/[0.06] rounded-[15px] p-3 text-left hover:border-black/15 transition-colors"
        >

            <span className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400">
                {label}
            </span>

            <span className="block mt-1 text-sm font-semibold">
                {formatTime(value)}
            </span>


            <input
                ref={inputRef}
                type="time"
                value={value}
                onChange={onChange}
                className="absolute w-px h-px opacity-0 pointer-events-none"
                tabIndex={-1}
            />

        </button>
    );
}



function formatTime(time) {

    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}