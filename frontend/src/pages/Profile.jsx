import { useEffect, useMemo, useState } from "react";
import {
    Mail,
    Shield,
    CheckCircle2,
    Pencil,
    Save,
    X,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";

import { useAuth } from "../context/AuthContext";

import { updateUserProfile } from "../services/authService";

export default function Profile() {
    const { user, fetchUser } =
        useAuth();

    const [editMode,
        setEditMode] =
        useState(false);

    const [loading,
        setLoading] =
        useState(false);

    const [form,
        setForm] =
        useState({
            username: "",
            avatar: "",
        });

    useEffect(() => {
        if (!user) return;

        setForm({
            username:
                user.username || "",

            avatar:
                user.avatar || "",
        });
    }, [user]);

    const initials =
        useMemo(() => {
            if (!user?.username)
                return "U";

            const parts =
                user.username
                    .trim()
                    .split(" ");

            if (
                parts.length === 1
            ) {
                return parts[0][0]
                    ?.toUpperCase();
            }

            return (
                (
                    parts[0][0] +
                    parts[
                    parts.length -
                    1
                    ][0]
                ).toUpperCase()
            );
        }, [user]);

    async function handleSave() {
        try {
            setLoading(true);

            await updateUserProfile(
                {
                    username:
                        form.username,
                    avatar:
                        form.avatar,
                }
            );

            await fetchUser();

            setEditMode(false);
        } catch (error) {
            console.log(error);

            alert(
                error?.response?.data
                    ?.message ||
                "Failed to update profile"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen bg-[#fafafa]">
            <Sidebar />

            <main className="flex-1 p-6 lg:p-10">
                <div className="max-w-7xl mx-auto">

                    {/* HERO */}

                    <div
                        className="
                            bg-white
                            border
                            border-gray-200
                            rounded-[32px]
                            p-8
                            mb-8
                        "
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

                            {/* AVATAR */}

                            {user?.avatar ? (
                                <img
                                    src={
                                        user.avatar
                                    }
                                    alt="avatar"
                                    className="
                                        w-24
                                        h-24
                                        rounded-full
                                        object-cover
                                        border
                                        border-gray-200
                                    "
                                />
                            ) : (
                                <div
                                    className="
                                        w-24
                                        h-24
                                        rounded-full
                                        bg-black
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        text-3xl
                                        font-bold
                                    "
                                >
                                    {initials}
                                </div>
                            )}

                            <div className="flex-1">
                                <h1 className="text-4xl font-bold">
                                    {
                                        user?.username
                                    }
                                </h1>

                                <p className="text-gray-500 mt-2">
                                    {
                                        user?.email
                                    }
                                </p>

                                <div className="flex gap-3 mt-4">

                                    <span
                                        className="
                                            px-4
                                            py-1
                                            rounded-full
                                            bg-black
                                            text-white
                                            text-sm
                                            capitalize
                                        "
                                    >
                                        {
                                            user?.role
                                        }
                                    </span>

                                    <span
                                        className="
                                            px-4
                                            py-1
                                            rounded-full
                                            bg-gray-100
                                            text-gray-700
                                            text-sm
                                        "
                                    >
                                        {user?.isVerified
                                            ? "Verified"
                                            : "Not Verified"}
                                    </span>

                                </div>
                            </div>

                            {!editMode ? (
                                <button
                                    onClick={() =>
                                        setEditMode(
                                            true
                                        )
                                    }
                                    className="
                                        h-12
                                        px-5
                                        rounded-xl
                                        bg-black
                                        text-white
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    <Pencil
                                        size={
                                            16
                                        }
                                    />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setEditMode(
                                                false
                                            );

                                            setForm(
                                                {
                                                    username:
                                                        user?.username ||
                                                        "",
                                                    avatar:
                                                        user?.avatar ||
                                                        "",
                                                }
                                            );
                                        }}
                                        className="
                                            h-12
                                            px-5
                                            rounded-xl
                                            border
                                            border-gray-200
                                        "
                                    >
                                        <X
                                            size={
                                                16
                                            }
                                        />
                                    </button>

                                    <button
                                        onClick={
                                            handleSave
                                        }
                                        disabled={
                                            loading
                                        }
                                        className="
                                            h-12
                                            px-5
                                            rounded-xl
                                            bg-black
                                            text-white
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >
                                        <Save
                                            size={
                                                16
                                            }
                                        />

                                        {loading
                                            ? "Saving..."
                                            : "Save"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8">

                        {/* ACCOUNT OVERVIEW */}

                        <div className="lg:col-span-2">
                            <div
                                className="
                                    bg-white
                                    border
                                    border-gray-200
                                    rounded-[32px]
                                    p-6
                                "
                            >
                                <h2 className="text-2xl font-bold">
                                    Account Overview
                                </h2>

                                <div className="space-y-6 mt-8">

                                    <div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Mail size={16} />
                                            Email
                                        </div>

                                        <p className="mt-2 font-medium break-all">
                                            {
                                                user?.email
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Shield size={16} />
                                            Role
                                        </div>

                                        <p className="mt-2 capitalize font-medium">
                                            {
                                                user?.role
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <CheckCircle2 size={16} />
                                            Verification
                                        </div>

                                        <p className="mt-2 font-medium">
                                            {user?.isVerified
                                                ? "Verified"
                                                : "Not Verified"}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* EDIT PANEL */}

                        <div className="lg:col-span-3">
                            <div
                                className="
                                    bg-white
                                    border
                                    border-gray-200
                                    rounded-[32px]
                                    p-6
                                "
                            >
                                <h2 className="text-2xl font-bold">
                                    Profile Details
                                </h2>

                                <div className="space-y-6 mt-8">

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">
                                            Username
                                        </label>

                                        <input
                                            disabled={
                                                !editMode
                                            }
                                            value={
                                                form.username
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setForm(
                                                    {
                                                        ...form,
                                                        username:
                                                            e
                                                                .target
                                                                .value,
                                                    }
                                                )
                                            }
                                            className="
                                                w-full
                                                h-12
                                                rounded-xl
                                                border
                                                border-gray-200
                                                px-4
                                                disabled:bg-gray-50
                                            "
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">
                                            Avatar URL
                                        </label>

                                        <input
                                            disabled={
                                                !editMode
                                            }
                                            value={
                                                form.avatar
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setForm(
                                                    {
                                                        ...form,
                                                        avatar:
                                                            e
                                                                .target
                                                                .value,
                                                    }
                                                )
                                            }
                                            className="
                                                w-full
                                                h-12
                                                rounded-xl
                                                border
                                                border-gray-200
                                                px-4
                                                disabled:bg-gray-50
                                            "
                                            placeholder="https://..."
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}