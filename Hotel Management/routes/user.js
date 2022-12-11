const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const verify = require("../middleware/verifyToken")


router.post("/ciroc/userregistration", userController.registration)
router.post("/ciroc/userlogin", userController.login)
router.put("/ciroc/userpassword", userController.changePassword)
router.post("/ciroc/userpassword", userController.verificationcode)
router.post("/ciroc/user",verify, userController.userValidation)
router.post("/ciroc/user/bookroom",verify, userController.userValidation)
router.get("/ciroc/user/bookroom/getroom", userController.room )
router.put("/ciroc/user/booking",verify, userController.bookRoom)
router.post("/ciroc/user/bookedroom",verify, userController.userValidation)
router.get("/ciroc/user/bookedroom/getroom",verify, userController.bookedRoom)
router.put("/ciroc/user/unbook",verify,userController.unBookRoom)

module.exports = router;


