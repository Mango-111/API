var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../db/empSchema");

exports.signup = (req, res) => {
    const user = new User({
    empName: req.body.empName,
    email: req.body.email,
    empId: req.body.empId,
    empSalaray:req.body.empSalaray,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500)
        .send({
          message: "Please enter valid credentials",
          err:err.message
        });
      return;
    } else {
      res.status(200)
        .send({
          message: "User Registered successfully"
        })
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
      email: req.body.email
    })
    .exec((err, user) => {
      if (err) {
        res.status(500)
          .send({
            message:"Please enter valid credentials"
          });
        return;
      }
      if (!user) {
        return res.status(404)
          .send({
            message: "User Not found."
          });
      }

      //comparing passwords
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }
      //signing token with user id
      const token = jwt.sign(   { _id: user._id }, 
        "saddksadljjljjkjjkjlj",  {  expiresIn: "20h",  }  );

      //responding to client request with user profile success message and  access token .
      res.status(200)
        .send({
          user: {
            id: user._id,
            email: user.email,
            empName: user.empName,
            empId:user.empId,
            empSalary:user.empSalary
          },
          message: "Login successfull",
          accessToken: token,
        });
    });
};