import api from "../api/axios";

export async function getProfessionals() {
    const { data } = await api.get(
        "/professional/get"
    );

    return data.professionals;
}