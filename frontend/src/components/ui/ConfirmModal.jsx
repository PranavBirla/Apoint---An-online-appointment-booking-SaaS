import { X } from "lucide-react";

export default function ConfirmModal({
    isOpen,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    loadingText = "Processing...",
    loading = false,
    onConfirm,
    onClose,
}) {

    if (!isOpen) return null;

    return (
        <div
            className="
                fixed inset-0
                z-50
                flex items-center justify-center
                bg-black/40
                backdrop-blur-sm
                p-4
            "
        >
            <div
                className="
                    bg-white
                    w-full
                    max-w-md
                    rounded-3xl
                    p-6
                    shadow-xl
                "
            >
                <div
                    className="
                        flex
                        justify-between
                        items-center
                        mb-4
                    "
                >
                    <h2
                        className="
                            text-xl
                            font-semibold
                        "
                    >
                        {title}
                    </h2>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                <p
                    className="
                        text-gray-600
                        leading-relaxed
                    "
                >
                    {description}
                </p>

                <div
                    className="
                        flex
                        gap-3
                        mt-6
                    "
                >
                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="
                            flex-1
                            h-11
                            border
                            border-gray-200
                            rounded-xl
                            disabled:opacity-50
                        "
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onConfirm}
                        className="
                            flex-1
                            h-11
                            bg-black
                            text-white
                            rounded-xl
                            disabled:opacity-50
                        "
                    >
                        {
                            loading
                                ? loadingText
                                : confirmText
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}