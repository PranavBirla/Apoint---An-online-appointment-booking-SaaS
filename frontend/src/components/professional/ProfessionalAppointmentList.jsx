import { CalendarX2 } from "lucide-react";
import ProfessionalAppointmentCard from "./ProfessionalAppointmentCard";


export default function ProfessionalAppointmentList({
    appointments,
    loading,
    onSelect,
}) {


    if (loading) {

        return (
            <div className="bg-white rounded-[24px] sm:rounded-[28px] border border-black/[0.06] overflow-hidden">

                {[1, 2, 3, 4].map((item) => (

                    <div
                        key={item}
                        className="flex items-center gap-4 px-4 sm:px-6 py-5 border-b border-black/[0.05] last:border-0"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gray-100 animate-pulse shrink-0"></div>

                        <div className="flex-1">
                            <div className="w-36 h-4 rounded bg-gray-100 animate-pulse"></div>
                            <div className="w-24 h-3 mt-2 rounded bg-gray-100 animate-pulse"></div>
                        </div>
                    </div>

                ))}

            </div>
        );

    }


    if (!appointments.length) {

        return (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">

                <div className="w-14 h-14 rounded-[18px] bg-[#F2F2EF] flex items-center justify-center">
                    <CalendarX2 size={22} className="text-gray-500" />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                    No appointments here
                </h3>

            </div>
        );

    }


    return (
        <section className="bg-white sm:border sm:border-black/[0.06] sm:rounded-[28px] overflow-hidden">

            {appointments.map((appointment, index) => (

                <ProfessionalAppointmentCard
                    key={appointment.appointmentId}
                    appointment={appointment}
                    onClick={() => onSelect(appointment)}
                    isLast={index === appointments.length - 1}
                />

            ))}

        </section>
    );
}