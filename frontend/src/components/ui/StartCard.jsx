import Card from "./Card";

export default function StatCard({
    title,
    value,
}) {
    return (
        <Card>
            <p className="text-gray-500 text-sm">
                {title}
            </p>

            <h2 className="text-4xl font-bold mt-2">
                {value}
            </h2>
        </Card>
    );
}