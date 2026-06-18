import { Clock } from "lucide-react";

export default function TimeSlots({
    slots,
    selectedSlot,
    setSelectedSlot,
}) {
    return (
        <div
            className="
        bg-white
        border
        border-gray-200
        rounded-[28px]
        p-8
      "
        >
            <div className="flex items-center gap-3 mb-6">
                <Clock size={22} />

                <h2 className="text-2xl font-semibold">
                    Available Time Slots
                </h2>
            </div>

            {slots.length === 0 ? (
                <div className="text-gray-500">
                    Select a date first.
                </div>
            ) : (
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {slots.map((slot) => {
                        const isSelected =
                            selectedSlot?.start ===
                            slot.start;

                        return (
                            <button
                                key={slot.start}
                                disabled={slot.booked}
                                onClick={() =>
                                    setSelectedSlot(slot)
                                }
                                className={`
                  p-4
                  rounded-2xl
                  border
                  transition-all

                  ${isSelected
                                        ? "bg-black text-white border-black"
                                        : "bg-white border-gray-200"
                                    }

                  ${slot.booked
                                        ? "opacity-40 cursor-not-allowed"
                                        : "hover:border-black"
                                    }
                `}
                            >
                                <div className="font-medium">
                                    {slot.start}
                                </div>

                                <div className="text-sm mt-1">
                                    {slot.end}
                                </div>

                                {slot.booked && (
                                    <div className="text-xs mt-2">
                                        Booked
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}