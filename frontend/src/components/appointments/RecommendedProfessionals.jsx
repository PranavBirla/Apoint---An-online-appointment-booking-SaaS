import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecommendedProfessionals({
    professionals,
}) {
    const navigate = useNavigate();

    return (
        <section className="mt-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                    Recommended Professionals
                </h2>

                <button
                    onClick={() =>
                        navigate("/professionals")
                    }
                    className="text-gray-500"
                >
                    View All
                </button>
            </div>

            <div
                className="
          grid
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
        "
            >
                {professionals.map(
                    (professional) => (
                        <div
                            key={professional._id}
                            onClick={() =>
                                navigate(
                                    `/professional/get/${professional._id}`
                                )
                            }
                            className="
                border
                border-gray-200
                rounded-[24px]
                p-5
                cursor-pointer
                hover:border-black
                transition
              "
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={
                                        professional.userId
                                            ?.avatar ||
                                        "https://i.pravatar.cc/100"
                                    }
                                    alt=""
                                    className="
                    w-14
                    h-14
                    rounded-full
                    object-cover
                  "
                                />

                                <div>
                                    <h3 className="font-semibold">
                                        {
                                            professional
                                                .userId
                                                ?.username
                                        }
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {
                                            professional.profession
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between mt-5">
                                <div className="flex items-center gap-1">
                                    <Star
                                        size={16}
                                        fill="black"
                                    />
                                    <span>4.8</span>
                                </div>

                                <span>
                                    ₹
                                    {
                                        professional.consultationFee
                                    }
                                </span>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}