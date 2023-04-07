const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectToMongo= require('./db');
const userRoute=require('./routes/users');
const authRoute=require('./routes/auth');
const postRoute=require('./routes/posts');
const multer=require("multer");
const path=require("path");
const conversationRoute=require("./routes/conversations");
const messageRoute=require("./routes/messages");

var app = express();
const port = 8800;

dotenv.config();
connectToMongo();

app.use("/images",express.static(path.join(__dirname,"public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images");
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname);
  }
});

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try {
    return res.status(200).json("File Uploaded Successfully");
  } catch (error) {
    console.log(error);
  }
})

app.get('/',(req,res)=>{
    res.send("Welcome to the homepage");
})

app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);
app.use('/api/conversations',conversationRoute);
app.use('/api/messages',messageRoute);


app.listen(port, () => {
  console.log(`Aayugram backend listening on port http://localhost:${port}`)
})

