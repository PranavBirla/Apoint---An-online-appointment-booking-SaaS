export default function AppointmentTabs({
    activeTab,
    setActiveTab,
}) {
    const tabs = [
        "all",
        "pending",
        "confirmed",
        "completed",
        "cancelled",
    ];

    return (
        <section className="mb-8 overflow-x-auto">
            <div className="flex gap-8 min-w-max border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() =>
                            setActiveTab(tab)
                        }
                        className={`
                pb-4
                text-lg
                capitalize
                border-b-2
                transition
  
                ${activeTab === tab
                                ? "border-black text-black font-semibold"
                                : "border-transparent text-gray-500"
                            }
              `}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </section>
    );
}