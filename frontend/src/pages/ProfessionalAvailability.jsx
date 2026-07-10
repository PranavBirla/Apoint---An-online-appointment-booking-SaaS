import { useEffect, useMemo, useState } from "react";

import ProfessionalSidebar from "../components/layout/ProfessionalSidebar";
import ProfessionalTopbar from "../components/professional/ProfessionalTopbar";

import AvailabilitySettingsCard from "../components/professional/AvailabilitySettingsCard";
import AvailabilityGrid from "../components/professional/AvailabilityGrid";
import EmptyAvailabilityState from "../components/professional/EmptyAvailabilityState";

import {
    getMyAvailability,
    createAvailability,
    updateAvailability
} from "../services/availabilityService";

import { useToast } from "../context/ToastContext";

import {
    CalendarDays,
    Clock3,
    CalendarCheck2
} from "lucide-react";


export default function ProfessionalAvailability() {

    const [loading, setLoading] = useState(true);
    const [availability, setAvailability] = useState([]);
    const [slotDuration, setSlotDuration] = useState(30);

    const {
        showSuccess,
        showError
    } = useToast();


    async function loadAvailability() {

        try {

            const data = await getMyAvailability();

            setAvailability(
                data.availability || []
            );

            if (data.availability?.length) {

                setSlotDuration(
                    data.availability[0].slotDuration
                );

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }


    useEffect(() => {
        loadAvailability();
    }, []);


    async function handleSave(availabilityData) {

        try {

            if (availabilityData.availabilityId) {

                await updateAvailability(
                    availabilityData.availabilityId,
                    {
                        startTime: availabilityData.startTime,
                        endTime: availabilityData.endTime,
                        slotDuration: availabilityData.slotDuration,
                        isActive: availabilityData.isActive,
                    }
                );

                showSuccess("Availability updated successfully");

            } else {

                await createAvailability({
                    dayOfWeek: availabilityData.dayOfWeek,
                    startTime: availabilityData.startTime,
                    endTime: availabilityData.endTime,
                    slotDuration: availabilityData.slotDuration,
                });

                showSuccess("Availability added successfully");

            }

            await loadAvailability();

        } catch (error) {

            console.log(error);

            showError(
                error?.response?.data?.message ||
                "Failed to save availability"
            );

        }

    }


    const activeDays = useMemo(() => {

        return availability.filter(
            item => item.isActive
        ).length;

    }, [availability]);


    if (loading) {

        return (
            <div className="flex min-h-screen bg-[#FAFAF7]">

                <ProfessionalSidebar />

                <main className="flex-1 min-w-0 px-4 pt-5 pb-24 sm:px-6 lg:px-8 lg:py-8">

                    <div className="animate-pulse">

                        <div className="h-64 rounded-[28px] bg-gray-100"></div>

                        <div className="mt-6 h-28 rounded-[24px] bg-gray-100"></div>

                        <div className="mt-6 h-[500px] rounded-[28px] bg-gray-100"></div>

                    </div>

                </main>

            </div>
        );

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
                            Schedule
                        </p>

                        <h1 className="mt-1 text-[32px] font-bold tracking-[-0.04em]">
                            Availability
                        </h1>

                    </div>



                    {/* HERO */}

                    <section className="relative overflow-hidden bg-[#C7F36B] rounded-[26px] sm:rounded-[30px] p-5 sm:p-7 lg:p-10">

                        <div className="absolute -top-20 -right-20 w-60 h-60 sm:w-72 sm:h-72 rounded-full border-[44px] sm:border-[52px] border-black/[0.04] pointer-events-none"></div>

                        <div className="absolute -bottom-24 right-16 sm:right-36 w-52 h-52 sm:w-64 sm:h-64 rounded-full border-[38px] sm:border-[46px] border-black/[0.035] pointer-events-none"></div>


                        <div className="relative z-10">


                            {/* DESKTOP */}

                            <div className="hidden lg:flex items-end justify-between gap-10">

                                <div>

                                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-black/50">
                                        Weekly schedule
                                    </p>

                                    <h1 className="mt-3 text-5xl xl:text-6xl font-bold tracking-[-0.05em] leading-none">
                                        Your time,
                                        <br />
                                        your rules.
                                    </h1>

                                </div>


                                <div className="flex gap-3">

                                    <HeroStat
                                        icon={CalendarCheck2}
                                        value={activeDays}
                                        label="Active days"
                                    />

                                    <HeroStat
                                        icon={Clock3}
                                        value={`${slotDuration}m`}
                                        label="Slot length"
                                    />

                                </div>

                            </div>



                            {/* MOBILE */}

                            <div className="lg:hidden">

                                <div className="flex items-start justify-between">

                                    <div>

                                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/50">
                                            Your week
                                        </p>

                                        <div className="mt-3 flex items-end gap-2">

                                            <span className="text-[52px] font-bold leading-none tracking-[-0.06em]">
                                                {activeDays}
                                            </span>

                                            <span className="pb-1 text-sm font-semibold text-black/55">
                                                active days
                                            </span>

                                        </div>

                                    </div>


                                    <div className="w-11 h-11 rounded-[14px] bg-black text-white flex items-center justify-center">
                                        <CalendarDays size={19} />
                                    </div>

                                </div>


                                <div className="mt-6 inline-flex items-center gap-2 bg-black/[0.07] rounded-full px-3.5 py-2">

                                    <Clock3 size={14} />

                                    <span className="text-xs font-semibold">
                                        {slotDuration} min appointments
                                    </span>

                                </div>

                            </div>

                        </div>

                    </section>



                    {/* SLOT DURATION */}

                    <div className="mt-6">
                        <AvailabilitySettingsCard
                            slotDuration={slotDuration}
                            setSlotDuration={setSlotDuration}
                        />
                    </div>



                    {/* EMPTY STATE */}

                    {!availability.length && (

                        <div className="mt-6">
                            <EmptyAvailabilityState />
                        </div>

                    )}



                    {/* WEEK */}

                    <section className="mt-8 lg:mt-10">

                        <div className="mb-4">

                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                                Your week
                            </p>

                            <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-[-0.035em]">
                                Working hours
                            </h2>

                        </div>


                        <AvailabilityGrid
                            availability={availability}
                            slotDuration={slotDuration}
                            onSave={handleSave}
                        />

                    </section>

                </div>

            </main>

        </div>
    );
}



function HeroStat({
    icon: Icon,
    value,
    label
}) {

    return (
        <div className="min-w-[150px] bg-black/[0.07] rounded-[20px] p-4">

            <div className="flex items-center justify-between">

                <p className="text-3xl font-bold tracking-[-0.04em]">
                    {value}
                </p>

                <Icon size={18} className="text-black/45" />

            </div>

            <p className="mt-2 text-xs font-semibold text-black/50">
                {label}
            </p>

        </div>
    );
}