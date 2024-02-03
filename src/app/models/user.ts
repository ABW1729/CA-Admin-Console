import mongoose,{Schema,models} from "mongoose";


const userSchema = new mongoose.Schema({
   name:{type:String,required:true},
   points:{type:Number,required:true},
   email:{type:String,required:true},
   phoneNumber:{type:String,required:true}
  });
  

  const User = models.User || mongoose.model("User", userSchema);
  
  export default User;