import { Mail, Lock, Calendar, Shield, Clock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";




export default function Login() {
    const navigate = useNavigate();

    const { fetchUser } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);

            await loginUser({
                email,
                password,
            });

            await fetchUser();

            navigate("/professionals");
        } catch (error) {
            console.log(error);

            alert(
                error?.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    }


    const features = [
        {
            icon: Calendar,
            title: "Easy Booking",
            description: "Book appointments in seconds.",
        },
        {
            icon: Shield,
            title: "Trusted Professionals",
            description: "Verified and experienced experts.",
        },
        {
            icon: Clock,
            title: "Save Time",
            description: "Manage your schedule with ease.",
        },
    ];

    return (
        <div className="min-h-screen flex bg-white">
            {/* LEFT SECTION */}

            <div className="hidden lg:flex w-1/2 bg-[#f7f7f7] border-r border-gray-200 flex-col">
                {/* Logo */}

                <div className="px-12 pt-10">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Apoint
                    </h1>
                </div>

                {/* Hero Content */}

                <div className="px-12 mt-24">
                    <h2 className="text-6xl font-bold leading-[1.05] tracking-tight max-w-md">
                        Your time,
                        <br />
                        well booked.
                    </h2>

                    <p className="mt-6 text-xl text-gray-500 max-w-md leading-relaxed">
                        Book appointments with trusted professionals in
                        just a few clicks.
                    </p>
                </div>

                {/* Image */}

                <div className="mt-12 px-12">
                    <div className="overflow-hidden rounded-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop"
                            alt="workspace"
                            className="w-full h-[420px] object-cover"
                        />
                    </div>
                </div>

                {/* Features */}

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

            <div className="flex-1 flex items-center justify-center px-8">
                <div className="w-full max-w-lg">
                    {/* Form Container */}

                    <div className="bg-[#fafafa] border border-gray-200 rounded-[28px] p-10 md:p-12">
                        <h1 className="text-5xl font-bold tracking-tight">
                            Welcome back
                        </h1>

                        <p className="text-gray-500 text-lg mt-3">
                            Login to continue to Apoint
                        </p>

                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-10 space-y-6"
                        >
                            <Input
                                label="Email"
                                icon={Mail}
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                            <Input
                                label="Password"
                                icon={Lock}
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="text-sm font-medium text-gray-500 hover:text-black transition"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                            >
                                {loading
                                    ? "Logging in..."
                                    : "Login"}
                            </Button>

                            {/* Divider */}

                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px bg-gray-200" />

                                <span className="text-sm text-gray-400">
                                    or
                                </span>

                                <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            {/* Google */}

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

                        {/* Register */}

                        <p className="text-center mt-8 text-gray-500">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/register")}
                                className="text-blue-600 font-medium"
                            >
                                Register
                            </button>
                        </p>
                    </div>

                    {/* Terms */}

                    <p className="text-center text-sm text-gray-500 mt-10 leading-relaxed">
                        By continuing, you agree to Apoint's{" "}
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