import {
    Clock3,
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
        slots.filter(slot => !slot.booked);


    const groups = {
        Morning: [],
        Afternoon: [],
        Evening: [],
    };


    availableSlots.forEach((slot) => {

        const hour =
            Number(slot.start.split(":")[0]);


        if (hour < 12) {
            groups.Morning.push(slot);
        } else if (hour < 17) {
            groups.Afternoon.push(slot);
        } else {
            groups.Evening.push(slot);
        }

    });


    return (
        <section className="bg-white border border-black/[0.06] rounded-[22px] lg:rounded-[26px] p-4 lg:p-6">


            <div className="flex items-center justify-between">

                <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                        Step 02
                    </p>

                    <h2 className="mt-1 text-lg lg:text-xl font-bold tracking-[-0.03em]">
                        Choose a time
                    </h2>

                </div>


                <div className="w-10 h-10 rounded-[13px] bg-[#EDF8D8] flex items-center justify-center">
                    <Clock3 size={17} />
                </div>

            </div>



            {!selectedDate ? (

                <div className="mt-5 min-h-[130px] rounded-[18px] bg-[#F7F7F4] flex items-center justify-center px-5 text-center">

                    <p className="text-sm font-medium text-gray-400">
                        Choose an available day to see appointment times.
                    </p>

                </div>

            ) : availableSlots.length === 0 ? (

                <div className="mt-5 min-h-[130px] rounded-[18px] bg-[#F7F7F4] flex items-center justify-center px-5 text-center">

                    <p className="text-sm font-medium text-gray-400">
                        No appointment times available for this day.
                    </p>

                </div>

            ) : (

                <div className="mt-5 space-y-6">

                    {Object.entries(groups).map(
                        ([period, periodSlots]) => {

                            if (!periodSlots.length) {
                                return null;
                            }


                            return (

                                <div key={period}>

                                    <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                                        {period}
                                    </p>


                                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">

                                        {periodSlots.map(
                                            (slot) => {

                                                const selected =
                                                    selectedSlot?.start === slot.start &&
                                                    selectedSlot?.end === slot.end;


                                                return (

                                                    <button
                                                        key={`${slot.start}-${slot.end}`}
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedSlot(slot)
                                                        }
                                                        className={`min-h-[52px] rounded-[14px] px-2 flex flex-col items-center justify-center transition-all active:scale-[0.97] ${selected ? "bg-black text-white" : "bg-[#F5F5F2] hover:bg-[#ECECE8]"}`}
                                                    >

                                                        <span className="text-xs sm:text-sm font-bold whitespace-nowrap">
                                                            {formatTime12Hour(
                                                                slot.start
                                                            )}
                                                        </span>


                                                        {selected && (

                                                            <span className="mt-0.5 text-[9px] font-medium text-white/50 whitespace-nowrap">
                                                                until{" "}
                                                                {formatTime12Hour(
                                                                    slot.end
                                                                )}
                                                            </span>

                                                        )}

                                                    </button>

                                                );

                                            }
                                        )}

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </section>
    );
}