const professionalProfileModel = require("../models/professionalProfile.model");


async function createProfessionalProfile(req, res) {

    try {

        console.log(req.body);
        const { profession, specialization, bio, experienceYears, consultationFee } = req.body;

        const SPECIALIZATIONS = {

            Doctor: [
                "General Physician",
                "Cardiologist",
                "Dermatologist",
                "Neurologist",
                "Orthopedic",
                "Pediatrician",
                "Gynecologist",
            ],

            Dentist: [
                "General Dentist",
                "Orthodontist",
                "Cosmetic Dentist",
                "Pediatric Dentist",
            ],

            Lawyer: [
                "Criminal Lawyer",
                "Corporate Lawyer",
                "Family Lawyer",
                "Property Lawyer",
                "Civil Lawyer",
            ],

            Consultant: [
                "Business Consultant",
                "Financial Consultant",
                "Career Consultant",
                "Management Consultant",
            ],

            Therapist: [
                "Mental Health Therapist",
                "Marriage Therapist",
                "Child Therapist",
                "Behavioral Therapist",
            ],

        };

        const allowedSpecializations =
            SPECIALIZATIONS[
            profession
            ];

        if (
            !allowedSpecializations.includes(
                specialization
            )
        ) {
            return res.status(400).json({
                message:
                    "Invalid specialization selected."
            });
        }

        const existingProfile =
            await professionalProfileModel.findOne({
                userId: req.user._id
            });

        if (existingProfile) {
            return res.status(409).json({
                message:
                    "Professional profile already exists."
            });
        }

        const profile = await professionalProfileModel.create({
            userId: req.user._id,
            profession,
            specialization,
            bio,
            experienceYears,
            consultationFee
        });

        res.status(201).json({
            message: "profile created successfully",
            profile
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

async function updateProfessionalProfile(req, res) {
    try {

        const profile =
            await professionalProfileModel.findOne({
                userId: req.user._id
            });

        if (!profile) {
            return res.status(404).json({
                message: "Professional profile not found"
            });
        }

        const {
            profession,
            specialization,
            bio,
            experienceYears,
            consultationFee,
            profileImage
        } = req.body;

        if (profession !== undefined) {
            profile.profession = profession;
        }

        if (specialization !== undefined) {
            profile.specialization = specialization;
        }

        if (bio !== undefined) {
            profile.bio = bio;
        }

        if (experienceYears !== undefined) {
            profile.experienceYears = experienceYears;
        }

        if (consultationFee !== undefined) {
            profile.consultationFee = consultationFee;
        }

        if (profileImage !== undefined) {
            profile.profileImage = profileImage;
        }

        await profile.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            profile
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
}

async function getProfessionalProfiles(req, res) {
    try {

        const { search, profession, specialization, minFee, maxFee, sort } = req.query;

        const query = {};

        //SEARCH 
        if (search) {
            query.$or = [
                {
                    profession: { $regex: search, $options: "i" }
                },
                {
                    specialization: { $regex: search, $options: "i" }
                },
                {
                    bio: { $regex: search, $options: "i" }
                },
            ]
        }

        // PROFESSION FILTER
        if (profession) {
            query.profession = profession;
        }

        //SPECIALIZATION FILTER
        if (specialization) {
            query.specialization = specialization;
        }

        //CONSULTATION FEE FILTER
        if (minFee || maxFee) {
            query.consultationFee = {};

            if (minFee) {
                query.consultationFee.$gte = Number(minFee);
            }

            if (maxFee) {
                query.consultationFee.$lte = Number(maxFee);
            }

        }

        // SORTING
        let sortOption = {};

        if (sort === "fee_asc") {
            sortOption.consultationFee = 1;
        }

        else if (sort === "fee_desc") {
            sortOption.consultationFee = -1;
        }

        else if (sort === "experience_desc") {
            sortOption.experienceYears = -1;
        }

        const profiles = await professionalProfileModel.find(query).sort(sortOption).populate("userId", "username avatar");

        res.status(200).json({
            professionals: profiles
        })

    } catch (error) {
        res.status(500).json({
            message: "something went wrong!"
        })
    }
}

async function getProfessional(req, res) {
    try {
        const { id } = req.params;

        const profile = await professionalProfileModel.findById(id).populate("userId", "username avatar");

        if (!profile) {
            return res.status(404).json({
                message: "profile not found"
            });
        }

        res.status(200).json({
            professional: profile
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong!"
        })
    }
}

async function getMyProfessionalProfile(req, res) {
    try {

        const profile =
            await professionalProfileModel
                .findOne({
                    userId: req.user._id
                })
                .populate(
                    "userId",
                    "username email avatar role"
                );

        if (!profile) {
            return res.status(200).json({
                profile: null
            });
        }

        return res.status(200).json({
            profile
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
}

module.exports = {
    createProfessionalProfile,
    getProfessionalProfiles,
    getProfessional,
    getMyProfessionalProfile,
    updateProfessionalProfile
};