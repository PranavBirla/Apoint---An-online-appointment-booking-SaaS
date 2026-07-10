import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Home,
    Calendar,
    ClipboardList,
    MessageCircle,
    Heart,
    User,
    Settings,
    BriefcaseBusiness,
    Menu,
    X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(() => {
        return localStorage.getItem("sidebarCollapsed") === "true";
    });
    const [mobileOpen, setMobileOpen] = useState(false);

    const location = useLocation();


    function toggleSidebar() {
        const next = !collapsed;

        setCollapsed(next);

        localStorage.setItem(
            "sidebarCollapsed",
            String(next)
        );
    }

    const navItems = [
        {
            name: "Browse",
            icon: Home,
            path: "/professionals",
        },
        {
            name: "Appointments",
            icon: Calendar,
            path: "/appointments",
        },
        {
            name: "Messages",
            icon: MessageCircle,
            path: "/messages",
        },
        {
            name: "Favorites",
            icon: Heart,
            path: "/favorites",
        },
        {
            name: "Profile",
            icon: User,
            path: "/profile",
        },
        {
            name: "Settings",
            icon: Settings,
            path: "/settings",
        },
    ];

    return (
        <>
            {/* SIDEBAR */}

            <aside
                className={`
                    hidden lg:flex
                    sticky
                    top-0
                    h-screen
                    shrink-0
                    bg-white
                    border-r
                    border-gray-200
                    transition-all
                    duration-300
                    ease-in-out
                
                    ${collapsed
                        ? "w-[90px]"
                        : "w-[260px]"
                    }
                `}
            >
                {/* TOP */}

                <div className="h-full flex flex-col">
                    {/* HEADER */}

                    <div className="flex items-center justify-between p-5">
                        {!collapsed && (
                            <h1 className="text-3xl font-bold tracking-tight">
                                Apoint
                            </h1>
                        )}

                        {/* DESKTOP COLLAPSE */}

                        <button
                            onClick={toggleSidebar}
                            className=" hidden lg:flex w-10 h-10 items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition "
                        >
                            {collapsed ? (
                                <ChevronRight size={18} />
                            ) : (
                                <ChevronLeft size={18} />
                            )}
                        </button>

                        {/* MOBILE CLOSE */}

                        <button
                            onClick={() =>
                                setMobileOpen(false)
                            }
                            className="lg:hidden"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* NAVIGATION */}

                    <div className="px-4 mt-6 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            const active =
                                location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={` flex items-center gap-4 h-14 rounded-2xl px-4 transition-all

                                    ${active
                                            ? "bg-gray-100 text-black"
                                            : "hover:bg-gray-50 text-gray-600"
                                        }
                                    `}
                                >
                                    <Icon size={22} />

                                    {!collapsed && (
                                        <span className="font-medium">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA CARD */}

                    {!collapsed && (
                        <div className="mt-auto p-4">
                            <div
                                className=" border border-gray-200 rounded-3xl p-5 bg-white "
                            >
                                <div
                                    className=" w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center "
                                >
                                    <BriefcaseBusiness
                                        size={22}
                                    />
                                </div>

                                <h3 className="mt-4 font-semibold text-lg">
                                    Become a Professional
                                </h3>

                                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                    Join our platform and grow
                                    your clients.
                                </p>

                                <button
                                    className=" mt-5 w-full h-11 rounded-xl bg-black text-white font-medium hover:opacity-90 transition "
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>


            {/* MOBILE BOTTOM NAV */}

            <div
                className=" lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-16 "
            >
                <div className="grid grid-cols-4 h-full">
                    {[
                        {
                            name: "Browse",
                            icon: Home,
                            path: "/professionals",
                        },
                        {
                            name: "Appointments",
                            icon: Calendar,
                            path: "/appointments",
                        },
                        {
                            name: "Messages",
                            icon: MessageCircle,
                            path: "/messages",
                        },
                        {
                            name: "Profile",
                            icon: User,
                            path: "/profile",
                        },
                    ].map((item) => {
                        const Icon = item.icon;

                        const active =
                            location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className=" flex flex-col items-center justify-center gap-1 "
                            >
                                <Icon
                                    size={20}
                                    className={
                                        active
                                            ? "text-black"
                                            : "text-gray-400"
                                    }
                                />

                                <span
                                    className={` text-[11px]

                                    ${active
                                            ? "text-black font-medium"
                                            : "text-gray-400"
                                        }
                                    `}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}