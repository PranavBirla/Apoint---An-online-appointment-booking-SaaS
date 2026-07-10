import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CancellationReasonSelector from "../components/appointments/CancellationReasonSelector";
import CancellationWarning from "../components/appointments/CancellationWarning";
import CancellationUnavailable from "../components/appointments/CancellationUnavailable";

import { cancelAppointment } from "../services/appointmentService";

import {
    ArrowLeft,
    Calendar,
    Clock,
} from "lucide-react";

export default function CancelAppointment() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [selectedReason, setSelectedReason] =
        useState("");

    const [additionalDetails, setAdditionalDetails] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [blocked, setBlocked] =
        useState(false);

    const handleSubmit = async () => {

        setError("");

        const finalReason =
            `${selectedReason}${additionalDetails
                ? ` - ${additionalDetails}`
                : ""
            }`;

        try {

            setLoading(true);

            await cancelAppointment(
                id,
                finalReason
            );

            navigate(
                "/appointments"
            );

        } catch (err) {

            const message =
                err?.response?.data?.message ||
                "Something went wrong";

            if (
                message.includes(
                    "within 12 hours"
                )
            ) {
                setBlocked(true);
                return;
            }

            setError(message);

        } finally {

            setLoading(false);

        }
    };

    if (blocked) {
        return (
            <CancellationUnavailable />
        );
    }

    return (
        <div
            className="
                min-h-screen
                bg-[#fafafa]
                pb-32
            "
        >

            {/* Header */}

            <div
                className="
                    sticky
                    top-0
                    bg-[#fafafa]
                    border-b
                    border-gray-200
                    z-20
                "
            >
                <div
                    className="
                        max-w-3xl
                        mx-auto
                        px-4
                        py-4
                        flex
                        items-center
                        gap-3
                    "
                >

                    <button
                        onClick={() =>
                            navigate(-1)
                        }
                        className="
                            w-10
                            h-10
                            rounded-xl
                            border
                            border-gray-200
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <ArrowLeft
                            size={18}
                        />
                    </button>

                    <h1
                        className="
                            text-xl
                            font-semibold
                        "
                    >
                        Cancel Appointment
                    </h1>

                </div>
            </div>

            <div
                className="
                    max-w-3xl
                    mx-auto
                    px-4
                    py-6
                    space-y-6
                "
            >

                {/* Summary */}

                <div
                    className="
                        bg-white
                        border
                        border-gray-200
                        rounded-3xl
                        p-5
                    "
                >

                    <h2
                        className="
                            text-lg
                            font-semibold
                            mb-4
                        "
                    >
                        Appointment Summary
                    </h2>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-gray-600
                            mb-2
                        "
                    >
                        <Calendar
                            size={16}
                        />
                        Appointment
                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-gray-600
                        "
                    >
                        <Clock
                            size={16}
                        />
                        Cancellation Request
                    </div>

                </div>

                {/* Reasons */}

                <div
                    className="
                        bg-white
                        border
                        border-gray-200
                        rounded-3xl
                        p-5
                    "
                >
                    <CancellationReasonSelector
                        selectedReason={
                            selectedReason
                        }
                        setSelectedReason={
                            setSelectedReason
                        }
                    />
                </div>

                {/* Details */}

                <div
                    className="
                        bg-white
                        border
                        border-gray-200
                        rounded-3xl
                        p-5
                    "
                >

                    <h3
                        className="
                            font-semibold
                            mb-3
                        "
                    >
                        Additional Details
                    </h3>

                    <textarea
                        rows={5}
                        value={
                            additionalDetails
                        }
                        onChange={(e) =>
                            setAdditionalDetails(
                                e.target.value
                            )
                        }
                        placeholder="Provide more details..."
                        className="
                            w-full
                            resize-none
                            rounded-2xl
                            border
                            border-gray-200
                            p-4
                            outline-none
                        "
                    />

                </div>

                {/* Warning */}

                <CancellationWarning />

                {/* Error */}

                {
                    error && (
                        <div
                            className="
                                text-red-500
                                text-sm
                            "
                        >
                            {error}
                        </div>
                    )
                }

            </div>

            {/* Sticky CTA */}

            <div
                className="
                    fixed
                    bottom-0
                    left-0
                    right-0
                    bg-white
                    border-t
                    border-gray-200
                    p-4
                "
            >
                <div
                    className="
                        max-w-3xl
                        mx-auto
                    "
                >

                    <button
                        disabled={
                            !selectedReason ||
                            loading
                        }
                        onClick={
                            handleSubmit
                        }
                        className="
                            w-full
                            h-12
                            bg-black
                            text-white
                            rounded-2xl
                            disabled:opacity-50
                        "
                    >
                        {
                            loading
                                ? "Cancelling..."
                                : "Cancel Appointment"
                        }
                    </button>

                </div>
            </div>

        </div>
    );
}