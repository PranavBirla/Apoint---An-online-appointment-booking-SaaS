import { useEffect, useState } from "react";
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

    const [bookingLoading, setBookingLoading] =
        useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const profile =
                    await getProfessional(id);

                setProfessional(profile);

                const days =
                    await getAvailableDays(id);

                setAvailableDays(days);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [id]);

    useEffect(() => {
        if (!selectedDate) return;

        async function fetchSlots() {
            try {
                const formattedDate =
                    selectedDate
                        .toISOString()
                        .split("T")[0];

                const availableSlots =
                    await getAvailableSlots(
                        id,
                        formattedDate
                    );

                setSlots(availableSlots);

                setSelectedSlot(null);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSlots();
    }, [selectedDate, id]);

    async function handleBooking() {
        if (
            !selectedDate ||
            !selectedSlot
        ) {
            return;
        }

        try {
            setBookingLoading(true);

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
                "Appointment booked successfully!"
            );

            const formattedDate =
                selectedDate
                    .toISOString()
                    .split("T")[0];

            const updatedSlots =
                await getAvailableSlots(
                    id,
                    formattedDate
                );

            setSlots(updatedSlots);

            setSelectedSlot(null);
        } catch (error) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setBookingLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex bg-white min-h-screen">
                <Sidebar />

                <main className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="h-64 rounded-[28px] bg-gray-100 animate-pulse" />

                        <div className="h-52 rounded-[28px] bg-gray-100 animate-pulse" />

                        <div className="h-44 rounded-[28px] bg-gray-100 animate-pulse" />
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex bg-white min-h-screen">
            <Sidebar />

            <main className="flex-1 p-6 lg:p-10">
                <div className="max-w-6xl mx-auto">
                    {/* HEADER */}

                    <ProfessionalHeader
                        professional={professional}
                    />

                    {/* ABOUT */}

                    <div className="mt-6">
                        <ProfessionalAbout
                            professional={professional}
                        />
                    </div>

                    {/* CALENDAR */}

                    <div className="mt-6">
                        <WeekCalendar
                            availableDays={availableDays}
                            selectedDate={selectedDate}
                            setSelectedDate={
                                setSelectedDate
                            }
                        />
                    </div>

                    {/* SLOT + BOOKING */}

                    <div className="grid lg:grid-cols-3 gap-6 mt-6">
                        {/* LEFT */}

                        <div className="lg:col-span-2">
                            <TimeSlots
                                slots={slots}
                                selectedSlot={
                                    selectedSlot
                                }
                                setSelectedSlot={
                                    setSelectedSlot
                                }
                            />
                        </div>

                        {/* RIGHT */}

                        <div>
                            <BookingPanel
                                professional={
                                    professional
                                }
                                selectedDate={
                                    selectedDate
                                }
                                selectedSlot={
                                    selectedSlot
                                }
                                handleBooking={
                                    handleBooking
                                }
                                loading={
                                    bookingLoading
                                }
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}