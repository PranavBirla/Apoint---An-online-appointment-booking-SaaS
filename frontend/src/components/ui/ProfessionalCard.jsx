import Card from "./Card";
import Button from "./Button";

export default function ProfessionalCard({
    professional,
}) {
    return (
        <Card>
            <div className="flex items-center gap-4">
                <img
                    src={professional.avatar}
                    alt=""
                    className="
            w-16
            h-16
            rounded-full
            object-cover
          "
                />

                <div>
                    <h3 className="font-semibold text-lg">
                        {professional.name}
                    </h3>

                    <p className="text-gray-500">
                        {professional.profession}
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <p className="text-sm text-gray-500">
                    Experience
                </p>

                <p className="font-semibold">
                    {professional.experienceYears} years
                </p>
            </div>

            <div className="mt-4">
                <p className="text-sm text-gray-500">
                    Consultation Fee
                </p>

                <p className="font-semibold">
                    ₹{professional.consultationFee}
                </p>
            </div>

            <Button className="w-full mt-6">
                View Profile
            </Button>
        </Card>
    );
}