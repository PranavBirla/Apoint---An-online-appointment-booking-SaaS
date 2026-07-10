import { useNavigate } from "react-router-dom";
import {
    BriefcaseBusiness,
    IndianRupee,
    ChevronRight,
} from "lucide-react";

import Button from "../ui/Button";


export default function ProfessionalCard({ professional }) {

    const navigate = useNavigate();

    function openProfessional() {
        navigate(`/professional/get/${professional._id}`);
    }


    return (
        <article
            onClick={openProfessional}
            className="
                w-full py-5 border-b border-gray-200 cursor-pointer transition-colors active:bg-gray-50
                md:p-6 md:border md:rounded-3xl md:hover:-translate-y-1 md:hover:shadow-sm md:active:bg-white
            "
        >
            <div className="flex items-start gap-4 md:flex-col md:items-center">

                <img
                    src={professional.profileImage}
                    alt={professional.userId?.username || "Professional"}
                    className="w-[72px] h-[72px] shrink-0 rounded-2xl object-cover bg-gray-100 md:w-20 md:h-20 md:rounded-full"
                />


                <div className="flex-1 min-w-0 w-full">

                    {/* NAME AND PROFESSION */}

                    <div className="flex items-start justify-between gap-2 md:flex-col md:items-center">

                        <div className="min-w-0 md:text-center">

                            <h3 className="text-[17px] font-semibold leading-tight truncate md:text-xl">
                                {professional.userId?.username}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500 truncate md:hidden">
                                {professional.specialization || professional.profession}
                            </p>

                            <span className="hidden md:inline-block mt-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
                                {professional.profession}
                            </span>

                        </div>


                        <ChevronRight
                            size={18}
                            className="shrink-0 text-gray-400 mt-1 md:hidden"
                        />

                    </div>


                    {/* MOBILE META */}

                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-3 text-sm text-gray-600 md:hidden">

                        <span>
                            {professional.experienceYears} yrs experience
                        </span>

                        <span className="text-gray-300">•</span>

                        <span className="font-medium text-black">
                            ₹{professional.consultationFee}
                        </span>

                    </div>


                    {/* MOBILE ACTION */}

                    <button
                        type="button"
                        className="mt-3 text-sm font-medium text-black md:hidden"
                    >
                        View availability
                    </button>


                    {/* DESKTOP INFO */}

                    <div className="hidden md:block">

                        <div className="mt-6 space-y-3">

                            <div className="flex items-center gap-2 text-gray-600">
                                <BriefcaseBusiness size={18} />
                                {professional.experienceYears} Years Experience
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <IndianRupee size={18} />
                                ₹{professional.consultationFee}
                            </div>

                        </div>


                        <p className="mt-5 text-gray-500 text-sm line-clamp-2">
                            {professional.bio}
                        </p>


                        <Button
                            className="w-full mt-6"
                            onClick={(e) => {
                                e.stopPropagation();
                                openProfessional();
                            }}
                        >
                            Book Appointment
                        </Button>

                    </div>

                </div>

            </div>
        </article>
    );
}