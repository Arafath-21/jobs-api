import { StatusCodes } from "http-status-codes"
import jobModel from "../models/Job.js"
import errors from '../errors/index.js'
const {BadRequestError,NotFoundError} = errors;
const getAllJobs = async (req,res)=>{
    const jobs = await jobModel.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).send({
        message:"Get all jobs",
        count:jobs.length,
        jobs
    })
}
const getJob = async (req,res)=>{
    const {user:{userId},params:{id:jobsId}} = req
    const job = await jobModel.findOne({_id:jobsId,createdBy:userId})
    
    if (!job) {
        throw new NotFoundError(`No job with ${jobsId}`)
    }
    res.status(StatusCodes.OK).send({
        message:"Get single job",
        job
    })
}
const createJob = async (req,res)=>{
    req.body.createdBy = req.user.userId;
    const job = await jobModel.create(req.body)
    res.status(StatusCodes.CREATED).send({
        message:"Job created",
        job
    })
}
const updateJob = async (req,res)=>{
    const {user:{userId},params:{id:jobsId},body:{company,positions}} = req
    if (company === ''||positions==='') {
        throw new BadRequestError('please fill the company and positions')
    }
    const job = await jobModel.findByIdAndUpdate({_id:jobsId,createdBy:userId},
        req.body,
        {new:true,runValidators:true})
    if (!job) {
        throw new NotFoundError(`No job with ${jobsId}`)
    }
    res.status(StatusCodes.OK).send({
        message:"updated the  job",job
    })
}
const deleteJob = async(req,res)=>{
    const {user:{userId},params:{id:jobsId}} = req
    const job = await jobModel.findOneAndDelete({_id:jobsId,createdBy:userId})
    
    if (!job) {
        throw new NotFoundError(`No job with ${jobsId}`)
    }
    res.status(StatusCodes.OK).send({
        message:"job is deleted"
        // job
    })
}

export default {getAllJobs,getJob,createJob,updateJob,deleteJob}