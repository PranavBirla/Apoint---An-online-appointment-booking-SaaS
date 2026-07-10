import AvailabilityDayCard from "./AvailabilityDayCard";


export default function AvailabilityGrid({
    availability,
    slotDuration,
    onSave,
}) {

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];


    return (
        <div className="bg-white sm:border sm:border-black/[0.06] sm:rounded-[28px] overflow-hidden">

            {days.map((day, index) => {

                const existing = availability.find(
                    item => item.dayOfWeek === day
                );


                return (
                    <AvailabilityDayCard
                        key={day}
                        day={day}
                        existingAvailability={existing}
                        slotDuration={slotDuration}
                        onSave={onSave}
                        isLast={index === days.length - 1}
                    />
                );

            })}

        </div>
    );
}