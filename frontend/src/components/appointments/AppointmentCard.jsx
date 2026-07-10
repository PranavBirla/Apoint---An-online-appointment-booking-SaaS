import {
    ChevronRight,
    Clock3,
} from "lucide-react";

export default function AppointmentCard({
    appointment,
    onClick,
}) {
    const date = new Date(
        appointment.appointmentDate
    );

    const statusColors = {
        confirmed:
            "bg-green-100 text-green-700",

        pending:
            "bg-yellow-100 text-yellow-700",

        completed:
            "bg-blue-100 text-blue-700",

        cancelled:
            "bg-red-100 text-red-700",
    };

    return (
        <div
            onClick={onClick}
            className="
          bg-white
          border
          border-gray-200
          rounded-[28px]
          p-6
          cursor-pointer
          hover:border-gray-300
          transition
        "
        >
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                {/* DATE */}

                <div className="w-[90px] text-center">
                    <h2 className="text-5xl font-bold">
                        {date.getDate()}
                    </h2>

                    <p className="text-gray-500">
                        {date.toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                            }
                        )}
                    </p>

                    <p className="text-gray-500">
                        {date.toLocaleDateString(
                            "en-US",
                            {
                                weekday: "short",
                            }
                        )}
                    </p>
                </div>

                {/* INFO */}

                <div className="flex-1">
                    <h3 className="text-2xl font-semibold">
                        {
                            appointment.professionalName
                        }
                    </h3>

                    <p className="text-gray-500 mt-1">
                        {appointment.profession}
                    </p>

                    <div className="flex items-center gap-2 mt-3 text-gray-600">
                        <Clock3 size={18} />

                        <span>
                            {appointment.startTime}
                            {" - "}
                            {appointment.endTime}
                        </span>
                    </div>
                </div>

                {/* STATUS */}

                <div className="flex items-center gap-4">
                    <span
                        className={`
                px-4
                py-2
                rounded-xl
                text-sm
                capitalize
                ${statusColors[
                            appointment.status
                            ]
                            }
              `}
                    >
                        {appointment.status}
                    </span>

                    <ChevronRight size={22} />
                </div>
            </div>
        </div>
    );
}