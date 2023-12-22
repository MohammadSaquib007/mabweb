const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name :{

    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    min:8
  },

  
address: {
  street: { 
      type: String, 
      required: true, 
      trim: true
   },
  city: {
       type: String,
        required: true,
         trim: true
       },
  pin: {
       type: Number,
       required: true
         }
}
 
},{timestamps:true});

module.exports  = mongoose.model('user', userSchema);