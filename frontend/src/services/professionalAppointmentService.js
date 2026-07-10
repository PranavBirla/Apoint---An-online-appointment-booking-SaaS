import api from "../api/axios";

export async function getProfessionalAppointments(
    status = ""
) {
    const { data } = await api.get(
        "/appointments/professional",
        {
            params: status
                ? { status }
                : {},
        }
    );

    return data.appointments;
}

export async function updateAppointmentStatus(
    appointmentId,
    status
) {
    const { data } = await api.patch(
        `/appointments/${appointmentId}/status`,
        { status }
    );

    return data;
}