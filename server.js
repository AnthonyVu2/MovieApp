const express = require("express");
var cors = require("cors");
const { assert } = require("console");
const { callbackify } = require("util");
const app = express();
const multer= require('multer');
const upload= multer();
const mongo = require('mongodb');
const mongoose = require('mongoose');
const MongoClient  = mongo.MongoClient;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'movie-app';
let db = null;







app.use(cors());

 



app.get("/Reviews", (req,res) => {
const collection = db.collection('Reviews');
collection.find({}).toArray(function(err,movie) {
    res.json(movie);
});
});

app.get("/Selected", (req,res) => {
   /* const collection = db.collection('Reviews');
    collection.find({}).toArray(function(err,movie) {
        res.json(movie);
    });*/
    res.json({
        title: "SPider-man",
        Review: "I love it"
    })
    });

app.get("/Reviews/:id",(req,res) => {
    const id = req.params.id;
    const collection = db.collection("Reviews");
    collection.findOne(
        {
        _id: new mongo.ObjectID(id),
        },
        (err,movie) => {
        res.json(movie);
    });
});

app.get("/Selected/:id",(req,res) => {
    const id = req.params.id;
    const collection = db.collection("Reviews");
    collection.findOne(
        {
        _id: new mongo.ObjectID(id),
        },
        (err,movie) => {
        res.json(movie);
    });
});

app.post("/Reviews", upload.none(), async (req,res) => {
    //console.log(req.body)
    const collection = db.collection("Reviews");
    let reviews=[];
    reviews.push(req.body.Review)
    const movie = await collection.insert({title: req.body.title, Review: reviews});
    res.json(movie.ops);
});

app.post("/Selected", upload.none(), async (req,res) => {
    //console.log(req.body)
    const collection = db.collection("Reviews");
    const movie = await collection.insert(req.body);
    res.json(movie.ops);
});

app.delete("/Reviews/:id", upload.none(), async (req,res) => {
    //console.log(req.body)
    const collection = db.collection("Reviews");
    const movie = await collection.drop();
    res.json(movie.ops);
});

app.put("/Selected", upload.none(), async (req,res) => {
    console.log(req.body.id);
    const collection = db.collection("Reviews");
    const ID = mongoose.Types.ObjectId(req.body.id);
    let reviews=[];
    var temp=await collection.find({title: req.body.title}).forEach(element => {
        
         if(element.Review.length!==0){
            reviews=element.Review;
            //console.log(element.Review)
         }
         
        
        
        
    });;
    //console.log(reviews);
   /* if(req.body.Review!==null)
    {
        reviews.push(req.body.Review)
    }*/
    
    const movie = await collection.updateOne(
        { I: 0 },
   {
     $set: { "title": req.body.title, "Review": reviews}
   }
    )
//res.json(movie.ops)
})
//res.send("Hello");

app.put("/Reviews", upload.none(), async (req,res) => {
    
    //console.log(req.body)
    
    const collection = db.collection("Reviews");
    const ID = mongoose.Types.ObjectId(req.body.id);
    var reviews=[];
    var temp=await collection.find({_id: ID}).forEach(element => {
        
            reviews=element.Review;
            //console.log(element)
          
        
    });;
    //console.log(req.body.id);
    //let reviews = [];
    //reviews.push(temp.Review);
    reviews.push(req.body.Review);
    //console.log(reviews);
   
    const movie = await collection.updateOne(
        { _id: ID},
   {
     $set: { "title": req.body.title, "Review": reviews}
   }
    )

    
    const movie2 = await collection.updateOne(
        { I: 0},
   {
     $set: { "title": req.body.title, "Review": reviews}
   }
    )
    //console.log(movie)
//res.json(movie.ops)
})

client.connect(function(err){
    
    console.log('Connected successfully to server');
    db = client.db(dbName);
    app.listen(5000);
    
});