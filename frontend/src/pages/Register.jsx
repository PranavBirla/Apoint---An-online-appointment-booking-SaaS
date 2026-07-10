import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useMemo, useState } from "react";

import {
    User,
    Mail,
    Lock,
    ArrowRight,
    CircleCheck,
    Circle,
    CalendarDays,
    BriefcaseBusiness,
    Search,
    Check,
    Sparkles
} from "lucide-react";


function PasswordRule({ valid, text }) {

    return (
        <div className="flex items-center gap-2">

            {valid ? (
                <CircleCheck size={16} className="shrink-0 text-green-600" />
            ) : (
                <Circle size={16} className="shrink-0 text-gray-300" />
            )}

            <span className={`text-xs sm:text-sm ${valid ? "text-green-700" : "text-gray-500"}`}>
                {text}
            </span>

        </div>
    );
}


export default function Register() {

    const navigate = useNavigate();

    const [role, setRole] = useState("client");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const passwordChecks = useMemo(() => {

        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password)
        };

    }, [password]);


    const passwordScore = Object.values(passwordChecks).filter(Boolean).length;


    const passwordStrength = {

        0: {
            text: "",
            color: ""
        },

        1: {
            text: "Weak",
            color: "bg-red-500"
        },

        2: {
            text: "Fair",
            color: "bg-yellow-500"
        },

        3: {
            text: "Good",
            color: "bg-blue-500"
        },

        4: {
            text: "Strong",
            color: "bg-[#92C83E]"
        }

    };


    const passwordsMatch =
        confirmPassword.length > 0 &&
        password === confirmPassword;


    async function handleSubmit(e) {

        e.preventDefault();
        setError("");


        if (!passwordsMatch) {

            setError("Passwords do not match.");
            return;

        }


        if (passwordScore < 4) {

            setError("Please create a stronger password.");
            return;

        }


        try {

            setLoading(true);

            await registerUser({
                username,
                email,
                password,
                role
            });

            navigate("/professionals");

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }

    }


    return (
        <div className="min-h-screen bg-[#FAFAF7] text-[#0A0A0A]">

            <div className="min-h-screen grid lg:grid-cols-[0.88fr_1.12fr]">


                {/* DESKTOP STORY PANEL */}

                <section className="hidden lg:flex relative overflow-hidden bg-[#C7F36B] p-10 xl:p-14 flex-col justify-between">

                    <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border-[60px] border-black"></div>

                    <div className="absolute bottom-20 -left-32 w-72 h-72 rounded-full border-[50px] border-black"></div>


                    {/* LOGO */}

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="relative z-10 flex items-center gap-3 w-fit"
                    >
                        <img className="h-20" src="/APOINT_LOGO.png" alt="A" />

                        <span className="text-2xl font-bold tracking-tight">
                            Apoint
                        </span>
                    </button>


                    {/* STORY */}

                    <div className="relative z-10 my-12 max-w-lg">

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/8 text-sm font-semibold">
                            <Sparkles size={15} />
                            A better way to manage your time
                        </div>


                        <h1 className="mt-6 text-6xl xl:text-7xl font-bold leading-[0.96] tracking-[-0.055em]">
                            Start simple.
                            <br />
                            Stay organized.
                        </h1>


                        <p className="mt-6 max-w-md text-lg text-black/65 leading-relaxed">
                            Whether you're booking an appointment or managing a busy schedule, Apoint keeps the process simple.
                        </p>


                        {/* STORY FLOW */}

                        <div className="mt-10 bg-black rounded-[28px] p-5 text-white">

                            <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                                Your Apoint journey
                            </p>


                            <div className="mt-5 space-y-1">

                                <JourneyRow
                                    number="01"
                                    title="Create your profile"
                                    description="Tell people who you are."
                                />

                                <JourneyRow
                                    number="02"
                                    title="Set your schedule"
                                    description="Choose when you're available."
                                />

                                <JourneyRow
                                    number="03"
                                    title="Start booking"
                                    description="Everything stays in one place."
                                    last
                                />

                            </div>

                        </div>

                    </div>


                    <p className="relative z-10 text-sm font-medium text-black/55">
                        Your schedule. Your rules. Your Apoint.
                    </p>

                </section>



                {/* REGISTER AREA */}

                <section className="relative min-h-screen px-5 sm:px-8 lg:px-12 xl:px-20">


                    {/* MOBILE HEADER */}

                    <header className="flex lg:hidden items-center justify-between pt-5">

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2.5"
                        >
                            <img className="h-16" src="/APOINT_LOGO.png" alt="A" />

                            <span className="text-xl font-bold tracking-tight">
                                Apoint
                            </span>
                        </button>


                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-sm font-semibold"
                        >
                            Sign in
                        </button>

                    </header>



                    {/* FORM CONTAINER */}

                    <div className="max-w-[640px] mx-auto py-10 sm:py-14 lg:py-16">


                        {/* MOBILE ACCENT */}

                        <div className="lg:hidden flex items-center gap-2 mb-6">

                            <div className="w-9 h-1.5 rounded-full bg-[#C7F36B]"></div>

                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-[0.14em]">
                                Join Apoint
                            </span>

                        </div>



                        {/* HEADER */}

                        <div>

                            <p className="hidden lg:block text-sm font-semibold text-gray-500 uppercase tracking-[0.16em]">
                                Get started
                            </p>


                            <h1 className="text-[40px] sm:text-5xl lg:text-[54px] font-bold leading-[1.02] tracking-[-0.04em]">
                                Create your
                                <br className="sm:hidden" />
                                <span className="sm:ml-3">space.</span>
                            </h1>


                            <p className="mt-4 text-[15px] sm:text-base text-gray-500 leading-relaxed max-w-md">
                                A few details and you're ready to start using Apoint.
                            </p>

                        </div>



                        {/* ROLE STEP */}

                        <div className="mt-9">

                            <div className="flex items-center justify-between mb-4">

                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                        Step 01
                                    </p>

                                    <h2 className="mt-1 text-lg font-semibold">
                                        How will you use Apoint?
                                    </h2>
                                </div>

                            </div>


                            <div className="grid grid-cols-2 gap-2 sm:gap-3">


                                {/* CLIENT */}

                                <button
                                    type="button"
                                    onClick={() => setRole("client")}
                                    className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all ${role === "client" ? "bg-black text-white border-black" : "bg-white border-black/10 hover:border-black/30"}`}
                                >

                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === "client" ? "bg-[#C7F36B] text-black" : "bg-[#F2F2EF]"}`}>
                                        <Search size={19} />
                                    </div>


                                    <h3 className="mt-4 font-semibold">
                                        I'm a client
                                    </h3>


                                    <p className={`hidden sm:block mt-1.5 text-sm leading-relaxed ${role === "client" ? "text-gray-400" : "text-gray-500"}`}>
                                        Find and book professionals.
                                    </p>


                                    {role === "client" && (
                                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#C7F36B] text-black flex items-center justify-center">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                    )}

                                </button>



                                {/* PROFESSIONAL */}

                                <button
                                    type="button"
                                    onClick={() => setRole("professional")}
                                    className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all ${role === "professional" ? "bg-black text-white border-black" : "bg-white border-black/10 hover:border-black/30"}`}
                                >

                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === "professional" ? "bg-[#C7F36B] text-black" : "bg-[#F2F2EF]"}`}>
                                        <BriefcaseBusiness size={19} />
                                    </div>


                                    <h3 className="mt-4 font-semibold">
                                        I'm a professional
                                    </h3>


                                    <p className={`hidden sm:block mt-1.5 text-sm leading-relaxed ${role === "professional" ? "text-gray-400" : "text-gray-500"}`}>
                                        Manage your appointments.
                                    </p>


                                    {role === "professional" && (
                                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#C7F36B] text-black flex items-center justify-center">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                    )}

                                </button>

                            </div>


                            {/* DYNAMIC ROLE MESSAGE */}

                            <div className="mt-3 flex items-start gap-3 px-4 py-3 rounded-xl bg-[#F2F2EF]">

                                <div className="w-7 h-7 rounded-lg bg-[#C7F36B] flex items-center justify-center shrink-0">
                                    {role === "professional" ? (
                                        <CalendarDays size={14} />
                                    ) : (
                                        <Search size={14} />
                                    )}
                                </div>


                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">

                                    {role === "professional"
                                        ? "You'll be able to create a professional profile, set availability and manage appointments."
                                        : "You'll be able to discover professionals, view availability and book appointments."}

                                </p>

                            </div>

                        </div>



                        {/* DETAILS STEP */}

                        <form onSubmit={handleSubmit} className="mt-10">

                            <div className="mb-6">

                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.12em]">
                                    Step 02
                                </p>

                                <h2 className="mt-1 text-lg font-semibold">
                                    Your details
                                </h2>

                            </div>



                            {/* USERNAME + EMAIL */}

                            <div className="grid sm:grid-cols-2 gap-7 sm:gap-5">

                                <UnderlineInput
                                    label="Username"
                                    icon={User}
                                    placeholder="Your name"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        if (error) setError("");
                                    }}
                                />

                                <UnderlineInput
                                    label="Email address"
                                    icon={Mail}
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (error) setError("");
                                    }}
                                />

                            </div>



                            {/* PASSWORD */}

                            <div className="mt-7">

                                <UnderlineInput
                                    label="Create password"
                                    icon={Lock}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (error) setError("");
                                    }}
                                    action={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-sm font-medium text-gray-500 hover:text-black"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    }
                                />



                                {/* PASSWORD STRENGTH */}

                                {password.length > 0 && (

                                    <div className="mt-4">

                                        <div className="flex items-center justify-between">

                                            <span className="text-xs font-semibold text-gray-500">
                                                Password strength
                                            </span>

                                            <span className="text-xs font-semibold">
                                                {passwordStrength[passwordScore].text}
                                            </span>

                                        </div>


                                        <div className="grid grid-cols-4 gap-1.5 mt-2">

                                            {[1, 2, 3, 4].map((level) => (

                                                <div
                                                    key={level}
                                                    className={`h-1.5 rounded-full transition-colors ${level <= passwordScore ? passwordStrength[passwordScore].color : "bg-gray-200"}`}
                                                />

                                            ))}

                                        </div>


                                        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">

                                            <PasswordRule
                                                valid={passwordChecks.length}
                                                text="8+ characters"
                                            />

                                            <PasswordRule
                                                valid={passwordChecks.uppercase}
                                                text="Uppercase letter"
                                            />

                                            <PasswordRule
                                                valid={passwordChecks.lowercase}
                                                text="Lowercase letter"
                                            />

                                            <PasswordRule
                                                valid={passwordChecks.number}
                                                text="One number"
                                            />

                                        </div>

                                    </div>

                                )}

                            </div>



                            {/* CONFIRM PASSWORD */}

                            <div className="mt-7">

                                <UnderlineInput
                                    label="Confirm password"
                                    icon={Lock}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Enter it again"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        if (error) setError("");
                                    }}
                                    action={
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="text-sm font-medium text-gray-500 hover:text-black"
                                        >
                                            {showConfirmPassword ? "Hide" : "Show"}
                                        </button>
                                    }
                                />


                                {confirmPassword.length > 0 && (

                                    <div className="mt-2.5 flex items-center gap-2">

                                        <span className={`w-2 h-2 rounded-full ${passwordsMatch ? "bg-[#92C83E]" : "bg-red-500"}`}></span>

                                        <p className={`text-xs font-medium ${passwordsMatch ? "text-green-700" : "text-red-600"}`}>
                                            {passwordsMatch
                                                ? "Passwords match"
                                                : "Passwords don't match"}
                                        </p>

                                    </div>

                                )}

                            </div>



                            {/* ERROR */}

                            {error && (

                                <div className="mt-6 px-4 py-3 rounded-xl bg-red-50 border border-red-100">

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
                                    "Creating your account..."
                                ) : (
                                    <>
                                        Create my Apoint account

                                        <ArrowRight
                                            size={18}
                                            className="group-hover:translate-x-1 transition-transform"
                                        />
                                    </>
                                )}

                            </button>



                            {/* LOGIN */}

                            <div className="mt-7 flex items-center justify-center gap-1.5 text-sm">

                                <span className="text-gray-500">
                                    Already using Apoint?
                                </span>

                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="font-semibold underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-colors"
                                >
                                    Sign in
                                </button>

                            </div>



                            {/* TERMS */}

                            <p className="mt-7 text-center text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                                By creating an account, you agree to Apoint's Terms of Service and Privacy Policy.
                            </p>

                        </form>

                    </div>

                </section>

            </div>

        </div>
    );
}



function UnderlineInput({
    label,
    icon: Icon,
    action,
    ...props
}) {

    return (
        <div>

            <div className="flex items-center justify-between mb-2.5">

                <label className="text-sm font-semibold">
                    {label}
                </label>

                {action}

            </div>


            <div className="relative">

                <Icon
                    size={18}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                />


                <input
                    {...props}
                    required
                    className="w-full h-13 pl-8 pr-3 bg-transparent border-0 border-b border-gray-300 rounded-none outline-none text-[15px] placeholder:text-gray-400 focus:border-black transition-colors"
                />

            </div>

        </div>
    );
}



function JourneyRow({
    number,
    title,
    description,
    last
}) {

    return (
        <div className="flex gap-4">

            <div className="flex flex-col items-center">

                <div className="w-8 h-8 rounded-full bg-[#C7F36B] text-black flex items-center justify-center text-xs font-bold">
                    {number}
                </div>

                {!last && (
                    <div className="w-px flex-1 min-h-8 bg-white/15"></div>
                )}

            </div>


            <div className={`pt-1 ${last ? "pb-1" : "pb-5"}`}>

                <p className="text-sm font-semibold">
                    {title}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                    {description}
                </p>

            </div>

        </div>
    );
}