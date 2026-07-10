import {
    Calendar,
    Clock,
    Trash2
} from "lucide-react";
import {
    formatDisplayDate
} from "../../utils/date";

export default function BlockedSlotCard({
    slot,
    onDelete
}) {

    const formattedDate =
        formatDisplayDate(
            slot.date
        );


    console.log(slot.date);
    console.log(
        formatDisplayDate(slot.date)
    );

    return (
        <div
            className="
                bg-white
                border
                border-gray-200
                rounded-3xl
                p-5
            "
        >

            <div
                className="
                    flex
                    justify-between
                    items-start
                "
            >

                <div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-gray-700
                        "
                    >
                        <Calendar
                            size={16}
                        />

                        <span>
                            {formattedDate}
                        </span>
                    </div>

                    <div
                        className="
                            mt-2
                            flex
                            items-center
                            gap-2
                            text-gray-600
                        "
                    >
                        <Clock
                            size={16}
                        />

                        <span>
                            {
                                slot.startTime
                            }
                            {" - "}
                            {
                                slot.endTime
                            }
                        </span>
                    </div>

                    {
                        slot.reason && (
                            <p
                                className="
                                    mt-3
                                    text-sm
                                    text-gray-500
                                "
                            >
                                {slot.reason}
                            </p>
                        )
                    }

                </div>

                <button
                    onClick={() =>
                        onDelete(
                            slot._id
                        )
                    }
                    className="
                        h-10
                        w-10
                        rounded-xl
                        border
                        border-gray-200
                        flex
                        items-center
                        justify-center
                        hover:bg-red-50
                    "
                >
                    <Trash2
                        size={16}
                    />
                </button>

            </div>

        </div>
    );
}