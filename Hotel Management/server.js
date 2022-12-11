const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
require('dotenv').config();
const PORT = 5000;

app.use(express.json());
app.use("/ciroc",express.static(path.join(__dirname ,'public/ciroc')))
app.use("/ciroc/locations",express.static(path.join(__dirname ,'public/locations')))
app.use("/ciroc/events",express.static(path.join(__dirname ,'public/events')))
app.use("/ciroc/userregistration",express.static(path.join(__dirname ,'public/userregistration')))
app.use("/ciroc/userlogin",express.static(path.join(__dirname ,'public/userlogin')))
app.use("/ciroc/user",express.static(path.join(__dirname ,'public/user')))
app.use("/ciroc/user/bookroom",express.static(path.join(__dirname ,'public/bookroom')))
app.use("/ciroc/user/bookedrooms",express.static(path.join(__dirname ,'public/bookedroom')))
app.use("/ciroc/userpassword",express.static(path.join(__dirname ,'public/userpassword')))
app.use("/ciroc/employeelogin",express.static(path.join(__dirname ,'public/employeelogin')))
app.use("/ciroc/employee",express.static(path.join(__dirname ,'public/employee')))
app.use("/ciroc/employeepassword",express.static(path.join(__dirname ,'public/employeepassword')))
app.use("/ciroc/manager",express.static(path.join(__dirname ,'public/manager')))
app.use("/ciroc/employee/training",express.static(path.join(__dirname ,'public/employeetraining')))
app.use(express.urlencoded({ extended: true }))


mongoose.connect(process.env.MONGO_URI, (error) => {
    if (error) {
        console.error(`There was an error : ${error}` );
    } else {
        console.log("Connected to the database");
    }
})
const userRoutes = require("./routes/user");
const employeeRoutes = require("./routes/employee");
app.get('/', (req, res) => {
    res.redirect('/ciroc');
});
app.use("/",userRoutes);
app.use("/",employeeRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




