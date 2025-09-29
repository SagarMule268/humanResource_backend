import path from "path";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import { error } from "console";
const addLeave = async(req, res)=>{
   try {
     const {
         userId,
         leave_type,
         from_date,
         to_date,
         description
     }= req.body ;
     const employee = await Employee.findOne({userId:userId});
     if(!employee) return res.status(404).json({success:false , message:"Employee Not Found !"});

     const leave = new Leave({
         userId,
         employeeId:employee._id,
         leave_type,
         from_date,
         to_date,
         description
     })
     await leave.save();
     return res.status(201).json({success:true , message:"Leave Added Succesfully !"});
   } catch (error) {
    console.log( "error from the leave Controller :", error.message);
     return res.status(500).json({success:false , error:error.message});

   }
}


const getLeaveId= async (req, res) => {
    try {
        const {id} =req.params ;
        console.log("Id received",id);
        let leaves ;
         leaves = await Leave.find({userId:id}).populate("employeeId","employeeId");
        if(!leaves || leaves.length === 0) {
         leaves = await Leave.find({employeeId:id}).populate("employeeId","employeeId");
        }
        return res.status(200).json({success:true , leaves:leaves})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false , error :error.message})
    }
}


const getAllLeaves = async (req, res) => {
    try {
        // const leaves = await Leave.find().populate({
        //     path:"userId",
        //     populate:[
        //         {
        //             path:'department',
        //             select:'dep_name'
        //         },
        //         {
        //             path:'userId',
        //             select:'name'
        //         }
        //     ]
        // });
        const leaves = await Leave.find().populate('userId',"name").populate(
            {
                path:"employeeId",
                select:"employeeId department",
                populate:{
                    path:"department",
                    select:"dep_name"
                }
            }
        );
        return res.status(200).json({success:true , leaves:leaves});

    } catch (error) {
        return res.status(500).json({success:false , error:error.message});
        
    }
}

const leaveDetails = async (req,res) => {
    try {
        const {id} =req.params ;
        const leave = await Leave.findById(id).populate("userId","name profileImage email").populate({
            path:"employeeId",
            select:"employeeId department",
            populate:{
                path:"department",
                select:"dep_name"

            }
        });
       
        if(!leave) return res.status(404).json({success:false ,message:"Leave details not found !"});
        return res.status(200).json({success:true, leave:leave})
    } catch (error) {
        res.status(500).json({success:false , error:error.message})
    }
}

const leaveUpdate =async (req,res) => {
    try {
        const {id} = req.params ;
        const leave = await Leave.findByIdAndUpdate(id , {status:req.body.status});
        if(!leave) return res.status(404).json({success:false , error:"Levae Details not Found"});
        return res.status(200).json({success:true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false , error:error.message })
        
    }
}

export {addLeave, getLeaveId , getAllLeaves, leaveDetails, leaveUpdate}