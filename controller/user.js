const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const User = require("../model/user")
const Room = require("../model/room")
const registration = async (req, res) => {
    const data = req.body;
    const encryptPassword = await bcrypt.hash(data.password, 10);
    let foundUser = await User.findOne({ email: data.email });
    if(foundUser){
        return res.status(200).json("exist")
    }
    else{
        const newUser = new User({
            name: data.name,
            email: data.email,
            role: data.role,
            password: encryptPassword,
            room101: false,
            room102: false,
            room103: false
        })

        newUser.save().then((data) => {
            return res.status(201).json(true)
        }).catch((error) => {
            return res.status(500).json({
                message: "There was an error",
                error
            })
        })
    }

}

const login = async (req, res) => {

    const data = req.body;
    
    let foundUser = await User.findOne({email: data.email });
    if (foundUser) {

        const matchPassword = await bcrypt.compare(data.password, foundUser.password);
        if (matchPassword) {
            const info = {name: foundUser.name, email: foundUser.email, role: foundUser.role}
            const token = jwt.sign(info, process.env.TOKEN_SECRET);
            return res.status(200).header("auth-token", token).json({bool: true, data: info})

        } else {
            return res.status(200).json("incorrect")
        }

    } else {

        return res.status(200).json(false)
    }
}

const changePassword = async (req, res) => {
    const data = req.body;
    let foundUser = await User.findOne({email: data.email });
    if (foundUser) {
        const matchPassword = await bcrypt.compare(data.password, foundUser.password);
        if(matchPassword){
            return res.status(200).json("samepassword")
        }
        else{
            const encryptPassword = await bcrypt.hash(data.password, 10);
            foundUser.password = encryptPassword;
            await foundUser.save();
            return res.status(200).json(true)
        }

    }
    return res.status(200).json(false)
}
const verificationcode = async (req, res) => {
    const data = req.body;

    let foundUser = await User.findOne({email: data.email });
    if (foundUser) {
        return res.status(200).json( (Math.random()*1000000).toFixed(0))
    }
    return res.status(200).json(false)
}

const userValidation = async(req, res) =>{
    if(req?.decodedEmail){
        const foundUser = await User.findOne({email: req.decodedEmail})
        if(foundUser){
            if(req.decodedRole == "user"){
                return res.status(201).json(true)
            }
            else{
                return res.status(201).json(false)
            }
        }
    }
}
const room = async(req, res) =>{
    Room.find((err, docs) => {
        if (!err) {
            let array = []
            docs.map((info) => {
                if(info.book == false){
                    array.push({
                        num: info.num,
                        link: info.link
                    })
                }
                
            })
            return res.status(200).json(array)
        } else {
            return res.status(200).json(false)
        }
    })
}

const bookRoom = async(req, res) =>{
    const data = req.headers.data;
    
    let foundUser = await User.findOne({email: req.decodedEmail})
    let foundRoom = await Room.findOne({num: `${data}`})
    if(foundUser){
        if(data == 101){
            if(foundUser.room101 == true){
                return res.status(201).json(false)
            } else if(foundUser.room101 == false){
                foundRoom.book = true
                await foundRoom.save()
                foundUser.room101 = true
                await foundUser.save()
                return res.status(201).json(true)
            }
            

        }
        else if(data == 102){
            if(foundUser.room102 == true){
                return res.status(201).json(false)
            } else if(foundUser.room102 == false){
                foundRoom.book = true
                await foundRoom.save()
                foundUser.room102 = true
                await foundUser.save()
                return res.status(201).json(true)
            }
            
        }
        else if(data == 103){
            if(foundUser.room103 == true){

                return res.status(201).json(false)
            }else if(foundUser.room103 == false){
                foundRoom.book = true
                await foundRoom.save()
                foundUser.room103 = true
                await foundUser.save()
                return res.status(201).json(true)
            }
            
        }

    }
}

const bookedRoom = async (req, res) => {
    const data = req.headers.data;
    let array = []
    let foundUser = await User.findOne({email: req.decodedEmail})
    if(foundUser){
        if(foundUser.room101 == true){
            let foundRoom = await Room.findOne({num: 101})
           
            array.push({link: foundRoom.link, num: foundRoom.num})
        }
        if(foundUser.room102 == true){
            let foundRoom = await Room.findOne({num: 102})
            array.push({link: foundRoom.link, num: foundRoom.num})
        }
        if(foundUser.room103 == true){
            let foundRoom = await Room.findOne({num: 103})
            array.push({link: foundRoom.link, num: foundRoom.num})
        }
    }
    return res.status(200).json(array)
}

const unBookRoom = async(req, res) =>{
    const data = req.headers.data;
    let foundRoom = await Room.findOne({num: `${data}`})
    let foundUser = await User.findOne({email: req.decodedEmail})
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

module.exports = {registration, login, changePassword, verificationcode, userValidation,room,bookRoom,bookedRoom,unBookRoom}