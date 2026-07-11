import {
    CalendarDays,
    Clock3,
    IndianRupee,
    X,
    Check,
} from "lucide-react";

import {
    formatLongBookingDate,
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

    if (
        !open ||
        !professional ||
        !selectedDate ||
        !selectedSlot
    ) {
        return null;
    }


    const name =
        professional.userId?.username ||
        "Professional";


    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-[2px] sm:p-4"
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full sm:max-w-[430px] max-h-[92dvh] overflow-y-auto bg-[#FAFAF7] rounded-t-[30px] sm:rounded-[28px] shadow-2xl"
            >


                <div className="sm:hidden flex justify-center pt-3">
                    <div className="w-10 h-1 rounded-full bg-black/15"></div>
                </div>



                <div className="p-5">


                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-gray-400">
                                Final step
                            </p>

                            <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em]">
                                Confirm booking
                            </h2>

                        </div>


                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="w-9 h-9 rounded-full bg-black/[0.05] flex items-center justify-center"
                        >
                            <X size={17} />
                        </button>

                    </div>



                    <div className="mt-6 flex items-center gap-3">

                        {professional.profileImage ? (

                            <img
                                src={professional.profileImage}
                                alt={name}
                                className="w-14 h-14 rounded-[16px] object-cover bg-gray-100"
                            />

                        ) : (

                            <div className="w-14 h-14 rounded-[16px] bg-[#C7F36B] flex items-center justify-center text-lg font-bold">
                                {name[0]?.toUpperCase()}
                            </div>

                        )}


                        <div className="min-w-0">

                            <h3 className="font-bold truncate">
                                {name}
                            </h3>

                            <p className="mt-0.5 text-xs text-gray-500 truncate">
                                {professional.profession}
                                {professional.specialization &&
                                    ` · ${professional.specialization}`
                                }
                            </p>

                        </div>

                    </div>



                    <div className="mt-5 bg-white border border-black/[0.06] rounded-[20px] overflow-hidden">

                        <ConfirmationRow
                            icon={CalendarDays}
                            label="Date"
                            value={formatLongBookingDate(
                                selectedDate
                            )}
                        />

                        <ConfirmationRow
                            icon={Clock3}
                            label="Time"
                            value={formatTimeRange(
                                selectedSlot.start,
                                selectedSlot.end
                            )}
                        />

                        <ConfirmationRow
                            icon={IndianRupee}
                            label="Consultation fee"
                            value={`₹${professional.consultationFee}`}
                            last
                        />

                    </div>



                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="mt-5 w-full h-[54px] rounded-[16px] bg-black text-white flex items-center justify-center gap-2 text-sm font-bold active:scale-[0.99] transition-all disabled:opacity-50"
                    >

                        <Check size={17} />

                        {loading
                            ? "Booking appointment..."
                            : "Confirm appointment"
                        }

                    </button>


                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="mt-2 w-full h-11 text-sm font-semibold text-gray-400"
                    >
                        Go back
                    </button>

                </div>

            </div>

        </div>
    );
}



function ConfirmationRow({
    icon: Icon,
    label,
    value,
    last = false,
}) {

    return (
        <div className={`flex items-center gap-3 px-4 py-3.5 ${!last ? "border-b border-black/[0.06]" : ""}`}>

            <div className="w-9 h-9 rounded-[11px] bg-[#EDF8D8] flex items-center justify-center shrink-0">
                <Icon size={15} />
            </div>


            <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.09em] text-gray-400">
                    {label}
                </p>

                <p className="mt-0.5 text-sm font-semibold">
                    {value}
                </p>

            </div>

        </div>
    );
}