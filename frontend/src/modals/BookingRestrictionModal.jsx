import {
    X,
    Calendar,
    AlertCircle
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function BookingRestrictionModal({
    isOpen,
    onClose,
    type
}) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const content = {
        maxBookings: {
            title: "Booking Limit Reached",
            description:
                "You currently have 3 active appointments. Complete or cancel one of your existing appointments before creating a new booking.",
            buttonText:
                "View My Appointments",
        },

        existingAppointment: {
            title:
                "Existing Appointment Found",
            description:
                "You already have an active appointment with this professional. Please complete or cancel your current booking before booking another slot.",
            buttonText:
                "View My Appointments",
        }
    };

    const selected =
        content[type];

    return (
        <div
            className="
                fixed
                inset-0
                z-[999]
                bg-black/40
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
                    w-full
                    max-w-md
                    bg-white
                    rounded-[32px]
                    p-8
                    shadow-xl
                "
            >
                <div className="flex justify-between items-start">

                    <div
                        className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <AlertCircle
                            size={24}
                        />
                    </div>

                    <button
                        onClick={onClose}
                        className="
                            w-10
                            h-10
                            rounded-xl
                            hover:bg-gray-100
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <X size={18} />
                    </button>

                </div>

                <h2
                    className="
                        mt-6
                        text-2xl
                        font-bold
                    "
                >
                    {selected.title}
                </h2>

                <p
                    className="
                        mt-3
                        text-gray-500
                        leading-relaxed
                    "
                >
                    {
                        selected.description
                    }
                </p>

                <button
                    onClick={() => {
                        navigate(
                            "/appointments"
                        );
                    }}
                    className="
                        mt-8
                        w-full
                        h-12
                        bg-black
                        text-white
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <Calendar
                        size={16}
                    />
                    {
                        selected.buttonText
                    }
                </button>

            </div>
        </div>
    );
}