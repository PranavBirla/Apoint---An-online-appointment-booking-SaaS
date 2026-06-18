import ProfessionalCard from "./ProfessionalCard";

export default function ProfessionalsGrid({
    professionals,
}) {


    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                    {professionals.length} Professionals Available
                </h2>

                <select className="h-11 px-4 rounded-xl border border-gray-200">
                    <option>Popularity</option>
                    <option>Experience</option>
                    <option>Fee</option>
                </select>
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