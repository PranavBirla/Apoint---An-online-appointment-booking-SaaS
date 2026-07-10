import {
    Moon,
    Sun,
    Shield,
    Mail,
    LogOut,
    ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";

import { useAuth } from "../context/AuthContext";

export default function Settings() {
    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();

    async function handleLogout() {
        try {
            await logout();

            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex min-h-screen bg-[#fafafa]">
            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 pb-24 lg:pb-10">
                <div className="max-w-5xl mx-auto">

                    {/* HERO */}

                    <div
                        className="
                            bg-white
                            border
                            border-gray-200
                            rounded-[32px]
                            p-8
                            mb-8
                        "
                    >
                        <h1 className="text-5xl font-bold">
                            Settings
                        </h1>

                        <p className="text-gray-500 mt-3 text-lg">
                            Manage your account preferences
                            and security settings.
                        </p>
                    </div>

                    {/* APPEARANCE */}

                    <div
                        className="
                            bg-white
                            border
                            border-gray-200
                            rounded-[32px]
                            p-6
                            mb-6
                        "
                    >
                        <h2 className="text-2xl font-bold">
                            Appearance
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Customize how Apoint looks.
                        </p>

                        <div
                            className="
                                mt-6
                                border
                                border-gray-200
                                rounded-2xl
                                p-5
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="
                                        w-12
                                        h-12
                                        rounded-xl
                                        bg-gray-100
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <Moon size={20} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Theme
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Dark mode coming soon
                                    </p>
                                </div>
                            </div>

                            <button
                                className="
                                    h-11
                                    px-4
                                    rounded-xl
                                    border
                                    border-gray-200
                                    text-sm
                                "
                            >
                                Light
                            </button>
                        </div>
                    </div>

                    {/* ACCOUNT */}

                    <div
                        className="
                            bg-white
                            border
                            border-gray-200
                            rounded-[32px]
                            p-6
                            mb-6
                        "
                    >
                        <h2 className="text-2xl font-bold">
                            Account
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Your account information.
                        </p>

                        <div className="mt-6 space-y-4">

                            <div
                                className="
                                    border
                                    border-gray-200
                                    rounded-2xl
                                    p-5
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <div className="flex gap-4">
                                    <Mail />

                                    <div>
                                        <h3 className="font-medium">
                                            Email
                                        </h3>

                                        <p className="text-gray-500 text-sm">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="
                                    border
                                    border-gray-200
                                    rounded-2xl
                                    p-5
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <div className="flex gap-4">
                                    <Shield />

                                    <div>
                                        <h3 className="font-medium">
                                            Account Role
                                        </h3>

                                        <p className="text-gray-500 text-sm capitalize">
                                            {user?.role}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* SECURITY */}

                    <div
                        className="
                            bg-white
                            border
                            border-gray-200
                            rounded-[32px]
                            p-6
                            mb-6
                        "
                    >
                        <h2 className="text-2xl font-bold">
                            Security
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Manage access to your account.
                        </p>

                        <button
                            onClick={handleLogout}
                            className="
                                mt-6
                                w-full
                                h-14
                                rounded-2xl
                                bg-black
                                text-white
                                flex
                                items-center
                                justify-center
                                gap-3
                                font-medium
                            "
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>

                    {/* FOOTER */}

                    <div className="text-center text-sm text-gray-400 mt-10">
                        Apoint MVP · Version 1.0
                    </div>

                </div>
            </main>
        </div>
    );
}