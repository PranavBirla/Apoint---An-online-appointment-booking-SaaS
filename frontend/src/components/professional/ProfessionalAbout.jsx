export default function ProfessionalAbout({
    professional,
}) {

    return (
        <section
            className="
                px-1
                py-1

                lg:bg-white
                lg:border
                lg:border-black/[0.06]
                lg:rounded-[26px]
                lg:p-6
            "
        >

            <div className="flex items-center gap-3">

                <div
                    className="
                        hidden
                        lg:flex
                        w-10
                        h-10
                        rounded-[13px]
                        bg-[#C7F36B]
                        items-center
                        justify-center
                    "
                >
                    <UserRound size={17} />
                </div>


                <div>

                    <p className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                        Profile
                    </p>

                    <h2 className="text-[17px] lg:text-lg font-bold tracking-[-0.025em]">
                        About
                    </h2>

                </div>

            </div>


            <p className="mt-2.5 lg:mt-4 text-[13px] lg:text-sm leading-[1.65] text-gray-500">
                {professional?.bio ||
                    "No professional bio available."
                }
            </p>

        </section>
    );
}