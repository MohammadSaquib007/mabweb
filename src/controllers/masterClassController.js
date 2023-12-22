const master = require("../models/masterClassModel");
const bookDemoModel = require("../models/bookDemoModel");
const { user } = require("firebase-functions/v1/auth");

module.exports.createMaterClass = async (req, res) => {
  try {
    const createMS = await master.create(req.body);
    return res.status(201).send({
      status: true,
      msg: " class created successfully",
      data: createMS,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
//  module.exports.getClass = async function(req,res){

//             try{
//                 const date =req.query.date
//                console.log(date)
//                // const title =req.body.title
//                 const classData = await master.find({ date: date })
//                 console.log(classData)
//                       return res.status(200).send({status:true,msg:"All booking details",data:classData})
// const startDate = new Date(req.body.startDate);
// const endDate = new Date(req.body.endDate);
// Validate if the provided dates are valid
//    if (isNaN(startDate) || isNaN(endDate)) {
//    return res.status(400).send({ status: false, message: 'Invalid date format' });
//           }

//               const classData = await master.find({
//     createdAt: {
//         $gte: startDate,
//         $lte: endDate
//     }
// }).select({title:1,_id:0})
//       return res.status(200).send({status:true,msg:"All booking details",data:classData})

//     }catch(err){
//         return res.status(500).send({ status: false, msg: err.message })

//     }
//    }
//    const master = require('../models/master'); // Import your master model
module.exports.getClass = async function (req, res) {
  try {
    const date = req.query.date;
    if (!date) {
      return res
        .status(400)
        .json({ status: false, msg: "Date parameter is required" });
    }

    const classData = await master
      .find({ date: date })
      .select({ title: 1, timeSlot: 1, _id: 0 });
    console.log(classData);

    if (classData.length === 0) {
      return res
        .status(404)
        .json({ status: false, msg: "No data found for the given date" });
    }

    return res
      .status(200)
      .json({ status: true, msg: "All booking details", data: classData });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message });
  }
};

module.exports.bookClassbyUser = async (req, res) => {
  try {
    

    // Find the user
   let book =await bookDemoModel.create(req.body)
   return res.status(201).send({status:true,data:book})

   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.getUserbOOkedClasses = async function (req, res) {
  try {
    let findData = await bookDemoModel
      .find()
      .populate('masterClassId');

    return res.status(200).send({
      status: true,
      data: findData,
      
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message });
  }
};
