import {
    Clock3,
    Sunrise,
    Sun,
    Moon,
} from "lucide-react";

import {
    formatTime12Hour,
} from "../../utils/time";


export default function TimeSlots({
    slots,
    selectedSlot,
    setSelectedSlot,
    selectedDate,
}) {

    const availableSlots =
        slots.filter(
            slot => !slot.booked
        );


    const groups = {
        Morning: [],
        Afternoon: [],
        Evening: [],
    };


    availableSlots.forEach(
        (slot) => {

            const hour =
                Number(
                    slot.start.split(":")[0]
                );


            if (hour < 12) {

                groups.Morning.push(slot);

            } else if (hour < 17) {

                groups.Afternoon.push(slot);

            } else {

                groups.Evening.push(slot);

            }

        }
    );


    return (
        <section className="lg:bg-white lg:border lg:border-black/[0.06] lg:rounded-[26px] lg:p-6">


            {/* HEADER */}

            <div className="flex items-center justify-between px-1 lg:px-0">

                <div>

                    <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                        Step 02
                    </p>


                    <h2 className="mt-1 text-[18px] lg:text-xl font-bold tracking-[-0.03em]">
                        Select a time
                    </h2>

                </div>


                <div className="hidden lg:flex w-10 h-10 rounded-[13px] bg-[#EDF8D8] items-center justify-center">
                    <Clock3 size={17} />
                </div>

            </div>



            {/* NO DATE SELECTED */}

            {!selectedDate ? (

                <div className="mt-4 min-h-[110px] lg:min-h-[130px] rounded-[18px] bg-white border border-black/[0.06] lg:bg-[#F7F7F4] lg:border-0 flex flex-col items-center justify-center px-5 text-center">

                    <div className="w-9 h-9 rounded-[12px] bg-[#EDF8D8] flex items-center justify-center">
                        <Clock3 size={15} />
                    </div>


                    <p className="mt-2.5 text-xs lg:text-sm font-medium text-gray-400">
                        Select a date to view available times
                    </p>

                </div>

            ) : availableSlots.length === 0 ? (

                <div className="mt-4 min-h-[110px] lg:min-h-[130px] rounded-[18px] bg-white border border-black/[0.06] lg:bg-[#F7F7F4] lg:border-0 flex flex-col items-center justify-center px-5 text-center">

                    <div className="w-9 h-9 rounded-[12px] bg-[#F3F3F0] flex items-center justify-center">
                        <Clock3 size={15} />
                    </div>


                    <p className="mt-2.5 text-xs lg:text-sm font-medium text-gray-400">
                        No available times for this date
                    </p>

                </div>

            ) : (

                <div className="mt-5 space-y-6">

                    {Object.entries(groups).map(
                        ([period, periodSlots]) => {

                            if (
                                !periodSlots.length
                            ) {
                                return null;
                            }


                            return (

                                <TimePeriod
                                    key={period}
                                    period={period}
                                    slots={periodSlots}
                                    selectedSlot={selectedSlot}
                                    setSelectedSlot={setSelectedSlot}
                                />

                            );

                        }
                    )}

                </div>

            )}

        </section>
    );
}



function TimePeriod({
    period,
    slots,
    selectedSlot,
    setSelectedSlot,
}) {

    const PeriodIcon =
        period === "Morning"
            ? Sunrise
            : period === "Afternoon"
                ? Sun
                : Moon;


    return (
        <div>


            {/* PERIOD HEADER */}

            <div className="mb-2.5 flex items-center gap-2 px-1 lg:px-0">

                <PeriodIcon
                    size={13}
                    className="text-gray-400"
                />


                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                    {period}
                </p>

            </div>



            {/* SLOT GRID */}

            <div className="grid grid-cols-2 min-[430px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">

                {slots.map((slot) => {

                    const selected =
                        selectedSlot?.start ===
                            slot.start &&

                        selectedSlot?.end ===
                            slot.end;


                    return (

                        <button
                            key={`${slot.start}-${slot.end}`}
                            type="button"
                            onClick={() =>
                                setSelectedSlot(slot)
                            }
                            className={`relative h-[46px] sm:h-[50px] lg:h-[52px] rounded-[13px] lg:rounded-[14px] px-2 flex items-center justify-center transition-all active:scale-[0.97] ${selected ? "bg-black text-white shadow-sm" : "bg-white border border-black/[0.07] text-black hover:bg-[#F5F5F2]"}`}
                        >


                            <span className="text-[13px] sm:text-sm font-bold whitespace-nowrap">
                                {formatTime12Hour(
                                    slot.start
                                )}
                            </span>


                            {selected && (

                                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#C7F36B]"></span>

                            )}

                        </button>

                    );

                })}

            </div>

        </div>
    );
}