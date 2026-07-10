import { AlertTriangle } from "lucide-react";

export default function CancellationWarning() {
    return (
        <div
            className="
                border
                border-gray-200
                rounded-3xl
                p-5
                bg-gray-50
            "
        >
            <div className="flex gap-3">
                <AlertTriangle
                    size={20}
                />

                <div>
                    <h3 className="font-semibold">
                        Important Notice
                    </h3>

                    <p
                        className="
                            text-sm
                            text-gray-600
                            mt-2
                            leading-relaxed
                        "
                    >
                        Cancelling appointments
                        may affect the
                        professional's schedule
                        and availability.

                        Please cancel only when
                        necessary.
                    </p>
                </div>
            </div>
        </div>
    );
}