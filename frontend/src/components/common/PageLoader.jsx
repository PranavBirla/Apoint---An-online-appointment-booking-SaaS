export default function PageLoader() {
    return (
        <div
            className="
                min-h-screen
                flex
                flex-col
                items-center
                justify-center
                bg-[#fafafa]
            "
        >
            {/* LOGO */}

            <h1
                className="
                    text-5xl
                    font-bold
                    tracking-tight
                    mb-10
                "
            >
                Apoint
            </h1>

            {/* LOADER */}

            <div className="relative w-14 h-14">

                <div
                    className="
                        absolute
                        inset-0
                        rounded-full
                        border-2
                        border-gray-200
                    "
                />

                <div
                    className="
                        absolute
                        inset-0
                        rounded-full
                        border-2
                        border-black
                        border-t-transparent
                        animate-spin
                    "
                />
            </div>

            <p
                className="
                    mt-8
                    text-gray-500
                    text-sm
                    tracking-wide
                "
            >
                Loading workspace...
            </p>
        </div>
    );
}