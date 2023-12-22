const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express()

app.use(express.json());  

 mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://saquib:Saquib123@mohammadsaquib.f3sxbno.mongodb.net/mabapp",{
    useNewUrlParser:true  
}) 

.then(()=> console.log("MongoDB  connected successfully"))  
.catch(err => console.log(err))


app.use("/",route) 

app.use( (req ,res) => {
    res.status(400).send({status : false , message :`Page Not Found , Given URL ${req.url} is incorrect for this application.`})
})

app.listen(process.env.PORT || 3000, function(){
    console.log("express app runing on port "+(process.env.PORT || 3000) )
})