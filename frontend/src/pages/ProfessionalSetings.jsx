import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Mail,
    ShieldCheck,
    BriefcaseBusiness,
    Sun,
    ChevronRight,
    LogOut,
    LockKeyhole,
    X,
    ArrowUpRight,
    UserRound,
} from "lucide-react";

import ProfessionalSidebar from "../components/layout/ProfessionalSidebar";
import ProfessionalTopbar from "../components/professional/ProfessionalTopbar";

import { useAuth } from "../context/AuthContext";


export default function ProfessionalSettings() {

    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();


    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const [logoutLoading, setLogoutLoading] = useState(false);


    const initials = useMemo(() => {

        if (!user?.username) return "P";

        const parts = user.username
            .trim()
            .split(" ")
            .filter(Boolean);


        if (parts.length === 1) {
            return parts[0][0]?.toUpperCase();
        }


        return (
            parts[0][0] +
            parts[parts.length - 1][0]
        ).toUpperCase();

    }, [user]);


    async function handleLogout() {

        try {

            setLogoutLoading(true);

            await logout();

            navigate("/login");

        } catch (error) {

            console.log(error);

        } finally {

            setLogoutLoading(false);

        }

    }


    return (
        <div className="flex min-h-screen bg-[#FAFAF7]">

            <ProfessionalSidebar />


            <main className="flex-1 min-w-0 px-4 pt-5 pb-24 sm:px-6 lg:px-8 lg:py-8">

                <ProfessionalTopbar />


                <div className="w-full max-w-[1500px] mx-auto">


                    {/* MOBILE TITLE */}

                    <div className="lg:hidden mb-5">

                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                            Account
                        </p>

                        <h1 className="mt-1 text-[32px] font-bold tracking-[-0.04em]">
                            Settings
                        </h1>

                    </div>



                    {/* DESKTOP HERO */}

                    <section className="hidden lg:block relative overflow-hidden bg-[#C7F36B] rounded-[30px] p-10">

                        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border-[60px] border-black/[0.04] pointer-events-none"></div>

                        <div className="absolute bottom-[-130px] right-[280px] w-72 h-72 rounded-full border-[50px] border-black/[0.035] pointer-events-none"></div>


                        <div className="relative z-10 flex items-end justify-between gap-12">

                            <div>

                                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-black/50">
                                    Workspace settings
                                </p>

                                <h1 className="mt-3 text-5xl xl:text-6xl font-bold tracking-[-0.055em] leading-[0.95]">
                                    Your account,
                                    <br />
                                    your workspace.
                                </h1>

                            </div>


                            <div className="w-[320px] bg-black/[0.07] rounded-[22px] p-4 flex items-center gap-4">

                                <UserAvatar
                                    user={user}
                                    initials={initials}
                                    size="large"
                                />


                                <div className="min-w-0">

                                    <p className="font-bold text-lg truncate">
                                        {user?.username || "Professional"}
                                    </p>

                                    <p className="mt-1 text-xs font-medium text-black/50 truncate">
                                        {user?.email}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>



                    {/* MOBILE PROFILE IDENTITY */}

                    <section className="lg:hidden relative overflow-hidden bg-[#C7F36B] rounded-[24px] p-4">

                        <div className="absolute -top-16 -right-14 w-44 h-44 rounded-full border-[34px] border-black/[0.04] pointer-events-none"></div>


                        <div className="relative z-10 flex items-center gap-3">

                            <UserAvatar
                                user={user}
                                initials={initials}
                            />


                            <div className="flex-1 min-w-0">

                                <h2 className="text-lg font-bold tracking-[-0.025em] truncate">
                                    {user?.username || "Professional"}
                                </h2>

                                <p className="mt-0.5 text-xs font-medium text-black/50 truncate">
                                    {user?.email}
                                </p>

                            </div>


                            <span className="px-2.5 py-1.5 rounded-full bg-black text-white text-[9px] font-semibold uppercase tracking-[0.08em] shrink-0">
                                Pro
                            </span>

                        </div>

                    </section>



                    {/* SETTINGS WORKSPACE */}

                    <div className="mt-7 lg:mt-8 grid lg:grid-cols-[minmax(0,1fr)_360px] gap-7 items-start">


                        {/* MAIN SETTINGS */}

                        <div className="space-y-7">


                            {/* ACCOUNT */}

                            <SettingsSection title="Account">

                                <SettingsRow
                                    icon={Mail}
                                    title="Email address"
                                    value={user?.email || "No email"}
                                />


                                <SettingsRow
                                    icon={BriefcaseBusiness}
                                    title="Account type"
                                    value={user?.role || "professional"}
                                    capitalize
                                    last
                                />

                            </SettingsSection>



                            {/* PREFERENCES */}

                            <SettingsSection title="Preferences">

                                <SettingsRow
                                    icon={Sun}
                                    title="Appearance"
                                    value="Light mode"
                                    trailing={
                                        <span className="px-2.5 py-1 rounded-full bg-[#EDF8D8] text-[#5D8125] text-[10px] font-bold uppercase tracking-[0.08em]">
                                            Soon
                                        </span>
                                    }
                                    last
                                />

                            </SettingsSection>



                            {/* SECURITY */}

                            <SettingsSection title="Security">

                                <SettingsRow
                                    icon={LockKeyhole}
                                    title="Account security"
                                    value="Password and access"
                                    trailing={
                                        <ChevronRight
                                            size={18}
                                            className="text-gray-300"
                                        />
                                    }
                                />


                                <button
                                    type="button"
                                    onClick={() => setLogoutModalOpen(true)}
                                    className="group w-full flex items-center gap-3 sm:gap-4 px-1 sm:px-5 py-4 text-left active:bg-[#F5F5F2] sm:hover:bg-[#FAFAF7] transition-colors"
                                >

                                    <div className="w-10 h-10 rounded-[13px] bg-[#FCEAEA] text-[#B34C4C] flex items-center justify-center shrink-0">
                                        <LogOut size={17} />
                                    </div>


                                    <div className="flex-1 min-w-0">

                                        <p className="text-sm font-semibold text-[#A33D3D]">
                                            Log out
                                        </p>

                                        <p className="mt-0.5 text-xs text-gray-400">
                                            Sign out of this device
                                        </p>

                                    </div>


                                    <ChevronRight
                                        size={18}
                                        className="text-gray-300 group-hover:translate-x-0.5 transition-transform"
                                    />

                                </button>

                            </SettingsSection>

                        </div>



                        {/* DESKTOP ACCOUNT PANEL */}

                        <aside className="hidden lg:block sticky top-8">

                            <div className="overflow-hidden bg-black text-white rounded-[28px]">

                                <div className="relative overflow-hidden p-6 pb-8">

                                    <div className="absolute -top-20 -right-16 w-52 h-52 rounded-full border-[40px] border-white/[0.05] pointer-events-none"></div>


                                    <div className="relative z-10">

                                        <div className="w-12 h-12 rounded-[15px] bg-[#C7F36B] text-black flex items-center justify-center">
                                            <ShieldCheck size={20} />
                                        </div>


                                        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                                            Professional workspace
                                        </p>


                                        <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em]">
                                            Account overview
                                        </h2>


                                        <div className="mt-6 space-y-4">

                                            <AccountDetail
                                                label="Signed in as"
                                                value={user?.email || "—"}
                                            />

                                            <AccountDetail
                                                label="Account role"
                                                value={user?.role || "Professional"}
                                                capitalize
                                            />

                                        </div>

                                    </div>

                                </div>


                                <button
                                    type="button"
                                    onClick={() => navigate("/professional/profile")}
                                    className="w-full flex items-center justify-between px-6 py-4 bg-white/[0.06] hover:bg-white/[0.1] transition-colors"
                                >

                                    <span className="text-sm font-semibold">
                                        Manage public profile
                                    </span>

                                    <ArrowUpRight size={17} />

                                </button>

                            </div>


                            <p className="mt-4 text-center text-[11px] font-medium text-gray-400">
                                Apoint MVP · Version 1.0
                            </p>

                        </aside>

                    </div>



                    {/* MOBILE FOOTER */}

                    <p className="lg:hidden mt-8 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-300">
                        Apoint · Version 1.0
                    </p>

                </div>

            </main>



            <LogoutConfirmSheet
                open={logoutModalOpen}
                loading={logoutLoading}
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />

        </div>
    );
}



function SettingsSection({
    title,
    children,
}) {

    return (
        <section>

            <p className="mb-2.5 px-1 sm:px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                {title}
            </p>


            <div className="bg-white sm:border sm:border-black/[0.06] sm:rounded-[24px] overflow-hidden">
                {children}
            </div>

        </section>
    );
}



function SettingsRow({
    icon: Icon,
    title,
    value,
    trailing,
    capitalize = false,
    last = false,
}) {

    return (
        <div className={`flex items-center gap-3 sm:gap-4 px-1 sm:px-5 py-4 ${!last ? "border-b border-black/[0.06]" : ""}`}>

            <div className="w-10 h-10 rounded-[13px] bg-[#F2F2EF] flex items-center justify-center shrink-0">
                <Icon size={17} />
            </div>


            <div className="flex-1 min-w-0">

                <p className="text-sm font-semibold">
                    {title}
                </p>

                <p className={`mt-0.5 text-xs text-gray-400 truncate ${capitalize ? "capitalize" : ""}`}>
                    {value}
                </p>

            </div>


            {trailing}

        </div>
    );
}



function UserAvatar({
    user,
    initials,
    size = "normal",
}) {

    const sizeClass =
        size === "large"
            ? "w-14 h-14 rounded-[17px] text-lg"
            : "w-12 h-12 rounded-[15px] text-base";


    if (user?.avatar) {

        return (
            <img
                src={user.avatar}
                alt="Profile"
                className={`${sizeClass} object-cover bg-white shrink-0`}
            />
        );

    }


    return (
        <div className={`${sizeClass} bg-black text-white flex items-center justify-center font-bold shrink-0`}>
            {initials}
        </div>
    );
}



function AccountDetail({
    label,
    value,
    capitalize = false,
}) {

    return (
        <div className="flex items-center justify-between gap-4 py-3 border-b border-white/[0.08] last:border-0">

            <span className="text-xs text-white/40">
                {label}
            </span>

            <span className={`max-w-[190px] text-xs font-semibold text-right truncate ${capitalize ? "capitalize" : ""}`}>
                {value}
            </span>

        </div>
    );
}



function LogoutConfirmSheet({
    open,
    loading,
    onClose,
    onConfirm,
}) {

    if (!open) return null;


    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-[2px] sm:p-4"
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full sm:max-w-[400px] bg-[#FAFAF7] rounded-t-[28px] sm:rounded-[26px] overflow-hidden shadow-2xl"
            >


                {/* MOBILE HANDLE */}

                <div className="sm:hidden flex justify-center pt-3">
                    <div className="w-10 h-1 rounded-full bg-black/15"></div>
                </div>


                <div className="p-5">

                    <div className="flex items-start justify-between">

                        <div className="w-11 h-11 rounded-[14px] bg-[#C7F36B] flex items-center justify-center">
                            <LogOut size={19} />
                        </div>


                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close logout confirmation"
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-black/[0.06] hover:text-black transition-colors"
                        >
                            <X size={17} />
                        </button>

                    </div>


                    <h2 className="mt-5 text-xl font-bold tracking-[-0.025em]">
                        Log out of Apoint?
                    </h2>


                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                        You'll need to sign in again to manage your appointments and availability.
                    </p>

                </div>


                <div className="grid grid-cols-2 gap-2.5 p-4 pt-1">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="h-12 rounded-[14px] bg-white border border-black/[0.07] text-sm font-semibold active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        Stay signed in
                    </button>


                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="h-12 rounded-[14px] bg-black text-white text-sm font-semibold active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading
                            ? "Logging out..."
                            : "Log out"}
                    </button>

                </div>

            </div>

        </div>
    );
}