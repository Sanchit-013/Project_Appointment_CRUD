const User = require('./user')
const Appoint = require('./appointment')

require('./connect')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/', async(req, resp)=>{
    let result = new User(req.body);
    let newResult = await result.save();
    newResult = newResult.toObject();
    delete newResult.password;
    resp.send(newResult)
})


app.post('/Login', async(req, resp)=>{
    console.log(req.body);
    if(req.body.password && req.body.email){
        let result = await User.findOne(req.body).select('-password')
        if(result){
            resp.send(result)
        }else{
            resp.send({result: "No User found"})
        }   
    }else{
        resp.send("No User found")
    }
})


app.post('/Home', async(req, resp)=>{
    let result = new Appoint(req.body);
    let newResult = await result.save();
    resp.send(newResult)
})

app.get('/List',async(req, resp)=>{
    let result = await Appoint.find()
    if(result.length>0){
        resp.send(result)
    }
})

app.delete('/Del/:id',async(req, resp)=>{
    let result = await Appoint.deleteOne({_id: req.params.id})
    resp.send(result)
})

app.get('/Edit/:id',async(req, resp)=>{
    let result = await Appoint.findOne({_id: req.params.id})
    if(result){
        resp.send(result)
    }
})

app.put('/Edit/:id', async(req, resp)=>{
    let result = await Appoint.updateOne(
        {_id: req.params.id},
        {
            $set: req.body
        }
        )
        resp.send(result)
})


app.listen(5000)