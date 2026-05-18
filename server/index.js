import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/Users.js';
import BookingModel from './models/Bookings.js';
import bcrypt from 'bcrypt';
import dns from "dns";
import CarModel from './models/Cars.js';

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app=express();
app.use(cors());
app.use(express.json());

app.listen(3002,()=>{
    console.log("Server Connected...")
})

const conStr="mongodb+srv://admin:admin123@carproject-cluster.nwgp9t1.mongodb.net/carProjectDB?retryWrites=true&w=majority&appName=carProject-Cluster"
mongoose.connect(conStr)
        .then(()=>{console.log("Database Connected..")})
        .catch(error=>{console.log("Database Error..."+error)});

// get all users from database        
app.get("/getUsers",async(req,res)=>{
    try{
        const users=await UserModel.find({});
        res.send(users);
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});

// register new user into database
app.post("/register",async(req,res)=>{
    try{
        const {fullname,email,password,phone}=req.body;
        const user=await UserModel.findOne({email:email});
        if(user)
            res.send({message:"User Exists"});
        else
            {
                const hpwd=await bcrypt.hash(password,10);
                const newuser=new UserModel({fullname,email,password:hpwd,phone});
                newuser.save();
                res.send({message:"User Registered"});
            }
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});

// login user and check credentials
app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email:email});
        if(user){
            const match=await bcrypt.compare(password,user.password);
            if(match)
                res.send({user:user,message:"success"});
            else
                res.send({message:"Invalid Credentials"});
        } 
        else
            {
                res.send({message:"Invalid Credentials"});
            }
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});

// save booking into database
app.post("/saveBooking",async(req,res)=>{
    try{
        const newbooking=new BookingModel(req.body);
        newbooking.save();
        res.send({message:"Booking Saved"});
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});

// get bookings for logged in user
app.get("/getBookings/:email",async(req,res)=>{
    try{
        const email=req.params.email;

        const bookings=await BookingModel.find({
            email:email
        });

        res.send({bookings:bookings});
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});

//  delete booking from database
app.delete("/delBooking/:bookingid",async(req,res)=>{
    try{
        const bookingid=req.params.bookingid;

        const del=await BookingModel.findOneAndDelete({
            _id:bookingid
        });

        if(del)
            res.send("Booking Deleted");
        else
            res.send("Booking Not Deleted");
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});

// update booking details
app.put("/updBooking",async(req,res)=>{
    try{
        const {bookingid, fullname, phone, cartype, size, startdate, enddate, totalprice, email} = req.body;
        const booking=await BookingModel.findOne({
            _id:bookingid
        });

        booking.fullname=fullname;
        booking.phone=phone;
        booking.cartype=cartype;
        booking.size=size;
        booking.startdate=startdate;
        booking.enddate=enddate;
        booking.totalprice=totalprice;
        booking.email=email;

        await booking.save();
        res.send("Booking Updated");
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});

// get all cars from database
app.get("/getCars",async(req,res)=>{
    try{
        const cars=await CarModel.find({});
        res.send({cars:cars});
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});