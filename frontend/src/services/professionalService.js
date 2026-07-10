import api from "../api/axios";

export async function getProfessionals(filters = {}) {

    const { data } = await api.get(
        "/professional/get",
        {
            params: filters
        }
    );

    return data.professionals;
}

export async function getMyProfessionalProfile() {
    const { data } = await api.get(
        "/professional/me"
    );

    return data.profile;
}

export async function getMyAvailability() {
    const { data } = await api.get(
        "/availability/me"
    );

    return data;
}