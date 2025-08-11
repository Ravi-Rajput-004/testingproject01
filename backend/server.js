const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const dotenv = require('dotenv');
const multer=require('multer')

const app=express();
app.use(express.json())
app.use(cors())

dotenv.config(); // <-- ADD THIS LINE


app.listen(9000,async(req,res)=>{
    console.log("running")
})
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Error:', err));

let picname
const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null, "../table/public/uploads")
    },
    filename:function (req,file,cb){
        picname=Date.now()+file.originalname
        cb(null,picname)
    }
})
const upload=multer({storage:storage})







tableschema=mongoose.Schema({
f:String,
s:String,
t:String,
p:String


})

tablemodel= mongoose.model("ff",tableschema,"ff")

app.post("/table",upload.single('file'),async(req,res)=>{
const result= new tablemodel({
    p:picname,
    f:req.body.first,
    s:req.body.first1,
    t:req.body.first2
})

const rr=await result.save()
if(rr){
    res.send({statuscode:1})
}else{
        res.send({statuscode:0})

}

})


app.get("/st",async(req,res)=>{
const result= await tablemodel.find()

if(result){
    res.send({statuscode:1, data:result})
}
else{
        res.send({statuscode:0})

}
})


app.delete("/dddd/:id",async(req,res)=>{
    const re= await tablemodel.findOneAndDelete({_id:req.params.id})

    if(res){
        res.send({
            statuscode:1
        })
    }else{
        res.send({
            statuscode:0
        })
    }
})


app.put("/ut",async(req,res)=>{
    const result= await tablemodel.updateOne({_id:req.body.id},{$set:{f:req.body.first,s:req.body.first1,t:req.body.first2}})

 if(result){
    res.send({statuscode:1})
 }else{
        res.send({statuscode:0})

 }

})


// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
