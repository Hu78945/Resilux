const db = require("../utils/connectdb");
const loginUser = async (req, res) => {
  try {
    const q = {
      sql: `SELECT * from users where email = ?`,
      values: [req.body.email],
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
        data: results,
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

module.exports = { loginUser };
