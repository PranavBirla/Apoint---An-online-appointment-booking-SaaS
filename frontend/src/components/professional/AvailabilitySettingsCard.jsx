import { Clock3 } from "lucide-react";


export default function AvailabilitySettingsCard({
    slotDuration,
    setSlotDuration,
}) {

    const options = [15, 30, 45, 60];


    return (
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-black/[0.06] rounded-[22px] sm:rounded-[24px] p-4 sm:px-5 sm:py-4">

            <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-[13px] bg-black text-white flex items-center justify-center shrink-0">
                    <Clock3 size={17} />
                </div>

                <div>
                    <h3 className="text-sm font-semibold">
                        Appointment length
                    </h3>

                    <p className="hidden sm:block mt-0.5 text-xs text-gray-400">
                        Default duration
                    </p>
                </div>

            </div>


            <div className="grid grid-cols-4 gap-1.5 bg-[#F2F2EF] rounded-[16px] p-1.5">

                {options.map((option) => (

                    <button
                        key={option}
                        type="button"
                        onClick={() => setSlotDuration(option)}
                        className={`h-10 px-3 sm:px-4 rounded-[11px] text-xs sm:text-sm font-semibold transition-all ${slotDuration === option ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-black"}`}
                    >
                        {option}m
                    </button>

                ))}

            </div>

        </section>
    );
}