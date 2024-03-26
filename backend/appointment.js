const mongoose = require('mongoose')

const AppointSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    location: String,
    phone: String,
    appointment: String,
})

module.exports=mongoose.model("Appointment", AppointSchema)