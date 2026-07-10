export default function StatsCards({
    appointments = [],
}) {
    const pending =
        appointments.filter(
            (a) => a.status === "pending"
        ).length;

    const confirmed =
        appointments.filter(
            (a) => a.status === "confirmed"
        ).length;

    const completed =
        appointments.filter(
            (a) => a.status === "completed"
        ).length;

    const cards = [
        {
            title: "Total Appointments",
            value: appointments.length,
        },
        {
            title: "Pending",
            value: pending,
        },
        {
            title: "Confirmed",
            value: confirmed,
        },
        {
            title: "Completed",
            value: completed,
        },
    ];

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="
              bg-white
              border
              border-gray-200
              rounded-[28px]
              p-6
            "
                >
                    <p className="text-gray-500 text-sm">
                        {card.title}
                    </p>

                    <h2 className="text-5xl font-bold mt-3">
                        {card.value}
                    </h2>

                    <p className="text-gray-400 mt-4 text-sm">
                        This Month
                    </p>
                </div>
            ))}
        </div>
    );
}