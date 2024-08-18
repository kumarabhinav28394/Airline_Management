const express =require ("express");
const router=express.Router();
const{addStaff,initialCheck,managerAdd,logStaff,logManager,managerCheck,getData}=require("../controllers/companyController");
router.route('/add').post(addStaff)
router.route('/log').post(logStaff)
router.route('/managerlog').post(logManager)
router.route('/manager/check').post(managerCheck)
router.route('/initialize').get(initialCheck)
router.route('/initialize/add').post(managerAdd)
router.route('/getdata').post(getData)

module.exports=router;