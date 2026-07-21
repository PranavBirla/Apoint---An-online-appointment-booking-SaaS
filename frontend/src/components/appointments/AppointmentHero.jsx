import { CalendarPlus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AppointmentHero({
    upcomingCount = 0,
}) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 17
                ? "Good Afternoon"
                : "Good Evening";

    return (
        <section className="relative overflow-hidden rounded-[34px] border border-black/5 bg-white px-6 py-7 shadow-[0_15px_45px_rgba(0,0,0,0.05)] lg:px-10 lg:py-10">

            {/* Signature Rings */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[42px] border-black/[0.035]" />

            <div className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full border-[34px] border-black/[0.03]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                <div className="max-w-xl">

                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">
                        {greeting}
                    </p>

                    <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
                        {user?.username || "User"}
                    </h1>

                    <p className="mt-4 max-w-md text-[15px] leading-7 text-neutral-500">
                        {upcomingCount > 0
                            ? `You have ${upcomingCount} upcoming appointment${upcomingCount > 1 ? "s" : ""}. Everything you need is right here.`
                            : "No upcoming appointments yet. Discover professionals and schedule your next visit in seconds."}
                    </p>

                </div>

                <button
                    onClick={() => navigate("/professionals")}
                    className="
                        group
                        inline-flex
                        items-center
                        justify-center
                        gap-3
                        rounded-2xl
                        bg-black
                        px-6
                        py-4
                        text-white
                        font-semibold
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-xl
                        active:translate-y-0
                    "
                >
                    <CalendarPlus size={20} />

                    Browse Professionals

                    <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </button>

            </div>
        </section>
    );
}