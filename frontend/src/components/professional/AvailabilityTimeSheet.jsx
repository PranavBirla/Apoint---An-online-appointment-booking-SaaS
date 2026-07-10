import { useRef } from "react";
import { X, Clock3, Check } from "lucide-react";


export default function AvailabilityTimeSheet({
    open,
    day,
    startTime,
    endTime,
    slotDuration,
    setStartTime,
    setEndTime,
    onClose,
    onSave,
    hasAvailability,
}) {

    const startRef = useRef(null);
    const endRef = useRef(null);


    if (!open) return null;


    function openPicker(ref) {

        try {
            ref.current?.showPicker();
        } catch {
            ref.current?.focus();
            ref.current?.click();
        }

    }


    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/45 backdrop-blur-[2px] sm:hidden"
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-h-[90dvh] overflow-y-auto bg-[#FAFAF7] rounded-t-[30px] shadow-2xl"
            >

                {/* HANDLE */}

                <div className="flex justify-center pt-3">
                    <div className="w-10 h-1 rounded-full bg-black/15"></div>
                </div>



                {/* HEADER */}

                <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4">

                    <div>

                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                            Working hours
                        </p>

                        <h2 className="mt-1 text-2xl font-bold tracking-[-0.035em]">
                            {day}
                        </h2>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close time editor"
                        className="w-9 h-9 rounded-full bg-black/[0.05] flex items-center justify-center active:bg-black active:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>

                </div>



                {/* CONTENT */}

                <div className="px-4 pb-5">

                    <div className="bg-white border border-black/[0.06] rounded-[22px] overflow-hidden">


                        <MobileTimeControl
                            label="From"
                            value={startTime}
                            inputRef={startRef}
                            onClick={() => openPicker(startRef)}
                            onChange={(e) => setStartTime(e.target.value)}
                        />


                        <div className="mx-4 border-t border-black/[0.06]"></div>


                        <MobileTimeControl
                            label="To"
                            value={endTime}
                            inputRef={endRef}
                            onClick={() => openPicker(endRef)}
                            onChange={(e) => setEndTime(e.target.value)}
                        />

                    </div>



                    {/* SLOT INFO */}

                    <div className="mt-3 flex items-center gap-3 bg-[#C7F36B] rounded-[18px] px-4 py-3.5">

                        <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                            <Clock3 size={16} />
                        </div>

                        <div>

                            <p className="text-sm font-semibold">
                                {slotDuration} minute appointments
                            </p>

                            <p className="mt-0.5 text-[11px] text-black/50">
                                Current appointment length
                            </p>

                        </div>

                    </div>



                    {/* SAVE */}

                    <button
                        type="button"
                        onClick={onSave}
                        className="mt-4 w-full h-[54px] rounded-[16px] bg-black text-white flex items-center justify-center gap-2 text-sm font-semibold active:scale-[0.99] transition-transform"
                    >
                        <Check size={17} />

                        {hasAvailability
                            ? "Save hours"
                            : `Add ${day}`}
                    </button>

                </div>

            </div>

        </div>
    );
}



function MobileTimeControl({
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
            className="relative w-full flex items-center gap-4 px-4 py-4 text-left active:bg-[#FAFAF7] transition-colors"
        >

            <div className="w-11 h-11 rounded-[14px] bg-[#F2F2EF] flex items-center justify-center shrink-0">
                <Clock3 size={17} />
            </div>


            <div className="flex-1">

                <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">
                    {label}
                </span>

                <span className="block mt-1 text-base font-semibold">
                    {formatTime(value)}
                </span>

            </div>


            <span className="text-xs font-semibold text-gray-400">
                Change
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