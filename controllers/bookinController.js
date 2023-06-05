const router = require("express").Router();
const db = require("../utils/connectdb");
const jwt = require("jsonwebtoken");

const createABooking = (req, res) => {
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
};

const getABooking = (req, res) => {
  try {
    const id = req.params.id;

    db.query(
      "SELECT * FROM bookings WHERE booking_id = ?",
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
            message: `No booking was found with the id ${id}`,
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

const UpdateABooking = (req, res) => {
  try {
    const id = req.params.id;

    db.query(
      "SELECT * FROM bookings WHERE booking_id = ?",
      [id],
      (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }
      }
    );

    const values = [
      req.body.startDate,
      req.body.endDate,
      req.body.totalPrice,
      req.body.guestId,
      req.body.listingId,
      req.body.noOfGuests,
      id,
    ];

    db.query(
      "UPDATE bookings SET `start_date` = ?,end_date = ?,total_price = ?,guest_id = ?,listing_id = ?,no_of_guests = ? where booking_id = ?;",
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
          message: "Booking was updated",
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

const DeleteABooking = (req, res) => {
  try {
    const id = req.params.id;

    db.query(
      "SELECT * FROM bookings WHERE booking_id = ?",
      [id],
      (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }
      }
    );

    db.query(
      "DELETE FROM bookings WHERE booking_id = ? ",
      [id],
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
          message: "Booking was deleted",
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

module.exports = {
  createABooking,
  getABooking,
  UpdateABooking,
  DeleteABooking,
};
