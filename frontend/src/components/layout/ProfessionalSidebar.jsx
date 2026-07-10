import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyProfessionalProfile } from "../../services/professionalProfileService";

import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    CalendarDays,
    Clock3,
    UserRound,
    Settings,
} from "lucide-react";

import {
    Link,
    useLocation,
} from "react-router-dom";

export default function ProfessionalSidebar() {
    const { user } = useAuth();

    const [professionalProfile, setProfessionalProfile] = useState(null);

    useEffect(() => {
        async function loadProfessionalProfile() {
            try {
                const profile = await getMyProfessionalProfile();
                setProfessionalProfile(profile);
            } catch (error) {
                console.log("Failed to load professional profile:", error);
            }
        }
        loadProfessionalProfile();
    }, []);

    const [collapsed, setCollapsed] = useState(() => {
        return localStorage.getItem("professionalSidebarCollapsed") === "true";
    });

    const location = useLocation();


    function toggleSidebar() {

        const next = !collapsed;

        setCollapsed(next);

        localStorage.setItem(
            "professionalSidebarCollapsed",
            String(next)
        );

    }


    const navItems = [
        {
            name: "Dashboard",
            mobileName: "Home",
            icon: LayoutDashboard,
            path: "/professional/dashboard",
        },
        {
            name: "Appointments",
            mobileName: "Bookings",
            icon: CalendarDays,
            path: "/professional/appointments",
        },
        {
            name: "Availability",
            mobileName: "Schedule",
            icon: Clock3,
            path: "/professional/availability",
        },
        {
            name: "Profile",
            mobileName: "Profile",
            icon: UserRound,
            path: "/professional/profile",
        },
        {
            name: "Settings",
            mobileName: "Settings",
            icon: Settings,
            path: "/professional/settings",
        },
    ];


    const mobileNavItems = navItems.filter(
        item => item.name !== "Profile"
    );


    return (
        <>

            {/* ================================================= */}
            {/* DESKTOP SIDEBAR */}
            {/* ================================================= */}

            <aside
                className={`hidden lg:flex sticky top-0 h-screen shrink-0 bg-white border-r border-black/[0.06] transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-40 ${collapsed ? "w-[82px]" : "w-[248px]"}`}
            >

                <div className="w-full h-full flex flex-col overflow-hidden">


                    {/* TOP AREA */}

                    <div className={`h-[86px] flex items-center shrink-0 transition-all duration-300 ${collapsed ? "justify-center px-3" : "justify-between px-5"}`}>

                        <div
                            className={`overflow-hidden transition-[width,opacity] duration-300 ease-out ${collapsed ? "w-0 opacity-0" : "w-[130px] opacity-100"}`}
                        >

                            <p className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                                Workspace
                            </p>

                            <h2 className="mt-1 whitespace-nowrap text-lg font-bold tracking-[-0.03em]">
                                Navigation
                            </h2>

                        </div>


                        <button
                            type="button"
                            onClick={toggleSidebar}
                            aria-label={
                                collapsed
                                    ? "Expand sidebar"
                                    : "Collapse sidebar"
                            }
                            className="w-10 h-10 rounded-[13px] bg-[#F3F3F0] flex items-center justify-center shrink-0 hover:bg-[#C7F36B] active:scale-95 transition-all duration-200"
                        >

                            <div className="relative w-[18px] h-[18px]">

                                <ChevronLeft
                                    size={18}
                                    className={`absolute inset-0 transition-all duration-300 ${collapsed ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
                                />

                                <ChevronRight
                                    size={18}
                                    className={`absolute inset-0 transition-all duration-300 ${collapsed ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
                                />

                            </div>

                        </button>

                    </div>



                    {/* NAVIGATION */}

                    <nav className={`mt-4 flex-1 transition-[padding] duration-300 ${collapsed ? "px-3" : "px-4"}`}>

                        <div className="space-y-1.5">

                            {navItems.map((item) => {

                                const Icon = item.icon;

                                const active =
                                    location.pathname === item.path;


                                return (

                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        title={collapsed ? item.name : undefined}
                                        className={`group relative h-[54px] flex items-center rounded-[16px] overflow-hidden transition-colors duration-200 ${collapsed ? "justify-center px-0" : "px-3"} ${active ? "bg-black text-white" : "text-gray-500 hover:bg-[#F3F3F0] hover:text-black"}`}
                                    >

                                        {/* ACTIVE LIME MARKER */}

                                        {active && (

                                            <span
                                                className={`absolute bg-[#C7F36B] transition-all duration-300 ${collapsed ? "left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full" : "left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"}`}
                                            />

                                        )}


                                        {/* ICON */}

                                        <div className={`w-10 h-10 flex items-center justify-center shrink-0 transition-transform duration-200 ${!active ? "group-hover:scale-105" : ""}`}>

                                            <Icon
                                                size={19}
                                                strokeWidth={active ? 2.3 : 1.9}
                                            />

                                        </div>


                                        {/* TEXT
                                            Important:
                                            We NEVER unmount this.
                                            Width + opacity animate instead.
                                        */}

                                        <div
                                            className={`overflow-hidden transition-[width,opacity,margin] duration-300 ease-out ${collapsed ? "w-0 opacity-0 ml-0" : "w-[145px] opacity-100 ml-2"}`}
                                        >

                                            <span className="block whitespace-nowrap text-sm font-semibold">
                                                {item.name}
                                            </span>

                                        </div>

                                    </Link>

                                );

                            })}

                        </div>

                    </nav>



                    {/* BOTTOM BRAND IDENTITY */}

                    <div className={`shrink-0 pb-5 transition-[padding] duration-300 ${collapsed ? "px-3" : "px-4"}`}>

                        <div className={`h-[66px] flex items-center overflow-hidden transition-all duration-300 ${collapsed ? "justify-center px-0 bg-transparent" : "px-3 bg-[#F3F3F0] rounded-[18px]"}`}>

                            {/* LOGO MARK */}

                            <div className="w-10 h-10 rounded-[13px] bg-[#C7F36B] flex items-center justify-center shrink-0 overflow-hidden">

                                {professionalProfile?.profileImage ? (

                                    <img
                                        src={professionalProfile.profileImage}
                                        alt="Professional"
                                        className="w-full h-full object-cover"
                                    />

                                ) : (

                                    <span className="text-sm font-bold text-black">
                                        {getInitials(user?.username)}
                                    </span>

                                )}

                            </div>

                            <div className={`overflow-hidden transition-[width,opacity,margin] duration-300 ease-out ${collapsed ? "w-0 opacity-0 ml-0" : "w-[140px] opacity-100 ml-3"}`}>

                                <p className="whitespace-nowrap text-sm font-bold tracking-[-0.02em] truncate">
                                    {user?.username || "Professional"}
                                </p>

                                <p className="mt-0.5 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">
                                    Professional
                                </p>

                            </div>


                            {/* BRAND TEXT */}

                            <div
                                className={`overflow-hidden transition-[width,opacity,margin] duration-300 ease-out ${collapsed ? "w-0 opacity-0 ml-0" : "w-[140px] opacity-100 ml-3"}`}
                            >

                                <p className="whitespace-nowrap text-sm font-bold tracking-[-0.02em]">
                                    Apoint
                                </p>

                                <p className="mt-0.5 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">
                                    Professional
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </aside>



            {/* ================================================= */}
            {/* MOBILE BOTTOM NAVIGATION */}
            {/* ================================================= */}

            <div className="lg:hidden fixed left-3 right-3 bottom-3 z-50">

                <nav className="relative h-[68px] bg-black/95 backdrop-blur-xl rounded-[22px] shadow-[0_12px_40px_rgba(0,0,0,0.22)] px-1.5">

                    <div className="grid grid-cols-4 h-full">

                        {mobileNavItems.map((item) => {

                            const Icon = item.icon;

                            const active =
                                location.pathname === item.path;


                            return (

                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="relative flex flex-col items-center justify-center gap-1"
                                >

                                    {/* ACTIVE BACKGROUND */}

                                    <div
                                        className={`absolute inset-x-1.5 inset-y-2 rounded-[16px] transition-all duration-300 ease-out ${active ? "bg-[#C7F36B] opacity-100 scale-100" : "opacity-0 scale-90"}`}
                                    />


                                    {/* ICON */}

                                    <div
                                        className={`relative z-10 flex items-center justify-center transition-all duration-300 ${active ? "-translate-y-[1px] text-black" : "text-white/55"}`}
                                    >

                                        <Icon
                                            size={19}
                                            strokeWidth={active ? 2.4 : 1.9}
                                        />

                                    </div>


                                    {/* LABEL */}

                                    <span
                                        className={`relative z-10 text-[9px] leading-none transition-all duration-300 ${active ? "text-black font-bold opacity-100" : "text-white/45 font-medium"}`}
                                    >
                                        {item.mobileName}
                                    </span>

                                </Link>

                            );

                        })}

                    </div>

                </nav>

            </div>

        </>
    );
}

function getInitials(name) {

    if (!name) return "P";

    const words = name.trim().split(" ").filter(Boolean);

    if (words.length === 1) {
        return words[0][0].toUpperCase();
    }

    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}