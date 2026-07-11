import {
    X,
    CalendarDays,
    Clock3,
    IndianRupee,
    ShieldCheck,
    LoaderCircle,
    ArrowRight,
} from "lucide-react";

import {
    useEffect,
} from "react";

import {
    formatBookingDate,
    formatTimeRange,
} from "../utils/time";


export default function BookingConfirmationModal({
    open,
    professional,
    selectedDate,
    selectedSlot,
    loading,
    onClose,
    onConfirm,
}) {


    /* ===================================================== */
    /* LOCK BODY SCROLL */
    /* ===================================================== */

    useEffect(() => {

        if (!open) return;


        const previousOverflow =
            document.body.style.overflow;


        document.body.style.overflow =
            "hidden";


        return () => {

            document.body.style.overflow =
                previousOverflow;

        };

    }, [open]);



    /* ===================================================== */
    /* ESCAPE KEY */
    /* ===================================================== */

    useEffect(() => {

        if (!open) return;


        function handleEscape(event) {

            if (
                event.key === "Escape" &&
                !loading
            ) {

                onClose();

            }

        }


        window.addEventListener(
            "keydown",
            handleEscape
        );


        return () => {

            window.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, [
        open,
        loading,
        onClose,
    ]);



    if (
        !open ||
        !selectedDate ||
        !selectedSlot
    ) {

        return null;

    }


    const professionalName =
        professional?.userId?.username ||
        "Professional";


    return (

        <div className="fixed inset-0 z-[100] flex items-end sm:items-center sm:justify-center">


            {/* BACKDROP */}

            <button
                type="button"
                aria-label="Close confirmation"
                disabled={loading}
                onClick={onClose}
                className="absolute inset-0 w-full h-full bg-black/45 backdrop-blur-[2px] disabled:cursor-default"
            ></button>



            {/* MODAL / BOTTOM SHEET */}

            <div className="relative z-10 w-full sm:max-w-[480px] bg-[#FAFAF7] rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl">


                {/* MOBILE DRAG HANDLE */}

                <div className="sm:hidden pt-2.5 flex justify-center">

                    <div className="w-10 h-1 rounded-full bg-black/15"></div>

                </div>



                {/* HEADER */}

                <div className="relative overflow-hidden bg-[#C7F36B] px-5 pt-5 pb-6 sm:p-6">


                    <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full border-[38px] border-black/[0.04] pointer-events-none"></div>


                    <div className="relative z-10 flex items-start justify-between gap-4">


                        <div>

                            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/45">
                                Final step
                            </p>


                            <h2 className="mt-1 text-[24px] sm:text-[28px] font-bold tracking-[-0.04em] leading-tight">
                                Confirm booking
                            </h2>


                            <p className="mt-1.5 text-xs sm:text-sm font-medium text-black/55">
                                with {professionalName}
                            </p>

                        </div>



                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            aria-label="Close modal"
                            className="w-9 h-9 rounded-full bg-black/[0.08] flex items-center justify-center shrink-0 active:scale-95 transition-transform disabled:opacity-40"
                        >

                            <X
                                size={17}
                            />

                        </button>

                    </div>

                </div>



                {/* DETAILS */}

                <div className="p-4 sm:p-6">


                    <div className="bg-white border border-black/[0.06] rounded-[20px] overflow-hidden">


                        <ConfirmationRow
                            icon={CalendarDays}
                            label="Date"
                            value={
                                formatBookingDate(
                                    selectedDate
                                )
                            }
                        />


                        <ConfirmationRow
                            icon={Clock3}
                            label="Time"
                            value={
                                formatTimeRange(
                                    selectedSlot.start,
                                    selectedSlot.end
                                )
                            }
                        />


                        <ConfirmationRow
                            icon={IndianRupee}
                            label="Consultation"
                            value={`₹${professional?.consultationFee || 0}`}
                        />

                    </div>



                    {/* TRUST NOTE */}

                    <div className="mt-3 flex items-center gap-2.5 px-1">

                        <ShieldCheck
                            size={15}
                            className="text-gray-400 shrink-0"
                        />


                        <p className="text-[11px] sm:text-xs text-gray-400">
                            Review the details before confirming.
                        </p>

                    </div>



                    {/* ACTIONS */}

                    <div className="mt-5 flex gap-2.5">


                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="h-[52px] px-5 rounded-[15px] bg-[#EFEFEB] text-black text-sm font-bold active:scale-[0.98] transition-transform disabled:opacity-40"
                        >
                            Cancel
                        </button>



                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 h-[52px] px-4 rounded-[15px] bg-black text-white flex items-center justify-center gap-2 text-sm font-bold active:scale-[0.98] transition-transform disabled:opacity-70"
                        >

                            {loading ? (

                                <>
                                    <LoaderCircle
                                        size={17}
                                        className="animate-spin"
                                    />

                                    Booking...
                                </>

                            ) : (

                                <>
                                    Confirm booking

                                    <ArrowRight
                                        size={16}
                                    />
                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}



function ConfirmationRow({
    icon: Icon,
    label,
    value,
}) {

    return (

        <div className="flex items-center gap-3 p-3.5 sm:p-4 border-b border-black/[0.055] last:border-0">


            <div className="w-10 h-10 rounded-[12px] bg-[#EDF8D8] flex items-center justify-center shrink-0">

                <Icon
                    size={16}
                />

            </div>



            <div className="min-w-0">

                <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-gray-400">
                    {label}
                </p>


                <p className="mt-0.5 text-[13px] sm:text-sm font-bold text-black truncate">
                    {value}
                </p>

            </div>

        </div>
    );
}