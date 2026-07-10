import { Mail, Lock, ArrowRight, CalendarDays, Clock3, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import Input from "../components/ui/Input";


export default function Login() {

    const navigate = useNavigate();
    const { fetchUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    async function handleSubmit(e) {

        e.preventDefault();
        setError("");

        try {

            setLoading(true);

            const response = await loginUser({
                email,
                password,
            });

            await fetchUser();

            if (response.user.role === "professional") {
                navigate("/professional/dashboard");
            } else {
                navigate("/professionals");
            }

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                "Login failed. Please try again."
            );

        } finally {

            setLoading(false);

        }

    }


    return (
        <div className="min-h-screen bg-[#FAFAF7] text-[#0A0A0A] overflow-hidden">

            <div className="min-h-screen grid lg:grid-cols-[1.05fr_0.95fr]">


                {/* LEFT EXPERIENCE */}

                <section className="hidden lg:flex relative overflow-hidden bg-black text-white p-10 xl:p-14 flex-col justify-between">


                    <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border-[60px] border-[#C7F36B]" ></div>

                    <div className="absolute bottom-20 -left-32 w-72 h-72 rounded-full border-[50px] border-[#C7F36B]"></div>

                    {/* BACKGROUND ACCENTS */}

                    <div className="absolute top-[-100px] right-[-80px] w-[340px] h-[340px] rounded-full bg-[#C7F36B] blur-[120px] opacity-20"></div>

                    <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[#B9D7FF] blur-[130px] opacity-15"></div>


                    {/* LOGO */}

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="relative z-10 flex items-center gap-3 w-fit"
                    >
                        <div className="w-10 h-10 rounded-xl bg-[#C7F36B] text-black flex items-center justify-center text-lg font-bold">
                            A
                        </div>

                        <span className="text-2xl font-bold tracking-tight">
                            Apoint
                        </span>
                    </button>


                    {/* MAIN STORY */}

                    <div className="relative z-10 max-w-xl my-14">

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-sm text-gray-300">
                            <span className="w-2 h-2 rounded-full bg-[#C7F36B]"></span>
                            Your workday, organized
                        </div>


                        <h1 className="mt-6 text-6xl xl:text-7xl font-bold leading-[0.98] tracking-[-0.05em]">
                            Your day,
                            <br />
                            under control.
                        </h1>


                        <p className="mt-6 max-w-lg text-lg text-gray-400 leading-relaxed">
                            Your availability, blocked time and appointments together in one simple workspace.
                        </p>


                        {/* PRODUCT VISUAL */}

                        <div className="mt-10 max-w-lg bg-[#171717] border border-white/10 rounded-[28px] p-3 shadow-2xl">

                            <div className="bg-[#F4F4F0] text-black rounded-[20px] p-5">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Tuesday, July 14
                                        </p>

                                        <h3 className="mt-1 text-lg font-semibold">
                                            Today's schedule
                                        </h3>
                                    </div>


                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C7F36B] text-xs font-semibold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                                        4 bookings
                                    </div>

                                </div>


                                <div className="mt-5 bg-white rounded-2xl overflow-hidden">

                                    <ScheduleRow
                                        time="09:30"
                                        name="Aarav Mehta"
                                        type="Consultation"
                                        active
                                    />

                                    <ScheduleRow
                                        time="11:00"
                                        name="Riya Sharma"
                                        type="Follow-up"
                                    />

                                    <ScheduleRow
                                        time="14:30"
                                        name="Kabir Singh"
                                        type="Consultation"
                                        active
                                    />

                                </div>


                                <div className="mt-4 flex items-center justify-between">

                                    <span className="text-xs text-gray-500">
                                        Next appointment in 42 min
                                    </span>

                                    <span className="text-xs font-semibold">
                                        View schedule →
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* BOTTOM TRUST LINE */}

                    <div className="relative z-10 flex items-center gap-6 text-sm text-gray-500">

                        <span className="flex items-center gap-2">
                            <Check size={15} className="text-[#C7F36B]" />
                            Simple scheduling
                        </span>

                        <span className="flex items-center gap-2">
                            <Check size={15} className="text-[#C7F36B]" />
                            Built for professionals
                        </span>

                    </div>

                </section>



                {/* LOGIN SIDE */}

                <section className="relative flex flex-col min-h-screen px-5 sm:px-8 lg:px-12 xl:px-20">


                    {/* MOBILE HEADER */}

                    <header className="flex lg:hidden items-center justify-between pt-5">

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2.5"
                        >
                            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold">
                                A
                            </div>

                            <span className="text-xl font-bold tracking-tight">
                                Apoint
                            </span>
                        </button>


                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="text-sm font-semibold"
                        >
                            Create account
                        </button>

                    </header>



                    {/* FORM AREA */}

                    <div className="flex-1 flex items-center justify-center py-10 lg:py-16">

                        <div className="w-full max-w-[460px]">


                            {/* HEADING */}

                            <div>

                                <div className="lg:hidden w-12 h-1.5 rounded-full bg-[#C7F36B] mb-6"></div>

                                <p className="hidden lg:block text-sm font-semibold text-gray-500 uppercase tracking-[0.16em]">
                                    Welcome back
                                </p>


                                <h1 className="text-[40px] sm:text-5xl lg:text-[54px] font-bold leading-[1.02] tracking-[-0.04em]">
                                    Welcome
                                    <br className="lg:hidden" />
                                    <span className="lg:ml-3">back.</span>
                                </h1>


                                <p className="mt-4 text-[15px] sm:text-base text-gray-500 leading-relaxed max-w-sm">
                                    Sign in to manage your appointments and stay in control of your day.
                                </p>

                            </div>



                            {/* FORM */}

                            <form onSubmit={handleSubmit} className="mt-9 sm:mt-10">


                                {/* EMAIL */}

                                <div>

                                    <label className="block text-sm font-semibold mb-2.5">
                                        Email address
                                    </label>


                                    <div className="relative">

                                        <Mail
                                            size={19}
                                            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                                        />


                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);

                                                if (error) {
                                                    setError("");
                                                }
                                            }}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full h-13 pl-8 pr-3 bg-transparent border-0 border-b border-gray-300 rounded-none outline-none text-[15px] placeholder:text-gray-400 focus:border-black transition-colors"
                                        />

                                    </div>

                                </div>



                                {/* PASSWORD */}

                                <div className="mt-7">

                                    <div className="flex items-center justify-between mb-2.5">

                                        <label className="text-sm font-semibold">
                                            Password
                                        </label>


                                        <button
                                            type="button"
                                            disabled
                                            className="text-xs sm:text-sm text-gray-400 cursor-not-allowed"
                                        >
                                            Forgot password?
                                        </button>

                                    </div>


                                    <div className="relative">

                                        <Lock
                                            size={19}
                                            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                                        />


                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);

                                                if (error) {
                                                    setError("");
                                                }
                                            }}
                                            placeholder="Enter your password"
                                            required
                                            className="w-full h-13 pl-8 pr-16 bg-transparent border-0 border-b border-gray-300 rounded-none outline-none text-[15px] placeholder:text-gray-400 focus:border-black transition-colors"
                                        />


                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>

                                    </div>

                                </div>



                                {/* ERROR */}

                                {error && (
                                    <div className="mt-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                                        <p className="text-sm text-red-600 font-medium">
                                            {error}
                                        </p>
                                    </div>
                                )}



                                {/* SUBMIT */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group mt-8 w-full h-14 rounded-full bg-black text-white flex items-center justify-center gap-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#1c1c1c] transition-all"
                                >
                                    {loading ? (
                                        "Signing in..."
                                    ) : (
                                        <>
                                            Continue to Apoint

                                            <ArrowRight
                                                size={18}
                                                className="group-hover:translate-x-1 transition-transform"
                                            />
                                        </>
                                    )}
                                </button>

                            </form>



                            {/* REGISTER */}

                            <div className="mt-8 flex items-center justify-center gap-1.5 text-sm">

                                <span className="text-gray-500">
                                    New to Apoint?
                                </span>

                                <button
                                    type="button"
                                    onClick={() => navigate("/register")}
                                    className="font-semibold underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-colors"
                                >
                                    Create an account
                                </button>

                            </div>



                            {/* MOBILE MINI PRODUCT MOMENT */}

                            <div className="lg:hidden mt-12 mb-2">

                                <div className="flex items-center justify-between mb-3">

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Once you're in
                                        </p>

                                        <p className="text-sm font-semibold mt-0.5">
                                            Your day stays organized.
                                        </p>
                                    </div>


                                    <div className="w-10 h-10 rounded-xl bg-[#C7F36B] flex items-center justify-center">
                                        <CalendarDays size={19} />
                                    </div>

                                </div>


                                <div className="bg-white border border-black/8 rounded-2xl p-3">

                                    <div className="flex items-center gap-3">

                                        <div className="w-11 h-11 rounded-xl bg-[#F2F2EF] flex items-center justify-center">
                                            <Clock3 size={18} />
                                        </div>


                                        <div className="flex-1">

                                            <div className="flex items-center justify-between gap-3">

                                                <p className="text-sm font-semibold">
                                                    Next appointment
                                                </p>

                                                <span className="text-xs font-medium">
                                                    09:30
                                                </span>

                                            </div>


                                            <p className="mt-1 text-xs text-gray-500">
                                                Aarav Mehta · Consultation
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>



                    {/* SMALL FOOTER */}

                    <footer className="pb-5 text-center text-xs text-gray-400">
                        Simple appointment booking with Apoint.
                    </footer>

                </section>

            </div>

        </div>
    );
}



function ScheduleRow({ time, name, type, active }) {

    return (
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 last:border-0">

            <span className="w-11 text-xs font-semibold">
                {time}
            </span>

            <div className="w-px h-9 bg-gray-200"></div>

            <div className="flex-1 min-w-0">

                <p className="text-sm font-semibold truncate">
                    {name}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                    {type}
                </p>

            </div>

            <span className={`w-2.5 h-2.5 rounded-full ${active ? "bg-[#C7F36B]" : "bg-[#FFE99A]"}`}></span>

        </div>
    );
}