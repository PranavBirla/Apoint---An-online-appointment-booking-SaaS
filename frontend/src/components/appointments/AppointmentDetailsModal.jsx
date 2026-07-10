import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Calendar,
    Clock3,
    Hash,
    X,
    UserRound,
} from "lucide-react";

export default function AppointmentDetailsModal({
    appointment,
    onClose,
    onCancelClick,
}) {

    const navigate = useNavigate();

    useEffect(() => {
        function handleEsc(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener(
            "keydown",
            handleEsc
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleEsc
            );
    }, [onClose]);

    if (!appointment) return null;

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
            className="
        fixed
        inset-0
        bg-black/30
        z-50
        flex
        items-center
        justify-center
        p-4
      "
            onClick={onClose}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                className="
          bg-white
          rounded-[32px]
          w-full
          max-w-xl
          p-8
        "
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold">
                        Appointment Details
                    </h2>

                    <button
                        onClick={onClose}
                    >
                        <X size={26} />
                    </button>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="
                w-16
                h-16
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
              "
                        >
                            <UserRound />
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">
                                {
                                    appointment.professionalName
                                }
                            </h3>

                            <p className="text-gray-500">
                                {appointment.profession}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6 space-y-5">
                        <div className="flex justify-between">
                            <div className="flex gap-3">
                                <Calendar size={20} />
                                <span>Date</span>
                            </div>

                            <span>
                                {new Date(
                                    appointment.appointmentDate
                                ).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex gap-3">
                                <Clock3 size={20} />
                                <span>Start Time</span>
                            </div>

                            <span>
                                {appointment.startTime}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex gap-3">
                                <Clock3 size={20} />
                                <span>End Time</span>
                            </div>

                            <span>
                                {appointment.endTime}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>Status</span>

                            <span
                                className={` px-3 py-1 rounded-xl capitalize ${statusColors[
                                    appointment.status
                                ]
                                    }
                `}
                            >
                                {appointment.status}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex gap-3">
                                <Hash size={20} />
                                <span>Appointment ID</span>
                            </div>

                            <span className="text-sm">
                                {
                                    appointment.appointmentId
                                }
                            </span>
                        </div>
                    </div>

                    {appointment.status !==
                        "cancelled" && (
                            <div className="flex gap-3 mt-8">
                                {appointment.status !== "cancelled" && (
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/appointments/${appointment.appointmentId}/cancel`
                                            )
                                        }
                                        className=" flex-1 h-12 rounded-xl border border-red-200 text-red-600 font-medium "
                                    >
                                        Cancel Appointment
                                    </button>
                                )}

                                <button
                                    onClick={onClose}
                                    className=" flex-1 h-12 rounded-xl bg-black text-white font-medium "
                                >
                                    Close
                                </button>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}