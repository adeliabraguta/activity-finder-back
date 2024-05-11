import jwt from "jsonwebtoken";
import express from "express";
import Activity from "../models/activitySchema.js";
import User from "../models/userSchema.js"

const router = express.Router()
const roleUser = 'visitor'
const roleAdmin = 'admin'

router.get('/activities', authToken, async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const startIndex = (page - 1) * limit

    try {
        const activities = await Activity.find().skip(startIndex).limit(limit)
        const count = await Activity.countDocuments();
        res.json({
            totalItems: count,
            totalItemsPerPage: activities.length,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: activities
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/types', authToken, async (req, res) => {
    try {
        const activities = await Activity.find()
        const types = activities.find(type => type.type)
        console.log(types)
        res.json({types: types})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.find({username: req.body.username})
        if (!user) {
            return res.status(403).json({message: 'Wrong credentials'})
        }
        if (user[0].password !== req.body.password) {
            return res.status(403).json({message: 'Wrong credentials'})
        }
        const userRole = {userRole: roleAdmin}
        const accessToken = jwt.sign(userRole, process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken: accessToken})
    } catch (err) {
        res.status(500).json({message: 'Failed to log into account'})
    }
})

router.post('/post-activity', adminMiddleware, async (req, res) => {
    let accessibility
    if (!req.body.activity || req.body.price === null || req.body.accessibility === null || !req.body.type || !req.body.participants || !req.body.link) {
        return res.status(400).json({message: 'Missing required fields'})
    }

    if(req.body.accessibility < 1){
        accessibility = 1
    } else if(req.body.accessibility > 10){
        accessibility = 10
    } else {
        accessibility = req.body.accessibility
    }

    const activity = new Activity({
        activity: req.body.activity,
        accessibility: accessibility,
        type: req.body.type,
        participants: req.body.participants,
        price: req.body.price,
        link: req.body.link,
    })
    try {
        await activity.save()
        res.status(201).json({message: 'Activity added successfully'})
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({message: 'Validation error', details: error.message})
        } else {
            res.status(500).json({message: 'Failed to post activity'})
        }
    }
})

router.delete("/delete-activity/:id", adminMiddleware, async (req, res) => {
    const {id} = req.params;
    try {
        const activity = await Activity.deleteOne({_id: id})
        if (activity.deletedCount === 0) {
            return res.status(404).json({message: 'No activity found with this _id'});
        }
        res.status(201).json({message: 'Activity deleted successfully'})
    } catch (error) {
        res.status(500).json({message: 'Failed to delete activity'})
    }
})

router.put("/update-activity/:id", adminMiddleware, async (req, res) => {
    if (!req.body.activity || req.body.price === null || req.body.accessibility === null || !req.body.type || !req.body.participants || !req.body.link) {
        return res.status(400).json({message: 'Missing required fields'})
    }
    try {
        await Activity.findByIdAndUpdate(req.params.id, {
            activity: req.body.activity,
            accessibility: req.body.accessibility,
            type: req.body.type,
            participants: req.body.participants,
            price: req.body.price,
            link: req.body.link,
        });
        res.status(201).json({message: 'Activity updated successfully'})
    } catch (err) {
        res.status(500).json({message: 'Failed to update activity'})
    }
})

function authToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({message: "Authentication error, token is expired."})
            }
            return res.status(401).json({message: 'Authentication error, token is invalid.'})
        }
        req.user = user
        if (user.userRole !== roleAdmin && user.userRole !== roleUser) return res.status(403).json({
            message: 'Authentication error,' +
                ' unauthorized role'
        })
        next()
    })
}

function adminMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({message: "Authentication error, token is expired."})
            }
            return res.status(401).json({message: 'Authentication error, token is invalid.'})
        }
        req.user = user
        if (user.userRole !== roleAdmin) return res.status(403).json({message: 'Authentication error, unauthorized role'})
        next()
    })
}

export default router
