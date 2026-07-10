import {
    Search,
    X,
    ArrowRight,
} from "lucide-react";


export default function SearchBar({
    search,
    setSearch,
}) {

    return (
        <div className="relative">

            <div className="h-[58px] sm:h-[64px] flex items-center bg-white rounded-[17px] sm:rounded-[20px] shadow-[0_14px_40px_rgba(0,0,0,0.08)] p-1.5">


                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[13px] bg-[#F3F3F0] flex items-center justify-center shrink-0">

                    <Search
                        size={18}
                        className="text-black"
                    />

                </div>


                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search profession or specialization"
                    className="flex-1 min-w-0 h-full bg-transparent px-3 sm:px-4 outline-none text-sm font-medium placeholder:text-gray-400"
                />


                {search ? (

                    <button
                        type="button"
                        onClick={() => setSearch("")}
                        aria-label="Clear search"
                        className="w-10 h-10 rounded-[12px] flex items-center justify-center text-gray-400 hover:bg-[#F3F3F0] hover:text-black transition-colors shrink-0"
                    >
                        <X size={17} />
                    </button>

                ) : (

                    <div className="hidden sm:flex w-11 h-11 rounded-[13px] bg-black text-white items-center justify-center shrink-0">
                        <ArrowRight size={18} />
                    </div>

                )}

            </div>

        </div>
    );
}