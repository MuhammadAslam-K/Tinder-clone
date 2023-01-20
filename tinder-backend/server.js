import express  from "express";
import mongoose from "mongoose";
import Cards from './dbCards.js'
import Cors from "cors";

// App Config 
const app = express();
const port = process.env.PORT || 8001;
const connectio_url = "mongodb+srv://admin-1:admin1@cluster0.qrbjgtl.mongodb.net/?retryWrites=true&w=majority"

//Middlewares 

app.use(express.json())
app.use(Cors());


// DB config

mongoose.set('strictQuery', false)
mongoose.connect(connectio_url,{
   // useNewUrlParser: true,
    //useUnifiedTopology:true,
   // useCreateIndex:true,
})

// API Endpoint
app.get('/',(req,res)=> res.status(200).send("Hello !!!!!"));

app.post('/tinder/cards',(req,res)=>{
    const dbCards = req.body;

    Cards.create(dbCards,(err,data)=>{
        if (err) {
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    });
});

app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    });
});
// Listener
app.listen(port,()=> console.log(`listening on localhost:${port}`));