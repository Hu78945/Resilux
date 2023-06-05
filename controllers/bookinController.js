const router = require("express").Router();
const db = require("../utils/connectdb");
const jwt = require("jsonwebtoken");

const createABooking = (req, res) => {
  try {
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

    const email = req.parms.email;

    if ((email = decoded.Email)) {
      const values = [
        req.body.startDate,
        req.body.endDate,
        req.body.totalPrice,
        req.body.guestId,
        req.body.listingId,
        req.body.noOfGuests,
      ];

      db.query(
        "INSERT INTO bookings (`start_date`, end_date, total_price,guest_id,listing_id,no_of_guests) VALUE (?);",
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
            message: "Booking have been created",
            data,
          });
        }
      );
    } else {
      return res.status(409).json({
        success: false,
        message: "You are not allowed to do that",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err,
    });
  }
};

module.exports = { createABooking };
