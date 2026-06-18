import { Eye } from "lucide-react";

export default function Input({
    label,
    icon: Icon,
    type = "text",
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
                    type={type}
                    className="
          w-full
          h-12
          rounded-xl
          border border-gray-300
          pl-11
          pr-4
          outline-none
          focus:border-black
          transition-all
        "
                    {...props}
                />

                {type === "password" && (
                    <Eye
                        size={18}
                        className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              cursor-pointer
            "
                    />
                )}
            </div>
        </div>
    );
}