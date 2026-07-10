export default function PageLoader() {
    return (
        <div className="fixed inset-0 z-[9999] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#FAFAF7]">

            {/* SIGNATURE BACKGROUND RINGS */}

            <div className="absolute -top-28 -right-28 w-72 h-72 sm:w-96 sm:h-96 rounded-full border-[52px] sm:border-[70px] border-black/[0.025] pointer-events-none"></div>

            <div className="absolute -bottom-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 rounded-full border-[52px] sm:border-[70px] border-[#C7F36B]/20 pointer-events-none"></div>


            {/* MAIN CONTENT */}

            <div className="relative z-10 w-full max-w-[340px] px-6 flex flex-col items-center">


                {/* BRAND MARK */}

                <div className="relative">

                    <div className="absolute inset-0 rounded-[24px] bg-[#C7F36B] animate-[loaderPulse_2s_ease-in-out_infinite]"></div>

                    <div className="relative w-[72px] h-[72px] rounded-[22px] bg-white flex items-center justify-center">

                        <span className="text-[#C7F36B] text-2xl font-black tracking-[-0.08em]">
                            <img src="/APOINT_LOGO.png" alt="" />
                        </span>

                    </div>

                </div>



                {/* BRAND */}

                <div className="mt-5 text-center">

                    <h1 className="text-[32px] font-bold tracking-[-0.055em]">
                        Apoint
                    </h1>

                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                        Your time, organized.
                    </p>

                </div>



                {/* APPOINTMENT LOADER */}

                <div className="mt-10 w-full">

                    <div className="relative overflow-hidden bg-white border border-black/[0.06] rounded-[20px] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">

                        {/* MOVING HIGHLIGHT */}

                        <div className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#C7F36B]/20 to-transparent animate-[loaderSweep_1.8s_ease-in-out_infinite]"></div>


                        <div className="relative flex items-center gap-3">

                            {/* AVATAR */}

                            <div className="relative w-11 h-11 rounded-[14px] bg-[#F0F0ED] shrink-0 overflow-hidden">

                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[loaderSweep_1.8s_ease-in-out_infinite]"></div>

                            </div>


                            {/* LINES */}

                            <div className="flex-1 min-w-0">

                                <div className="w-[58%] h-2.5 rounded-full bg-black/10"></div>

                                <div className="mt-2 w-[38%] h-2 rounded-full bg-black/[0.055]"></div>

                            </div>


                            {/* STATUS */}

                            <div className="w-8 h-8 rounded-full bg-[#C7F36B] flex items-center justify-center shrink-0">

                                <span className="relative flex w-2 h-2">

                                    <span className="absolute inline-flex w-full h-full rounded-full bg-black opacity-30 animate-ping"></span>

                                    <span className="relative inline-flex w-2 h-2 rounded-full bg-black"></span>

                                </span>

                            </div>

                        </div>


                        {/* PROGRESS TRACK */}

                        <div className="relative mt-4 h-1 bg-black/[0.05] rounded-full overflow-hidden">

                            <div className="absolute top-0 bottom-0 w-[38%] rounded-full bg-[#C7F36B] animate-[loaderProgress_1.7s_ease-in-out_infinite]"></div>

                        </div>

                    </div>

                </div>



                {/* LOADING TEXT */}

                <div className="mt-6 flex items-center gap-2">

                    <span className="text-xs font-semibold text-gray-400">
                        Preparing your workspace
                    </span>

                    <div className="flex items-center gap-1">

                        <span className="w-1 h-1 rounded-full bg-black animate-[loaderDot_1.4s_ease-in-out_infinite]"></span>

                        <span className="w-1 h-1 rounded-full bg-black animate-[loaderDot_1.4s_ease-in-out_0.2s_infinite]"></span>

                        <span className="w-1 h-1 rounded-full bg-black animate-[loaderDot_1.4s_ease-in-out_0.4s_infinite]"></span>

                    </div>

                </div>

            </div>


            {/* ANIMATIONS */}

            <style>
                {`
                    @keyframes loaderPulse {
                        0%, 100% {
                            transform: scale(1);
                            opacity: 0.25;
                        }

                        50% {
                            transform: scale(1.18);
                            opacity: 0;
                        }
                    }


                    @keyframes loaderSweep {
                        0% {
                            left: -40%;
                        }

                        100% {
                            left: 120%;
                        }
                    }


                    @keyframes loaderProgress {
                        0% {
                            left: -40%;
                        }

                        50% {
                            left: 40%;
                        }

                        100% {
                            left: 105%;
                        }
                    }


                    @keyframes loaderDot {
                        0%, 60%, 100% {
                            transform: translateY(0);
                            opacity: 0.25;
                        }

                        30% {
                            transform: translateY(-3px);
                            opacity: 1;
                        }
                    }
                `}
            </style>

        </div>
    );
}