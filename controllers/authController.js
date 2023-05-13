const db = require("../utils/connectdb");
const bcrypt = require("bcrypt");
const loginUser = (req, res) => {
  try {
    const q = {
      sql: `SELECT * from users wherer email = ?`,
      values: [[req.body.email]],
    };
    db.query(q, function (error, results, fields) {
      if (error) {
        res.status(404).json({
          success: false,
          message: "User not found",
          err: error,
        });
      }

      res.status(200).json({
        success: true,
        data: results[0].solution,
      });
    });
  } catch (err) {
    res.status(500).json({
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
        res.status(500).json({
          success: false,
          message: "Server Error",
          err,
        });
      }

      if (data.length) {
        res.status(409).json({
          success: false,
          message: `User with email ${req.body.email} already exist`,
        });
      }

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
          res.status(500).json({
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
    res.status(500).json({
      success: true,
      message: "Server Error",
      error,
    });
  }
};

module.exports = { loginUser, registerUser };
