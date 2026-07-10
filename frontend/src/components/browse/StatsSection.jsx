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
        <section className="mb-8 hidden lg:block">
            <div className="md:rounded-none rounded-sm">
                <div className="grid md:grid-cols-3 rounded-xl overflow-hidden bg-[url('https://img.magnific.com/free-vector/gradient-blur-pink-blue-abstract-background_53876-117324.jpg?semt=ais_hybrid&w=740&q=80')] ">
                    {stats.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className="md:p-8 p-2 flex items-center gap-5 border-r last:border-r-0 border-gray-200"
                            >
                                <div className="md:w-14 md:h-14 w-8 h-8 rounded-2xl bg-gray-100 flex items-center justify-center">
                                    <Icon size={24} />
                                </div>

                                <div>
                                    <h3 className="md:text-4xl text-xl md:font-bold font-semibold">
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
            </div>
        </section>
    );
}