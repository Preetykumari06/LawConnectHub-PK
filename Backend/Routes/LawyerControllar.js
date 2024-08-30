const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const { LawyerModel } = require("../Model/LawyerModel");
const LawyerRoutes = express.Router();

//  search and sort functionality 
LawyerRoutes.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const skipIndex = (page-1) * limit;
        const sort = req.query.sortBy || '_id';
        const sortOrder = req.query.sortOrder || 'desc';


        const filter = {};
        if(req.query.name) {
            filter.name = req.query.name;
        }
        if (req.query.gender && (req.query.gender === 'Male' || req.query.gender === 'Female')) {
            filter.gender = req.query.gender;
        }
        if(req.query.Rank) {
            filter.Rank = {$gte: req.query.Rank};
        }
        if(req.query.rating) {
            filter.rating = { $gte: req.query.rating };
        }
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            filter.$or = [
                { name: searchRegex },
                { profession: searchRegex },
                { bio: searchRegex}
                // Add more fields to search from if needed
            ];
        }
        const lawyer = await LawyerModel.find(filter).sort({ [sort]: sortOrder }).skip(skipIndex).limit(limit);
        return res.send(lawyer)

    } catch (error) {
        res.status(404).send(error.message)
    }
})

// get lawyer by id
LawyerRoutes.get("/:id", async (req, res) => {
    lawyer = await LawyerModel.findById({ _id: req.params.id })
    if(lawyer){
        res.send(lawyer);
    }
    else{
        res.status(404).send({message: "lawyer not found."});
    }

})


LawyerRoutes.post("/add", async (req, res) => {
    const { name,address,bio,skills,profession,gender,phone,image,price,languages,rating,experience,Rank } = req.body;
    try {
        lawyer = LawyerModel(req.body)
        await lawyer.save();
        res.status(200).send({ "message": "One lawyer has been added " })

    } catch (error) {

        console.log(error.message)
        res.status(404).send({ "message": error.message })
    }
})

module.exports = LawyerRoutes;