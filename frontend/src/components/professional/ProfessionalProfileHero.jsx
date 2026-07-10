import {
    UserRoundCheck,
    ArrowDownRight,
} from "lucide-react";


export default function ProfessionalProfileHero({
    completion,
    isEditMode,
}) {

    return (
        <section className="relative overflow-hidden bg-[#C7F36B] rounded-[26px] sm:rounded-[30px] p-5 sm:p-7 lg:p-10">

            <div className="absolute -top-24 -right-20 w-64 h-64 sm:w-80 sm:h-80 rounded-full border-[48px] sm:border-[60px] border-black/[0.04] pointer-events-none"></div>

            <div className="absolute -bottom-28 right-20 sm:right-52 w-56 h-56 sm:w-72 sm:h-72 rounded-full border-[42px] sm:border-[52px] border-black/[0.035] pointer-events-none"></div>


            <div className="relative z-10">


                {/* DESKTOP */}

                <div className="hidden lg:flex items-end justify-between gap-12">

                    <div>

                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-black/50">
                            Profile studio
                        </p>

                        <h1 className="mt-3 text-5xl xl:text-6xl font-bold tracking-[-0.055em] leading-[0.95]">
                            Build a profile
                            <br />
                            people trust.
                        </h1>

                    </div>


                    <div className="flex items-end gap-4">

                        <div className="min-w-[190px] bg-black/[0.07] rounded-[20px] p-4">

                            <div className="flex items-center justify-between">

                                <span className="text-3xl font-bold tracking-[-0.04em]">
                                    {completion}%
                                </span>

                                <ArrowDownRight
                                    size={18}
                                    className="text-black/40"
                                />

                            </div>

                            <p className="mt-2 text-xs font-semibold text-black/50">
                                Profile complete
                            </p>

                        </div>


                        <div className="w-[72px] h-[72px] rounded-[22px] bg-black text-white flex items-center justify-center">
                            <UserRoundCheck size={28} />
                        </div>

                    </div>

                </div>


                {/* MOBILE */}

                <div className="lg:hidden">

                    <div className="flex items-start justify-between gap-4">

                        <div>

                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/50">
                                {isEditMode ? "Profile studio" : "Create profile"}
                            </p>

                            <h2 className="mt-2 text-[31px] font-bold tracking-[-0.045em] leading-[1.02]">
                                Build a profile
                                <br />
                                people trust.
                            </h2>

                        </div>


                        <div className="w-11 h-11 rounded-[14px] bg-black text-white flex items-center justify-center shrink-0">
                            <UserRoundCheck size={19} />
                        </div>

                    </div>


                    <div className="mt-7">

                        <div className="flex items-center justify-between">

                            <span className="text-xs font-semibold text-black/55">
                                Profile completion
                            </span>

                            <span className="text-sm font-bold">
                                {completion}%
                            </span>

                        </div>


                        <div className="mt-2 h-2 bg-black/10 rounded-full overflow-hidden">

                            <div
                                className="h-full bg-black rounded-full transition-all duration-500"
                                style={{ width: `${completion}%` }}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}