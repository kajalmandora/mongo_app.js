const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/demotwo");
const connection = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    mob:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

const userModel = connection.model("user",userSchema);

let userData = {
    userName: 'abc123',
    email: 'abc123@example.com',
    mob: '123321123',
    password: '123'
}

// userModel.create(userData,(err)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log('data saved');
// });

// userModel.findOne({userName:'abc'},(err,result)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log(result);
// });

app.post('/login',(req,res)=>{
    let userData = {
        userName: req.body.userName,
        password: req.body.password
    }
    userModel.findOne({userName: userData.userName},(err,result)=>{
        if(err){
            res.status(500);
            res.json({flag: false,msg:'internal server error'});
        }
        else{
            if(result == null){
                res.status(404);
                res.json({flag: false,msg:'user does not exist'});
            }else if(result.password == userData.password){
                res.status(200);
                res.json({flag: true,msg:'login successful'});
            }else{
                res.status(403);
                res.json({flag: false,msg:'password incorrect'});
            }
        }
    });
});

app.post('/signup',(req,res)=>{
    let userData = {
        userName: req.body.userName,
        email: req.body.email,
        mob: req.body.mob,
        password: req.body.password
    }
    userModel.create(userData,(err)=>{
        if(err){
            res.status(500);
            res.json({flag: false,msg:'internal server error'});
        }
        else{
            res.status(200);
            res.json({flag: true,msg:'signup successful'});
        }
    });
});

app.listen(3000,()=>{console.log("application started at port 3000");});

//step 1: install mongoose
//step 2: import moongoose
//step 3: establish a connection between node application and mongodb
//step 4: create schema
//step 5: create a model from the schema
//step 6: perform crud operations using model