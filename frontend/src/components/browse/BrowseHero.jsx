export default function BrowseHero() {
    return (
        <section className="mb-8">
            <div className="bg-[url('https://img.magnific.com/free-vector/gradient-blur-pink-blue-abstract-background_53876-117324.jpg?semt=ais_hybrid&w=740&q=80')]">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="flex gap-2 items-center">
                            <img className="h-24" src="APOINT_LOGO.png" alt="" />

                            <h1 className="md:text-6xl text-5xl font-bold leading-[1.05] tracking-tight">Apoint
                            </h1>
                        </div>

                        <p className="mt-5 md:text-xl text-sm text-gray-500 max-w-md">
                            Browse verified professionals and
                            book appointments in minutes.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}