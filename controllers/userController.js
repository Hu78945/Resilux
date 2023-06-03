const db = require("../utils/connectdb");

//Get user with a specif ID
const getUser = (req, res) => {
  try {
    const id = req.params.id;
    db.query(
      "SELECT * FROM users where user_id = ?",
      [id],
      function (err, data) {
        //If there is an error with the query
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
            err,
          });
        }

        //No user was found
        if (data.length === 0) {
          return res.status(404).json({
            success: true,
            message: `No user foud with id: ${req.params.id}`,
          });
        }

        //User have been found
        return res.status(200).json({
          success: true,
          data,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Sever Error",
      err,
    });
  }
};

//Update a user profile
const updateUser = (req, res) => {
  try {
    const id = req.params.id;

    //Checking if the user exist
    db.query(
      "SELECT * FROM users where user_id = ?",
      [id],
      function (err, data) {
        //If there is a error in the query
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
            err,
          });
        }

        //Check if the user is found
        if (data.length === 0) {
          return res.status(404).json({
            success: true,
            message: `No user was found with id: ${req.params.id}`,
          });
        }
      }
    );

    const info = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phoneNumber,
      req.body.profilePicture,
      id,
    ];

    //Update the user information
    db.query(
      "UPDATE users SET first_name = ? , last_name = ?, email = ?, phone_number = ?, profile_picture = ? where user_id = ?",
      info,
      function (err, data) {
        //If there is an error
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
            err,
          });
        }

        return res.status(200).json({
          success: true,
          message: "user profile have been updated",
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

module.exports = { getUser, updateUser };
