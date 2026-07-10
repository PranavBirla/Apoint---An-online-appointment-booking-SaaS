import {
    CalendarCheck2,
    ShieldCheck,
} from "lucide-react";


export default function BrowseHero({
    children,
}) {

    return (
        <section className="relative overflow-hidden bg-[#C7F36B] rounded-[26px] sm:rounded-[30px]">


            {/* SIGNATURE RINGS */}

            <div className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full border-[52px] sm:border-[70px] border-black/[0.04] pointer-events-none"></div>

            <div className="absolute -bottom-28 right-24 sm:right-[30%] w-60 h-60 rounded-full border-[46px] border-black/[0.035] pointer-events-none"></div>



            <div className="relative z-10 p-5 sm:p-7 lg:p-10 xl:p-12">


                {/* MOBILE */}

                <div className="lg:hidden">

                    <div className="flex items-start justify-between gap-4">

                        <div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/45">
                                Find. Book. Done.
                            </p>


                            <h1 className="mt-2 text-[35px] font-bold leading-[0.98] tracking-[-0.055em]">
                                Find the right
                                <br />
                                professional.
                            </h1>

                        </div>


                        <div className="w-11 h-11 rounded-[14px] bg-black text-[#C7F36B] flex items-center justify-center shrink-0">
                            <CalendarCheck2 size={19} />
                        </div>

                    </div>


                    <p className="mt-4 max-w-[270px] text-sm leading-5 font-medium text-black/55">
                        Discover trusted professionals and book a time that works for you.
                    </p>


                    <div className="mt-6">
                        {children}
                    </div>

                </div>



                {/* DESKTOP */}

                <div className="hidden lg:block">

                    <div className="flex items-end justify-between gap-12">

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-black/45">
                                A better way to book
                            </p>


                            <h1 className="mt-3 text-5xl xl:text-6xl font-bold leading-[0.95] tracking-[-0.055em]">
                                Find the right professional.
                                <br />
                                Book without the back-and-forth.
                            </h1>

                        </div>


                        <div className="w-[230px] bg-black/[0.07] rounded-[22px] p-4">

                            <div className="w-10 h-10 rounded-[13px] bg-black text-[#C7F36B] flex items-center justify-center">
                                <ShieldCheck size={18} />
                            </div>

                            <p className="mt-4 text-sm font-bold">
                                Simple booking
                            </p>

                            <p className="mt-1 text-xs leading-5 font-medium text-black/45">
                                View profiles, check availability and book in minutes.
                            </p>

                        </div>

                    </div>


                    <div className="mt-9 max-w-[760px]">
                        {children}
                    </div>

                </div>

            </div>

        </section>
    );
}