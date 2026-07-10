export default function CancellationReasonSelector({
    selectedReason,
    setSelectedReason,
}) {
    const reasons = [
        "Scheduling Conflict",
        "Emergency",
        "Found Another Professional",
        "Booked By Mistake",
        "Other",
    ];

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold">
                Why are you cancelling?
            </h3>

            {reasons.map((reason) => (
                <button
                    key={reason}
                    type="button"
                    onClick={() =>
                        setSelectedReason(reason)
                    }
                    className={`
                        w-full
                        text-left
                        px-4
                        py-4
                        rounded-2xl
                        border
                        transition-all

                        ${selectedReason === reason
                            ? "border-black bg-gray-50"
                            : "border-gray-200 bg-white"
                        }
                    `}
                >
                    {reason}
                </button>
            ))}
        </div>
    );
}