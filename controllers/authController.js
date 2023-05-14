const jwt = require("jsonwebtoken");
const db = require("../utils/connectdb");
const bcrypt = require("bcrypt");
const loginUser = (req, res) => {
  try {
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], function (err, data) {
      //If there is a error
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
          err,
        });
      }

      const CheckdPasswrod = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (!CheckdPasswrod) {
        return res.status(400).json({
          success: true,
          message: "Wrong passwordor username",
        });
      }

      const token = jwt.sign({ id: data[0].user_id }, "secerate_key");

      const { password, ...others } = data[0];
      res.status(200).json({
        success: true,
        others,
        token,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      err,
    });
  }
};

const registerUser = (req, res) => {
  try {
    //Check if the user exist
    const q = {
      sql: "SELECT * FROM users where email = ?",
      values: [[req.body.email]],
    };

    db.query(q, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Server Error",
          err,
        });
      }

      //Check if the user exist in the database or not
      if (data.length) {
        return res.status(409).json({
          success: false,
          message: `User with email ${req.body.email} already exist`,
        });
      }

      //Hash the password before storing it nto the database
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const query = {
        sql: "INSERT INTO users (`first_name`,`last_name`,`email`,`password`,`phone_number`,`profile_picture`) VALUES (?)",
        values: [
          [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hashedPassword,
            req.body.phoneNumber,
            req.body.profilePic,
          ],
        ],
      };

      db.query(query, (error, data) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "could not register the user at the moment",
            error,
          });
        }

        db.query(
          "SELECT * FROM users where email = ?",
          [[req.body.email]],
          (err, data) => {
            res.status(200).json({
              success: true,
              data,
            });
          }
        );
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Server Error",
      error,
    });
  }
};

const checkIfAuthenticated = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Please provide a token",
    });
  }
  const decoded = jwt.verify(req.body.token, "secerate_key");
  if (!decoded) {
    return res.status(401).json({
      success: true,
      message: "You are not authenticatd please login",
    });
  }

  //Assign the data to the req.user
  db.query(
    "SELECT user_id from users WHERE user_id = ?",
    [decoded.id],
    function (err, data) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
          err,
        });
      }
      const { password, ...others } = data[0];
      console.log(`This is the user id ${others.user_id}`);
      req.user = others.user_id;
    }
  );
  console.log(req.user);

  next();
};

const checkUserRole = (req, res) => {
  if (req.user === req.params.id) {
    next();
  }
  return res.status(401).json({
    success: true,
    message: "Your are not allowed to do that",
  });
};

module.exports = {
  loginUser,
  registerUser,
  checkIfAuthenticated,
  checkUserRole,
};
