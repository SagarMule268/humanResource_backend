import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/connectDB.js';
import { configDotenv } from 'dotenv';
// import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRoutes from './routes/department.js'
import employeeRoutes from './routes/employee.js'
import salaryRoutes from './routes/salary.js'
import leaveRoutes from './routes/leave.js'
import settingRoutes from './routes/setting.js'
import summaryRoutes from './routes/dashboard.js'
configDotenv();
connectDB();
const PORT =process.env.PORT;
const app =express();


app.use(cors({ 
  origin: "http://localhost:5173", 
  credentials: true 
}));
app.use(express.json());

app.use('/uploads',express.static('public/uploads'));
app.use('/api/auth' ,authRouter);
app.use('/api/department' ,departmentRoutes);
app.use('/api/employee' ,employeeRoutes);
app.use('/api/salary' ,salaryRoutes);
app.use('/api/leave' ,leaveRoutes);
app.use('/api/setting' ,settingRoutes);
app.use('/api/dashboard' ,summaryRoutes);

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})