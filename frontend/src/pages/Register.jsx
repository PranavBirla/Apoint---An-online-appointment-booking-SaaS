import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useState } from "react";
import {
    User,
    Mail,
    Lock,
    UserPlus,
    Search,
    CalendarCheck,
} from "lucide-react";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Register() {
    const [role, setRole] = useState("client");

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            await registerUser({
                username,
                email,
                password,
                role,
            });

            alert(
                "Account created successfully"
            );

            navigate("/professionals");
        } catch (error) {
            console.log(error);

            alert(
                error?.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    }



    const features = [
        {
            icon: UserPlus,
            title: "Create Account",
            description: "Get started in under a minute.",
        },
        {
            icon: Search,
            title: "Find Professionals",
            description: "Discover trusted experts nearby.",
        },
        {
            icon: CalendarCheck,
            title: "Manage Everything",
            description:
                "Bookings, schedules and updates in one place.",
        },
    ];



    return (
        <div className="min-h-screen flex bg-white">
            {/* LEFT SECTION */}

            <div className="hidden lg:flex w-1/2 bg-[#f7f7f7] border-r border-gray-200 flex-col">
                {/* LOGO */}

                <div className="px-12 pt-10">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Apoint
                    </h1>
                </div>

                {/* HERO */}

                <div className="px-12 mt-24">
                    <h2 className="text-6xl font-bold leading-[1.05] tracking-tight max-w-lg">
                        Start booking
                        <br />
                        smarter today.
                    </h2>

                    <p className="mt-6 text-xl text-gray-500 max-w-md leading-relaxed">
                        Join thousands of clients and professionals
                        managing appointments effortlessly.
                    </p>
                </div>

                {/* IMAGE */}

                <div className="mt-12 px-12">
                    <div className="overflow-hidden rounded-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop"
                            alt="consultation"
                            className="w-full h-[420px] object-cover"
                        />
                    </div>
                </div>

                {/* FEATURES */}

                <div className="px-12 mt-10 pb-10 space-y-6">
                    {features.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="flex items-start gap-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                                    <Icon size={20} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-black">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT SECTION */}

            <div className="flex-1 flex items-center justify-center px-8 py-12">
                <div className="w-full max-w-lg">
                    <div className="bg-[#fafafa] border border-gray-200 rounded-[28px] p-10 md:p-12">
                        {/* TOP ACCENT */}

                        <div className="w-10 h-1 bg-black rounded-full mb-6" />

                        {/* HEADER */}

                        <h1 className="text-5xl font-bold tracking-tight">
                            Create account
                        </h1>

                        <p className="text-gray-500 text-lg mt-3">
                            Start your journey with Apoint.
                        </p>

                        {/* FORM */}

                        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                            <Input
                                label="Username"
                                icon={User}
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />

                            <Input
                                label="Email"
                                icon={Mail}
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                            <div>
                                <Input
                                    label="Password"
                                    icon={Lock}
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                <p className="text-xs text-gray-500 mt-2">
                                    Minimum 8 characters
                                </p>
                            </div>

                            <Input
                                label="Confirm Password"
                                icon={Lock}
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <div>
                                <label className="block mb-3 text-sm font-semibold">
                                    Choose Role
                                </label>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* CLIENT */}

                                    <button
                                        type="button"
                                        onClick={() => setRole("client")}
                                        className={`
        p-5
        rounded-2xl
        border
        text-left
        transition-all

        ${role === "client"
                                                ? "border-black bg-white"
                                                : "border-gray-200 bg-white hover:border-gray-400"
                                            }
      `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-black">
                                                Client
                                            </h3>

                                            {role === "client" && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-black" />
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Book appointments with professionals.
                                        </p>
                                    </button>

                                    {/* PROFESSIONAL */}

                                    <button
                                        type="button"
                                        onClick={() => setRole("professional")}
                                        className={`
                                            p-5
                                            rounded-2xl
                                            border
                                            text-left
                                            transition-all

                                                ${role === "professional"
                                                ? "border-black bg-white"
                                                : "border-gray-200 bg-white hover:border-gray-400"
                                            }
                                    `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-black">
                                                Professional
                                            </h3>

                                            {role === "professional" && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-black" />
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Accept and manage appointments.
                                        </p>
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </Button>

                            {/* DIVIDER */}

                            <div className="flex items-center gap-4 py-1">
                                <div className="flex-1 h-px bg-gray-200" />

                                <span className="text-sm text-gray-400">
                                    or
                                </span>

                                <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            {/* GOOGLE */}

                            <button
                                type="button"
                                className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-gray-300
                    flex
                    items-center
                    justify-center
                    gap-3
                    font-medium
                    hover:bg-gray-50
                    transition
                  "
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="google"
                                    className="w-5 h-5"
                                />

                                Continue with Google
                            </button>
                        </form>

                        {/* LOGIN LINK */}

                        <p className="text-center mt-8 text-gray-500">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-blue-600 font-medium"
                            >
                                Login
                            </button>
                        </p>
                    </div>

                    {/* TERMS */}

                    <p className="text-center text-sm text-gray-500 mt-10 leading-relaxed">
                        By creating an account, you agree to Apoint's{" "}
                        <span className="text-black font-medium cursor-pointer">
                            Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="text-black font-medium cursor-pointer">
                            Privacy Policy
                        </span>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}