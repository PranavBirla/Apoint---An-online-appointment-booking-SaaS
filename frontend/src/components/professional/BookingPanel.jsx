import Button from "../ui/Button";

export default function BookingPanel({
    professional,
    selectedDate,
    selectedSlot,
    handleBooking,
}) {
    return (
        <div
            className="
        bg-[#fafafa]
        border
        border-gray-200
        rounded-[28px]
        p-8
      "
        >
            <h2 className="text-2xl font-semibold">
                Booking Summary
            </h2>

            <div className="mt-8 space-y-5">
                <div>
                    <p className="text-gray-500 text-sm">
                        Professional
                    </p>

                    <p className="font-medium mt-1">
                        {professional?.userId?.username}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">
                        Date
                    </p>

                    <p className="font-medium mt-1">
                        {selectedDate
                            ? selectedDate.toDateString()
                            : "Select a date"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">
                        Time Slot
                    </p>

                    <p className="font-medium mt-1">
                        {selectedSlot
                            ? `${selectedSlot.start} - ${selectedSlot.end}`
                            : "Select a slot"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">
                        Consultation Fee
                    </p>

                    <p className="font-medium mt-1">
                        ₹
                        {professional?.consultationFee}
                    </p>
                </div>
            </div>

            <Button
                onClick={handleBooking}
                disabled={
                    !selectedDate ||
                    !selectedSlot
                }
                className="
          w-full
          mt-8
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
            >
                Book Appointment
            </Button>
        </div>
    );
}