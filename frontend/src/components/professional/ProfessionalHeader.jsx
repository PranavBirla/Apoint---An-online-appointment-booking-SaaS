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


    return (
        <section className="relative overflow-hidden bg-[#C7F36B] rounded-[24px] lg:rounded-[30px]">

            <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full border-[54px] border-black/[0.04] pointer-events-none"></div>

            <div className="absolute -bottom-28 right-[30%] w-60 h-60 rounded-full border-[44px] border-black/[0.035] pointer-events-none"></div>


            <div className="relative z-10 p-4 sm:p-6 lg:p-9">

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-[13px] bg-black/[0.08] flex items-center justify-center active:scale-95 transition-transform"
                >
                    <ArrowLeft size={18} />
                </button>


                <div className="mt-5 flex items-start gap-4 lg:items-end lg:justify-between">


                    <div className="flex items-start gap-4 min-w-0">

                        <ProfessionalAvatar
                            professional={professional}
                            name={name}
                        />


                        <div className="min-w-0 pt-1">

                            <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.12em] text-black/45">
                                {professional?.profession}
                            </p>

                            <h1 className="mt-1 text-[25px] lg:text-5xl font-bold tracking-[-0.045em] truncate">
                                {name}
                            </h1>

                            <p className="mt-1 text-sm lg:text-base font-medium text-black/55">
                                {professional?.specialization}
                            </p>

                        </div>

                    </div>



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



                <div className="grid grid-cols-2 gap-2 mt-5 lg:hidden">

                    <HeaderStat
                        icon={BriefcaseBusiness}
                        value={`${professional?.experienceYears || 0} yrs`}
                        label="Experience"
                    />

                    <HeaderStat
                        icon={IndianRupee}
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
            <img
                src={professional.profileImage}
                alt={name}
                className="w-[72px] h-[82px] lg:w-[110px] lg:h-[120px] rounded-[18px] lg:rounded-[24px] object-cover bg-white/30 shrink-0"
            />
        );

    }


    return (
        <div className="w-[72px] h-[82px] lg:w-[110px] lg:h-[120px] rounded-[18px] lg:rounded-[24px] bg-black text-[#C7F36B] flex items-center justify-center text-2xl lg:text-4xl font-bold shrink-0">
            {name[0]?.toUpperCase()}
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

                <span className="text-sm font-bold">
                    {value}
                </span>

            </div>

            <p className="mt-1 text-[10px] font-semibold text-black/45">
                {label}
            </p>

        </div>
    );
}