import {
    useEffect,
    useState,
} from "react";

import Sidebar from "../components/layout/Sidebar";

import AppointmentHero from "../components/appointments/AppointmentHero";
import AppointmentTabs from "../components/appointments/AppointmentTabs";
import AppointmentList from "../components/appointments/AppointmentList";
import AppointmentDetailsModal from "../components/appointments/AppointmentDetailsModal";
import RecommendedProfessionals from "../components/appointments/RecommendedProfessionals";
import CancelAppointmentModal from "../components/appointments/CancelAppointmentModal";
import { getProfessionals } from "../services/professionalService";


import {
    getMyAppointments,
} from "../services/appointmentService";
import{
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

    const [selectedAppointment,
        setSelectedAppointment] =
        useState(null);

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
        <div className="flex bg-white min-h-screen">
            <Sidebar />

            <main className="flex-1 p-6 lg:p-10">
                <div className="max-w-7xl mx-auto">
                    <AppointmentHero />

                    <AppointmentTabs
                        activeTab={activeTab}
                        setActiveTab={
                            setActiveTab
                        }
                    />

                    <AppointmentList
                        appointments={appointments}
                        loading={loading}
                        setSelectedAppointment={
                            setSelectedAppointment
                        }
                    />

                    <RecommendedProfessionals
                        professionals={recommended}
                    />

                    <AppointmentDetailsModal
                        appointment={
                            selectedAppointment
                        }
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
                        onConfirm={
                            handleCancelAppointment
                        }
                    />
                </div>
            </main>
        </div>
    );
}