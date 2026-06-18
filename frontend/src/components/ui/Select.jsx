export default function Select({
    label,
    children,
    ...props
}) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold">
                {label}
            </label>

            <select
                className="
            w-full
            h-12
            rounded-xl
            border
            border-gray-300
            px-4
            outline-none
            focus:border-black
          "
                {...props}
            >
                {children}
            </select>
        </div>
    );
}