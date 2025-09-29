import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const login = async (req,res) =>{
    try {
        console.log(req.body)

        const {email , password} = req.body ;
        // console.log(email ,password)
        const user = await User.findOne({email}).exec();
        // console.log(user)
        if(!user){
            response.status(404).json({success:false ,error:"user Not Found"});
        }
        const isMatched = await bcrypt.compare(password ,user.password);
        if(!isMatched){
            response.status(400).json({success:false ,error:"Email or Password is wrong"});

        }

        const token = jwt.sign(
            {_id:user._id ,role:user.role},
            process.env.SECRET_TOKEN,
            {expiresIn:"10d"}
        )

        res.status(200).json({success:true ,token ,user :{_id:user._id ,name:user.name ,role:user.name }})
    } catch (error) {
        console.log(error.message);
    }
}


const verify = async (req, res) =>{
    return res.status(200).json({success:true , user : req.user})
}


export {login , verify} ;
