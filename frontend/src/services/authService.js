import api from "../api/axios";

export async function registerUser(
    payload
) {
    const { data } = await api.post(
        "/auth/user/register",
        payload
    );

    return data;
}

export async function updateUserProfile(
    payload
) {
    const { data } = await api.patch(
        "/auth/user/me",
        payload
    );

    return data;
}

export async function loginUser(
    payload
) {
    const { data } = await api.post(
        "/auth/user/login",
        payload
    );

    return data;
}

export async function getCurrentUser() {
    const { data } = await api.get(
        "/auth/user/me"
    );

    return data;
}

export async function logoutUser() {
    const { data } = await api.get(
        "/auth/user/logout"
    );

    return data;
}