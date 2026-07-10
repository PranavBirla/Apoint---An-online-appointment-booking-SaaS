import api from "../api/axios";

export async function getProfessional(id) {
    const { data } = await api.get(
        `/professional/get/${id}`
    );

    return data.professional;
}

export async function getAvailableDays(
    professionalId
) {
    const { data } = await api.get(
        `/availability/get/${professionalId}`
    );

    return data.availableDays;
}

export async function getAvailableSlots(
    professionalId,
    date
) {
    const { data } = await api.get(
        `/availability/get/${professionalId}/slots`,
        {
            params: { date },
        }
    );

    return data.slots;
}

export async function createAppointment(
    payload
) {
    const { data } = await api.post(
        "/appointment",
        payload
    );

    return data;
}

export async function getMyAppointments(
    status = ""
) {
    const { data } = await api.get(
        "/appointments/my",
        {
            params: status
                ? { status }
                : {},
        }
    );

    return data.appointments;
}

export async function cancelAppointment(
    appointmentId,
    cancellationReason
) {
    const { data } = await api.patch(
        `/appointments/${appointmentId}/cancel`,
        {
            cancellationReason,
        }
    );

    return data;
}