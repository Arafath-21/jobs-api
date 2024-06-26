import { StatusCodes } from 'http-status-codes'
import userModel from '../models/User.js'
import errors from '../errors/index.js'
const {BadRequestError,UnauthenticatedError} = errors

const register = async (req,res) =>{
    let user = await userModel.create({...req.body})
    let token = user.createJWT()
    res.status(StatusCodes.CREATED).send({
        message: "user registered succesfull",
        user:{name:user.name},
        token
    })
}

const login = async (req,res) =>{
    const {email,password} = req.body;

    if (!email || !password) {
        throw new BadRequestError('please provide all fields')
    }
    const user = await userModel.findOne({email});
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    const matchingPassword = await user.comparePassword(password)
    if (!matchingPassword) {
        throw new UnauthenticatedError('Invalid credentials') 
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).send({
        message: "Login Sucessfull",
        user:{name:user.name},
        token
    })
}

export default {register,login}