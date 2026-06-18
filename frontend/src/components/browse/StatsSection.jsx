import {
    Users,
    BriefcaseBusiness,
    Calendar,
} from "lucide-react";

export default function StatsSection() {
    const stats = [
        {
            icon: Users,
            value: "24",
            label: "Professionals",
            sub: "Available now",
        },
        {
            icon: BriefcaseBusiness,
            value: "12",
            label: "Categories",
            sub: "Different expertise",
        },
        {
            icon: Calendar,
            value: "Today",
            label: "Available",
            sub: "Book instantly",
        },
    ];

    return (
        <section className="mb-8">
            <div className="grid md:grid-cols-3 border border-gray-200 rounded-3xl overflow-hidden">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="p-8 flex items-center gap-5 border-r last:border-r-0 border-gray-200"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                                <Icon size={24} />
                            </div>

                            <div>
                                <h3 className="text-4xl font-bold">
                                    {item.value}
                                </h3>

                                <p className="font-medium">
                                    {item.label}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {item.sub}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}