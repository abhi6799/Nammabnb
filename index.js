const express = require ("express")
const cors = require("cors")
const dotenv = require("dotenv")
const userRouter=require("./app/routes/userRouter")
const dbConnect = require("./app/config/dbConnect")
dotenv.config()
const app = express()
const port = process.env.PORT||5000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use("/api/user",userRouter)
app.use((err, request, response, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });
app.listen(port,function(){
    console.log("app running on port 8000")
    dbConnect()
})