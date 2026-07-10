import api from "../api/axios";

export async function getMyAvailability() {
    const { data } = await api.get(
        "/availability/me"
    );

    return data;
}

export async function createAvailability(
    availabilityData
) {
    const { data } = await api.post(
        "/availability",
        availabilityData
    );

    return data;
}

export async function updateAvailability(
    availabilityId,
    availabilityData
) {
    const { data } = await api.patch(
        `/availability/${availabilityId}`,
        availabilityData
    );

    return data;
}