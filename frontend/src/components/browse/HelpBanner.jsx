import {
    CalendarSearch,
    ArrowUpRight,
} from "lucide-react";


export default function HelpBanner() {

    return (
        <section className="mt-10 lg:mt-14">


            <div className="relative overflow-hidden bg-black text-white rounded-[24px] lg:rounded-[28px] p-5 lg:p-7">


                {/* DECORATIVE RING */}

                <div className="absolute -top-20 -right-16 w-56 h-56 rounded-full border-[44px] border-white/[0.045] pointer-events-none"></div>



                <div className="relative z-10 flex items-center gap-4 lg:justify-between">


                    <div className="flex items-center gap-4 min-w-0">

                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-[15px] lg:rounded-[17px] bg-[#C7F36B] text-black flex items-center justify-center shrink-0">

                            <CalendarSearch
                                size={21}
                            />

                        </div>


                        <div className="min-w-0">

                            <h3 className="text-base lg:text-xl font-bold tracking-[-0.025em]">
                                Still looking?
                            </h3>


                            <p className="mt-1 text-xs lg:text-sm text-white/45 leading-5">
                                Try another category or search by specialization.
                            </p>

                        </div>

                    </div>



                    <div className="hidden lg:flex w-11 h-11 rounded-[13px] bg-white/[0.08] items-center justify-center">
                        <ArrowUpRight size={18} />
                    </div>

                </div>

            </div>

        </section>
    );
}