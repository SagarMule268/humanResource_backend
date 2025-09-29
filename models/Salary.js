import mongoose, { mongo, Schema } from "mongoose";


const salarySchema =new  mongoose.Schema({
    employeeId: {type:Schema.Types.ObjectId , ref:'Employee',required:true},
    base_salary: {type:Number , required:true},
    allowances: {type:Number  },
    deductions: {type:Number },
    netSalary: {type:Number },
    pay_date :{type:Date ,required:true},
    createdAt :{type:Date ,default: Date.now},
    updatedAt :{type:Date ,default: Date.now},

})

const Salary = mongoose.model('Salary',salarySchema);
export default Salary ;