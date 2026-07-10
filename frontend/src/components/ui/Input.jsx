import { Eye, EyeOff } from "lucide-react";

export default function Input({
    label,
    icon: Icon,
    type = "text",
    rightElement,
    showPassword,
    onTogglePassword,
    ...props
}) {
    return (
        <div>
            {label && (
                <label className="block mb-2 text-sm font-semibold">
                    {label}
                </label>
            )}

            <div className="relative">

                {Icon && (
                    <Icon
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                )}

                <input
                    type={
                        type === "password" && showPassword
                            ? "text"
                            : type
                    }
                    className=" w-full h-12 rounded-xl border border-gray-300 pl-11 pr-12 outline-none focus:border-black transition-all "
                    {...props}
                />

                {type === "password" && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className=" absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition "
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                )}

                {rightElement}
            </div>
        </div>
    );
}