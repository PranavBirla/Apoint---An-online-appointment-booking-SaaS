import {
    ArrowRight,
    CalendarDays,
    Clock3,
    IndianRupee,
} from "lucide-react";

import {
    formatBookingDate,
    formatTimeRange,
} from "../../utils/time";


export default function BookingPanel({
    professional,
    selectedDate,
    selectedSlot,
    onContinue,
}) {

    const ready =
        selectedDate &&
        selectedSlot;


    return (
        <>
            {/* MOBILE FIXED BOOKING BAR */}

            <div
                className="
                    lg:hidden
                    fixed
                    left-0
                    right-0
                    bottom-[64px]
                    z-40
                    px-3
                    pb-2
                    pointer-events-none
                "
            >
                <div
                    className="
                        max-w-md
                        mx-auto
                        bg-black
                        text-white
                        rounded-[18px]
                        p-2
                        pl-4
                        shadow-xl
                        pointer-events-auto
                    "
                >
                    {!ready ? (

                        <div className="h-[54px] flex items-center justify-between gap-3">

                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">
                                    Appointment
                                </p>

                                <p className="text-sm font-semibold mt-0.5">
                                    Select date and time
                                </p>
                            </div>

                            <button
                                disabled
                                className="
                                    h-11
                                    px-4
                                    rounded-[13px]
                                    bg-white/10
                                    text-white/30
                                    text-sm
                                    font-semibold
                                "
                            >
                                Continue
                            </button>

                        </div>

                    ) : (

                        <div className="flex items-center justify-between gap-3">

                            <div className="min-w-0">

                                <p className="text-[11px] font-semibold text-white/50 truncate">
                                    {formatBookingDate(selectedDate)}
                                </p>

                                <p className="text-sm font-bold mt-0.5 whitespace-nowrap">
                                    {formatTimeRange(
                                        selectedSlot.start,
                                        selectedSlot.end
                                    )}
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={onContinue}
                                className="
                                    shrink-0
                                    h-[48px]
                                    px-4
                                    rounded-[14px]
                                    bg-[#C7F36B]
                                    text-black
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-bold
                                    active:scale-[0.97]
                                    transition-transform
                                "
                            >
                                Continue

                                <ArrowRight size={16} />
                            </button>

                        </div>

                    )}
                </div>
            </div>



            {/* DESKTOP BOOKING PANEL */}

            <aside className="hidden lg:block lg:sticky lg:top-8">

                <div className="bg-black text-white rounded-[26px] overflow-hidden">

                    <div className="p-5">

                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/35">
                            Your appointment
                        </p>

                        <h2 className="mt-1 text-xl font-bold tracking-[-0.03em]">
                            Booking summary
                        </h2>


                        <div className="mt-5 space-y-1">

                            <SummaryRow
                                icon={CalendarDays}
                                label="Date"
                                value={
                                    selectedDate
                                        ? formatBookingDate(selectedDate)
                                        : "Choose a day"
                                }
                            />

                            <SummaryRow
                                icon={Clock3}
                                label="Time"
                                value={
                                    selectedSlot
                                        ? formatTimeRange(
                                            selectedSlot.start,
                                            selectedSlot.end
                                        )
                                        : "Choose a time"
                                }
                            />

                            <SummaryRow
                                icon={IndianRupee}
                                label="Consultation"
                                value={`₹${professional?.consultationFee || 0}`}
                            />

                        </div>

                    </div>


                    <div className="p-3 pt-0">

                        <button
                            type="button"
                            disabled={!ready}
                            onClick={onContinue}
                            className="
                                w-full
                                h-[52px]
                                rounded-[15px]
                                bg-[#C7F36B]
                                text-black
                                flex
                                items-center
                                justify-between
                                px-4
                                text-sm
                                font-bold
                                disabled:opacity-30
                                disabled:pointer-events-none
                            "
                        >
                            Continue to confirm

                            <ArrowRight size={17} />
                        </button>

                    </div>

                </div>

            </aside>
        </>
    );
}


function SummaryRow({
    icon: Icon,
    label,
    value,
}) {

    return (
        <div className="flex items-center gap-3 py-3 border-b border-white/[0.07] last:border-0">

            <div className="w-9 h-9 rounded-[11px] bg-white/[0.07] flex items-center justify-center shrink-0">
                <Icon size={15} />
            </div>

            <div className="flex-1 min-w-0">

                <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/35">
                    {label}
                </p>

                <p className="mt-0.5 text-sm font-semibold truncate">
                    {value}
                </p>

            </div>

        </div>
    );
}