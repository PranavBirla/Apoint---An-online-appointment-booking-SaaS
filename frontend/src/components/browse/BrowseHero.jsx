export default function BrowseHero() {
    return (
        <section className="mb-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-6xl font-bold leading-[1.05] tracking-tight">
                        Find the right
                        <br />
                        professional
                    </h1>

                    <p className="mt-5 text-xl text-gray-500 max-w-lg">
                        Browse verified professionals and
                        book appointments in minutes.
                    </p>
                </div>

                <div className="hidden lg:block">
                    <div className="overflow-hidden rounded-3xl">
                        <img
                            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop"
                            alt=""
                            className="w-full h-[260px] object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}