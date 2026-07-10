export default function CancelAppointmentModal({
    open,
    onClose,
    onConfirm,
}) {
    if (!open) return null;

    return (
        <div
            onClick={onClose}
            className=" fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4 "
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                className=" bg-white rounded-[28px] p-8 max-w-md w-full "
            >
                <h2 className="text-2xl font-bold">
                    Cancel Appointment?
                </h2>

                <p className="text-gray-500 mt-3">
                    Are you sure you want to cancel
                    this appointment?
                </p>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className=" flex-1 h-12 border border-gray-200 rounded-xl "
                    >
                        Keep Booking
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex-1 h-12 bg-red-600 text-white rounded-xl "
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}