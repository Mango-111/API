const express=require('express');
const router=express.Router(),
verifyToken = require('../middleware/authJWT'),
{
    signup,
    signin
  } = require("../controller/authController");

const {getData,postData,updateData,deleteData}=require('../controller/empController')

const { check, validationResult } = require('express-validator');

router.post("/register", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {

});

router.get("/hiddencontent",verifyToken, function (req, res) {
    if (!req.user) {
      return 
      res.status(403)
        .send({
          message: "error"
        });
    }
    res.status(200)
    .send({
      message: "Congratulations!"
    });
  });

router.post("/postData",[
    check('empName')
    .isAlpha()
    .withMessage('Must be only alphabetical chars')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 chars long'),
    check('email').isEmail(),
    check('email').custom(email => {
        if (alreadyHaveEmail(email)) {
          throw new Error('Email already registered')
        }
      }),
    check('empSalaray').isNumeric()
  ],(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
    postData(req.body)
    res.send("data added")
})

router.get("/getData",(req,res)=>{
    res.send(getData())
})

router.put("/updateData",[
    check('empName')
    .isAlpha()
    .withMessage('Must be only alphabetical chars')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 chars long'),
    check('email').isEmail(),
    check('email').custom(email => {
        if (alreadyHaveEmail(email)) {
          throw new Error('Email already registered')
        }
      }),
    check('empSalaray').isNumeric()
  ],(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    updateData(req.params.empId,req.body)
    res.send("data updated")
})

router.delete("/deleteData/:empId",(req,res)=>{
    deleteData(req.params.empId)
    res.send("data deleted")
})

module.exports=router;