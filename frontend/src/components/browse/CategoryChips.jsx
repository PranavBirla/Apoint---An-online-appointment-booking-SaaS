export default function CategoryChips({
    profession,
    setProfession
}) {
    const categories = [
        { label: "All", value: "" },
        { label: "Doctors", value: "Doctor" },
        { label: "Dentists", value: "Dentist" },
        { label: "Lawyers", value: "Lawyer" },
        { label: "Consultants", value: "Consultant" },
        { label: "Therapists", value: "Therapist" }
    ];

    return (
        <section className="mb-8">
            <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
                {categories.map((category) => {
                    const isActive = profession === category.value;

                    return (
                        <button
                            key={category.value || "all"}
                            type="button"
                            onClick={() => setProfession(category.value)}
                            className={`h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-all duration-200
                                ${isActive
                                    ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950"
                                }
                            `}
                        >
                            {category.label}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
