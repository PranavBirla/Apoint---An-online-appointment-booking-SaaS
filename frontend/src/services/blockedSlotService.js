import api from "../api/axios";

export async function createBlockedSlot(
    blockedSlotData
) {
    const { data } =
        await api.post(
            "/blocked-slots",
            blockedSlotData
        );

    return data;
}

export async function getMyBlockedSlots() {
    const { data } =
        await api.get(
            "/blocked-slots/me"
        );

    return data.blockedSlots;
}

export async function deleteBlockedSlot(id) {
    const { data } =
        await api.delete(
            `/blocked-slots/${id}`
        );

    return data;
}