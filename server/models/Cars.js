import mongoose from "mongoose";

const CarSchema = mongoose.Schema({
    carname:{type:String,require:true},
    cartype:{type:String,require:true},
    size:{type:String,require:true},
    price:{type:Number,require:true},
    available:{type:Boolean,require:true}
});

const CarModel = mongoose.model("CarsTbl",CarSchema,"CarsTbl");
export default CarModel;