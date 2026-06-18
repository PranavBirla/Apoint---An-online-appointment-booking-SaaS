import Card from "./Card";
import Badge from "./Badge";

export default function AppointmentCard({
    appointment,
}) {
    return (
        <Card>
            <div className="flex justify-between">
                <div>
                    <h3 className="font-semibold text-lg">
                        {appointment.professionalName}
                    </h3>

                    <p className="text-gray-500">
                        {appointment.profession}
                    </p>
                </div>

                <Badge status={appointment.status} />
            </div>

            <div className="mt-6 text-sm">
                <p>
                    {appointment.appointmentDate}
                </p>

                <p className="text-gray-500 mt-1">
                    {appointment.startTime} -{" "}
                    {appointment.endTime}
                </p>
            </div>
        </Card>
    );
}