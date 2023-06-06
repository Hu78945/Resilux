const db = require("../utils/connectdb");

const createAmenties = (req, res) => {
  const values = [
    req.body.wifi,
    req.body.kitchen,
    req.body.pool,
    req.body.AC,
    req.body.TV,
    req.body.washer,
    req.body.parking,
    req.body.gym,
    req.body.Outdoor_Spaces,
    req.body.safty_Features,
    req.body.essentials,
    req.body.listing_id,
  ];

  db.query(
    "INSERT INTO Amenties (wifi,kitchen,pool,AC,TV,washer,parking,gym,Outdoor_spaces,safety_features,essentials,listing_id) VALUE (?);",
    [values],
    (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Amenties have been added to the listings",
        data,
      });
    }
  );
};

const getAllAmentiesFromAListing = (req, res) => {
  try {
    const id = req.params.id;

    db.query(
      "SELECT * FROM Amenties WHERE listing_id = ?",
      [id],
      (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
            err,
          });
        }

        if (data.length === 0) {
          return res.status(404).json({
            success: true,
            message: `No amenties was found with the listing id ${id}`,
          });
        }

        return res.status(200).json({
          success: true,
          data,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      err,
    });
  }
};

const UpdateAmenties = (req, res) => {
  try {
    const id = req.params.id;

    const values = [
      req.body.wifi,
      req.body.kitchen,
      req.body.pool,
      req.body.AC,
      req.body.TV,
      req.body.washer,
      req.body.parking,
      req.body.gym,
      req.body.Outdoor_Spaces,
      req.body.safty_Features,
      req.body.essentials,
      id,
    ];

    db.query(
      "SELECT * FROM bookings WHERE amenties_id = ?",
      [id],
      (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        if (data.length === 0) {
          return res.status(404).json({
            success: true,
            message: "No amenties was found with the specfied id",
            data,
          });
        }

        db.query(
          "	update Amenties SET wifi = ?,kitchen = ?, pool = ?, AC = true, TV = ?, washer = ?, parking = ?, gym = ?, Outdoor_spaces = ?, safety_features = ?, essentials = ? where Amenties.amenties_id = ?",
          [values],
          (err, data) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message,
                err,
              });
            }

            return res.status(200).json({
              success: true,
              message: "amenties was updated",
            });
          }
        );
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      err,
    });
  }
};
module.exports = { createAmenties, getAllAmentiesFromAListing, UpdateAmenties };
