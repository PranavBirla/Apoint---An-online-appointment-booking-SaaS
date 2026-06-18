import {
    useEffect,
    useState,
} from "react";

import { useParams } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";

import ProfessionalHeader from "../components/professional/ProfessionalHeader";
import ProfessionalAbout from "../components/professional/ProfessionalAbout";
import WeekCalendar from "../components/professional/WeekCalendar";
import TimeSlots from "../components/professional/TimeSlots";
import BookingPanel from "../components/professional/BookingPanel";

import {
    getProfessional,
    getAvailableDays,
    getAvailableSlots,
    createAppointment,
} from "../services/appointmentService";

export default function ProfessionalProfile() {
    const { id } = useParams();

    const [professional, setProfessional] =
        useState(null);

    const [availableDays, setAvailableDays] =
        useState([]);

    const [selectedDate, setSelectedDate] =
        useState(null);

    const [slots, setSlots] = useState([]);

    const [selectedSlot, setSelectedSlot] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const profile =
                    await getProfessional(id);

                setProfessional(profile);

                const days =
                    await getAvailableDays(id);

                setAvailableDays(days);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [id]);

    useEffect(() => {
        if (!selectedDate) return;

        async function loadSlots() {
            try {
                const formattedDate =
                    selectedDate
                        .toISOString()
                        .split("T")[0];

                const data =
                    await getAvailableSlots(
                        id,
                        formattedDate
                    );

                setSlots(data);
            } catch (error) {
                console.log(error);
            }
        }

        loadSlots();
    }, [selectedDate, id]);

    async function handleBooking() {
        try {
            await createAppointment({
                professionalId: id,

                appointmentDate:
                    selectedDate,

                startTime:
                    selectedSlot.start,

                endTime:
                    selectedSlot.end,
            });

            alert(
                "Appointment booked successfully"
            );
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex bg-white min-h-screen">
            <Sidebar />

            <main className="flex-1 p-6 lg:p-10">
                <div className="max-w-6xl mx-auto space-y-6">
                    <ProfessionalHeader
                        professional={professional}
                    />

                    <ProfessionalAbout
                        professional={professional}
                    />

                    <WeekCalendar
                        availableDays={availableDays}
                        selectedDate={selectedDate}
                        setSelectedDate={
                            setSelectedDate
                        }
                    />

                    <TimeSlots
                        slots={slots}
                        selectedSlot={selectedSlot}
                        setSelectedSlot={
                            setSelectedSlot
                        }
                    />

                    <BookingPanel
                        professional={professional}
                        selectedDate={selectedDate}
                        selectedSlot={selectedSlot}
                        handleBooking={
                            handleBooking
                        }
                    />
                </div>
            </main>
        </div>
    );
}