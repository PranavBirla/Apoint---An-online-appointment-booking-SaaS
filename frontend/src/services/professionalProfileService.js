import api from "../api/axios";

export async function createProfessionalProfile(
    profileData
) {
    const { data } = await api.post(
        "/professional/create",
        profileData
    );

    return data;
}

export async function getMyProfessionalProfile() {
    const { data } = await api.get(
        "/professional/me"
    );

    return data.profile;
}

export async function updateProfessionalProfile(
    profileData
) {
    const { data } = await api.patch(
        "/professional/me",
        profileData
    );

    return data;
}