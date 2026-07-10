import {
    ArrowRight,
    UserRound,
    CheckCircle2,
    Circle,
} from "lucide-react";

import { useNavigate }
    from "react-router-dom";

export default function CreateProfileState() {
    const navigate =
        useNavigate();

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold">
                Welcome to Apoint
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
                Let's get your practice
                ready to receive bookings.
            </p>

            <div
                className="
            mt-8
            bg-[#fafafa]
            border
            border-gray-200
            rounded-[32px]
            p-8
            lg:p-12
          "
            >
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <div
                            className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-white
                  border
                  border-gray-200
                  flex
                  items-center
                  justify-center
                "
                        >
                            <UserRound />
                        </div>

                        <h2 className="text-4xl font-bold mt-6">
                            Complete Your
                            Professional Profile
                        </h2>

                        <p className="text-gray-500 mt-4">
                            Your profile helps
                            clients discover you
                            and confidently book
                            appointments.
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/professional/profile"
                                )
                            }
                            className="
                  mt-8
                  bg-black
                  text-white
                  px-6
                  h-12
                  rounded-xl
                  flex
                  items-center
                  gap-2
                "
                        >
                            Create Profile
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    <div
                        className="
                bg-white
                rounded-[28px]
                border
                border-gray-200
                p-8
              "
                    >
                        <h3 className="font-semibold text-lg">
                            Onboarding Progress
                        </h3>

                        <div className="mt-8 space-y-5">
                            <div className="flex items-center gap-3">
                                <CheckCircle2
                                    className="text-green-600"
                                />
                                <span>
                                    Account Created
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Circle />
                                <span>
                                    Professional Profile
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Circle />
                                <span>
                                    Availability Setup
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}