import {
    BriefcaseBusiness,
    IndianRupee,
    Star,
} from "lucide-react";

export default function ProfessionalHeader({
    professional,
}) {
    return (
        <div
            className="
          bg-[#fafafa]
          border
          border-gray-200
          rounded-[28px]
          p-8
        "
        >
            <div className="flex flex-col md:flex-row md:items-center gap-8">
                <img
                    src={
                        professional?.userId?.avatar ||
                        "https://i.pravatar.cc/300"
                    }
                    alt=""
                    className="
              w-28
              h-28
              rounded-full
              object-cover
            "
                />

                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-4xl font-bold tracking-tight">
                            {professional?.userId?.username}
                        </h1>

                        <span
                            className="
                  px-3
                  py-1
                  rounded-full
                  bg-gray-100
                  text-sm
                "
                        >
                            {professional?.profession}
                        </span>
                    </div>

                    <p className="text-gray-500 mt-3">
                        {professional?.specialization}
                    </p>

                    <div className="flex flex-wrap gap-6 mt-6">
                        <div className="flex items-center gap-2">
                            <BriefcaseBusiness size={18} />

                            <span>
                                {professional?.experienceYears}
                                {" "}Years Experience
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <IndianRupee size={18} />

                            <span>
                                ₹
                                {professional?.consultationFee}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Star size={18} />

                            <span>4.9 Rating</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}