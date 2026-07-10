import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProfessionalSidebar from "../components/layout/ProfessionalSidebar";
import ProfessionalTopbar from "../components/professional/ProfessionalTopbar";

import ProfessionalProfileHero from "../components/professional/ProfessionalProfileHero";
import ProfessionalProfileForm from "../components/professional/ProfessionalProfileForm";
import ProfessionalProfilePreview from "../components/professional/ProfessionalProfilePreview";

import {
    createProfessionalProfile,
    updateProfessionalProfile,
    getMyProfessionalProfile,
} from "../services/professionalProfileService";


export default function ProfessionalProfileManagement() {

    const navigate = useNavigate();

    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const [mobileView, setMobileView] = useState("edit");

    const [profile, setProfile] = useState({
        profession: "",
        specialization: "",
        bio: "",
        experienceYears: "",
        consultationFee: "",
        profileImage: "",
    });


    useEffect(() => {

        async function loadProfile() {

            try {

                const existingProfile =
                    await getMyProfessionalProfile();

                if (!existingProfile) return;

                setIsEditMode(true);

                setProfile({
                    profession: existingProfile.profession || "",
                    specialization: existingProfile.specialization || "",
                    bio: existingProfile.bio || "",
                    experienceYears: existingProfile.experienceYears || "",
                    consultationFee: existingProfile.consultationFee || "",
                    profileImage: existingProfile.profileImage || "",
                });

            } catch (error) {

                console.log(error);

            }

        }

        loadProfile();

    }, []);


    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            if (isEditMode) {
                await updateProfessionalProfile(profile);
            } else {
                await createProfessionalProfile(profile);
            }

            if (!isEditMode) {
                navigate("/professional/dashboard");
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }


    const completionFields = [
        profile.profession,
        profile.specialization,
        profile.bio,
        profile.experienceYears,
        profile.consultationFee,
        profile.profileImage,
    ];


    const completion = Math.round(
        (
            completionFields.filter(Boolean).length /
            completionFields.length
        ) * 100
    );


    return (
        <div className="flex min-h-screen bg-[#FAFAF7]">

            <ProfessionalSidebar />


            <main className="flex-1 min-w-0 px-4 pt-5 pb-24 sm:px-6 lg:px-8 lg:py-8">

                <ProfessionalTopbar />


                <div className="w-full max-w-[1500px] mx-auto">


                    {/* MOBILE TITLE */}

                    <div className="lg:hidden mb-5">

                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                            Account
                        </p>

                        <h1 className="mt-1 text-[32px] font-bold tracking-[-0.04em]">
                            Profile
                        </h1>

                    </div>


                    <ProfessionalProfileHero
                        completion={completion}
                        isEditMode={isEditMode}
                    />


                    {/* MOBILE VIEW SWITCHER */}

                    <div className="lg:hidden mt-5 grid grid-cols-2 gap-1 bg-[#ECECE8] rounded-[15px] p-1">

                        <button
                            type="button"
                            onClick={() => setMobileView("edit")}
                            className={`h-11 rounded-[11px] text-sm font-semibold transition-all ${mobileView === "edit" ? "bg-black text-white shadow-sm" : "text-gray-500"}`}
                        >
                            Edit profile
                        </button>

                        <button
                            type="button"
                            onClick={() => setMobileView("preview")}
                            className={`h-11 rounded-[11px] text-sm font-semibold transition-all ${mobileView === "preview" ? "bg-black text-white shadow-sm" : "text-gray-500"}`}
                        >
                            Preview
                        </button>

                    </div>


                    {/* DESKTOP WORKSPACE */}

                    <div className="hidden lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)] gap-7 mt-8 items-start">

                        <ProfessionalProfileForm
                            profile={profile}
                            setProfile={setProfile}
                            onSubmit={handleSubmit}
                            loading={loading}
                            isEditMode={isEditMode}
                        />

                        <ProfessionalProfilePreview
                            profile={profile}
                            completion={completion}
                        />

                    </div>


                    {/* MOBILE WORKSPACE */}

                    <div className="lg:hidden mt-5">

                        {mobileView === "edit" ? (

                            <ProfessionalProfileForm
                                profile={profile}
                                setProfile={setProfile}
                                onSubmit={handleSubmit}
                                loading={loading}
                                isEditMode={isEditMode}
                            />

                        ) : (

                            <ProfessionalProfilePreview
                                profile={profile}
                                completion={completion}
                            />

                        )}

                    </div>

                </div>

            </main>

        </div>
    );
}