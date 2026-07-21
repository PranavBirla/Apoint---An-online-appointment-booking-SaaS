import {
    ChevronRight,
} from "lucide-react";


export default function ProfessionalAppointmentCard({
    appointment,
    onClick,
    isLast,
}) {

    const statusConfig = {
        pending: {
            dot: "bg-[#F2C94C]",
            text: "text-[#8A6A00]",
            label: "Pending",
        },

        confirmed: {
            dot: "bg-[#92C83E]",
            text: "text-[#507A16]",
            label: "Confirmed",
        },

        completed: {
            dot: "bg-[#7BA7E8]",
            text: "text-[#426A9E]",
            label: "Completed",
        },

        cancelled: {
            dot: "bg-[#E97878]",
            text: "text-[#A33D3D]",
            label: "Cancelled",
        },

        rejected: {
            dot: "bg-[#E97878]",
            text: "text-[#A33D3D]",
            label: "Rejected",
        },
    };


    const status =
        statusConfig[appointment.status] ||
        statusConfig.pending;


    const formattedDate = new Date(
        appointment.appointmentDate
    ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });


    return (
        <button
            type="button"
            onClick={onClick}
            className={`group w-full flex items-center gap-3 sm:gap-5 px-1 sm:px-6 py-4 sm:py-5 text-left hover:bg-[#FAFAF7] active:bg-[#F5F5F2] transition-colors ${!isLast ? "border-b border-black/[0.055]" : ""}`}
        >


            {/* TIME */}

            <div className="w-[52px] sm:w-[68px] shrink-0">

                <p className="text-sm sm:text-base font-bold tracking-[-0.02em]">
                    {formatTime(appointment.startTime)}
                </p>

            </div>



            {/* STATUS LINE */}

            <div className="self-stretch flex items-center">

                <span className={`w-2.5 h-2.5 rounded-full ${status.dot}`}></span>

            </div>



            {/* MAIN INFO */}

            <div className="flex-1 min-w-0">

                <p className="text-[15px] sm:text-base font-semibold truncate">
                    {appointment.clientName}
                </p>


                <div className="mt-1 flex items-center gap-2 text-xs">

                    <span className="text-gray-500">
                        {formattedDate}
                    </span>

                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>

                    <span className={`font-medium ${status.text}`}>
                        {status.label}
                    </span>

                </div>

            </div>



            {/* DESKTOP EMAIL */}

            <div className="hidden lg:block w-[230px] min-w-0">

                <p className="text-sm text-gray-500 truncate">
                    {appointment.clientEmail}
                </p>

            </div>



            {/* END TIME */}

            <div className="hidden sm:block w-[110px] text-right">

                <p className="text-xs text-gray-400">
                    Ends
                </p>

                <p className="mt-0.5 text-sm font-medium">
                    {formatTime(appointment.endTime)}
                </p>

            </div>



            <ChevronRight
                size={18}
                className="text-gray-300 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0"
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