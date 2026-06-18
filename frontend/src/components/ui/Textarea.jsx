export default function Textarea({
    label,
    ...props
}) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold">
                {label}
            </label>

            <textarea
                rows={5}
                className="
            w-full
            rounded-xl
            border
            border-gray-300
            p-4
            outline-none
            resize-none
            focus:border-black
          "
                {...props}
            />
        </div>
    );
}