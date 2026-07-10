import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AppointmentHero() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <section className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-bold tracking-tight">
                        Welcome back, {user?.username || "User"}
                    </h1>

                    <p className="text-xl text-gray-500 mt-3">
                        Book, manage and track your appointments with ease.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/professionals")}
                    className="
            h-14
            px-6
            rounded-2xl
            bg-black
            text-white
            flex
            items-center
            gap-3
            font-medium
            hover:opacity-90
            transition
          "
                >
                    <Plus size={20} />
                    Book New Appointment
                </button>
            </div>
        </section>
    );
}