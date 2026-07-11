import {
    BriefcaseBusiness,
    IndianRupee,
    UserRound,
} from "lucide-react";

export default function ProfessionalAbout({
    professional,
}) {
    return (
        <div
            className="
          bg-white
          border
          border-gray-200
          rounded-[28px]
          p-8
        "
        >
            <h2 className="text-2xl font-semibold">
                About
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
                {professional?.bio}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-[#fafafa] rounded-2xl p-5">
                    <UserRound size={20} />

                    <h3 className="font-medium mt-3">
                        Specialization
                    </h3>

                    <p className="text-gray-500 mt-1">
                        {professional?.specialization}
                    </p>
                </div>

                <div className="bg-[#fafafa] rounded-2xl p-5">
                    <BriefcaseBusiness size={20} />

                    <h3 className="font-medium mt-3">
                        Experience
                    </h3>

                    <p className="text-gray-500 mt-1">
                        {professional?.experienceYears} Years
                    </p>
                </div>

                <div className="bg-[#fafafa] rounded-2xl p-5">
                    <IndianRupee size={20} />

                    <h3 className="font-medium mt-3">
                        Consultation Fee
                    </h3>

                    <p className="text-gray-500 mt-1">
                        ₹{professional?.consultationFee}
                    </p>
                </div>
            </div>
        </div>
    );
}