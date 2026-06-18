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
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const location = useLocation();

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
            name: "My Bookings",
            icon: ClipboardList,
            path: "/bookings",
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
            {/* MOBILE HEADER */}

            <div className="lg:hidden h-16 border-b border-gray-200 bg-white flex items-center justify-between px-5 sticky top-0 z-50">
                <h1 className="text-2xl font-bold">
                    Apoint
                </h1>

                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* MOBILE OVERLAY */}

            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                />
            )}

            {/* SIDEBAR */}

            <aside
                className={`
          fixed lg:sticky top-0 left-0 z-50
          h-screen bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out

          ${collapsed
                        ? "w-[90px]"
                        : "w-[260px]"
                    }

          ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
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
                            onClick={() =>
                                setCollapsed(!collapsed)
                            }
                            className="
                hidden lg:flex
                w-10 h-10
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                hover:bg-gray-50
                transition
              "
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
                                    className={`
                    flex items-center
                    gap-4
                    h-14
                    rounded-2xl
                    px-4
                    transition-all

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
                                className="
                  border
                  border-gray-200
                  rounded-3xl
                  p-5
                  bg-white
                "
                            >
                                <div
                                    className="
                    w-12 h-12
                    rounded-xl
                    bg-gray-100
                    flex items-center
                    justify-center
                  "
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
                                    className="
                    mt-5
                    w-full
                    h-11
                    rounded-xl
                    bg-black
                    text-white
                    font-medium
                    hover:opacity-90
                    transition
                  "
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}