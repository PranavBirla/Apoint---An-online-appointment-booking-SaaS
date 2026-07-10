import {
    Calendar,
    CheckCircle2,
    Clock3,
} from "lucide-react";

export default function RecentActivity() {
    const activity = [
        {
            icon: Calendar,
            text:
                "New appointment received",
        },
        {
            icon: CheckCircle2,
            text:
                "Appointment confirmed",
        },
        {
            icon: Clock3,
            text:
                "Availability updated",
        },
    ];

    return (
        <div
            className="
          bg-white
          border
          border-gray-200
          rounded-[28px]
          p-6
        "
        >
            <h3 className="text-xl font-semibold mb-6">
                Recent Activity
            </h3>

            <div className="space-y-5">
                {activity.map(
                    (item, index) => {
                        const Icon =
                            item.icon;

                        return (
                            <div
                                key={index}
                                className="
                    flex
                    gap-4
                    items-center
                  "
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Icon size={18} />
                                </div>

                                <div>
                                    <p className="font-medium">
                                        {item.text}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Recently
                                    </p>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}