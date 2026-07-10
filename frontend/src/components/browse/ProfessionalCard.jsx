import { useNavigate } from "react-router-dom";

import {
    ArrowUpRight,
    BriefcaseBusiness,
    CalendarDays,
    ChevronRight,
    IndianRupee,
} from "lucide-react";


export default function ProfessionalCard({
    professional,
}) {

    const navigate = useNavigate();


    const name =
        professional.userId?.username ||
        "Professional";


    const profession =
        professional.profession ||
        "Professional";


    const specialization =
        professional.specialization ||
        "General practice";


    function openProfessional() {

        navigate(
            `/professional/get/${professional._id}`
        );

    }


    return (
        <article
            onClick={openProfessional}
            className="group w-full cursor-pointer border-b border-black/[0.06] md:border md:border-black/[0.06] md:bg-white md:rounded-[24px] md:p-3 md:hover:-translate-y-1 md:hover:shadow-[0_20px_55px_rgba(0,0,0,0.07)] transition-all duration-300"
        >


            {/* ================================================= */}
            {/* MOBILE */}
            {/* ================================================= */}

            <div className="md:hidden flex items-start gap-3.5 py-4">


                {/* AVATAR */}

                <ProfessionalAvatar
                    professional={professional}
                    name={name}
                    mobile
                />


                {/* CONTENT */}

                <div className="flex-1 min-w-0 pt-0.5">

                    <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">

                            <h3 className="text-[16px] font-bold tracking-[-0.025em] truncate">
                                {name}
                            </h3>

                            <p className="mt-1 text-xs font-medium text-gray-500 truncate">
                                {profession}

                                {professional.specialization &&
                                    ` · ${specialization}`
                                }
                            </p>

                        </div>


                        <ChevronRight
                            size={18}
                            className="mt-0.5 text-gray-300 shrink-0"
                        />

                    </div>


                    <div className="flex items-center gap-2 mt-3">

                        <span className="text-[11px] font-semibold text-gray-500">
                            {professional.experienceYears || 0} yrs
                        </span>

                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>

                        <span className="text-[11px] font-bold">
                            ₹{professional.consultationFee || 0}
                        </span>

                    </div>


                    <div className="mt-3 flex items-center gap-1.5 text-xs font-bold">
                        View availability
                        <ArrowUpRight size={13} />
                    </div>

                </div>

            </div>



            {/* ================================================= */}
            {/* DESKTOP */}
            {/* ================================================= */}

            <div className="hidden md:block">


                {/* IDENTITY AREA */}

                <div className="relative overflow-hidden bg-[#F5F5F2] rounded-[20px] p-4">


                    {/* SUBTLE SIGNATURE CIRCLE */}

                    <div className="absolute -top-14 -right-14 w-36 h-36 rounded-full border-[28px] border-black/[0.025] pointer-events-none"></div>


                    <div className="relative z-10 flex items-start gap-3.5">


                        {/* AVATAR */}

                        <ProfessionalAvatar
                            professional={professional}
                            name={name}
                        />


                        {/* IDENTITY */}

                        <div className="flex-1 min-w-0 pt-0.5">

                            <div className="flex items-center gap-2">

                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400">

                                    <span className="w-1.5 h-1.5 rounded-full bg-[#92C83E]"></span>

                                    {profession}

                                </span>

                            </div>


                            <h3 className="mt-2 text-lg font-bold tracking-[-0.035em] truncate">
                                {name}
                            </h3>


                            <p className="mt-1 text-xs font-medium text-gray-500 truncate">
                                {specialization}
                            </p>

                        </div>


                        {/* ARROW */}

                        <div className="w-9 h-9 rounded-[12px] bg-white border border-black/[0.05] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-black group-hover:text-white">

                            <ArrowUpRight
                                size={15}
                                className="transition-transform duration-300 group-hover:rotate-45"
                            />

                        </div>

                    </div>

                </div>



                {/* DETAILS */}

                <div className="px-1 pt-4 pb-1">


                    {/* STATS */}

                    <div className="grid grid-cols-2">

                        <ProfessionalStat
                            icon={BriefcaseBusiness}
                            value={`${professional.experienceYears || 0} yrs`}
                            label="Experience"
                        />


                        <ProfessionalStat
                            icon={IndianRupee}
                            value={`₹${professional.consultationFee || 0}`}
                            label="Consultation"
                            bordered
                        />

                    </div>



                    {/* BIO */}

                    {professional.bio && (

                        <p className="mt-4 px-1 text-xs leading-5 text-gray-500 line-clamp-2 min-h-[40px]">
                            {professional.bio}
                        </p>

                    )}



                    {/* BOOKING ACTION */}

                    <button
                        type="button"
                        onClick={(e) => {

                            e.stopPropagation();

                            openProfessional();

                        }}
                        className="mt-4 w-full overflow-hidden rounded-[16px] bg-black text-white text-left transition-all duration-300 active:scale-[0.99]"
                    >

                        <div className="flex items-center gap-3 px-3 py-3">

                            <div className="w-10 h-10 rounded-[12px] bg-[#C7F36B] text-black flex items-center justify-center shrink-0">

                                <CalendarDays size={17} />

                            </div>


                            <div className="flex-1 min-w-0">

                                <p className="text-[10px] font-medium text-white/45">
                                    Appointment
                                </p>

                                <p className="mt-0.5 text-sm font-semibold">
                                    View available times
                                </p>

                            </div>


                            <div className="w-8 h-8 rounded-[10px] bg-white/[0.08] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">

                                <ChevronRight size={16} />

                            </div>

                        </div>

                    </button>

                </div>

            </div>

        </article>
    );
}



function ProfessionalAvatar({
    professional,
    name,
    mobile = false,
}) {

    const sizeClass = mobile
        ? "w-[76px] h-[86px] rounded-[16px]"
        : "w-[68px] h-[68px] rounded-[18px]";


    return (
        <div className={`relative ${sizeClass} overflow-hidden bg-[#C7F36B] shrink-0`}>

            {professional.profileImage ? (

                <img
                    src={professional.profileImage}
                    alt={name}
                    className="w-full h-full object-cover"
                />

            ) : (

                <div className="w-full h-full flex items-center justify-center text-xl font-bold">
                    {name[0]?.toUpperCase()}
                </div>

            )}


            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 rounded-full bg-[#C7F36B] border-2 border-white"></div>

        </div>
    );
}



function ProfessionalStat({
    icon: Icon,
    value,
    label,
    bordered = false,
}) {

    return (
        <div className={`px-3 py-1 ${bordered ? "border-l border-black/[0.07]" : ""}`}>

            <div className="flex items-center gap-2">

                <Icon
                    size={14}
                    className="text-gray-400"
                />

                <span className="text-sm font-bold tracking-[-0.02em]">
                    {value}
                </span>

            </div>


            <p className="mt-1 text-[10px] font-medium text-gray-400">
                {label}
            </p>

        </div>
    );
}