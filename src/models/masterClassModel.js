const mongoose = require('mongoose');

const masterClassSchema = new mongoose.Schema({
  title :{

    type:String,
    required:true,
  },
  timeSlot:{
    type:String,
   // required:true,
    
  },
  date:{
    type:String,
  },
  bookId:{
    
  }
 
 
},{timestamps:true});

module.exports  = mongoose.model('masterClass', masterClassSchema);