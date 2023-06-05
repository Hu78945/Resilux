const jwt = require("jsonwebtoken");
const db = require("../utils/connectdb");
const bcrypt = require("bcrypt");
const loginUser = (req, res) => {
  try {
    const q = "SELECT * FROM credentials WHERE Email = ?";
    db.query(q, [req.body.email], function (err, data) {
      //If there is a error
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
          err,
        });
      }

      //If the user does not exist

      if (data.length === 0) {
        return res.status(404).json({
          success: true,
          message: `No user was found with this emial ${req.body.email}`,
        });
      }
      const CheckdPasswrod = bcrypt.compareSync(
        req.body.password,
        data[0].Password
      );
      if (!CheckdPasswrod) {
        return res.status(400).json({
          success: true,
          message: "Wrong password or username",
        });
      }

      const token = jwt.sign({ Email: data[0].Email }, "secerate_key");

      const Email = data[0].Email;
      return res.status(200).json({
        success: true,
        Email,
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
      sql: "SELECT * FROM credentials where Email = ?",
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

      //Insert Email into credentials

      const emailQuery = {
        sql: "INSERT INTO credentials (Email, Password) VALUES (?)",
        values: [[req.body.email, hashedPassword]],
      };

      db.query(emailQuery, (error, data) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
            error,
          });
        }
      });

      const query = {
        sql: "INSERT INTO users (`first_name`,`last_name`,`Email`,`phone_number`,`profile_picture`) VALUES (?)",
        values: [
          [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
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
          "SELECT * FROM users where Email = ?",
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
    "SELECT Email from users WHERE Email = ?",
    [[decoded.Email]],
    function (err, data) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
          stack: err.stack,
        });
      }
      const Email = data[0].Email;
      console.log(data);
      console.log(`This is the Email: ${Email}`);
      req.user = Email;
    }
  );

  next();
};

const checkUserRole = (req, res, next) => {
  console.log(`This is the req.user: ${req.user}`);
  if (req.user === req.params.email) {
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
