import Department from "../models/Department.js";
 const addDepartment = async(req ,res)=>{
    try {
        const {dep_name ,description} = req.body ;
        const newDepartment =new Department({
            dep_name,
            description
        })
        await newDepartment.save();
        return res.status(200).json({success:true ,department:newDepartment});
    } catch (error) {
        return res.status(500).json({success:false , error :error.message})
    }

}

const getdepartments =async(req,res)=>{
    try{
        const departments= await Department.find();
        return res.status(200).json({success:true , departments});
    }catch(error){
        return res.status(500).json({success:false, error:"get Departments server error"});
    }
}

const getDepartmentById = async (req, res) =>{
    try {
        const {id} = req.params;
        const department = await Department.findById({_id:id});
        
        return res.status(200).json({success:true, department})
    } catch (error) {
        return res.status(500).json({success:false, error:"server error"});
        
    }
}

const updateDepartment = async(req, res)=>{
    try {
       const {id} = req.params ;
       const {dep_name,description}= req.body ;
       const updateDep = await Department.findByIdAndUpdate({_id:id},{
        dep_name:dep_name,
        description
       })
        return res.status(200).json({success:true , updateDep});

    } catch (error) {
        return res.status(500).json({success:false, error:"server error"});
        
    }
}

const deleteDepartment = async (req, res)=>{
try {
        const {id} = req.params ;
        const deleteDep = await Department.findById({_id:id});
        await deleteDep.deleteOne();
        return res.status(200).json({success:true , deleteDep});
        
} catch (error) {
        return res.status(500).json({success:false, error:error.message});
    
}    
}
export {addDepartment ,getdepartments ,getDepartmentById, updateDepartment ,deleteDepartment} 