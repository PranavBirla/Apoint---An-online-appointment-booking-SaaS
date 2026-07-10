import AppointmentCard from "./AppointmentCard";

export default function AppointmentList({
    appointments,
    loading,
    setSelectedAppointment,
}) {
    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="
              h-32
              rounded-[28px]
              bg-gray-100
              animate-pulse
            "
                    />
                ))}
            </div>
        );
    }

    if (!appointments.length) {
        return (
            <div
                className="
          border
          border-gray-200
          rounded-[28px]
          p-12
          text-center
        "
            >
                <h3 className="text-2xl font-semibold">
                    No appointments found
                </h3>

                <p className="text-gray-500 mt-3">
                    Book your first appointment
                    to get started.
                </p>
            </div>
        );
    }

    return (
        <section>
            <div className="space-y-4">
                {appointments.map(
                    (appointment) => (
                        <AppointmentCard
                            key={
                                appointment.appointmentId
                            }
                            appointment={
                                appointment
                            }
                            onClick={() =>
                                setSelectedAppointment(
                                    appointment
                                )
                            }
                        />
                    )
                )}
            </div>
        </section>
    );
}