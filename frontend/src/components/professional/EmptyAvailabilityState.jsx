import { CalendarPlus2 } from "lucide-react";


export default function EmptyAvailabilityState() {

    return (
        <div className="flex items-center gap-3 bg-black text-white rounded-[20px] px-4 py-4 sm:px-5">

            <div className="w-10 h-10 rounded-[13px] bg-[#C7F36B] text-black flex items-center justify-center shrink-0">
                <CalendarPlus2 size={17} />
            </div>

            <p className="text-sm font-medium">
                Turn on a day below to start accepting bookings.
            </p>

        </div>
    );
}