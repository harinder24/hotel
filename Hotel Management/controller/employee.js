const bcrypt = require("bcryptjs");
const Employee = require("../model/employee")
const jwt = require("jsonwebtoken")
const User = require("../model/user")
const Room = require("../model/room")
const login = async (req, res) => {
    const data = req.body;
    let foundEmployee = await Employee.findOne({email: data.email });
    if (foundEmployee) {
        const matchPassword = await bcrypt.compare(data.password, foundEmployee.password);
        if (matchPassword) {
            const info = {name: foundEmployee.name, email: foundEmployee.email, role: foundEmployee.role}
            const token = jwt.sign(info, process.env.TOKEN_SECRET);
            return res.status(200).header("auth-token", token).json({bool: true, data: info})

        } else {
            return res.status(200).json("incorrect")
        }
    } else {

        return res.status(200).json(false)
    }
}
const changepassword = async (req, res) => {
    const data = req.body;
    let foundEmployee = await Employee.findOne({email: data.email });
    if (foundEmployee) {
        const matchPassword = await bcrypt.compare(data.password, foundEmployee.password);
        if(matchPassword){
            return res.status(200).json("samepassword")
        }
        else{
            const encryptPassword = await bcrypt.hash(data.password, 10);
            foundEmployee.password = encryptPassword;
            await foundEmployee.save();
            return res.status(200).json(true)
        }
    }else{
    return res.status(200).json(false)
    }
}
const verificationCode = async (req, res) => {
    const data = req.body;

    let foundEmployee = await Employee.findOne({email: data.email });
    if (foundEmployee) {
        return res.status(200).json( (Math.random()*1000000).toFixed(0))
    }
    return res.status(200).json(false)
}


const fireEmployee = async (req, res) => {
    let foundEmployee = await Employee.findOne({email: req.body.email })
    if(foundEmployee){
        if(foundEmployee.role == "employee"){
            await Employee.deleteOne({email : req.body.email})
            return res.status(200).json(true)
        }
        else if(foundEmployee.role == "manager"){
            return res.status(200).json("manager")
        }
    }
    else{
        return res.status(200).json(false)
    }
}
const employeeList = (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            const filteredData = docs.map((user) => {
                return {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            })
            return res.status(200).json(filteredData)
        } else {
            return res.status(200).json(false)
        }
    })
}
const registration = async (req, res) => {
    const data = req.body;
    const encryptPassword = await bcrypt.hash(data.password, 10);
    let foundEmployee = await Employee.findOne({ email: data.email });
    if(foundEmployee){
        return res.status(200).json("exist")
    }
    else{
        const newEmployee = new Employee({
            name: data.name,
            email: data.email,
            role: data.role,
            password: encryptPassword
        })

        newEmployee.save().then((data) => {
            return res.status(201).json(true)
        }).catch((error) => {
            return res.status(500).json({
                message: "There was an error",
                error
            })
        })
    }

}
const employeeValidation = async(req, res) =>{
    if(req?.decodedEmail){
        const foundEmployee = await Employee.findOne({email: req.decodedEmail})
        if(foundEmployee){
            if(foundEmployee.role == "employee"){
                return res.status(201).json(true)
            }
            else{
                return res.status(201).json(false)
            }
        }
    }
}
const managerValidation = async(req, res) =>{
    if(req?.decodedEmail){
        const foundEmployee = await Employee.findOne({email: req.decodedEmail})
        if(foundEmployee){
            if(foundEmployee.role == "manager"){
                return res.status(201).json(true)
            }
            else{
                return res.status(201).json(false)
            }
        }
    }
}

const getBookings = async(req, res) => {
    let array = []
    const foundRoom101 = await User.findOne({room101: true})
    if(foundRoom101){
        array.push({name: foundRoom101.name, email: foundRoom101.email, room: 101})
    }
    const foundRoom102 = await User.findOne({room102: true})
    if(foundRoom102){
        array.push({name: foundRoom102.name, email: foundRoom102.email, room: 102})
    }
    const foundRoom103 = await User.findOne({room103: true})
    if(foundRoom103){
        array.push({name: foundRoom103.name, email: foundRoom103.email, room: 103})
    }
    return res.status(201).json(array)
}

const unBook = async(req,res) =>{
    const data = req.body.room;
    let foundRoom = await Room.findOne({num: `${data}`})
    let foundUser = await User.findOne({email: req.body.email})
    if(foundUser){
        if(data == 101){
            if(foundUser.room101 == false){
                return res.status(201).json(false)
            } else if(foundUser.room101 == true){
                foundRoom.book = false 
                await foundRoom.save() 
                foundUser.room101 = false
                await foundUser.save()
                return res.status(201).json(true)
            }
            

        }
        else if(data == 102){
            if(foundUser.room102 == false){
                return res.status(201).json(false)
            } else if(foundUser.room102 == true){
                foundRoom.book = false 
                await foundRoom.save() 
                foundUser.room102 = false
                await foundUser.save()
                return res.status(201).json(true)
            }
            
        }
        else if(data == 103){
            if(foundUser.room103 == false){
                return res.status(201).json(false)
            } else if(foundUser.room103 == true){
                foundRoom.book = false 
                await foundRoom.save() 
                foundUser.room103 = false
                await foundUser.save()
                return res.status(201).json(true)
            }
            
        }

    }
}

module.exports = {login, changepassword, verificationCode, fireEmployee, employeeList, registration, employeeValidation, managerValidation, getBookings, unBook}
