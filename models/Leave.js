import mongoose, { Schema } from "mongoose";

const leaveSchema = new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId , ref:"User" , required:true},
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    leave_type:{type:String ,
        enum:["sick leave","casual leave","annual leave"]
        ,required:true},
    from_date:{type:Date , required:true},
    to_date:{type:Date , required:true},
    description:{type:String , required:true},

    status:{
        type:String,
        enum:["pending" ,"approved","rejected"],
        default:"pending"
    },
    appliedAt:{type:Date , default: Date.now},
    createdAt:{type:Date , default: Date.now},
    updatedAt:{type:Date , default:Date.now},
})

const Leave = mongoose.model("Leave" , leaveSchema);

export default Leave ;