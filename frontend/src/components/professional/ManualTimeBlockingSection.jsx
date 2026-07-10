import { useEffect, useState } from "react";
import ManualBlockForm from "../blockedSlots/ManualBlockForm";
import BlockedSlotsList from "../blockedSlots/BlockedSlotsList";
import ConfirmModal from "../ui/ConfirmModal";
import Toast from "../ui/Toast";
import { CalendarOff } from "lucide-react";

import {
    createBlockedSlot,
    getMyBlockedSlots,
    deleteBlockedSlot,
} from "../../services/blockedSlotService";

const TOAST_DURATION = 3000;

export default function ManualTimeBlockingSection() {
    const [blockedSlots, setBlockedSlots] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [selectedBlockId, setSelectedBlockId] =
        useState(null);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [deleteLoading, setDeleteLoading] =
        useState(false);

    const [toast, setToast] =
        useState(null);

    useEffect(() => {
        if (!toast) return;
        const timer =
            setTimeout(() => {

                setToast(null);

            }, TOAST_DURATION);
        return () =>
            clearTimeout(timer);
    }, [toast]);

    function showToast(
        message,
        type = "success"
    ) {
        setToast({ message, type });
    }

    async function fetchBlockedSlots() {
        try {
            const data =
                await getMyBlockedSlots();
            setBlockedSlots(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlockedSlots()
    }, []);

    async function handleCreateBlock(
        formData
    ) {

        try {
            setLoading(true);

            await createBlockedSlot(
                formData
            );

            await fetchBlockedSlots();

            showToast(
                "Time blocked successfully",
                "success"
            );

            return true;

        } catch (error) {

            showToast(
                error?.response?.data?.message ||
                "Unable to block time",
                "error"
            );
            return false;

        } finally {
            setLoading(false);
        }

    }
    function handleDeleteClick(
        id
    ) {
        setSelectedBlockId(id);
        setShowDeleteModal(true);
    }

    function handleCloseDeleteModal() {
        if (deleteLoading) return;
        setShowDeleteModal(false);
        setSelectedBlockId(null);
    }

    async function handleConfirmDelete() {
        if (
            !selectedBlockId ||
            deleteLoading
        ) {
            return;
        }

        try {

            setDeleteLoading(true);

            await deleteBlockedSlot(
                selectedBlockId
            );

            setBlockedSlots(
                prev =>
                    prev.filter(
                        slot =>
                            slot._id !==
                            selectedBlockId
                    )
            );

            setShowDeleteModal(false);

            setSelectedBlockId(null);

            showToast(
                "Blocked time removed successfully",
                "success"
            );
        } catch (error) {

            showToast(
                "Unable to remove blocked time",
                "error"
            );
        } finally {
            setDeleteLoading(false);
        }
    }

    return (
        <>
            <section className="w-full overflow-hidden rounded-[26px] sm:rounded-[30px] bg-black/[0.07] border border-black/[0.07] ">

                <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 border-b border-black/[0.06]">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
                            <CalendarOff size={17} />
                        </div>

                        <h2 className="text-lg sm:text-xl font-semibold tracking-[-0.02em]">
                            Block time
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 ">
                        <span className="text-xs text-gray-500">Active</span>
                        <span className="min-w-7 h-7 px-2 rounded-full bg-[#C7F36B] flex items-center justify-center text-xs font-bold">
                            {blockedSlots.length}
                        </span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[1.1fr_0.9fr] bg-white">
                    <div className="p-4 sm:p-6 lg:border-r border-black/[0.06]">
                        <ManualBlockForm onCreate={handleCreateBlock} loading={loading} />
                    </div>

                    <div className="border-t lg:border-t-0 border-black/[0.06] p-4 sm:p-6 bg-[#FAFAF7]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold">Upcoming blocks</h3>
                        </div>

                        <BlockedSlotsList blockedSlots={blockedSlots} onDelete={handleDeleteClick} />
                    </div>
                </div>
            </section>

            <ConfirmModal
                isOpen={showDeleteModal}
                title="Remove Blocked Time"
                description="This time will become bookable again."
                confirmText="Remove"
                cancelText="Cancel"
                loadingText="Removing..."
                loading={deleteLoading}
                onConfirm={handleConfirmDelete}
                onClose={handleCloseDeleteModal}
            />

            {toast && <Toast message={toast.message} type={toast.type} />}
        </>
    );

}


