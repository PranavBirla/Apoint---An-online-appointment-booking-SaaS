import { MessageCircle } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";

export default function Messages() {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />

            <main className="flex-1 p-6 lg:p-10">
                {/* PAGE CONTENT */}
                <div className="min-h-screen bg-white flex items-center justify-center px-6">
                    <div className="max-w-lg text-center">
                        {/* SVG */}

                        <div className="flex justify-center">
                            <div
                                className=" w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center "
                            >
                                <MessageCircle
                                    size={60}
                                    strokeWidth={1.5}
                                />
                            </div>
                        </div>

                        <h1 className="mt-10 text-5xl font-bold tracking-tight">
                            Messages
                        </h1>

                        <p className="mt-5 text-lg text-gray-500 leading-relaxed">
                            Connect with professionals and
                            manage conversations directly
                            inside Apoint.
                        </p>

                        <div
                            className=" mt-8 inline-flex px-4 py-2 rounded-full bg-gray-100 text-sm font-medium "
                        >
                            Coming Soon
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}