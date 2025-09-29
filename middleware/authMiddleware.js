import User from '../models/User.js'
import jwt from 'jsonwebtoken';
const verifyToken = async (req,res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token){
        return res.status(404).json({success:false ,error:"Token is not provided" })
        }

        const decoded =  jwt.verify(token ,process.env.SECRET_TOKEN);
        if(!decoded){
            return res.status(401).json({success:false , error:"Token is not valid"})
        }

        const user =await User.findById({_id : decoded._id}).select("-password");
        if(!user){
            return res.status(404).json({success:false ,error :"User not found"})
        }

        req.user = user ;
        next();
    } catch (error) {
           console.log("Error from verify ",error.message)
            return res.status(500).json({success:false , error:error.message})

    }
}

export default verifyToken ;