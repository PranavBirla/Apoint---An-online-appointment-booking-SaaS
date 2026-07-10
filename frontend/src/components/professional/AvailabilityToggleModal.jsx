import {
    X,
    CalendarOff,
} from "lucide-react";


export default function AvailabilityToggleModal({
    open,
    day,
    onClose,
    onConfirm,
}) {

    if (!open) return null;


    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[400px] overflow-hidden bg-[#FAFAF7] rounded-[26px] shadow-2xl"
            >


                {/* DECORATION */}

                <div className="absolute -top-16 -right-14 w-40 h-40 rounded-full border-[32px] border-black/[0.025] pointer-events-none"></div>



                {/* CONTENT */}

                <div className="relative z-10 p-5 pb-4">

                    <div className="flex items-start justify-between">

                        <div className="w-11 h-11 rounded-[14px] bg-[#C7F36B] flex items-center justify-center">
                            <CalendarOff size={19} />
                        </div>


                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-black/[0.06] hover:text-black transition-colors"
                        >
                            <X size={17} />
                        </button>

                    </div>


                    <h2 className="mt-5 text-xl font-bold tracking-[-0.025em]">
                        Turn off {day}?
                    </h2>


                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                        Clients won't be able to book new appointments during your {day} hours.
                    </p>

                </div>



                {/* ACTIONS */}

                <div className="grid grid-cols-2 gap-2.5 p-4 pt-2">

                    <button
                        type="button"
                        onClick={onClose}
                        className="h-12 rounded-[14px] bg-white border border-black/[0.07] text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all"
                    >
                        Keep active
                    </button>


                    <button
                        type="button"
                        onClick={onConfirm}
                        className="h-12 rounded-[14px] bg-black text-white text-sm font-semibold hover:bg-black/85 active:scale-[0.98] transition-all"
                    >
                        Turn off
                    </button>

                </div>

            </div>

        </div>
    );
}