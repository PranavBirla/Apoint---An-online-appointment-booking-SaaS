import {
    CalendarDays,
} from "lucide-react";


export default function WeekCalendar({
    availableDays,
    selectedDate,
    setSelectedDate,
}) {

    const dates = getUpcomingDates(14);


    return (
        <section className="bg-white border border-black/[0.06] rounded-[22px] lg:rounded-[26px] p-4 lg:p-6">


            <div className="flex items-center justify-between gap-4">

                <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                        Step 01
                    </p>

                    <h2 className="mt-1 text-lg lg:text-xl font-bold tracking-[-0.03em]">
                        Choose a day
                    </h2>

                </div>


                <div className="w-10 h-10 rounded-[13px] bg-[#EDF8D8] flex items-center justify-center">
                    <CalendarDays size={17} />
                </div>

            </div>



            <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">

                {dates.map((date) => {

                    const dayName =
                        date.toLocaleDateString(
                            "en-US",
                            {
                                weekday: "long",
                            }
                        );


                    const available =
                        availableDays.includes(dayName);


                    const selected =
                        selectedDate &&
                        isSameDay(
                            selectedDate,
                            date
                        );


                    return (

                        <button
                            key={date.toISOString()}
                            type="button"
                            disabled={!available}
                            onClick={() =>
                                setSelectedDate(date)
                            }
                            className={`w-[64px] h-[76px] lg:w-[78px] lg:h-[88px] rounded-[17px] shrink-0 flex flex-col items-center justify-center transition-all active:scale-[0.97] ${selected ? "bg-black text-white shadow-sm" : available ? "bg-[#F5F5F2] text-black hover:bg-[#ECECE8]" : "bg-[#FAFAF7] text-gray-300 cursor-not-allowed"}`}
                        >

                            <span className={`text-[10px] font-bold uppercase tracking-[0.08em] ${selected ? "text-white/55" : ""}`}>
                                {date.toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "short",
                                    }
                                )}
                            </span>


                            <span className="mt-1 text-xl lg:text-2xl font-bold tracking-[-0.04em]">
                                {date.getDate()}
                            </span>


                            {available && (

                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${selected ? "bg-[#C7F36B]" : "bg-[#92C83E]"}`}></span>

                            )}

                        </button>

                    );

                })}

            </div>

        </section>
    );
}



function getUpcomingDates(numberOfDays) {

    const dates = [];

    const today = new Date();

    today.setHours(0, 0, 0, 0);


    for (let i = 0; i < numberOfDays; i++) {

        const date = new Date(today);

        date.setDate(today.getDate() + i);

        dates.push(date);

    }


    return dates;
}



function isSameDay(first, second) {

    return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
    );
}