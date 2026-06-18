import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Shield,
    LogOut,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";

import { useAuth } from "../context/AuthContext";

export default function Profile() {
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
        <div className="flex bg-white min-h-screen">
            <Sidebar />

            <main className="flex-1 p-6 lg:p-10">
                <div className="max-w-4xl mx-auto">
                    {/* HEADER */}

                    <div className="mb-8">
                        <h1 className="text-5xl font-bold tracking-tight">
                            Profile
                        </h1>

                        <p className="text-gray-500 mt-3">
                            Manage your account information.
                        </p>
                    </div>

                    {/* PROFILE CARD */}

                    <div
                        className="
              bg-[#fafafa]
              border
              border-gray-200
              rounded-[28px]
              p-8
            "
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            {/* AVATAR */}

                            <div
                                className="
                  w-24
                  h-24
                  rounded-full
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-bold
                "
                            >
                                {user?.username?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            {/* INFO */}

                            <div>
                                <h2 className="text-3xl font-bold">
                                    {user?.username}
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        {/* DETAILS */}

                        <div className="grid md:grid-cols-3 gap-4 mt-10">
                            <div className="bg-white rounded-2xl p-5 border border-gray-200">
                                <User size={20} />

                                <p className="text-sm text-gray-500 mt-3">
                                    Username
                                </p>

                                <p className="font-medium mt-1">
                                    {user?.username}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-5 border border-gray-200">
                                <Mail size={20} />

                                <p className="text-sm text-gray-500 mt-3">
                                    Email
                                </p>

                                <p className="font-medium mt-1 break-all">
                                    {user?.email}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-5 border border-gray-200">
                                <Shield size={20} />

                                <p className="text-sm text-gray-500 mt-3">
                                    Role
                                </p>

                                <p className="font-medium mt-1 capitalize">
                                    {user?.role}
                                </p>
                            </div>
                        </div>

                        {/* LOGOUT */}

                        <button
                            onClick={handleLogout}
                            className="
                mt-8
                w-full
                h-12
                rounded-xl
                bg-black
                text-white
                font-medium
                flex
                items-center
                justify-center
                gap-2
                hover:opacity-90
                transition
              "
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}