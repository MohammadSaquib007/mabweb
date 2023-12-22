const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
  fullName :{

    type:String,
    
  },
  email:{
    type:String,
   // required:true,
   // unique:true
  },
  MobileNumber:{
    type:String,
   
  },
  masterClassId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'masterClass'
  },

  
location: {
  type:String
}
 
},{timestamps:true});

module.exports  = mongoose.model('Trail', demoSchema);