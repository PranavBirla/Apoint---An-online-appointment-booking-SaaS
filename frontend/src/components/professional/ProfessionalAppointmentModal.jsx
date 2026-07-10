import {
    X,
    UserRound,
    Mail,
    CalendarDays,
    Clock3,
    Check,
    CheckCheck,
} from "lucide-react";


export default function ProfessionalAppointmentModal({
    appointment,
    onClose,
    onConfirm,
    onComplete,
}) {

    if (!appointment) return null;


    const statusConfig = {
        pending: {
            dot: "bg-[#F2C94C]",
            text: "text-[#8A6A00]",
            bg: "bg-[#FFF8D9]",
        },

        confirmed: {
            dot: "bg-[#92C83E]",
            text: "text-[#507A16]",
            bg: "bg-[#EDF8DC]",
        },

        completed: {
            dot: "bg-[#7BA7E8]",
            text: "text-[#426A9E]",
            bg: "bg-[#EAF2FC]",
        },

        cancelled: {
            dot: "bg-[#E97878]",
            text: "text-[#A33D3D]",
            bg: "bg-[#FCEAEA]",
        },
    };


    const status =
        statusConfig[appointment.status] ||
        statusConfig.pending;


    const date = new Date(appointment.appointmentDate);


    const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });


    const dayName = date.toLocaleDateString("en-US", {
        weekday: "long",
    });


    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/45 backdrop-blur-[2px] sm:p-4"
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full sm:max-w-[560px] bg-[#FAFAF7] rounded-t-[30px] sm:rounded-[30px] overflow-hidden shadow-2xl"
            >


                {/* MOBILE DRAG HANDLE */}

                <div className="sm:hidden flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-black/15"></div>
                </div>



                {/* HEADER */}

                <div className="relative overflow-hidden bg-[#C7F36B] px-5 pt-5 pb-6 sm:p-7">

                    <div className="absolute -top-20 -right-16 w-52 h-52 rounded-full border-[40px] border-black/[0.04] pointer-events-none"></div>


                    <div className="relative z-10">

                        <div className="flex items-start justify-between gap-4">

                            <div className="flex items-center gap-3 min-w-0">

                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[16px] bg-black text-white flex items-center justify-center shrink-0">
                                    <UserRound size={21} />
                                </div>


                                <div className="min-w-0">

                                    <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.03em] truncate">
                                        {appointment.clientName}
                                    </h2>


                                    <div className={`inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-full ${status.bg}`}>

                                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>

                                        <span className={`text-[11px] font-semibold capitalize ${status.text}`}>
                                            {appointment.status}
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close appointment details"
                                className="w-9 h-9 rounded-full bg-black/[0.08] flex items-center justify-center hover:bg-black hover:text-white transition-colors shrink-0"
                            >
                                <X size={18} />
                            </button>

                        </div>

                    </div>

                </div>



                {/* DETAILS */}

                <div className="p-4 sm:p-6">


                    {/* DATE + TIME */}

                    <div className="grid grid-cols-2 gap-2.5">

                        <InfoBlock
                            icon={CalendarDays}
                            label={dayName}
                            value={formattedDate}
                        />

                        <InfoBlock
                            icon={Clock3}
                            label="Time"
                            value={`${formatTime(appointment.startTime)} – ${formatTime(appointment.endTime)}`}
                        />

                    </div>



                    {/* EMAIL */}

                    <div className="mt-2.5 flex items-center gap-3 bg-white rounded-[16px] px-4 py-3.5 border border-black/[0.055]">

                        <div className="w-9 h-9 rounded-xl bg-[#F2F2EF] flex items-center justify-center shrink-0">
                            <Mail size={16} />
                        </div>

                        <p className="flex-1 min-w-0 text-sm font-medium truncate">
                            {appointment.clientEmail}
                        </p>

                    </div>



                    {/* ACTION */}

                    {appointment.status === "pending" && (

                        <button
                            type="button"
                            onClick={() => onConfirm(appointment)}
                            className="w-full mt-4 h-13 min-h-[52px] rounded-[15px] bg-black text-white flex items-center justify-center gap-2 text-sm font-semibold hover:bg-black/85 active:scale-[0.99] transition-all"
                        >
                            <Check size={18} />
                            Confirm appointment
                        </button>

                    )}


                    {appointment.status === "confirmed" && (

                        <button
                            type="button"
                            onClick={() => onComplete(appointment)}
                            className="w-full mt-4 h-13 min-h-[52px] rounded-[15px] bg-black text-white flex items-center justify-center gap-2 text-sm font-semibold hover:bg-black/85 active:scale-[0.99] transition-all"
                        >
                            <CheckCheck size={18} />
                            Mark as completed
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
}



function InfoBlock({
    icon: Icon,
    label,
    value,
}) {

    return (
        <div className="min-w-0 bg-white border border-black/[0.055] rounded-[18px] p-3.5 sm:p-4">

            <div className="w-8 h-8 rounded-[10px] bg-[#C7F36B] flex items-center justify-center">
                <Icon size={15} />
            </div>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400 truncate">
                {label}
            </p>

            <p className="mt-1 text-xs sm:text-sm font-semibold truncate">
                {value}
            </p>

        </div>
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