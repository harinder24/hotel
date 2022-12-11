const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee");
const verify = require("../middleware/verifyToken")

router.post("/ciroc/employeelogin",employeeController.login)
router.put("/ciroc/employeepassword/changepassword", employeeController.changepassword)
router.post("/ciroc/employeepassword/verification", employeeController.verificationCode)
router.delete("/ciroc/manager/fireemployee", employeeController.fireEmployee)
router.get("/ciroc/manager/employeelist", employeeController.employeeList)
router.post("/ciroc/manager/employeeregistration", employeeController.registration)
router.post("/ciroc/manager",verify, employeeController.managerValidation)
router.post("/ciroc/employee",verify, employeeController.employeeValidation)
router.post("/ciroc/employee/training",verify,employeeController.employeeValidation)
router.get("/ciroc/manager/bookinglist",employeeController.getBookings)
router.put("/ciroc/manager/unbook", employeeController.unBook)

module.exports = router;
