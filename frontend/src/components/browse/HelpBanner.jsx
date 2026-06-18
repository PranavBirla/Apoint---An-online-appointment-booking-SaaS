import { Calendar } from "lucide-react";

export default function HelpBanner() {
    return (
        <section className="mt-10">
            <div className="border border-gray-200 rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">
                        <Calendar size={28} />
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold">
                            Can't find what you're looking for?
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Tell us what you need and we'll help
                            you find the right professional.
                        </p>
                    </div>
                </div>

                <button
                    className="
            h-12
            px-6
            rounded-xl
            border
            border-gray-300
            font-medium
          "
                >
                    Request a Professional
                </button>
            </div>
        </section>
    );
}