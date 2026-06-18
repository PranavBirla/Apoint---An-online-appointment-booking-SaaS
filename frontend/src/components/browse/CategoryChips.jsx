export default function CategoryChips() {
    const categories = [
        "All",
        "Health",
        "Wellness",
        "Therapy",
        "Beauty",
        "Fitness",
        "Nutrition",
    ];

    return (
        <section className="mb-8">
            <div className="flex gap-3 flex-wrap">
                {categories.map((category, index) => (
                    <button
                        key={category}
                        className={`
                px-5
                h-11
                rounded-full
                border
  
                ${index === 0
                                ? "bg-black text-white border-black"
                                : "border-gray-200 bg-white"
                            }
              `}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </section>
    );
}