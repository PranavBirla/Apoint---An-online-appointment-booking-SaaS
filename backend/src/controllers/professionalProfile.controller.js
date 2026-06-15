const professionalProfileModel = require("../models/professionalProfile.model");


async function createProfessionalProfile(req, res) {
    console.log(req.body);
    const { profession, specialization, bio, experienceYears, consultationFee } = req.body;

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
}

async function getProfessionalProfiles(req, res) {
    try {

        const profiles = await professionalProfileModel.find().populate("userId", "username avatar");

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

        if(!profile){
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

module.exports = {
    createProfessionalProfile,
    getProfessionalProfiles,
    getProfessional
};