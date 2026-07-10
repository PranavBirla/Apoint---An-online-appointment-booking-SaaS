import {
    Calendar,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

import { useNavigate }
    from "react-router-dom";

export default function SetupAvailabilityState() {
    const navigate =
        useNavigate();

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold">
                Almost Ready
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
                One final step before
                clients can book you.
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
                            <Calendar />
                        </div>

                        <h2 className="text-4xl font-bold mt-6">
                            Set Your Availability
                        </h2>

                        <p className="text-gray-500 mt-4">
                            Add your available
                            days and time slots
                            so clients can start
                            booking appointments.
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/professional/availability"
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
                            Set Availability
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
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-green-600" />
                                <span>
                                    Account Created
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-green-600" />
                                <span>
                                    Professional Profile
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Calendar />
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