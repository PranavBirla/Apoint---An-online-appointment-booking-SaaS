export default function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}) {
    const variants = {
        primary:
            "bg-black text-white hover:opacity-90",

        secondary:
            "bg-white border border-gray-300 text-black hover:bg-gray-50",

        danger:
            "bg-red-600 text-white hover:bg-red-700",

        success:
            "bg-green-600 text-white hover:bg-green-700",
    };

    return (
        <button
            className={`
          h-12 px-5 rounded-xl
          font-medium
          transition-all
          ${variants[variant]}
          ${className}
        `}
            {...props}
        >
            {children}
        </button>
    );
}