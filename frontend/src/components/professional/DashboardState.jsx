import StatsCards from "./StatsCards";
import TodaysAppointments from "./TodaysAppointments";
import QuickActions from "./QuickActions";
import ManualTimeBlockingSection from "./ManualTimeBlockingSection";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, CheckCircle2 } from "lucide-react";

import { getProfessionalAppointments } from "../../services/professionalAppointmentService";


export default function DashboardState({ profile }) {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function loadAppointments() {

            try {

                const data = await getProfessionalAppointments();
                setAppointments(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        }

        loadAppointments();

    }, []);


    const dashboardStats = useMemo(() => {

        const pending = appointments.filter((appointment) => appointment.status === "pending").length;

        const confirmed = appointments.filter((appointment) => appointment.status === "confirmed").length;

        const completed = appointments.filter((appointment) => appointment.status === "completed").length;

        return {
            total: appointments.length,
            pending,
            confirmed,
            completed
        };

    }, [appointments]);


    if (loading) {

        return (
            <div className="w-full animate-pulse">

                <div className="h-[260px] sm:h-[280px] bg-gray-100 rounded-[28px]"></div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

                    <div className="lg:col-span-2 h-80 bg-gray-100 rounded-[24px]"></div>

                    <div className="h-80 bg-gray-100 rounded-[24px]"></div>

                </div>

            </div>
        );

    }


    return (
        <div className="w-full max-w-[1500px] mx-auto">


            {/* MOBILE GREETING */}

            <div className="lg:hidden mb-5">

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Professional workspace
                </p>

                <h1 className="mt-2 text-[30px] font-bold leading-tight tracking-[-0.035em]">
                    Good morning,
                    <br />
                    {profile?.userId?.username}.
                </h1>

            </div>



            {/* DASHBOARD HERO */}

            <section className="relative overflow-hidden bg-[#C7F36B] rounded-[26px] sm:rounded-[30px] p-5 sm:p-7 lg:p-10">


                {/* SIGNATURE RINGS */}

                <div className="absolute -top-20 -right-20 w-60 h-60 sm:w-72 sm:h-72 rounded-full border-[42px] sm:border-[52px] border-black/[0.04] pointer-events-none"></div>

                <div className="absolute -bottom-24 right-12 sm:right-32 w-52 h-52 sm:w-64 sm:h-64 rounded-full border-[38px] sm:border-[48px] border-black/[0.035] pointer-events-none"></div>



                <div className="relative z-10">


                    {/* DESKTOP HERO HEADER */}

                    <div className="hidden lg:flex items-start justify-between gap-8">

                        <div>

                            <p className="text-sm font-semibold text-black/50 uppercase tracking-[0.14em]">
                                Your workspace
                            </p>

                            <h1 className="mt-3 text-5xl xl:text-6xl font-bold tracking-[-0.045em] leading-[1]">
                                Good morning,
                                <br />
                                {profile?.userId?.username}.
                            </h1>

                        </div>


                        <DashboardDate />

                    </div>



                    {/* MOBILE HERO */}

                    <div className="lg:hidden">

                        <div className="flex items-center justify-between gap-4">

                            <div>

                                <p className="text-xs font-semibold text-black/50 uppercase tracking-[0.12em]">
                                    Your day
                                </p>

                                <p className="mt-1 text-sm font-medium text-black/60">
                                    Here's what your schedule looks like.
                                </p>

                            </div>


                            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                                <CalendarDays size={18} />
                            </div>

                        </div>


                        <div className="mt-7">

                            <div className="flex items-end gap-2">

                                <span className="text-[58px] font-bold leading-none tracking-[-0.06em]">
                                    {dashboardStats.total}
                                </span>

                                <span className="pb-1.5 text-sm font-semibold text-black/60">
                                    appointments
                                </span>

                            </div>

                        </div>


                        <div className="mt-6 grid grid-cols-3 gap-2">

                            <MobileStat
                                icon={Clock3}
                                value={dashboardStats.pending}
                                label="Pending"
                            />

                            <MobileStat
                                icon={CheckCircle2}
                                value={dashboardStats.confirmed}
                                label="Confirmed"
                            />

                            <MobileStat
                                icon={CalendarDays}
                                value={dashboardStats.completed}
                                label="Completed"
                            />

                        </div>

                    </div>



                    {/* DESKTOP SUMMARY */}

                    <div className="hidden lg:grid grid-cols-4 gap-3 mt-10 max-w-4xl">

                        <HeroStat
                            value={dashboardStats.total}
                            label="Appointments"
                        />

                        <HeroStat
                            value={dashboardStats.pending}
                            label="Pending"
                        />

                        <HeroStat
                            value={dashboardStats.confirmed}
                            label="Confirmed"
                        />

                        <HeroStat
                            value={dashboardStats.completed}
                            label="Completed"
                        />

                    </div>

                </div>

            </section>



            {/* MOBILE QUICK ACTIONS FIRST */}

            <div className="lg:hidden mt-7">

                <SectionLabel
                    title="Quick actions"
                    description="Things you might need right now."
                />

                <div className="mt-3">
                    <QuickActions />
                </div>

            </div>



            {/* DESKTOP STATS */}

            <div className="hidden">
                <StatsCards appointments={appointments} />
            </div>



            {/* TODAY SECTION */}

            <section className="mt-8 lg:mt-10">

                <SectionLabel
                    title="Your day"
                    description="Today's appointments and schedule."
                />


                <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">

                    <div className="min-w-0 lg:col-span-2">
                        <TodaysAppointments appointments={appointments} />
                    </div>


                    <div className="hidden lg:block min-w-0">
                        <QuickActions />
                    </div>

                </div>

            </section>



            {/* SCHEDULE CONTROL */}

            <section id="manual-time-blocking" className="mt-10 lg:mt-14 scroll-mt-6">
                <ManualTimeBlockingSection />
            </section>

        </div>
    );
}



function MobileStat({ icon: Icon, value, label }) {

    return (
        <div className="relative bg-black/[0.06] rounded-2xl p-3 min-w-0">

            <Icon size={15} className="text-black/50" />

            <p className="mt-4 text-xl font-bold">
                {value}
            </p>

            <p className="mt-0.5 text-[10px] sm:text-xs font-medium text-black/55 truncate">
                {label}
            </p>

        </div>
    );

}



function HeroStat({ value, label }) {

    return (
        <div className="bg-black/[0.06] backdrop-blur-sm rounded-2xl px-5 py-4">

            <p className="text-3xl font-bold tracking-tight">
                {value}
            </p>

            <p className="mt-1 text-sm font-medium text-black/55">
                {label}
            </p>

        </div>
    );

}



function DashboardDate() {

    const date = new Date();

    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    });


    return (
        <div className="flex items-center gap-3 bg-black text-white rounded-2xl px-4 py-3">

            <div className="w-9 h-9 rounded-xl bg-[#C7F36B] text-black flex items-center justify-center">
                <CalendarDays size={17} />
            </div>

            <div>

                <p className="text-[10px] uppercase tracking-[0.12em] text-gray-500">
                    Today
                </p>

                <p className="mt-0.5 text-sm font-medium">
                    {formattedDate}
                </p>

            </div>

        </div>
    );

}



function SectionLabel({ title, description }) {

    return (
        <div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.025em]">
                {title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                {description}
            </p>

        </div>
    );

}