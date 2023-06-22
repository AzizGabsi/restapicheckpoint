const Person = require('../models/personModel')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

// @desc register new user with role user and return token
// @params : post /api/user/register
// @access : public
const register = async (req, res) => {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        const {name, email, password, address} = req.body
        const existedUser = await Person.findOne({email})
        if (existedUser) res.status(400).json({msg: "user exist, please login"})
        else {
            const hashedPw = await bcrypt.hash(password, 10)
            console.log(hashedPw)

            const newPerson = await Person.create({name, email, password: hashedPw, address})
            const token = jwt.sign({id: newPerson._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
            console.log(token)
            res.status(200).json({msg:"user created", token: token, person: newPerson})
        }
    } catch (error) {
        res.status(500).json({msg:"something went wrong!", error: error.message})
    }
}


const login = async (req, res) => {
    try {
        const {email, password} =req.body
        const user= await Person.findOne({email})
        if (!user) res.status(400).json({msg: "user does not exist, please register"})
        else {
            const checkPw = await bcrypt.compare(password, user.password)
            if (!checkPw) res.status(400).json({msg: "password does not match please try again"})
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
            console.log(token)
            res.status(200).json({msg:" login success", token: token, person: user})
        }
    
    } catch (error) {
        res.status(500).json({msg:"something went wrong!", error: error.message})
    }
}

const getPersonInfo = async (req, res) => {
    try {
        const user = await Person.findById(req.personId)
        if (!user) res.status(400).json({msg: "user does not exist"})
        res.status(200).json({msg:'got info', person: user})
    } catch (error) {
        res.status(500).json({msg:"something went wrong!", error: error.message})

    }
}

module.exports = { register, login, getPersonInfo}