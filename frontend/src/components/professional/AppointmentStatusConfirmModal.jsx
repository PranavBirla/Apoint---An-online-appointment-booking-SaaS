import {
    X,
    Check,
    CheckCheck,
    XCircle,
} from "lucide-react";


export default function AppointmentStatusConfirmModal({
    open,
    variant,
    title,
    description,
    confirmText,
    onClose,
    onConfirm,
}) {

    if (!open) return null;

    let Icon = Check;
    let iconBg = "bg-[#C7F36B]";

    switch (variant) {

        case "reject":
            Icon = XCircle;
            iconBg = "bg-red-100";
            break;

        case "complete":
            Icon = CheckCheck;
            iconBg = "bg-[#C7F36B]";
            break;

        default:
            Icon = Check;
    }


    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[400px] bg-[#FAFAF7] rounded-[26px] overflow-hidden shadow-2xl"
            >


                {/* TOP */}

                <div className="relative overflow-hidden p-5 pb-4">

                    <div className="absolute -top-16 -right-14 w-40 h-40 rounded-full border-[32px] border-black/[0.025] pointer-events-none"></div>


                    <div className="relative z-10 flex items-start justify-between gap-4">

                        <div className={`w-11 h-11 rounded-[14px] ${iconBg} flex items-center justify-center`}>
                            <Icon size={19} />
                        </div>


                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close confirmation"
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-black/[0.06] hover:text-black transition-colors"
                        >
                            <X size={17} />
                        </button>

                    </div>


                    <h2 className="relative z-10 mt-5 text-xl font-bold tracking-[-0.025em]">
                        {title}
                    </h2>


                    <p className="relative z-10 mt-2 text-sm leading-relaxed text-gray-500">
                        {description}
                    </p>

                </div>



                {/* ACTIONS */}

                <div className="grid grid-cols-2 gap-2.5 p-4 pt-2">

                    <button
                        type="button"
                        onClick={onClose}
                        className="h-12 rounded-[14px] bg-white border border-black/[0.07] text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all"
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        onClick={onConfirm}
                        className="h-12 rounded-[14px] bg-black text-white text-sm font-semibold hover:bg-black/85 active:scale-[0.98] transition-all"
                    >
                        {confirmText}
                    </button>

                </div>

            </div>

        </div>
    );
}