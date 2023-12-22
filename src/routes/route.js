const express = require("express")
const router =express.Router()


//const controller =require("../controller/userController")
//const midd= require("../middleware/auth")
 const bookDemo=require("../controllers/bookDemoController")
 const master =require('../controllers/masterClassController')
 router.post("/demo",bookDemo.bookDemo)
 router.post("/verify",bookDemo.bookDemo)
router.post("/master",master.createMaterClass)
router.get("/get",master.getClass)
router.post("/bookClass",master.bookClassbyUser)
router.get("/getusebookData",master.getUserbOOkedClasses)
// router.post("/userss",controller.Creation)

//router.post("/login",bookDemo.userLogin)
// router.post("/send",bookDemo.sendOTP)
// router.post("/verify",bookDemo.verifyOTP)
// router.get("/user",midd.authentication,controller.getUsers)
// router.get("/user/:userId",controller.getUserById)
// router.put("/user/:userId",controller.updateUser)
// router.delete("/user/:userId",controller.userDeletionById)

module.exports = router  