import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    LoaderCircle,
    CheckCircle2,
    XCircle,
    ArrowRight,
    RefreshCcw,
} from "lucide-react";

import axios from "../api/axios";

import { useAuth } from "../context/AuthContext";



export default function VerifyEmail() {

    const { token } = useParams();

    const navigate = useNavigate();

    const {
        fetchUser,
        user,
    } = useAuth();



    /* ===================================================== */
    /* STATE */
    /* ===================================================== */

    const [status, setStatus] =
        useState("loading");

    const [message, setMessage] =
        useState("");

    const [countdown, setCountdown] =
        useState(3);

    const [redirecting, setRedirecting] =
        useState(false);



    /* ===================================================== */
    /* VERIFY EMAIL */
    /* ===================================================== */

    async function verifyEmail() {

        try {

            setStatus("loading");

            const response =
                await axios.post(
                    "/auth/verify-email",
                    {
                        token,
                    }
                );

            setMessage(
                response.data.message
            );

            setStatus("success");

        } catch (error) {

            setStatus("failed");

            setMessage(

                error?.response?.data?.message ||

                "Unable to verify your email."

            );

        }

    }



    /* ===================================================== */
    /* REDIRECT */
    /* ===================================================== */

    async function continueToApp() {

        try {

            setRedirecting(true);

            await fetchUser();

        } catch (error) {

            console.log(error);

        }

        if (
            user?.role === "professional"
        ) {

            navigate(
                "/professional/dashboard"
            );

            return;

        }

        navigate("/professionals");

    }



    /* ===================================================== */
    /* VERIFY ON LOAD */
    /* ===================================================== */

    useEffect(() => {

        if (!token) {

            setStatus("failed");

            setMessage(
                "Verification token is missing."
            );

            return;

        }

        verifyEmail();

    }, [token]);



    /* ===================================================== */
    /* AUTO REDIRECT */
    /* ===================================================== */

    useEffect(() => {

        if (status !== "success")
            return;

        const interval = setInterval(() => {

            setCountdown((value) => {

                if (value <= 1) {

                    clearInterval(interval);

                    continueToApp();

                    return 0;

                }

                return value - 1;

            });

        }, 1000);

        return () => clearInterval(interval);

    }, [status]);



    return (

        <main className="min-h-screen bg-[#FAFAF7] relative overflow-hidden flex items-center justify-center px-5 py-10">

            {/* Decorative Rings */}

            <div className="absolute -top-28 -right-28 w-[420px] h-[420px] rounded-full border-[58px] border-black/[0.035] pointer-events-none"></div>

            <div className="absolute -bottom-36 -left-36 w-[360px] h-[360px] rounded-full border-[50px] border-black/[0.03] pointer-events-none"></div>

            <div className="relative w-full max-w-[560px]">

                {/* ===================================================== */}
                {/* LOADING */}
                {/* ===================================================== */}

                {status === "loading" && (

                    <section
                        aria-live="polite"
                        className="bg-white rounded-[34px] border border-black/[0.05] shadow-[0_18px_55px_rgba(0,0,0,0.05)] px-8 py-12 sm:px-10 sm:py-14 text-center animate-in fade-in duration-300"
                    >

                        <img
                            src="/APOINT_LOGO.png"
                            alt="Apoint"
                            className="w-16 h-16 mx-auto"
                        />

                        <div className="mt-8 flex justify-center">

                            <div className="relative">

                                <div className="absolute inset-0 rounded-full border-4 border-[#C7F36B]/40 animate-ping"></div>

                                <div className="w-16 h-16 rounded-full bg-[#C7F36B] flex items-center justify-center">

                                    <LoaderCircle
                                        size={30}
                                        className="animate-spin text-black"
                                    />

                                </div>

                            </div>

                        </div>

                        <h1 className="mt-8 text-[34px] sm:text-[40px] font-bold tracking-[-0.05em] text-black">

                            Verifying your email...

                        </h1>

                        <p className="mt-4 max-w-md mx-auto text-[15px] leading-7 text-neutral-500">

                            Please wait while we securely verify your account.

                        </p>

                        <div className="mt-10 flex justify-center">

                            <div className="h-1 w-40 rounded-full bg-[#EFEFEB] overflow-hidden">

                                <div className="h-full w-1/2 bg-black animate-pulse rounded-full"></div>

                            </div>

                        </div>

                    </section>

                )}



                {/* ===================================================== */}
                {/* SUCCESS */}
                {/* ===================================================== */}

                {status === "success" && (

                    <section
                        className="bg-white rounded-[34px] border border-black/[0.05] shadow-[0_18px_55px_rgba(0,0,0,0.05)] overflow-hidden animate-in fade-in duration-300"
                    >

                        {/* HEADER */}

                        <div className="relative overflow-hidden bg-[#C7F36B] px-8 pt-10 pb-9">

                            <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full border-[46px] border-black/[0.04]"></div>

                            <div className="absolute -left-16 -bottom-16 w-44 h-44 rounded-full border-[34px] border-black/[0.03]"></div>

                            <div className="relative z-10 flex flex-col items-center">

                                <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">

                                    <CheckCircle2
                                        size={42}
                                        className="text-[#C7F36B]"
                                    />

                                </div>

                                <h1 className="mt-7 text-[34px] sm:text-[40px] font-bold tracking-[-0.05em] text-center">

                                    Email verified successfully

                                </h1>

                                <p className="mt-4 text-center text-[15px] leading-7 text-black/65 max-w-md">

                                    Your email has been verified successfully.
                                    Your account is now ready to use.

                                </p>

                            </div>

                        </div>



                        {/* BODY */}

                        <div className="px-8 py-8">

                            <div className="rounded-[22px] bg-[#F5F5F2] border border-black/[0.05] p-5">

                                <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400 font-semibold">

                                    What's next?

                                </p>

                                <p className="mt-3 text-[15px] leading-7 text-neutral-600">

                                    We'll redirect you automatically to your account.
                                    If nothing happens, you can continue manually.

                                </p>

                            </div>

                            <div className="mt-8">

                                <button
                                    onClick={continueToApp}
                                    disabled={redirecting}
                                    className="group w-full h-[56px] rounded-[18px] bg-black text-white font-semibold flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70"
                                >

                                    {redirecting
                                        ? "Redirecting..."
                                        : "Continue to Apoint"}

                                    <ArrowRight
                                        size={18}
                                        className="transition-transform group-hover:translate-x-1"
                                    />

                                </button>

                            </div>

                            <p className="mt-5 text-center text-sm text-neutral-400">

                                Redirecting automatically in

                                <span className="ml-1 font-bold text-black">

                                    {countdown}s

                                </span>

                            </p>

                        </div>

                    </section>

                )}

                {/* ===================================================== */}
                {/* FAILED */}
                {/* ===================================================== */}

                {status === "failed" && (

                    <section
                        className="bg-white rounded-[34px] border border-black/[0.05] shadow-[0_18px_55px_rgba(0,0,0,0.05)] overflow-hidden animate-in fade-in duration-300"
                    >

                        {/* HEADER */}

                        <div className="relative overflow-hidden px-8 pt-10 pb-9">

                            <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full border-[46px] border-black/[0.035]"></div>

                            <div className="absolute -left-16 -bottom-16 w-44 h-44 rounded-full border-[34px] border-black/[0.03]"></div>

                            <div className="relative z-10 flex flex-col items-center">

                                <div className="w-20 h-20 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">

                                    <XCircle
                                        size={42}
                                        className="text-red-500"
                                    />

                                </div>

                                <h1 className="mt-7 text-[34px] sm:text-[40px] font-bold tracking-[-0.05em] text-center">

                                    Verification failed

                                </h1>

                                <p className="mt-4 text-center text-[15px] leading-7 text-neutral-600 max-w-md">

                                    {message}

                                </p>

                            </div>

                        </div>



                        {/* REASONS */}

                        <div className="px-8">

                            <div className="rounded-[22px] bg-[#F5F5F2] border border-black/[0.05] p-5">

                                <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400 font-semibold">

                                    Possible reasons

                                </p>

                                <ul className="mt-4 space-y-3 text-[15px] text-neutral-600">

                                    <li>• Link expired</li>

                                    <li>• Link already used</li>

                                    <li>• Invalid verification link</li>

                                </ul>

                            </div>



                            {/* ACTIONS */}

                            <div className="mt-8 space-y-3">

                                <button
                                    type="button"
                                    onClick={() => {

                                        // TODO:
                                        // Connect Resend Verification Email API

                                        console.log(
                                            "Resend verification email"
                                        );

                                    }}
                                    className="group w-full h-[56px] rounded-[18px] bg-black text-white font-semibold flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                                >

                                    <RefreshCcw
                                        size={18}
                                        className="transition-transform group-hover:rotate-180 duration-500"
                                    />

                                    Resend verification email

                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="w-full h-[56px] rounded-[18px] bg-[#F2F2EF] text-black font-semibold transition-all hover:bg-[#E8E8E3]"
                                >

                                    Back to Login

                                </button>

                            </div>



                            {/* HELPER */}

                            <div className="mt-8 border-t border-black/[0.05] pt-6 pb-8">

                                <p className="text-center text-sm leading-6 text-neutral-400">

                                    Didn't request this verification?

                                    <br />

                                    You can safely ignore this page or contact
                                    support if you believe something is wrong.

                                </p>

                            </div>

                        </div>

                    </section>

                )}

            </div>

        </main>

    );
}
