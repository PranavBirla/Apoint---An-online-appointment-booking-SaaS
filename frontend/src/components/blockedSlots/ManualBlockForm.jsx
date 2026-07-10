import { useRef, useState } from "react";
import { CalendarDays, Clock3, StickyNote, Plus } from "lucide-react";


export default function ManualBlockForm({ onCreate, loading }) {

    const dateRef = useRef(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);

    const [formData, setFormData] = useState({
        date: "",
        startTime: "",
        endTime: "",
        reason: ""
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await onCreate(formData);

        if (!success) return;

        setFormData({
            date: "",
            startTime: "",
            endTime: "",
            reason: ""
        });
    };


    function updateField(field, value) {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }


    return (
        <form onSubmit={handleSubmit} className="w-full">

            <div className="grid sm:grid-cols-2 gap-3">

                <FieldShell
                    icon={CalendarDays}
                    label="Date"
                    className="sm:col-span-2"
                    onClick={() => dateRef.current?.showPicker()}
                >
                    <div className="relative w-full pointer-events-none">

                        <div className={`text-sm font-medium ${formData.date ? "text-black" : "text-gray-400"}`}>
                            {formData.date
                                ? new Date(`${formData.date}T00:00:00`).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })
                                : "Select a date"
                            }
                        </div>

                        <input
                            ref={dateRef}
                            type="date"
                            value={formData.date}
                            onChange={(e) => updateField("date", e.target.value)}
                            required
                            className="absolute w-px h-px opacity-0 pointer-events-none"
                        />

                    </div>
                </FieldShell>


                <FieldShell
                    icon={Clock3}
                    label="From"
                    onClick={() => startTimeRef.current?.showPicker()}
                >
                    <div className="relative w-full pointer-events-none">

                        <div className={`text-sm font-medium ${formData.startTime ? "text-black" : "text-gray-400"}`}>
                            {formData.startTime
                                ? formatTime(formData.startTime)
                                : "Start time"
                            }
                        </div>

                        <input
                            ref={startTimeRef}
                            type="time"
                            value={formData.startTime}
                            onChange={(e) => updateField("startTime", e.target.value)}
                            required
                            className="absolute w-px h-px opacity-0 pointer-events-none"
                        />

                    </div>
                </FieldShell>


                <FieldShell
                    icon={Clock3}
                    label="To"
                    onClick={() => endTimeRef.current?.showPicker()}
                >
                    <div className="relative w-full pointer-events-none">

                        <div className={`text-sm font-medium ${formData.endTime ? "text-black" : "text-gray-400"}`}>
                            {formData.endTime
                                ? formatTime(formData.endTime)
                                : "End time"
                            }
                        </div>

                        <input
                            ref={endTimeRef}
                            type="time"
                            value={formData.endTime}
                            onChange={(e) => updateField("endTime", e.target.value)}
                            required
                            className="absolute w-px h-px opacity-0 pointer-events-none"
                        />

                    </div>
                </FieldShell>

                <FieldShell icon={StickyNote} label="Note" className="sm:col-span-2">
                    <input
                        type="text"
                        value={formData.reason}
                        onChange={(e) => updateField("reason", e.target.value)}
                        placeholder="Optional"
                        className="w-full min-w-0 bg-transparent outline-none text-sm font-medium text-black placeholder:text-gray-400"
                    />
                </FieldShell>

            </div>


            <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full sm:w-auto h-12 px-6 rounded-[14px] bg-black text-white flex items-center justify-center gap-2 text-sm font-semibold hover:bg-black/85 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
                <Plus size={17} />

                {loading ? "Blocking..." : "Block time"}
            </button>

        </form>
    );
}


function FieldShell({
    icon: Icon,
    label,
    children,
    className = "",
    onClick
}) {
    return (
        <div
            onClick={onClick}
            className={`group flex items-center gap-3 min-w-0 h-[66px] px-4 rounded-[16px] bg-[#F5F5F2] border border-transparent focus-within:bg-white focus-within:border-black/20 focus-within:ring-4 focus-within:ring-black/[0.03] transition-all cursor-pointer ${className}`}
        >
            <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center shrink-0 group-focus-within:bg-[#C7F36B] group-focus-within:border-transparent transition-colors">
                <Icon size={16} />
            </div>

            <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1">
                    {label}
                </span>

                {children}
            </div>
        </div>
    );
}

function formatTime(time) {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}