export default function WeekCalendar({
    availableDays,
    selectedDate,
    setSelectedDate,
}) {
    const dates = Array.from(
        { length: 7 },
        (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return date;
        }
    );

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
            <h2 className="text-2xl font-semibold mb-6">
                Select Date
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {dates.map((date) => {
                    const dayName =
                        date.toLocaleDateString(
                            "en-US",
                            {
                                weekday: "long",
                            }
                        );

                    const isAvailable =
                        availableDays.includes(dayName);

                    const isSelected =
                        selectedDate &&
                        selectedDate.toDateString() ===
                        date.toDateString();

                    return (
                        <button
                            key={date}
                            disabled={!isAvailable}
                            onClick={() =>
                                setSelectedDate(date)
                            }
                            className={`
                  h-28
                  rounded-3xl
                  border
                  transition-all
  
                  ${isSelected
                                    ? "bg-black text-white border-black"
                                    : "bg-white border-gray-200"
                                }
  
                  ${!isAvailable
                                    ? "opacity-30 cursor-not-allowed"
                                    : "hover:border-black"
                                }
                `}
                        >
                            <div className="text-sm">
                                {date.toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "short",
                                    }
                                )}
                            </div>

                            <div className="text-3xl font-bold mt-2">
                                {date.getDate()}
                            </div>

                            <div className="text-xs mt-2">
                                {date.toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                    }
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}