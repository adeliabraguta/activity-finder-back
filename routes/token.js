import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router()

const roleUser = 'visitor'
const roleAdmin = 'admin'

router.post('/admin', async (req, res) => {
    try {
        const user = await User.find({username: req.body.username})
        if (user.length === 0) {
            return res.status(403).json({message: 'Wrong credentials'})
        }
        if (user[0].password !== req.body.password) {
            return res.status(403).json({message: 'Wrong credentials'})
        }
        const userRole = {userRole: roleAdmin}
        const accessToken = jwt.sign(userRole, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
        res.json({accessToken: accessToken})
    } catch (err) {
        res.status(500).json({message: 'Failed to log into account'})
    }
})

router.get('/visitor', async (req, res) => {
    try {
        const userRole = {userRole: roleUser}
        const accessToken = jwt.sign(userRole, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
        res.json({accessToken: accessToken})
    } catch (err) {
        res.status(500).json({message: 'Failed to get accessToken'})
    }
})



export default router
