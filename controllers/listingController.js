const db = require("../utils/connectdb");
const jwt = require("jsonwebtoken");

//Get user with a specif ID
const getListings = (req, res) => {
  try {
    const id = req.params.id;
    db.query(
      `select * from listings 
      left join users on 
      listings.listing_id = users.listing_id
      left join bookings on
      listings.listing_id = bookings.listing_id
      left join reviews on
      listings.listing_id = reviews.listing_id
      left join wish_lists on
      listings.listing_id = wish_lists.listing_id
      left join neighborhoods on
      listings.neighborhood_id = neighborhoods.neighborhood_id
      left join languages on
      listings.listing_id = languages.listing_id
      left join Payment_Method on
      listings.listing_id = Payment_Method.listing_id
      left join House_Rules on
      listings.listing_id = House_Rules.listing_id
      left join Type_Of_Properties on
      listings.listing_id = Type_Of_Properties.listing_id
      left join Amenties on
      listings.listing_id = Amenties.listing_id;`,
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

        //No listing was found
        if (data.length === 0) {
          return res.status(404).json({
            success: true,
            message: `No listing found with id: ${req.params.id}`,
          });
        }

        //listing have been found
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

//Update a listing profile
const updateListings = (req, res) => {
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

  const id = req.params.id;

  //Checking if the user exist
  db.query(
    "SELECT * FROM listings where listing_id = ?",
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
          message: `No listing was found with id: ${req.params.id}`,
        });
      }
    }
  );
  const info = [
    req.body.title,
    req.body.description,
    req.body.price_per_night,
    req.body.is_available,
    req.body.Address,
    req.body.no_of_guests,
    req.body.no_of_beds,
    req.body.no_of_bedrooms,
    req.body.no_of_bathrooms,
    req.body.host_id,
    id,
  ];
  //Update the listings information
  db.query(
    "update listings SET title = ?,`description`= ?,price_per_night = ?,is_available = ?,`Address` = ?,no_of_guests = ?,no_of_beds = ?,no_of_bedrooms = ?,no_of_bathrooms = ?,host_id = ? WHERE listings.listing_id = ?",
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
        data,
      });
    }
  );
};

//Delete a listing profile
const deleteListing = (req, res) => {
    
  
      const id = req.params.id;
  
      
        //Checking if the listings exist
        db.query(
          "SELECT * FROM listings where listing_id = ?",
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
  
            //Check if the listing is found
            if (data.length === 0) {
              return res.status(404).json({
                success: true,
                message: `No listing was found with id: ${req.params.id}`,
              });
            }
          }
        );

        //Delete the user information
        db.query(
          "DELETE FROM listings WHERE listing_id = ?;",
          [id],
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
              message: "user profile have been Deleted",
            });
          }
        );
   
  };

//Creating the listing

const createlisting = (req, res) => {
    const info = [
        req.body.title,
        req.body.description,
        req.body.price_per_night,
        req.body.is_available,
        req.body.Address,
        req.body.no_of_guests,
        req.body.no_of_beds,
        req.body.no_of_bedrooms,
        req.body.no_of_bathrooms,
      ];
      //insert the listings information
      db.query(
        "INSERT INTO listings  (title, `description`, price_per_night, is_available, Address, no_of_guests ,no_of_beds, no_of_bedrooms, no_of_bathrooms) values (?)",
        [info],
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
            message: "user profile have been Deleted",
          });
        }
      );
 
};

module.exports = { getListings, updateListings, deleteListing,  createlisting};
