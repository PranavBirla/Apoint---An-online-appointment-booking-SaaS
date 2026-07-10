import {
    BriefcaseBusiness,
    BadgeIndianRupee,
    Check,
} from "lucide-react";


export default function ProfessionalProfilePreview({
    profile,
    completion,
}) {

    return (
        <aside className="lg:sticky lg:top-8">


            {/* LABEL */}

            <div className="hidden lg:flex items-center justify-between mb-3 px-1">

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Live preview
                </p>

                <div className="flex items-center gap-1.5">

                    <span className="w-1.5 h-1.5 rounded-full bg-[#92C83E]"></span>

                    <span className="text-[11px] font-semibold text-gray-400">
                        Updating
                    </span>

                </div>

            </div>



            {/* PROFILE CARD */}

            <div className="overflow-hidden bg-white border border-black/[0.06] rounded-[26px] sm:rounded-[30px]">


                {/* VISUAL HEADER */}

                <div className="relative h-[150px] sm:h-[180px] bg-black overflow-hidden">

                    <div className="absolute -top-20 -right-16 w-56 h-56 rounded-full border-[44px] border-white/[0.05]"></div>

                    <div className="absolute -bottom-24 -left-16 w-52 h-52 rounded-full border-[40px] border-white/[0.04]"></div>


                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">

                        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/70">
                            Public profile
                        </span>

                    </div>

                </div>



                {/* IDENTITY */}

                <div className="relative px-5 sm:px-6 pb-6">


                    {/* AVATAR */}

                    <div className="-mt-12 relative z-10">

                        {profile.profileImage ? (

                            <img
                                src={profile.profileImage}
                                alt="Professional profile"
                                className="w-24 h-24 rounded-[24px] object-cover border-[5px] border-white bg-gray-100"
                            />

                        ) : (

                            <div className="w-24 h-24 rounded-[24px] bg-[#C7F36B] border-[5px] border-white flex items-center justify-center text-3xl font-bold">
                                {profile.profession?.[0] || "P"}
                            </div>

                        )}

                    </div>



                    <div className="mt-4">

                        <div className="flex items-center gap-2">

                            <h2 className="text-2xl font-bold tracking-[-0.035em]">
                                {profile.profession || "Your profession"}
                            </h2>


                            {completion === 100 && (

                                <span className="w-5 h-5 rounded-full bg-[#C7F36B] flex items-center justify-center">
                                    <Check size={12} strokeWidth={3} />
                                </span>

                            )}

                        </div>


                        <p className="mt-1 text-sm font-medium text-gray-500">
                            {profile.specialization || "Specialization"}
                        </p>

                    </div>



                    {/* STATS */}

                    <div className="grid grid-cols-2 gap-2.5 mt-6">

                        <PreviewStat
                            icon={BriefcaseBusiness}
                            value={`${profile.experienceYears || 0} yrs`}
                            label="Experience"
                        />

                        <PreviewStat
                            icon={BadgeIndianRupee}
                            value={`₹${profile.consultationFee || 0}`}
                            label="Consultation"
                        />

                    </div>



                    {/* BIO */}

                    <div className="mt-6 pt-5 border-t border-black/[0.06]">

                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                            About
                        </p>


                        <p className={`mt-2 text-sm leading-6 ${profile.bio ? "text-gray-700" : "text-gray-400"}`}>
                            {profile.bio ||
                                "Your professional bio will appear here."
                            }
                        </p>

                    </div>



                    {/* MOCK CLIENT CTA */}

                    <button
                        type="button"
                        disabled
                        className="mt-6 w-full h-[52px] rounded-[15px] bg-black text-white text-sm font-semibold opacity-100"
                    >
                        Book appointment
                    </button>

                </div>

            </div>



            {/* COMPLETION */}

            <div className="mt-3 bg-[#C7F36B] rounded-[20px] p-4">

                <div className="flex items-center justify-between">

                    <p className="text-sm font-semibold">
                        Profile completion
                    </p>

                    <span className="text-sm font-bold">
                        {completion}%
                    </span>

                </div>


                <div className="mt-3 h-2 bg-black/10 rounded-full overflow-hidden">

                    <div
                        className="h-full bg-black rounded-full transition-all duration-500"
                        style={{
                            width: `${completion}%`,
                        }}
                    />

                </div>

            </div>

        </aside>
    );
}



function PreviewStat({
    icon: Icon,
    value,
    label,
}) {

    return (
        <div className="bg-[#F5F5F2] rounded-[16px] p-3.5">

            <Icon size={15} className="text-gray-400" />

            <p className="mt-3 text-base font-bold tracking-[-0.02em]">
                {value}
            </p>

            <p className="mt-0.5 text-[10px] font-medium text-gray-400">
                {label}
            </p>

        </div>
    );
}