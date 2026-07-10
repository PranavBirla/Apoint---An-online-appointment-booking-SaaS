import { CalendarX2, Trash2 } from "lucide-react";


export default function BlockedSlotsList({ blockedSlots, onDelete }) {

    if (!blockedSlots || blockedSlots.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-11 h-11 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center">
                    <CalendarX2 size={18} className="text-gray-400" />
                </div>

                <p className="mt-3 text-sm font-semibold">
                    No blocked times
                </p>
            </div>
        );
    }


    return (
        <div className="divide-y divide-black/[0.06]">
            {blockedSlots.map((slot) => (
                <BlockedRow key={slot._id} slot={slot} onDelete={onDelete} />
            ))}
        </div>
    );
}


function BlockedRow({ slot, onDelete }) {

    const date = new Date(slot.date);

    const month = date.toLocaleDateString("en-US", {
        month: "short"
    }).toUpperCase();

    const day = date.getDate();


    return (
        <div className="group flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">

            <div className="w-11 h-12 rounded-[13px] bg-white border border-black/[0.06] flex flex-col items-center justify-center shrink-0">
                <span className="text-[9px] font-bold tracking-wide text-gray-400">
                    {month}
                </span>

                <span className="text-base font-bold leading-tight">
                    {day}
                </span>
            </div>


            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">
                    {slot.startTime} — {slot.endTime}
                </p>

                {slot.reason && (
                    <p className="mt-0.5 text-xs text-gray-500 truncate">
                        {slot.reason}
                    </p>
                )}
            </div>


            <button
                type="button"
                onClick={() => onDelete(slot._id)}
                aria-label="Remove blocked time"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0"
            >
                <Trash2 size={16} />
            </button>

        </div>
    );
}