var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Orthopaedics')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    var name=req.body.name
    var id=req.body.id
    var gender=req.body.gender
    var age=req.body.age
    var doctorname=req.body.doctorname

    var data={
        "name":name,
        "id":id,
        "gender":gender,
        "age":age,
        "doctorname":doctorname
    }
    db.collection('orthodata').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_ortho.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('ortho.html')
}).listen(3012);

console.log("Listening on port 3012")