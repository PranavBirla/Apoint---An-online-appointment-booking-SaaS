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
        <section className="lg:bg-white lg:border lg:border-black/[0.06] lg:rounded-[26px] lg:p-6">


            {/* HEADER */}

            <div className="flex items-center justify-between gap-4 px-1 lg:px-0">

                <div>

                    <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                        Step 01
                    </p>


                    <h2 className="mt-1 text-[18px] lg:text-xl font-bold tracking-[-0.03em]">
                        Select a date
                    </h2>

                </div>


                <div className="hidden lg:flex w-10 h-10 rounded-[13px] bg-[#EDF8D8] items-center justify-center">
                    <CalendarDays size={17} />
                </div>

            </div>



            {/* DATE RAIL */}

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide snap-x">

                {dates.map((date) => {

                    const dayName =
                        date.toLocaleDateString(
                            "en-US",
                            {
                                weekday: "long",
                            }
                        );


                    const available =
                        availableDays.includes(
                            dayName
                        );


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
                            className={`w-[58px] h-[68px] sm:w-[64px] sm:h-[76px] lg:w-[78px] lg:h-[88px] rounded-[15px] lg:rounded-[17px] shrink-0 snap-start flex flex-col items-center justify-center transition-all active:scale-[0.97] ${selected ? "bg-black text-white shadow-sm" : available ? "bg-white border border-black/[0.06] text-black hover:bg-[#F5F5F2]" : "bg-black/[0.025] lg:bg-[#FAFAF7] text-gray-300 cursor-not-allowed"}`}
                        >


                            <span className={`text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.06em] ${selected ? "text-white/55" : ""}`}>
                                {date.toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "short",
                                    }
                                )}
                            </span>


                            <span className="mt-0.5 lg:mt-1 text-[18px] lg:text-2xl font-bold tracking-[-0.04em]">
                                {date.getDate()}
                            </span>


                            {available && (

                                <span className={`mt-1 lg:mt-1.5 w-1.5 h-1.5 rounded-full ${selected ? "bg-[#C7F36B]" : "bg-[#92C83E]"}`}></span>

                            )}

                        </button>

                    );

                })}

            </div>



            {/* MOBILE HELP TEXT */}

            <p className="mt-2.5 px-1 text-[10px] text-gray-400 lg:hidden">
                Swipe to explore more available dates
            </p>

        </section>
    );
}



function getUpcomingDates(numberOfDays) {

    const dates = [];

    const today = new Date();

    today.setHours(0, 0, 0, 0);


    for (
        let i = 0;
        i < numberOfDays;
        i++
    ) {

        const date =
            new Date(today);

        date.setDate(
            today.getDate() + i
        );

        dates.push(date);

    }


    return dates;
}



function isSameDay(
    first,
    second,
) {

    return (
        first.getFullYear() ===
            second.getFullYear() &&

        first.getMonth() ===
            second.getMonth() &&

        first.getDate() ===
            second.getDate()
    );
}