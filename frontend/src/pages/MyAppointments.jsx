import {
    useEffect,
    useState,
} from "react";

import Sidebar from "../components/layout/Sidebar";

import AppointmentHero from "../components/appointments/AppointmentHero";
import FeaturedAppointment from "../components/appointments/FeaturedAppointment";
import AppointmentTabs from "../components/appointments/AppointmentTabs";
import AppointmentList from "../components/appointments/AppointmentList";
import AppointmentDetailsModal from "../components/appointments/AppointmentDetailsModal";
import RecommendedProfessionals from "../components/appointments/RecommendedProfessionals";
import CancelAppointmentModal from "../components/appointments/CancelAppointmentModal";
import { getProfessionals } from "../services/professionalService";


import {
    getMyAppointments,
} from "../services/appointmentService";
import {
    cancelAppointment,
} from "../services/appointmentService"

export default function MyAppointments() {
    const [showCancelModal,
        setShowCancelModal] = useState(false);

    const [recommended,
        setRecommended] = useState([]);

    const [appointments, setAppointments] =
        useState([]);

    const [activeTab, setActiveTab] =
        useState("all");

    const [loading, setLoading] =
        useState(true);

    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleViewAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setShowDetailsModal(true);
    };

    const nextAppointment = appointments
        .filter(
            (appointment) =>
                appointment.status !== "cancelled" &&
                new Date(appointment.date) >= new Date()
        )
        .sort(
            (a, b) =>
                new Date(a.date) - new Date(b.date)
        )[0];

    async function loadAppointments() {
        try {
            const data =
                activeTab === "all"
                    ? await getMyAppointments()
                    : await getMyAppointments(
                        activeTab
                    );

            setAppointments(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCancelAppointment() {
        try {
            await cancelAppointment(
                selectedAppointment.appointmentId
            );

            setShowCancelModal(false);

            setSelectedAppointment(null);

            loadAppointments();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function loadProfessionals() {
            try {
                const data =
                    await getProfessionals();

                setRecommended(
                    data.slice(0, 4)
                );
            } catch (error) {
                console.log(error);
            }
        }

        loadProfessionals();
    }, []);

    useEffect(() => {
        loadAppointments();
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-[#FAFAF7] flex overflow-hidden">

            <Sidebar />

            <main
                className="
            relative
            flex-1
            min-w-0
            overflow-x-hidden
            px-4
            sm:px-6
            lg:px-10
            pt-5
            pb-28
            lg:pb-10
        "
            >

                {/* Decorative Rings */}

                <div className="pointer-events-none absolute -top-52 -right-44 h-[520px] w-[520px] rounded-full border-[55px] border-black/[0.035]" />

                <div className="pointer-events-none absolute bottom-[-180px] -left-44 h-[420px] w-[420px] rounded-full border-[45px] border-black/[0.03]" />

                <div className="relative mx-auto max-w-6xl space-y-8 lg:space-y-10">

                    <AppointmentHero
                        upcomingCount={
                            appointments.filter(
                                (appointment) =>
                                    appointment.status !== "cancelled" &&
                                    new Date(appointment.date) >= new Date()
                            ).length
                        }
                    />

                    <FeaturedAppointment
                        appointment={nextAppointment}
                        onViewDetails={handleViewAppointment}
                        onBrowseProfessionals={() => navigate("/professionals")}
                    />

                    <AppointmentTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <AppointmentList
                        appointments={appointments}
                        loading={loading}
                        setSelectedAppointment={setSelectedAppointment}
                    />

                    <section className="pt-4 border-t border-black/5">

                        <RecommendedProfessionals
                            professionals={recommended}
                        />

                    </section>

                </div>

                <AppointmentDetailsModal
                    appointment={selectedAppointment}
                    onClose={() =>
                        setSelectedAppointment(null)
                    }
                    onCancelClick={() =>
                        setShowCancelModal(true)
                    }
                />

                <CancelAppointmentModal
                    open={showCancelModal}
                    onClose={() =>
                        setShowCancelModal(false)
                    }
                    onConfirm={handleCancelAppointment}
                />

            </main>

        </div>
    );
}


