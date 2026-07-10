import { ArrowUpRight, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function TodaysAppointments({ appointments = [] }) {

    const navigate = useNavigate();

    const today = appointments.slice(0, 5);


    return (
        <section className="w-full bg-white border border-black/[0.07] rounded-[24px] sm:rounded-[28px] overflow-hidden">


            {/* HEADER */}

            <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 border-b bg-black/[0.07] border-black/[0.06]">

                <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
                        <CalendarDays size={17} />
                    </div>

                    <h3 className="text-[17px] sm:text-xl font-semibold tracking-[-0.02em]">
                        Today's appointments
                    </h3>

                </div>


                <button
                    type="button"
                    onClick={() => navigate("/professional/appointments")}
                    className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold"
                >
                    View all

                    <ArrowUpRight size={15} className="hidden sm:block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

            </div>



            {/* APPOINTMENTS */}

            {today.length > 0 ? (

                <div>

                    {today.map((appointment, index) => (

                        <AppointmentRow
                            key={appointment._id}
                            appointment={appointment}
                            isLast={index === today.length - 1}
                        />

                    ))}

                </div>

            ) : (

                <EmptySchedule />

            )}

        </section>
    );
}



function AppointmentRow({ appointment, isLast }) {

    const isConfirmed = appointment.status === "confirmed";

    const isPending = appointment.status === "pending";


    return (
        <div className={`group relative flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 hover:bg-[#FAFAF7] transition-colors ${!isLast ? "border-b border-black/[0.055]" : ""}`}>


            {/* TIME */}

            <div className="w-[46px] sm:w-[58px] shrink-0">

                <p className="text-sm sm:text-base font-bold tracking-[-0.02em]">
                    {appointment.startTime}
                </p>

            </div>



            {/* TIMELINE */}

            <div className="relative self-stretch flex items-center justify-center">

                <div className={`w-2.5 h-2.5 rounded-full z-10 ${isConfirmed ? "bg-[#92C83E]" : isPending ? "bg-[#F2C94C]" : "bg-gray-300"}`}></div>

            </div>



            {/* CLIENT */}

            <div className="flex-1 min-w-0">

                <p className="text-sm sm:text-[15px] font-semibold truncate">
                    {appointment.clientName}
                </p>

                <p className="mt-0.5 text-[11px] sm:text-xs text-gray-500 capitalize sm:hidden">
                    {appointment.status}
                </p>

            </div>



            {/* DESKTOP STATUS */}

            <div className="hidden sm:flex items-center gap-2">

                <span className={`w-2 h-2 rounded-full ${isConfirmed ? "bg-[#92C83E]" : isPending ? "bg-[#F2C94C]" : "bg-gray-300"}`}></span>

                <span className="text-xs font-semibold capitalize text-gray-600">
                    {appointment.status}
                </span>

            </div>

        </div>
    );
}



function EmptySchedule() {

    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-12 sm:py-16">

            <div className="w-12 h-12 rounded-2xl bg-[#F2F2EF] flex items-center justify-center">
                <CalendarDays size={20} className="text-gray-500" />
            </div>

            <p className="mt-4 font-semibold">
                No appointments today
            </p>

        </div>
    );
}