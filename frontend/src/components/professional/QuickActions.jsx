import {
    CalendarClock,
    CalendarOff,
    UserRound,
    ClipboardCheck,
    ArrowUpRight,
    ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


export default function QuickActions() {

    const navigate = useNavigate();


    function scrollToBlocking() {

        const section = document.getElementById("manual-time-blocking");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

    }


    return (
        <section className="w-full">


            {/* MOBILE */}

            <div className="lg:hidden">

                <div className="overflow-hidden rounded-[24px] bg-black text-white">

                    {/* PRIMARY ACTION */}

                    <button
                        type="button"
                        onClick={() => navigate("/professional/availability")}
                        className="group relative w-full overflow-hidden p-5 text-left"
                    >
                        <div className="absolute -top-14 -right-12 w-40 h-40 rounded-full border-[30px] border-white/[0.04] pointer-events-none"></div>

                        <div className="relative z-10 flex items-center gap-4">

                            <div className="w-11 h-11 rounded-[14px] bg-[#C7F36B] text-black flex items-center justify-center shrink-0">
                                <CalendarClock size={20} />
                            </div>

                            <div className="flex-1 min-w-0">

                                <div className="flex items-center justify-between gap-3">

                                    <h3 className="text-[15px] font-semibold">
                                        Manage availability
                                    </h3>

                                    <ArrowUpRight size={17} className="text-gray-400 group-hover:text-white transition-colors" />

                                </div>
                            </div>

                        </div>

                    </button>


                    {/* SECONDARY ACTIONS */}

                    <div className="grid grid-cols-2 border-t border-white/10">

                        <button
                            type="button"
                            onClick={scrollToBlocking}
                            className="group p-4 text-left border-r border-white/10 active:bg-white/[0.04]"
                        >
                            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                                <CalendarOff size={17} />
                            </div>

                            <p className="mt-3 text-sm font-semibold">
                                Block time
                            </p>

                            <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
                                Mark unavailable hours
                            </p>
                        </button>


                        <button
                            type="button"
                            onClick={() => navigate("/professional/profile")}
                            className="group p-4 text-left active:bg-white/[0.04]"
                        >
                            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                                <UserRound size={17} />
                            </div>

                            <p className="mt-3 text-sm font-semibold">
                                Edit profile
                            </p>

                            <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
                                Update public details
                            </p>
                        </button>

                    </div>

                </div>


                {/* APPOINTMENTS LINK */}

                <button
                    type="button"
                    onClick={() => navigate("/professional/appointments")}
                    className="w-full mt-2.5 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-black/[0.07] text-left"
                >
                    <div className="w-9 h-9 rounded-xl bg-[#F2F2EF] flex items-center justify-center shrink-0">
                        <ClipboardCheck size={17} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">
                            Manage all appointments
                        </p>
                    </div>

                    <ChevronRight size={17} className="text-gray-400 shrink-0" />
                </button>

            </div>



            {/* DESKTOP */}

            <div className="hidden lg:block bg-black text-white rounded-[28px] overflow-hidden">

                {/* HEADER */}

                <div className="relative overflow-hidden p-6 pb-5">

                    <div className="absolute -top-16 -right-14 w-44 h-44 rounded-full border-[34px] border-white/[0.035] pointer-events-none"></div>

                    <div className="relative z-10">

                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                            Quick actions
                        </p>

                        <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em]">
                            What do you need
                            <br />
                            to do?
                        </h3>

                    </div>

                </div>


                {/* PRIMARY ACTION */}

                <div className="px-3">

                    <button
                        type="button"
                        onClick={() => navigate("/professional/availability")}
                        className="group w-full bg-[#C7F36B] text-black rounded-[20px] p-4 text-left transition-transform hover:-translate-y-0.5"
                    >
                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                                <CalendarClock size={18} />
                            </div>


                            <div className="flex min-w-0">

                                <div className="flex items-center justify-between gap-2">

                                    <p className="text-md font-semibold">
                                        Manage availability
                                    </p>

                                    <ArrowUpRight size={16} />

                                </div>

                            </div>

                        </div>

                    </button>

                </div>


                {/* UTILITY ROWS */}

                <div className="mt-3 px-3 pb-3">

                    <DesktopAction
                        icon={CalendarOff}
                        title="Block unavailable time"
                        onClick={scrollToBlocking}
                    />

                    <DesktopAction
                        icon={UserRound}
                        title="Edit public profile"
                        onClick={() => navigate("/professional/profile")}
                    />

                    <DesktopAction
                        icon={ClipboardCheck}
                        title="Manage appointments"
                        onClick={() => navigate("/professional/appointments")}
                        last
                    />

                </div>

            </div>

        </section>
    );
}



function DesktopAction({
    icon: Icon,
    title,
    description,
    onClick,
    last,
}) {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`group w-full flex items-center gap-3 py-4 text-left ${!last ? "border-b border-white/10" : ""}`}
        >
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center shrink-0 group-hover:bg-white/[0.13] transition-colors">
                <Icon size={16} />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">
                    {title}
                </p>

                <p className="mt-0.5 text-[11px] text-gray-500 truncate">
                    {description}
                </p>
            </div>

            <ChevronRight size={16} className="text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>
    );
}