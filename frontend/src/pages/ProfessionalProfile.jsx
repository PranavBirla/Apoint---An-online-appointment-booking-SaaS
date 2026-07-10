import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfessionalSidebar from "../components/layout/ProfessionalSidebar";
import Sidebar from "../components/layout/Sidebar"

import ProfessionalHeader from "../components/professional/ProfessionalHeader";
import ProfessionalAbout from "../components/professional/ProfessionalAbout";
import WeekCalendar from "../components/professional/WeekCalendar";
import TimeSlots from "../components/professional/TimeSlots";
import BookingPanel from "../components/professional/BookingPanel";

import BookingRestrictionModal from "../modals/BookingRestrictionModal";

import {
    getProfessional,
    getAvailableDays,
    getAvailableSlots,
    createAppointment,
} from "../services/appointmentService";

import { formatLocalDate } from "../utils/date";

export default function ProfessionalProfile() {
    const { id } = useParams();

    const [restrictionModal, setRestrictionModal] =
        useState(null);

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
                    formatLocalDate(
                        selectedDate
                    );

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

            const formattedDate =
                formatLocalDate(
                    selectedDate
                );

            await createAppointment({
                professionalId: id,

                appointmentDate:
                    formattedDate,

                startTime:
                    selectedSlot.start,

                endTime:
                    selectedSlot.end,
            });

            alert(
                "Appointment booked successfully!"
            );

            const updatedSlots =
                await getAvailableSlots(
                    id,
                    formattedDate
                );

            setSlots(updatedSlots);

            setSelectedSlot(null);

        } catch (error) {

            const message =
                error?.response?.data?.message;

            if (
                message.includes(
                    "3 active appointments"
                )
            ) {
                setRestrictionModal(
                    "maxBookings"
                );

                return;
            }

            if (
                message.includes(
                    "active appointment with this professional"
                )
            ) {
                setRestrictionModal(
                    "existingAppointment"
                );

                return;
            }

            alert(message);

        } finally {
            setBookingLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex bg-white min-h-screen">
                <ProfessionalSidebar />

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

                <BookingRestrictionModal
                    isOpen={
                        restrictionModal !== null
                    }
                    type={
                        restrictionModal
                    }
                    onClose={() =>
                        setRestrictionModal(
                            null
                        )
                    }
                />
            </main>
        </div>
    );
}