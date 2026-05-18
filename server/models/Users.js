import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email:{type:String,require:true,unique:true},
  fullname:{type:String,require:true},
  password:{type:String,require:true},
  phone:{type:String}
});

const UserModel = mongoose.model("UsersTbl",UserSchema,"UsersTbl");
export default UserModel;