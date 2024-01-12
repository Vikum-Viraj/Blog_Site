const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const {v4:uuid} = require("uuid")
const HttpError = require('../models/errorModel')


const registerUser = async (req, res, next) => {

    try {
        const { name, email, password, password2 } = req.body

        if (!name || !email || !password) {
            return next(new HttpError("Fill in all fields ", 422))
        }

        const newEmail = email.toLowerCase()
        const emailExits = await User.findOne({ email: newEmail })

        if (emailExits) {
            return next(new HttpError("Email already exits", 422))
        }
        if (password.trim().length < 4) {
            return next(new HttpError("Password should not be less than 4", 422))
        }
        if (password != password2) {
            return next(new HttpError("Passwords do not match", 422))
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email: newEmail, password: hashedPassword })
        res.status(201).json(`New user ${newUser.email} registered`)

    } catch (error) {

        return next(new HttpError("User registration failed", 422))
    }

}


const loginUser = async (req, res, next) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new HttpError("Fill in all fields", 422))
        }

        const newEmail = email.toLowerCase()
        const user = await User.findOne({ email: newEmail })

        if (!user) {
            return next(new HttpError("Invalid credentials", 422))
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return next(new HttpError("Invalid credentials", 422))
        }

        const { _id: id, name } = user
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" })

        return res.status(200).json({ token, id, name })

    } catch (error) {
        return next(new HttpError("Login failed check your credentials"))
    }
}



const getUser = async (req, res, next) => {

    try {

        const { id } = req.params
        const user = await User.findById(id).select('--password')

        if (!user) {
            return next(new HttpError("User not found"), 404)
        }

        return res.status(200).json(user);

    } catch (error) {
        return next(new HttpError(error))
    }

}

const getAuthors = async (req, res, next) => {

    try {
        const authors = await User.find().select('-password')
        return res.status(200).json(authors)

    } catch (error) {
        return next(new HttpError(error))
    }

}



const changeAvatar = async (req, res, next) => {

    try{

        if(!req.files.avatar){
            return next(new HttpError("Please choose an image",422))
        }

        const user = await User.findById(req.user.id)
        if(user.avatar){
            fs.unlink(path.join(__dirname,'..','uploads',user.avatar),(err) => {
                if(err){
                    return next(new HttpError(err))
                }
            })
        }
        const {avatar} = req.files

        if(avatar.size > 500000){
            return next(new HttpError("Profile picture too big should less 500kb",422))
        }

        let filename;
        filename = avatar.name
        let splittedFilename = filename.split('.')
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
        avatar.mv(path.join(__dirname,'..','uploads',newFilename),async(err) => {
            if(err){
                return next(new HttpError(err))
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id,{avatar:newFilename},{new:true})
            if(!updatedAvatar){
                return next(new HttpError("Avatar couldn't changed",422))
            }

            res.status(200).json(updatedAvatar)
        })

    }catch(error){

        return next(new HttpError(error))
    }
}



const editUser = async (req, res, next) => {
    
    try{

    const {name,email,currentPassword,newPassword,confirmNewPassword} = req.body
    if(!name || !email || !currentPassword ||!newPassword){
        return next(new HttpError("Fill in the blanks",422))
    }

    const user = await User.findById(req.user.id)
    if(!user){
        return next(new HttpError("User not found",403))
    }
    const emailExits = await User.findOne({email})

    if(emailExits &&(emailExits._id != req.user.id)){
        return next(new HttpError("Email already exist",422))
    }

    const validateUserPassword = await bcrypt.compare(currentPassword,user.password)

    if(!validateUserPassword){
        return next(new HttpError("Invalid current password",422))
    }

    if(newPassword !== confirmNewPassword){
        return next(new HttpError("New passwords do not match",422))
    }

    //hash new password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword,salt)

    const newInfo = await User.findByIdAndUpdate(req.user.id,{name,email,password:hash,},{new:true})//new true will give document that after
    res.status(200).json(newInfo)

    }catch(error){
        return next(new HttpError(error))
    }
    
}




module.exports = {
    registerUser,
    getAuthors,
    getUser,
    editUser,
    changeAvatar,
    loginUser
}