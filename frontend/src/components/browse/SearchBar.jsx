import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar({search, setSearch}) {
    return (
        <section className="mb-8">
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search by profession or specialization..."
                        className=" w-full h-14 rounded-2xl border border-gray-200 pl-14 pr-4 outline-none focus:border-black "
                    />
                </div>

                <button
                    className="md:flex hidden px-6 rounded-2xl border border-gray-200 items-center gap-3 hover:bg-gray-50 "
                >
                    <SlidersHorizontal size={18} />
                    Filters
                </button>
            </div>
        </section>
    );
}