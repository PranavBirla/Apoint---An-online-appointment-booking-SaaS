import {
    ArrowLeft,
    BriefcaseBusiness,
    IndianRupee,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


export default function ProfessionalHeader({
    professional,
}) {

    const navigate = useNavigate();

    const name =
        professional?.userId?.username ||
        "Professional";

    const profession =
        professional?.profession ||
        "Professional";

    const specialization =
        professional?.specialization ||
        "General practice";


    return (
        <section className="relative overflow-hidden bg-[#C7F36B] rounded-b-[26px] sm:rounded-[26px] lg:rounded-[30px]">


            {/* DECORATIVE ELEMENTS */}

            <div className="absolute -top-24 -right-24 w-64 h-64 lg:w-80 lg:h-80 rounded-full border-[46px] lg:border-[60px] border-black/[0.04] pointer-events-none"></div>

            <div className="hidden lg:block absolute -bottom-32 right-[28%] w-64 h-64 rounded-full border-[48px] border-black/[0.035] pointer-events-none"></div>


            <div className="relative z-10 px-4 pt-4 pb-5 sm:p-6 lg:p-9">


                {/* MOBILE TOP BAR */}

                <div className="flex items-center gap-3 lg:hidden">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                        className="w-9 h-9 rounded-full bg-black/[0.08] flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <ArrowLeft size={17} />
                    </button>


                    <p className="text-sm font-bold tracking-[-0.02em]">
                        Professional profile
                    </p>

                </div>



                {/* DESKTOP BACK */}

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                    className="hidden lg:flex w-10 h-10 rounded-[13px] bg-black/[0.08] items-center justify-center hover:bg-black/[0.12] active:scale-95 transition-all"
                >
                    <ArrowLeft size={18} />
                </button>



                {/* IDENTITY */}

                <div className="mt-5 flex items-center gap-3 lg:items-end lg:justify-between lg:gap-6">


                    <div className="flex items-center gap-3 lg:gap-4 min-w-0">

                        <ProfessionalAvatar
                            professional={professional}
                            name={name}
                        />


                        <div className="min-w-0">

                            <p className="text-[9px] lg:text-xs font-bold uppercase tracking-[0.12em] text-black/45 truncate">
                                {profession}
                            </p>


                            <h1 className="mt-0.5 text-[22px] sm:text-[26px] lg:text-5xl font-bold tracking-[-0.045em] truncate">
                                {name}
                            </h1>


                            <p className="mt-0.5 text-xs sm:text-sm lg:text-base font-medium text-black/55 truncate">
                                {specialization}
                            </p>

                        </div>

                    </div>



                    {/* DESKTOP STATS */}

                    <div className="hidden lg:grid grid-cols-2 gap-2 w-[340px]">

                        <HeaderStat
                            icon={BriefcaseBusiness}
                            value={`${professional?.experienceYears || 0} years`}
                            label="Experience"
                        />


                        <HeaderStat
                            icon={IndianRupee}
                            value={`₹${professional?.consultationFee || 0}`}
                            label="Consultation"
                        />

                    </div>

                </div>



                {/* MOBILE STATS */}

                <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">

                    <MobileStat
                        value={`${professional?.experienceYears || 0} years`}
                        label="Experience"
                    />


                    <MobileStat
                        value={`₹${professional?.consultationFee || 0}`}
                        label="Consultation"
                    />

                </div>

            </div>

        </section>
    );
}



function ProfessionalAvatar({
    professional,
    name,
}) {

    if (professional?.profileImage) {

        return (
            <div className="relative shrink-0">

                <img
                    src={professional.profileImage}
                    alt={name}
                    className="w-[58px] h-[64px] sm:w-[68px] sm:h-[74px] lg:w-[110px] lg:h-[120px] rounded-[15px] sm:rounded-[17px] lg:rounded-[24px] object-cover bg-white/30"
                />


                <span className="absolute -bottom-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-black border-[3px] border-[#C7F36B]"></span>

            </div>
        );

    }


    return (
        <div className="relative shrink-0">

            <div className="w-[58px] h-[64px] sm:w-[68px] sm:h-[74px] lg:w-[110px] lg:h-[120px] rounded-[15px] sm:rounded-[17px] lg:rounded-[24px] bg-black text-[#C7F36B] flex items-center justify-center text-xl sm:text-2xl lg:text-4xl font-bold">
                {name[0]?.toUpperCase()}
            </div>


            <span className="absolute -bottom-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-black border-[3px] border-[#C7F36B]"></span>

        </div>
    );
}



function MobileStat({
    value,
    label,
}) {

    return (
        <div className="bg-black/[0.06] rounded-[13px] px-3 py-2.5">

            <p className="text-xs font-bold truncate">
                {value}
            </p>

            <p className="mt-0.5 text-[9px] font-semibold text-black/45">
                {label}
            </p>

        </div>
    );
}



function HeaderStat({
    icon: Icon,
    value,
    label,
}) {

    return (
        <div className="bg-black/[0.07] rounded-[16px] p-3">

            <div className="flex items-center gap-2">

                <Icon size={14} />

                <span className="text-sm font-bold truncate">
                    {value}
                </span>

            </div>


            <p className="mt-1 text-[10px] font-semibold text-black/45">
                {label}
            </p>

        </div>
    );
}