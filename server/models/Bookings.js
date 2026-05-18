import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
  fullname:{type:String,require:true},
  phone:{type:String,require:true},

  cartype:{type:String,require:true},
  size:{type:String,require:true},

  startdate:{type:String,require:true},
  enddate:{type:String,require:true},

  totalprice:{type:Number,require:true},

  email:{type:String,require:true},

  lat:{type:Number},
  lng:{type:Number}
});

const BookingModel = mongoose.model("BookingsTbl",BookingSchema,"BookingsTbl");
export default BookingModel;