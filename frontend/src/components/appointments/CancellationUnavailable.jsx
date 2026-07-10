import {
    ShieldAlert,
} from "lucide-react";

export default function CancellationUnavailable() {
    return (
        <div
            className="
                min-h-[70vh]
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-6
            "
        >
            <div
                className="
                    w-20
                    h-20
                    rounded-full
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                "
            >
                <ShieldAlert
                    size={34}
                />
            </div>

            <h1
                className="
                    mt-6
                    text-2xl
                    font-bold
                "
            >
                Cancellation Unavailable
            </h1>

            <p
                className="
                    mt-3
                    text-gray-500
                    max-w-md
                    leading-relaxed
                "
            >
                This appointment is
                scheduled within the next
                12 hours.

                To protect professionals
                and their schedules,
                cancellations are no
                longer available.
            </p>

            <p
                className="
                    mt-4
                    text-sm
                    text-gray-400
                "
            >
                Please contact the
                professional directly if
                this is an emergency.
            </p>
        </div>
    );
}