const db = require("../utils/connectdb");
const getUser = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
      ["Morty", 14]
    );
    res.status(200).json({
      success: true,
      data: [rows],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Sever Error",
      err,
    });
  }
};

module.exports = { getUser };
