import {
    useEffect,
    useState,
} from "react";

import CreateProfileState from "../components/professional/CreateProfileState";
import SetupAvailabilityState from "../components/professional/SetupAvailabilityState";
import DashboardState from "../components/professional/DashboardState";
import ManualBlockForm from "../components/blockedSlots/ManualBlockForm";
import BlockedSlotsList from "../components/blockedSlots/BlockedSlotsList";
import ManualTimeBlockingSection from "../components/professional/ManualTimeBlockingSection";
import ProfessionalTopbar from "../components/professional/ProfessionalTopbar";

import {
    createBlockedSlot,
    getMyBlockedSlots,
    deleteBlockedSlot
} from "../services/blockedSlotService";

import {
    getMyProfessionalProfile,
    getMyAvailability,
} from "../services/professionalService";
import ProfessionalSidebar from "../components/layout/ProfessionalSidebar";

export default function ProfessionalDashboard() {
    const [loading, setLoading] =
        useState(true);

    const [profile, setProfile] =
        useState(null);

    const [hasAvailability,
        setHasAvailability] =
        useState(false);



    useEffect(() => {
        async function loadData() {
            try {
                const profileData =
                    await getMyProfessionalProfile();

                setProfile(profileData);

                if (!profileData) {
                    setLoading(false);
                    return;
                }

                const availabilityData =
                    await getMyAvailability();

                setHasAvailability(
                    availabilityData.hasAvailability
                );
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    let content;

    if (!profile) {
        content =
            <CreateProfileState />;
    } else if (!hasAvailability) {
        content =
            <SetupAvailabilityState />;
    } else {
        content =
            <DashboardState
                profile={profile}
            />;
    }

    return (
        <div className="flex min-h-screen w-full bg-[#FAFAF7] ">
            <ProfessionalSidebar />

            <main className="flex-1 min-w-0 w-full px-4 pt-5 pb-24 sm:px-6 lg:px-8 lg:py-8">

                <ProfessionalTopbar />

                {loading ? (
                    <div className="animate-pulse">
                        <div className="h-16 bg-gray-100 rounded-xl mb-6" />
                        <div className="h-64 bg-gray-100 rounded-3xl" />
                    </div>
                ) : (
                    content
                )}
            </main>
        </div>
    );
}