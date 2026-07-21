import {
    CalendarDays,
    Clock3,
    ArrowRight,
    UserRound,
} from "lucide-react";
import { format } from "date-fns";

export default function FeaturedAppointment({
    appointment,
    onViewDetails,
    onBrowseProfessionals,
}) {
    if (!appointment) {
        return (
            <section className="mt-6 overflow-hidden rounded-[30px] border border-black/5 bg-white p-7 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">

                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                    Appointments
                </div>

                <h2 className="mt-3 text-3xl font-bold text-black">
                    Nothing booked yet
                </h2>

                <p className="mt-3 max-w-md leading-7 text-neutral-500">
                    Find trusted professionals, choose a convenient time,
                    and manage everything from one place.
                </p>

                <button
                    onClick={onBrowseProfessionals}
                    className="mt-8 rounded-2xl bg-black px-6 py-4 font-semibold text-white transition hover:-translate-y-1"
                >
                    Browse Professionals
                </button>
            </section>
        );
    }

    return (
        <section className="mt-6 overflow-hidden rounded-[30px] border border-black/5 bg-white shadow-[0_12px_40px_rgba(0,0,0,.05)]">

            <div className="border-b border-black/5 px-7 py-5">

                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                    Next Appointment
                </p>

            </div>

            <div className="flex flex-col gap-8 p-7 lg:flex-row lg:items-center lg:justify-between">

                <div className="space-y-6">

                    <div>

                        <div className="flex items-center gap-2 text-neutral-500">

                            <CalendarDays size={17} />

                            <span className="text-sm">
                                {format(
                                    new Date(appointment.date),
                                    "EEEE, MMMM d"
                                )}
                            </span>

                        </div>

                        <h2 className="mt-3 text-5xl font-bold tracking-tight text-black">

                            {appointment.startTime}

                        </h2>

                    </div>

                    <div className="flex items-center gap-4">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100">

                            {appointment.professional?.profileImage ? (
                                <img
                                    src={appointment.professional.profileImage}
                                    alt=""
                                    className="h-full w-full rounded-2xl object-cover"
                                />
                            ) : (
                                <UserRound size={26} />
                            )}

                        </div>

                        <div>

                            <h3 className="text-lg font-semibold">

                                {appointment.professional?.name}

                            </h3>

                            <p className="text-neutral-500">

                                {appointment.professional?.profession}

                            </p>

                        </div>

                    </div>

                </div>

                <div className="flex flex-col items-start gap-5 lg:items-end">

                    <div className="rounded-full bg-lime-100 px-4 py-2 text-sm font-semibold text-lime-800">

                        {appointment.status}

                    </div>

                    <button
                        onClick={() => onViewDetails(appointment)}
                        className="group inline-flex items-center gap-3 rounded-2xl bg-black px-6 py-4 font-semibold text-white transition hover:-translate-y-1"
                    >
                        View Details

                        <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                        />

                    </button>

                </div>

            </div>

        </section>
    );
}