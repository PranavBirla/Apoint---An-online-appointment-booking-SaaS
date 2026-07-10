export default function CategoryChips({
    profession,
    setProfession,
}) {

    const categories = [
        { label: "All", value: "" },
        { label: "Doctors", value: "Doctor" },
        { label: "Dentists", value: "Dentist" },
        { label: "Lawyers", value: "Lawyer" },
        { label: "Consultants", value: "Consultant" },
        { label: "Therapists", value: "Therapist" },
    ];


    return (
        <section className="mb-7 lg:mb-9">


            <div className="flex items-end justify-between mb-3 px-0.5">

                <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        Explore
                    </p>

                    <h2 className="mt-1 text-xl lg:text-2xl font-bold tracking-[-0.035em]">
                        Browse by category
                    </h2>

                </div>

            </div>



            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide lg:flex-wrap lg:overflow-visible">

                {categories.map((category) => {

                    const isActive =
                        profession === category.value;


                    return (

                        <button
                            key={category.value || "all"}
                            type="button"
                            onClick={() =>
                                setProfession(category.value)
                            }
                            className={`h-11 shrink-0 rounded-[14px] px-4 text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${isActive ? "bg-black text-white shadow-sm" : "bg-white text-gray-500 border border-black/[0.06] hover:text-black hover:border-black/15"}`}
                        >

                            <span className="flex items-center gap-2">

                                {isActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B]"></span>
                                )}

                                {category.label}

                            </span>

                        </button>

                    );

                })}

            </div>

        </section>
    );
}