import {
    useEffect,
    useState,
} from "react";

import {
    useParams, useNavigate
} from "react-router-dom";

import {
    formatBookingDate,
    formatTimeRange,
} from "../utils/time";

import Sidebar from "../components/layout/Sidebar";

import ProfessionalHeader from "../components/professional/ProfessionalHeader";
import ProfessionalAbout from "../components/professional/ProfessionalAbout";
import WeekCalendar from "../components/professional/WeekCalendar";
import TimeSlots from "../components/professional/TimeSlots";
import BookingPanel from "../components/professional/BookingPanel";

import BookingConfirmationModal from "../modals/BookingConfirmationModal";
import BookingRestrictionModal from "../modals/BookingRestrictionModal";
import SuccessModal from "../components/common/SuccessModal";

import {
    getProfessional,
    getAvailableDays,
    getAvailableSlots,
    createAppointment,
} from "../services/appointmentService";

import {
    formatLocalDate,
} from "../utils/date";


export default function ProfessionalProfile() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [successOpen, setSuccessOpen] = useState(false);

    const [successData, setSuccessData] =
        useState(null);

    const [confirmationOpen, setConfirmationOpen] =
        useState(false);

    const [restrictionModal, setRestrictionModal] =
        useState(null);

    const [professional, setProfessional] =
        useState(null);

    const [availableDays, setAvailableDays] =
        useState([]);

    const [selectedDate, setSelectedDate] =
        useState(null);

    const [slots, setSlots] =
        useState([]);

    const [selectedSlot, setSelectedSlot] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [bookingLoading, setBookingLoading] =
        useState(false);



    /* ===================================================== */
    /* LOAD PROFESSIONAL + AVAILABLE DAYS */
    /* ===================================================== */

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

                console.error(
                    "Unable to load professional:",
                    error
                );

            } finally {

                setLoading(false);

            }

        }


        fetchProfile();

    }, [id]);



    /* ===================================================== */
    /* LOAD SLOTS WHEN DATE CHANGES */
    /* ===================================================== */

    useEffect(() => {

        if (!selectedDate) {

            setSlots([]);
            setSelectedSlot(null);

            return;
        }


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


                setSlots(
                    Array.isArray(availableSlots)
                        ? availableSlots
                        : []
                );


                setSelectedSlot(null);

            } catch (error) {

                console.error(
                    "Unable to load slots:",
                    error
                );


                setSlots([]);
                setSelectedSlot(null);

            }

        }


        fetchSlots();

    }, [selectedDate, id]);



    /* ===================================================== */
    /* BOOK APPOINTMENT */
    /* ===================================================== */

    async function handleBooking() {

        if (
            !selectedDate ||
            !selectedSlot ||
            bookingLoading
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

            setSuccessData({
                professional:
                    professional?.userId?.username,

                profession:
                    professional?.profession,

                date:
                    formatBookingDate(selectedDate),

                time:
                    formatTimeRange(
                        selectedSlot.start,
                        selectedSlot.end
                    ),

                status:
                    "Pending Confirmation",
            });

            setConfirmationOpen(false);

            setSuccessOpen(true);


            const updatedSlots =
                await getAvailableSlots(
                    id,
                    formattedDate
                );


            setSlots(
                Array.isArray(updatedSlots)
                    ? updatedSlots
                    : []
            );


            setSelectedSlot(null);


        } catch (error) {

            const message =
                error?.response?.data?.message ||
                "Unable to book appointment. Please try again.";


            setConfirmationOpen(false);


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



    /* ===================================================== */
    /* LOADING STATE */
    /* ===================================================== */

    if (loading) {

        return (

            <div className="flex min-h-screen bg-[#FAFAF7]">

                <Sidebar />


                <main className="flex-1 min-w-0 px-4 pb-32 sm:px-6 lg:px-8 lg:py-8">

                    <div className="w-full max-w-[1400px] mx-auto">


                        {/* HEADER SKELETON */}

                        <div className="-mx-4 sm:mx-0">

                            <div className="h-[220px] sm:h-[250px] lg:h-[300px] bg-[#E9E9E4] rounded-b-[26px] sm:rounded-[26px] lg:rounded-[30px] animate-pulse"></div>

                        </div>



                        <div className="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-7">

                            <div className="space-y-7 lg:space-y-5">

                                <div className="h-24 rounded-[18px] bg-[#EFEFEB] animate-pulse"></div>

                                <div className="h-28 rounded-[18px] bg-[#EFEFEB] animate-pulse"></div>

                                <div className="h-64 rounded-[18px] bg-[#EFEFEB] animate-pulse"></div>

                            </div>


                            <div className="hidden lg:block h-[350px] rounded-[26px] bg-[#E5E5E0] animate-pulse"></div>

                        </div>

                    </div>

                </main>

            </div>
        );
    }



    /* ===================================================== */
    /* PAGE */
    /* ===================================================== */

    return (

        <div className="flex min-h-screen bg-[#FAFAF7]">

            <Sidebar />


            <main className="flex-1 min-w-0 px-4 pt-0 pb-44 sm:px-6 sm:pt-5 lg:px-8 lg:py-8">

                <div className="w-full max-w-[1400px] mx-auto">


                    {/* HEADER */}

                    <div className="-mx-4 sm:mx-0">

                        <ProfessionalHeader
                            professional={professional}
                        />

                    </div>



                    {/* MAIN BOOKING AREA */}

                    <div className="mt-5 lg:mt-7 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-7 lg:items-start">


                        {/* LEFT CONTENT */}

                        <div className="space-y-7 lg:space-y-5">

                            <ProfessionalAbout
                                professional={professional}
                            />


                            <WeekCalendar
                                availableDays={availableDays}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                            />


                            <TimeSlots
                                slots={slots}
                                selectedDate={selectedDate}
                                selectedSlot={selectedSlot}
                                setSelectedSlot={setSelectedSlot}
                            />

                        </div>



                        {/* DESKTOP SUMMARY + MOBILE FIXED BAR */}

                        <BookingPanel
                            professional={professional}
                            selectedDate={selectedDate}
                            selectedSlot={selectedSlot}
                            onContinue={() =>
                                setConfirmationOpen(true)
                            }
                        />

                    </div>

                </div>

            </main>



            {/* CONFIRMATION */}

            <BookingConfirmationModal
                open={confirmationOpen}
                professional={professional}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                loading={bookingLoading}
                onClose={() =>
                    setConfirmationOpen(false)
                }
                onConfirm={handleBooking}
            />



            {/* RESTRICTION */}

            <BookingRestrictionModal
                isOpen={
                    restrictionModal !== null
                }
                type={restrictionModal}
                onClose={() =>
                    setRestrictionModal(null)
                }
            />

            <SuccessModal
                open={successOpen}
                onClose={() => {
                    setSuccessOpen(false);
                    setSuccessData(null);
                }}
                title="Appointment Booked Successfully"
                description="Your appointment request has been sent to the professional."
                infoCard={successData}
                primaryAction={{
                    label: "View My Appointments",
                    onClick: () => {
                        setSuccessOpen(false);
                        navigate("/appointments");
                    },
                }}
                secondaryAction={{
                    label: "Continue Browsing",
                    onClick: () => {
                        setSuccessOpen(false);
                        navigate("/professionals");
                    },
                }}
            />

        </div>
    );
}