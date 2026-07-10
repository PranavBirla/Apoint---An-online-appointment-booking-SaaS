import {
    BriefcaseBusiness,
    BadgeIndianRupee,
    UserRound,
    Image,
    AlignLeft,
    Save,
    Sparkles,
} from "lucide-react";

import CustomSelect from "../ui/CustomSelect";

import { PROFESSIONS } from "../../constants/profession";
import { SPECIALIZATIONS } from "../../constants/specializations";


export default function ProfessionalProfileForm({
    profile,
    setProfile,
    onSubmit,
    loading,
    isEditMode,
}) {

    const bioLength = profile.bio?.length || 0;

    const fee = Number(profile.consultationFee);
    const experience = Number(profile.experienceYears);


    const feeError =
        profile.consultationFee !== "" &&
        (fee < 100 || fee > 10000);


    const experienceError =
        profile.experienceYears !== "" &&
        (experience < 0 || experience > 70);


    const bioError =
        profile.bio !== "" &&
        (bioLength < 20 || bioLength > 500);


    const isFormValid =
        profile.profession &&
        profile.specialization &&
        profile.bio &&
        bioLength >= 20 &&
        bioLength <= 500 &&
        profile.consultationFee !== "" &&
        profile.experienceYears !== "" &&
        !feeError &&
        !experienceError;


    function updateField(field, value) {

        setProfile(prev => ({
            ...prev,
            [field]: value,
        }));

    }


    return (
        <form
            onSubmit={onSubmit}
            className="overflow-hidden bg-white border border-black/[0.06] rounded-[24px] sm:rounded-[28px]"
        >


            {/* IDENTITY */}

            <FormSection
                icon={BriefcaseBusiness}
                title="Professional identity"
                number="01"
            >

                <div className="grid sm:grid-cols-2 gap-4">

                    <CustomSelect
                        label="Profession"
                        value={profile.profession}
                        options={PROFESSIONS}
                        placeholder="Select profession"
                        onChange={(value) =>
                            setProfile(prev => ({
                                ...prev,
                                profession: value,
                                specialization: "",
                            }))
                        }
                    />


                    <CustomSelect
                        label="Specialization"
                        value={profile.specialization}
                        options={
                            SPECIALIZATIONS[
                                profile.profession
                            ] || []
                        }
                        placeholder="Select specialization"
                        onChange={(value) =>
                            updateField(
                                "specialization",
                                value
                            )
                        }
                    />

                </div>

            </FormSection>



            {/* PRACTICE */}

            <FormSection
                icon={BadgeIndianRupee}
                title="Practice details"
                number="02"
                bordered
            >

                <div className="grid grid-cols-2 gap-3 sm:gap-4">

                    <InputField
                        label="Experience"
                        suffix="years"
                        type="number"
                        min="0"
                        max="70"
                        placeholder="5"
                        value={profile.experienceYears}
                        onChange={(e) =>
                            updateField(
                                "experienceYears",
                                e.target.value
                            )
                        }
                        error={
                            experienceError
                                ? "0–70 years"
                                : ""
                        }
                    />


                    <InputField
                        label="Consultation fee"
                        prefix="₹"
                        type="number"
                        min="100"
                        max="10000"
                        placeholder="500"
                        value={profile.consultationFee}
                        onChange={(e) =>
                            updateField(
                                "consultationFee",
                                e.target.value
                            )
                        }
                        error={
                            feeError
                                ? "₹100–₹10,000"
                                : ""
                        }
                    />

                </div>

            </FormSection>



            {/* STORY */}

            <FormSection
                icon={UserRound}
                title="About your work"
                number="03"
                bordered
            >

                <div className="space-y-4">


                    {/* IMAGE */}

                    <div>

                        <label className="block mb-2 text-xs font-semibold text-gray-500">
                            Profile image
                        </label>


                        <div className="flex items-center gap-3 bg-[#F5F5F2] rounded-[16px] px-3 py-2.5 border border-transparent focus-within:bg-white focus-within:border-black/15 transition-all">

                            <div className="w-10 h-10 rounded-[12px] bg-white border border-black/[0.06] flex items-center justify-center shrink-0">
                                <Image size={16} />
                            </div>


                            <input
                                type="url"
                                value={profile.profileImage}
                                onChange={(e) =>
                                    updateField(
                                        "profileImage",
                                        e.target.value
                                    )
                                }
                                placeholder="Paste image URL"
                                className="flex-1 min-w-0 bg-transparent outline-none text-sm font-medium placeholder:text-gray-400"
                            />

                        </div>

                    </div>



                    {/* BIO */}

                    <div>

                        <div className="flex items-center justify-between mb-2">

                            <label className="text-xs font-semibold text-gray-500">
                                Professional bio
                            </label>

                            <span className={`text-[11px] font-semibold ${bioLength > 500 ? "text-red-500" : "text-gray-400"}`}>
                                {bioLength}/500
                            </span>

                        </div>


                        <div className={`relative bg-[#F5F5F2] rounded-[18px] border transition-all focus-within:bg-white ${bioError ? "border-red-200" : "border-transparent focus-within:border-black/15"}`}>

                            <div className="absolute top-4 left-4 w-9 h-9 rounded-[11px] bg-white border border-black/[0.06] flex items-center justify-center">
                                <AlignLeft size={15} />
                            </div>


                            <textarea
                                rows={6}
                                value={profile.bio}
                                onChange={(e) =>
                                    updateField(
                                        "bio",
                                        e.target.value
                                    )
                                }
                                placeholder="Share your experience, expertise and approach..."
                                className="w-full min-h-[170px] bg-transparent outline-none resize-none pl-[66px] pr-4 pt-4 pb-4 text-sm leading-6 placeholder:text-gray-400"
                            />

                        </div>


                        {bioError && (

                            <p className="mt-2 text-xs font-medium text-red-500">
                                Bio must contain 20–500 characters.
                            </p>

                        )}

                    </div>

                </div>

            </FormSection>



            {/* SAVE BAR */}

            <div className="flex items-center justify-between gap-4 bg-[#FAFAF7] border-t border-black/[0.06] px-4 py-4 sm:px-6">

                <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-gray-400">

                    <Sparkles size={14} />

                    Changes appear in preview

                </div>


                <button
                    type="submit"
                    disabled={loading || !isFormValid}
                    className="w-full sm:w-auto h-[50px] px-6 rounded-[15px] bg-black text-white flex items-center justify-center gap-2 text-sm font-semibold hover:bg-black/85 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none"
                >

                    <Save size={16} />

                    {loading
                        ? "Saving..."
                        : isEditMode
                            ? "Save changes"
                            : "Create profile"
                    }

                </button>

            </div>

        </form>
    );
}



function FormSection({
    icon: Icon,
    title,
    number,
    bordered = false,
    children,
}) {

    return (
        <section className={`p-4 sm:p-6 ${bordered ? "border-t border-black/[0.06]" : ""}`}>

            <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-[13px] bg-[#C7F36B] flex items-center justify-center">
                        <Icon size={17} />
                    </div>

                    <h2 className="text-base sm:text-lg font-semibold tracking-[-0.02em]">
                        {title}
                    </h2>

                </div>

                <span className="text-[11px] font-bold text-gray-300">
                    {number}
                </span>

            </div>

            {children}

        </section>
    );
}



function InputField({
    label,
    prefix,
    suffix,
    error,
    ...props
}) {

    return (
        <div className="min-w-0">

            <label className="block mb-2 text-xs font-semibold text-gray-500">
                {label}
            </label>


            <div className={`h-[58px] flex items-center gap-2 bg-[#F5F5F2] rounded-[15px] px-4 border transition-all focus-within:bg-white ${error ? "border-red-200" : "border-transparent focus-within:border-black/15"}`}>

                {prefix && (
                    <span className="text-sm font-semibold text-gray-400">
                        {prefix}
                    </span>
                )}


                <input
                    {...props}
                    className="w-full min-w-0 bg-transparent outline-none text-sm font-semibold placeholder:text-gray-400"
                />


                {suffix && (
                    <span className="text-xs font-medium text-gray-400 shrink-0">
                        {suffix}
                    </span>
                )}

            </div>


            {error && (

                <p className="mt-1.5 text-[11px] font-medium text-red-500">
                    {error}
                </p>

            )}

        </div>
    );
}