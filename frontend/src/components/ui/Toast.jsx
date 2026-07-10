import {
    CheckCircle2,
    XCircle
} from "lucide-react";

export default function Toast({
    message,
    type = "success",
}) {

    if (!message) return null;

    return (
        <div
            className="
                fixed
                top-6
                right-6
                z-50
                bg-white
                border
                border-gray-200
                rounded-2xl
                px-4
                py-3
                shadow-lg
                flex
                items-center
                gap-3
            "
        >
            {
                type === "success"
                    ? (
                        <CheckCircle2
                            size={18}
                        />
                    )
                    : (
                        <XCircle
                            size={18}
                        />
                    )
            }

            <span>{message}</span>
        </div>
    );
}