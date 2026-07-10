import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    CalendarDays,
    Clock3,
    Link2,
    Check,
    X,
    Menu,
} from "lucide-react";


export default function LandingPage() {

    const navigate = useNavigate();


    return (
        <div className="min-h-screen bg-[#FAFAF7] text-[#0A0A0A] overflow-hidden">

            {/* NAVBAR */}

            <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#FAFAF7]/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                    <div className="flex items-center gap-2">
                        <img className="h-20" src="/APOINT_LOGO.png" alt="A" />

                        <span className="text-xl font-bold tracking-tight">
                            Apoint
                        </span>
                    </div>


                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <a href="#how-it-works" className="hover:text-black">How it works</a>
                        <a href="#features" className="hover:text-black">Features</a>
                        <a href="#professionals" className="hover:text-black">For professionals</a>
                    </div>


                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => navigate("/login")}
                            className="hidden sm:block px-4 py-2 text-sm font-medium"
                        >
                            Log in
                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="px-4 sm:px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            Get started
                        </button>

                    </div>

                </div>
            </nav>



            {/* HERO */}

            <main>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-28">

                    <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">

                        {/* HERO CONTENT */}

                        <div className="text-center lg:text-left">

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 bg-white text-xs sm:text-sm font-medium">
                                <span className="w-2 h-2 rounded-full bg-[#C7F36B]"></span>
                                Built for professionals
                            </div>


                            <h1 className="mt-5 text-[42px] sm:text-6xl lg:text-[76px] font-bold leading-[0.98] tracking-[-0.05em]">
                                Your time
                                <br className="lg:hidden" />
                                <span className="lg:ml-3">deserves</span>

                                <span className="relative inline-block ml-2 lg:ml-3">
                                    better.
                                    <span className="absolute left-0 right-0 bottom-1 h-2.5 sm:h-4 bg-[#C7F36B] -z-10 -rotate-1"></span>
                                </span>
                            </h1>


                            {/* SHORT TEXT ON MOBILE */}

                            <p className="mt-5 max-w-md mx-auto lg:mx-0 text-[15px] sm:text-lg text-gray-600 leading-relaxed lg:hidden">
                                Manage your availability and appointments in one simple place.
                            </p>


                            {/* FULL TEXT ON DESKTOP */}

                            <p className="hidden lg:block mt-6 max-w-xl text-lg text-gray-600 leading-relaxed">
                                Stop managing appointments through calls, messages and scattered notes. Apoint gives you one clean place to manage availability, bookings and your time.
                            </p>


                            <div className="mt-7 flex justify-center lg:justify-start">

                                <button
                                    onClick={() => navigate("/register")}
                                    className="h-12 sm:h-13 px-6 rounded-full bg-black text-white text-sm sm:text-base font-medium flex items-center justify-center gap-2 hover:gap-3 transition-all"
                                >
                                    Start taking bookings
                                    <ArrowRight size={17} />
                                </button>

                            </div>


                            {/* DESKTOP ONLY SECONDARY CONTENT */}

                            <div className="hidden lg:flex mt-7 items-center gap-5 text-sm text-gray-500">

                                <span className="flex items-center gap-1.5">
                                    <Check size={15} />
                                    Simple setup
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <Check size={15} />
                                    No complicated tools
                                </span>

                            </div>

                        </div>




                        {/* MOBILE PRODUCT VISUAL */}

                        <div className="relative w-full max-w-[430px] mx-auto lg:hidden">

                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C7F36B] rounded-full blur-3xl opacity-30"></div>

                            <div className="relative bg-white border border-black/10 rounded-[24px] p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

                                <div className="bg-[#F3F3EF] rounded-[18px] p-4">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-[11px] text-gray-500">Today</p>

                                            <h3 className="mt-0.5 text-base font-semibold">
                                                Your appointments
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#C7F36B]"></span>
                                            <span className="text-xs font-medium">6 bookings</span>
                                        </div>

                                    </div>


                                    <div className="mt-4 bg-white rounded-2xl overflow-hidden">

                                        <MobileAppointment
                                            time="09:30"
                                            name="Aarav Mehta"
                                            type="Consultation"
                                            status="confirmed"
                                        />

                                        <MobileAppointment
                                            time="11:00"
                                            name="Riya Sharma"
                                            type="Follow-up"
                                            status="pending"
                                        />

                                        <MobileAppointment
                                            time="14:30"
                                            name="Kabir Singh"
                                            type="Consultation"
                                            status="confirmed"
                                        />

                                    </div>


                                    <div className="mt-3 flex items-center justify-between px-1">

                                        <p className="text-[11px] text-gray-500">
                                            Next appointment in 42 min
                                        </p>

                                        <span className="text-[11px] font-medium">
                                            View schedule →
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* DESKTOP PRODUCT VISUAL */}

                        <div className="relative hidden lg:block">

                            <div className="absolute -top-8 -right-10 w-40 h-40 bg-[#C7F36B] rounded-full blur-3xl opacity-50"></div>

                            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#B9D7FF] rounded-full blur-3xl opacity-50"></div>


                            <div className="relative bg-white border border-black/10 rounded-[28px] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.10)]">

                                <div className="rounded-[20px] bg-[#F4F4F0] p-6">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Good morning
                                            </p>

                                            <h3 className="mt-1 text-lg font-semibold">
                                                Your schedule
                                            </h3>
                                        </div>

                                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                                            AP
                                        </div>

                                    </div>


                                    <div className="mt-6 grid grid-cols-3 gap-2">

                                        <Metric
                                            number="6"
                                            label="Today"
                                            accent="#C7F36B"
                                        />

                                        <Metric
                                            number="18"
                                            label="This week"
                                            accent="#B9D7FF"
                                        />

                                        <Metric
                                            number="2"
                                            label="Pending"
                                            accent="#FFE99A"
                                        />

                                    </div>


                                    <div className="mt-5 bg-white rounded-2xl p-4">

                                        <div className="flex items-center justify-between mb-4">

                                            <h4 className="font-semibold text-sm">
                                                Today's appointments
                                            </h4>

                                            <span className="text-xs text-gray-500">
                                                June 30
                                            </span>

                                        </div>


                                        <AppointmentRow
                                            time="09:30"
                                            name="Aarav Mehta"
                                            status="Confirmed"
                                        />

                                        <AppointmentRow
                                            time="11:00"
                                            name="Riya Sharma"
                                            status="Pending"
                                        />

                                        <AppointmentRow
                                            time="14:30"
                                            name="Kabir Singh"
                                            status="Confirmed"
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="absolute -bottom-6 -left-8 bg-black text-white rounded-2xl p-4 shadow-xl">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-xl bg-[#C7F36B] text-black flex items-center justify-center">
                                        <CalendarDays size={20} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            New appointment
                                        </p>

                                        <p className="text-sm font-medium mt-0.5">
                                            Booked for 2:30 PM
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>



                {/* PROBLEM STORY */}

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 sm:mt-40">

                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                            The old way is exhausting
                        </p>

                        <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">
                            Your work is professional.
                            <br />
                            Your booking process should be too.
                        </h2>
                    </div>


                    <div className="mt-10 grid md:grid-cols-3 gap-3">

                        <ProblemCard
                            icon={<Clock3 size={20} />}
                            title="Back-and-forth calls"
                            text="Finding a time that works shouldn't require five phone calls."
                        />

                        <ProblemCard
                            icon={<X size={20} />}
                            title="Missed opportunities"
                            text="When you're busy working, you shouldn't lose a booking because you missed a message."
                        />

                        <ProblemCard
                            icon={<CalendarDays size={20} />}
                            title="Scattered schedules"
                            text="Your availability, blocked time and appointments belong in one place."
                        />

                    </div>

                </section>



                {/* SIMPLE TRANSFORMATION SECTION */}

                <section id="how-it-works" className="mt-28 sm:mt-40 bg-black text-white">

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">

                        <div className="max-w-2xl">

                            <span className="inline-block px-3 py-1.5 rounded-full bg-[#C7F36B] text-black text-sm font-medium">
                                The Apoint way
                            </span>

                            <h2 className="mt-5 text-4xl sm:text-6xl font-bold tracking-tight">
                                Set it once.
                                <br />
                                Let clients book.
                            </h2>

                        </div>


                        <div className="mt-14 grid md:grid-cols-3 gap-px bg-white/15 border border-white/15 rounded-3xl overflow-hidden">

                            <Step
                                number="01"
                                icon={<Clock3 />}
                                title="Set your availability"
                                text="Choose when you're available and block time whenever your schedule changes."
                            />

                            <Step
                                number="02"
                                icon={<Link2 />}
                                title="Get discovered"
                                text="Clients can explore your profile, availability and choose a suitable time."
                            />

                            <Step
                                number="03"
                                icon={<CalendarDays />}
                                title="Manage appointments"
                                text="See upcoming bookings and keep your working day organized from one dashboard."
                            />

                        </div>

                    </div>

                </section>



                {/* FEATURE SHOWCASE */}

                <section id="professionals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-40">

                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                                Built around your schedule
                            </p>

                            <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                                Control your time.
                                <br />
                                Not another complicated tool.
                            </h2>

                            <p className="mt-5 text-gray-600 text-lg max-w-lg leading-relaxed">
                                Apoint focuses on the things professionals actually need:
                                availability, appointments and control over their schedule.
                            </p>


                            <div className="mt-8 space-y-5">

                                <Feature text="Create weekly availability in minutes" />
                                <Feature text="Block personal time without changing your schedule" />
                                <Feature text="Accept and manage appointments from one dashboard" />
                                <Feature text="Give clients a cleaner booking experience" />

                            </div>

                        </div>


                        <div className="bg-[#C7F36B] rounded-[32px] p-5 sm:p-8">

                            <div className="bg-[#FAFAF7] rounded-[24px] p-5 shadow-sm">

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Availability</p>
                                        <h3 className="text-xl font-semibold mt-1">Your working week</h3>
                                    </div>

                                    <span className="px-3 py-1.5 rounded-full bg-black text-white text-xs">
                                        Active
                                    </span>
                                </div>


                                <div className="mt-6 space-y-2">

                                    <AvailabilityRow day="Monday" time="09:00 – 17:00" active />
                                    <AvailabilityRow day="Tuesday" time="09:00 – 17:00" active />
                                    <AvailabilityRow day="Wednesday" time="Unavailable" />
                                    <AvailabilityRow day="Thursday" time="11:00 – 18:00" active />
                                    <AvailabilityRow day="Friday" time="09:00 – 15:00" active />

                                </div>

                            </div>

                        </div>

                    </div>

                </section>



                {/* FINAL CTA */}

                <section className="px-4 sm:px-6 lg:px-8 pb-6">

                    <div className="max-w-7xl mx-auto bg-[#B9D7FF] rounded-[32px] px-6 py-16 sm:p-20 text-center">

                        <p className="text-sm font-semibold uppercase tracking-widest">
                            Your schedule. Your rules.
                        </p>

                        <h2 className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
                            Spend less time managing bookings.
                            More time doing your work.
                        </h2>

                        <button
                            onClick={() => navigate("/register")}
                            className="mt-8 h-14 px-7 rounded-full bg-black text-white font-medium inline-flex items-center gap-2 hover:gap-3 transition-all"
                        >
                            Create your Apoint profile
                            <ArrowRight size={18} />
                        </button>

                    </div>

                </section>

            </main>



            {/* FOOTER */}

            <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-gray-500">
                <div className="font-semibold text-black">Apoint</div>
                <p>Simple appointment booking for modern professionals.</p>
                <p>© 2026 Apoint</p>
            </footer>

        </div>
    );
}



function Metric({ number, label, accent }) {
    return (
        <div className="rounded-xl p-3" style={{ backgroundColor: accent }}>
            <p className="text-xl font-bold">{number}</p>
            <p className="text-[11px] mt-1 opacity-70">{label}</p>
        </div>
    );
}


function AppointmentRow({ time, name, status }) {
    return (
        <div className="flex items-center gap-3 py-3 border-t border-gray-100 first:border-0">
            <span className="text-xs font-medium w-10">{time}</span>

            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold">
                {name.charAt(0)}
            </div>

            <p className="flex-1 min-w-0 text-sm font-medium truncate">
                {name}
            </p>

            <span className={`text-[10px] px-2 py-1 rounded-full ${status === "Confirmed" ? "bg-[#C7F36B]" : "bg-[#FFE99A]"}`}>
                {status}
            </span>
        </div>
    );
}


function ProblemCard({ icon, title, text }) {
    return (
        <div className="bg-white border border-black/8 rounded-3xl p-6 sm:p-8">
            <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center">
                {icon}
            </div>

            <h3 className="mt-6 text-xl font-semibold">{title}</h3>

            <p className="mt-2 text-gray-600 leading-relaxed">
                {text}
            </p>
        </div>
    );
}


function Step({ number, icon, title, text }) {
    return (
        <div className="bg-black p-7 sm:p-9">
            <div className="flex items-center justify-between">
                <div className="text-[#C7F36B]">{icon}</div>
                <span className="text-sm text-gray-500">{number}</span>
            </div>

            <h3 className="mt-12 text-xl font-semibold">{title}</h3>

            <p className="mt-3 text-gray-400 leading-relaxed">
                {text}
            </p>
        </div>
    );
}


function Feature({ text }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#C7F36B] flex items-center justify-center shrink-0">
                <Check size={14} strokeWidth={3} />
            </div>

            <p className="font-medium">{text}</p>
        </div>
    );
}


function AvailabilityRow({ day, time, active }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white">
            <div className={`w-2 h-2 rounded-full ${active ? "bg-green-500" : "bg-gray-300"}`}></div>

            <span className="font-medium text-sm flex-1">
                {day}
            </span>

            <span className={`text-xs ${active ? "text-black" : "text-gray-400"}`}>
                {time}
            </span>
        </div>
    );
}


function MobileAppointment({ time, name, type, status }) {

    return (
        <div className="flex items-center gap-3 px-3 py-3.5 sm:px-4 sm:py-4 border-b border-gray-100 last:border-0">

            <span className="w-10 shrink-0 text-xs sm:text-sm font-semibold">
                {time}
            </span>


            <div className="w-px h-9 bg-gray-200"></div>


            <div className="flex-1 min-w-0">

                <p className="text-sm font-semibold truncate">
                    {name}
                </p>

                <p className="mt-0.5 text-[11px] sm:text-xs text-gray-500">
                    {type}
                </p>

            </div>


            <span className={`shrink-0 w-2.5 h-2.5 rounded-full ${status === "confirmed" ? "bg-[#C7F36B]" : "bg-[#FFE99A]"}`}></span>

        </div>
    );
}