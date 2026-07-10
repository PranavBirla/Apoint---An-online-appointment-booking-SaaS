export default function ProfessionalTopbar() {
    return (
        <header className="w-full flex items-center justify-end pb-5 lg:pb-7">

            <div className="flex items-center gap-2.5">
                <img
                    src="/APOINT_LOGO.png"
                    alt="Apoint"
                    className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                />

                <span className="text-xl sm:text-2xl font-bold tracking-[-0.04em]">
                    Apoint
                </span>
            </div>

        </header>
    );
}