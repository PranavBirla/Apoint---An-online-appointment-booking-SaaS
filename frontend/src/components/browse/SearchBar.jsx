import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar() {
    return (
        <section className="mb-8">
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        placeholder="Search by name, profession or specialization..."
                        className="
              w-full
              h-14
              rounded-2xl
              border
              border-gray-200
              pl-14
              pr-4
              outline-none
              focus:border-black
            "
                    />
                </div>

                <button
                    className="
            px-6
            rounded-2xl
            border
            border-gray-200
            flex
            items-center
            gap-3
            hover:bg-gray-50
          "
                >
                    <SlidersHorizontal size={18} />
                    Filters
                </button>
            </div>
        </section>
    );
}