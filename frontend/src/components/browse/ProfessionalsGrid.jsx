import {
    SearchX,
    UsersRound,
} from "lucide-react";

import ProfessionalCard from "./ProfessionalCard";


export default function ProfessionalsGrid({
    professionals,
    loading,
}) {

    if (loading) {
        return <ProfessionalsLoading />;
    }


    if (!professionals.length) {
        return <EmptyProfessionals />;
    }


    return (
        <section>


            {/* RESULTS HEADER */}

            <div className="flex items-end justify-between gap-4 mb-3 lg:mb-5">

                <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        Available professionals
                    </p>


                    <h2 className="mt-1 text-xl lg:text-2xl font-bold tracking-[-0.035em]">
                        Find your match
                    </h2>

                </div>


                <div className="flex items-center gap-2 shrink-0">

                    <div className="w-7 h-7 rounded-[9px] bg-[#EDF8D8] flex items-center justify-center">
                        <UsersRound size={13} />
                    </div>

                    <span className="text-xs font-semibold text-gray-500">
                        {professionals.length} found
                    </span>

                </div>

            </div>



            {/* RESULTS */}

            <div className="border-t border-black/[0.06] md:border-0 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-5">

                {professionals.map((professional) => (

                    <ProfessionalCard
                        key={professional._id}
                        professional={professional}
                    />

                ))}

            </div>

        </section>
    );
}



function ProfessionalsLoading() {

    return (
        <section>

            <div className="mb-3 lg:mb-5">

                <div className="w-28 h-2.5 rounded-full bg-black/[0.06] animate-pulse"></div>

                <div className="mt-2 w-44 h-6 rounded-full bg-black/[0.07] animate-pulse"></div>

            </div>


            <div className="border-t border-black/[0.06] md:border-0 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-5">

                {[1, 2, 3, 4, 5, 6].map((item) => (

                    <ProfessionalCardSkeleton
                        key={item}
                    />

                ))}

            </div>

        </section>
    );
}



function ProfessionalCardSkeleton() {

    return (
        <div className="py-4 border-b border-black/[0.06] md:p-4 md:border md:border-black/[0.06] md:rounded-[24px] md:bg-white">

            <div className="flex gap-3.5 md:block">

                <div className="w-[72px] h-[82px] rounded-[16px] bg-black/[0.06] animate-pulse shrink-0 md:w-full md:h-[190px] md:rounded-[18px]"></div>


                <div className="flex-1 min-w-0">

                    <div className="w-[55%] h-4 rounded-full bg-black/[0.07] animate-pulse md:mt-4"></div>

                    <div className="mt-2 w-[38%] h-3 rounded-full bg-black/[0.05] animate-pulse"></div>

                    <div className="mt-4 w-[70%] h-3 rounded-full bg-black/[0.05] animate-pulse"></div>

                    <div className="hidden md:block mt-5 w-full h-11 rounded-[13px] bg-black/[0.06] animate-pulse"></div>

                </div>

            </div>

        </div>
    );
}



function EmptyProfessionals() {

    return (
        <section className="py-14 lg:py-20">

            <div className="max-w-[420px] mx-auto text-center">

                <div className="relative w-20 h-20 mx-auto">

                    <div className="absolute inset-0 rounded-[24px] bg-[#C7F36B] rotate-6"></div>

                    <div className="absolute inset-0 rounded-[24px] bg-black text-[#C7F36B] flex items-center justify-center">
                        <SearchX size={27} />
                    </div>

                </div>


                <h2 className="mt-6 text-2xl font-bold tracking-[-0.035em]">
                    No professionals found
                </h2>


                <p className="mt-2 text-sm leading-6 text-gray-500">
                    Try another profession, specialization or a broader search.
                </p>

            </div>

        </section>
    );
}