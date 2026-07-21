import { useEffect, useMemo, useState } from "react";
import ProfessionalSidebar from "../components/layout/ProfessionalSidebar";
import ProfessionalTopbar from "../components/professional/ProfessionalTopbar";

import ProfessionalAppointmentList from "../components/professional/ProfessionalAppointmentList";
import ProfessionalAppointmentModal from "../components/professional/ProfessionalAppointmentModal";
import AppointmentStatusConfirmModal from "../components/professional/AppointmentStatusConfirmModal";

import {
    getProfessionalAppointments,
    updateAppointmentStatus,
} from "../services/professionalAppointmentService";

import {
    CalendarDays,
    Clock3,
    CheckCircle2,
} from "lucide-react";


export default function ProfessionalAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");

    const [confirmModal, setConfirmModal] = useState({
        open: false,
        type: null,
        appointment: null,
    });

    const [selectedAppointment, setSelectedAppointment] = useState(null);


    async function loadAppointments() {

        try {
            setLoading(true);

            const data =
                activeTab === "all"
                    ? await getProfessionalAppointments()
                    : await getProfessionalAppointments(activeTab);

            setAppointments(data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }


    useEffect(() => {
        loadAppointments();
    }, [activeTab]);


    async function handleConfirm(appointment) {

        try {
            await updateAppointmentStatus(
                appointment.appointmentId,
                "confirmed"
            );

            await loadAppointments();
            setSelectedAppointment(null);

        } catch (error) {
            console.log(error);
        }

    }

    async function handleReject(appointment) {
        try {
            await updateAppointmentStatus(
                appointment.appointmentId,
                "rejected"
            );
            await loadAppointments();
            setSelectedAppointment(null);
        } catch (error) {
            console.log(error);
        }
    }


    async function handleComplete(appointment) {

        try {
            await updateAppointmentStatus(
                appointment.appointmentId,
                "completed"
            );

            await loadAppointments();
            setSelectedAppointment(null);

        } catch (error) {
            console.log(error);
        }

    }


    const stats = useMemo(() => {

        return {
            total: appointments.length,
            pending: appointments.filter(a => a.status === "pending").length,
            confirmed: appointments.filter(a => a.status === "confirmed").length,
            completed: appointments.filter(a => a.status === "completed").length,
        };

    }, [appointments]);


    const tabs = [
        "all",
        "pending",
        "confirmed",
        "completed",
        "cancelled",
        "rejected"
    ];


    return (
        <div className="flex min-h-screen bg-[#FAFAF7]">

            <ProfessionalSidebar />


            <main className="flex-1 min-w-0 px-4 pt-5 pb-24 sm:px-6 lg:px-8 lg:py-8">

                <ProfessionalTopbar />


                <div className="w-full max-w-[1500px] mx-auto">


                    {/* MOBILE PAGE HEADER */}

                    <div className="lg:hidden mb-5">

                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                            Bookings
                        </p>

                        <div className="mt-1 flex items-end justify-between gap-4">

                            <h1 className="text-[32px] font-bold tracking-[-0.04em] leading-tight">
                                Appointments
                            </h1>

                            <span className="text-sm font-medium text-gray-500 pb-1">
                                {stats.total} total
                            </span>

                        </div>

                    </div>



                    {/* SUMMARY HERO */}

                    <section className="relative overflow-hidden bg-[#C7F36B] rounded-[26px] sm:rounded-[30px] p-5 sm:p-7 lg:p-9">

                        <div className="absolute -top-20 -right-20 w-60 h-60 sm:w-72 sm:h-72 rounded-full border-[44px] sm:border-[52px] border-black/[0.04] pointer-events-none"></div>

                        <div className="absolute -bottom-24 right-16 w-52 h-52 rounded-full border-[38px] border-black/[0.035] pointer-events-none"></div>


                        <div className="relative z-10">


                            {/* DESKTOP */}

                            <div className="hidden lg:flex items-end justify-between gap-10">

                                <div>

                                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-black/50">
                                        Appointment management
                                    </p>

                                    <h1 className="mt-3 text-5xl xl:text-6xl font-bold tracking-[-0.05em] leading-none">
                                        Appointments
                                    </h1>

                                </div>


                                <div className="flex items-center gap-3">

                                    <SummaryStat
                                        value={stats.total}
                                        label="Total"
                                    />

                                    <SummaryStat
                                        value={stats.pending}
                                        label="Pending"
                                    />

                                    <SummaryStat
                                        value={stats.confirmed}
                                        label="Confirmed"
                                    />

                                    <SummaryStat
                                        value={stats.completed}
                                        label="Completed"
                                    />

                                </div>

                            </div>



                            {/* MOBILE */}

                            <div className="lg:hidden">

                                <div className="flex items-start justify-between">

                                    <div>

                                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/50">
                                            Overview
                                        </p>

                                        <div className="mt-3 flex items-end gap-2">

                                            <span className="text-[52px] font-bold leading-none tracking-[-0.06em]">
                                                {stats.total}
                                            </span>

                                            <span className="text-sm font-semibold text-black/55 pb-1">
                                                bookings
                                            </span>

                                        </div>

                                    </div>


                                    <div className="w-11 h-11 rounded-[14px] bg-black text-white flex items-center justify-center">
                                        <CalendarDays size={19} />
                                    </div>

                                </div>


                                <div className="mt-6 grid grid-cols-3 gap-2">

                                    <MobileSummary
                                        value={stats.pending}
                                        label="Pending"
                                        icon={Clock3}
                                    />

                                    <MobileSummary
                                        value={stats.confirmed}
                                        label="Confirmed"
                                        icon={CalendarDays}
                                    />

                                    <MobileSummary
                                        value={stats.completed}
                                        label="Done"
                                        icon={CheckCircle2}
                                    />

                                </div>

                            </div>

                        </div>

                    </section>



                    {/* FILTERS */}

                    <div className="mt-6 lg:mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide">

                        <div className="flex items-center gap-1.5 min-w-max">

                            {tabs.map((tab) => (

                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setActiveTab(tab)}
                                    className={`h-10 px-4 rounded-full text-sm font-semibold capitalize transition-all ${activeTab === tab ? "bg-black text-white" : "bg-transparent text-gray-500 hover:bg-black/[0.05] hover:text-black"}`}
                                >
                                    {tab}
                                </button>

                            ))}

                        </div>

                    </div>



                    {/* LIST */}

                    <div className="mt-5 lg:mt-7">

                        <ProfessionalAppointmentList
                            appointments={appointments}
                            loading={loading}
                            onSelect={setSelectedAppointment}
                        />

                    </div>

                </div>



                <ProfessionalAppointmentModal
                    appointment={selectedAppointment}
                    onClose={() => setSelectedAppointment(null)}
                    onConfirm={(appointment) => {
                        setSelectedAppointment(null);

                        setConfirmModal({
                            open: true,
                            type: "confirm",
                            appointment,
                        });
                    }}

                    onReject={(appointment) => {

                        setSelectedAppointment(null);

                        setConfirmModal({
                            open: true,
                            type: "reject",
                            appointment,
                        });

                    }}

                    onComplete={(appointment) => {
                        setSelectedAppointment(null);

                        setConfirmModal({
                            open: true,
                            type: "complete",
                            appointment,
                        });
                    }}
                />


                <AppointmentStatusConfirmModal
                    open={confirmModal.open}
                    variant={confirmModal.type}
                    title={
                        confirmModal.type === "confirm"
                            ? "Confirm Appointment"
                            : confirmModal.type === "reject"
                                ? "Reject Appointment"
                                : "Complete Appointment"
                    }
                    description={
                        confirmModal.type === "confirm"
                            ? "Are you sure you want to confirm this appointment? The client will be notified immediately."
                            : confirmModal.type === "reject"
                                ? "Are you sure you want to reject this appointment? The client will be notified and this booking will be cancelled."
                                : "Are you sure you want to mark this appointment as completed?"
                    }
                    confirmText={
                        confirmModal.type === "confirm"
                            ? "Confirm"
                            : confirmModal.type === "reject"
                                ? "Reject"
                                : "Complete"
                    }
                    onClose={() =>
                        setConfirmModal({
                            open: false,
                            type: null,
                            appointment: null,
                        })
                    }
                    onConfirm={async () => {
                        try {
                            switch (confirmModal.type) {
                                case "confirm":
                                    await handleConfirm(
                                        confirmModal.appointment
                                    );
                                    break;
                                case "reject":
                                    await handleReject(
                                        confirmModal.appointment
                                    );
                                    break;
                                case "complete":
                                    await handleComplete(
                                        confirmModal.appointment
                                    );
                                    break;
                                default:
                                    break;
                            }
                            setConfirmModal({
                                open: false,
                                type: null,
                                appointment: null,
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                />

            </main>

        </div>
    );
}



function SummaryStat({ value, label }) {

    return (
        <div className="min-w-[110px] bg-black/[0.06] rounded-2xl px-5 py-4">

            <p className="text-3xl font-bold tracking-[-0.04em]">
                {value}
            </p>

            <p className="mt-1 text-xs font-semibold text-black/50">
                {label}
            </p>

        </div>
    );
}



function MobileSummary({ value, label, icon: Icon }) {

    return (
        <div className="min-w-0 bg-black/[0.06] rounded-2xl p-3">

            <Icon size={14} className="text-black/45" />

            <p className="mt-3 text-xl font-bold">
                {value}
            </p>

            <p className="text-[10px] font-semibold text-black/50 truncate">
                {label}
            </p>

        </div>
    );
}