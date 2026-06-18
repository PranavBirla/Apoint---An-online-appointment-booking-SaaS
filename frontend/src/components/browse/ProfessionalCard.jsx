import { useNavigate } from "react-router-dom";
import {
    BriefcaseBusiness,
    IndianRupee,
} from "lucide-react";

import Button from "../ui/Button";


export default function ProfessionalCard({
    
    professional,
}) {
    const navigate = useNavigate();
    return (
        <div
            className="
          border
          border-gray-200
          rounded-3xl
          p-6
          hover:-translate-y-1
          hover:shadow-sm
          transition-all
        "
        >
            <div className="flex flex-col items-center">
                <img
                    src={professional.userId.avatar}
                    alt=""
                    className="w-20 h-20 rounded-full object-cover"
                />

                <h3 className="mt-4 text-xl font-semibold">
                    {professional.userId.username}
                </h3>

                <span className="mt-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
                    {professional.profession}
                </span>
            </div>

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
                onClick={() =>
                    navigate(`/professional/get/${professional._id}`)
                }
            >
                Book Appointment
            </Button>
        </div>
    );
}