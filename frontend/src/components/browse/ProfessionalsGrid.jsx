import ProfessionalCard from "./ProfessionalCard";

export default function ProfessionalsGrid({
    professionals,
}) {


    return (
        <section>
            <div
                className="
        grid
        grid-cols-1
        gap-0

        md:grid-cols-2
        md:gap-6

        xl:grid-cols-3
    "
            >
                <h2 className="md:text-3xl text-2xl font-bold">
                    {professionals.length} Professionals Available
                </h2>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {professionals.map((professional) => (
                    <ProfessionalCard
                        key={professional._id}
                        professional={professional}
                    />
                ))}
            </div>
        </section>
    );
}