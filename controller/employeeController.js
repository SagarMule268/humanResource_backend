import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import multer from "multer";
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from "../cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hr-app", // folder name in cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload  = multer({storage:storage});
const addEmployee = async(req, res)=>{
   try {
     const {
         name,
         email,
         employeeId,
         dob,
         gender,
         maritalstatus,
         designation,
         department,
         salary,
         password,
         role,
         image
     } = req.body ;
     
     const user = await User.findOne({email});
     if(user){
         return res.status(400).json({success:false , error:"User already exists"});
     }
     const hashedPassword = await bcrypt.hash(password, 10);
 
     const newUser = new User({
         name,
         email,
         password:hashedPassword,
         role,
         profileImage:req.file?req.file.filename : ""
     })
 
     const savedUser= await newUser.save();
 
     const newEmployee = new Employee({
         userId:savedUser._id,
         employeeId,
         dob,
         gender,
         maritalstatus,
         department,
         designation,
         salary
     })
 
      await newEmployee.save();
     return res.status(200).json({success:true,message:"employee created"})
   } catch (error) {
        return res.status(500).json({success:false,error:error.message})
   }
}


const getEmployees = async (req, res)=>{
     try{
        const employees= await Employee.find().populate("userId").populate("department");
        return res.status(200).json({success:true , employees});
    }catch(error){
        return res.status(500).json({success:false, error:error.message});
    }
}

const getEmployeeById = async (req , res) =>{
    const {id} = req.params ;
    
    try{
        let employee ;
         employee = await Employee.findById({_id :id}).populate("userId",{password:0}).populate("department") ;
        if(!employee){
         employee = await Employee.findOne({userId :id}).populate("userId",{password:0}).populate("department") ;

        }
        res.status(200).json({success:true , employee:employee});    
    
    }catch(error){
        res.status(500).json({success:false , error : error.message});
    }
}

const updateEmployee = async (req, res) =>{
    try {
        const {id} = req.params ;
        const {
            name ,
            maritalstatus,
            designation,
            department,
            salary
        } = req.body;
        const employee = await Employee.findById({_id:id});
        if(!employee) {
            return res.status(500).json({success:false , message :"employee not found"})
        }

        const user = await User.findById({_id:employee.userId});
        if(!user) return res.status(500).json({success:false , message : "user not found "})
        const updateEmployee = await Employee.findByIdAndUpdate({_id:id} ,{ 
            maritalstatus,
            designation,
            department,
            salary } );
        const updateUser =await User.findByIdAndUpdate({_id:employee.userId},{name});
        
        if(!updateEmployee || !updateUser) {
            return res.status(500).json({success:false , message:"Error updating the Employee"});
        }
        return res.status(200).json({success:true , message:"Employee updated successfuly !"})
    } catch (error) {
                return res.status(500).json({success:false , message:error.message})

    }
}


const fechDepartmentByDepId = async(req, res) =>{
    try {
        const {id} = req.params ;
        const employees = await Employee.find({department:id}).populate("userId",{password:0});
        return res.status(200).json({success:true , employees:employees});
    } catch (error) {
        return res.status(500).json({success:false , message:error.message})
    }
}
export {addEmployee , upload, getEmployees ,getEmployeeById , updateEmployee , fechDepartmentByDepId} ;