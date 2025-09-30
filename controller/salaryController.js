import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";


const addSalary = async (req, res)=>{
   try {
     const {
         employeeId ,
             base_salary,
             allowances,
             deductions,
             pay_date
     } = req.body ;
     const totalSalary = parseInt(base_salary) + parseInt(allowances) -parseInt(deductions) ;

     const newsalary = new Salary({
            employeeId ,
             base_salary,
             allowances,
             deductions,
             netSalary:totalSalary,
             pay_date
     });

     await newsalary.save();
     res.status(200).json({success:true})
   } catch (error) {
     res.status(500).json({success:false , error :error.message})
    
   }



}

const getSalary = async (req, res) => {
  try {
    const {id} = req.params ;
    let salary;
    salary = await Salary.find({employeeId:id}).populate("employeeId",'employeeId');
    if(salary.length===0){
       const employee = await Employee.findOne({userId:id});
        if(!employee)   return res.status(404).json({ success: false, error: "Employee salary records not available " });
    salary = await Salary.find({employeeId:employee._id}).populate("employeeId",'employeeId');
    }
    
    
     res.status(200).json({success:true , salary:salary})

  } catch (error) {
     res.status(500).json({success:false , error:error.message})

  }
  
}
export {addSalary , getSalary}