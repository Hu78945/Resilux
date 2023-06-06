const db = require("../utils/connectdb");

//Get Message with a specif ID
const getMessage = (req, res) => {
  try {
    const id = req.params.id;
    db.query(
      "SELECT * FROM messages where message_id = ?",
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

        //No Messages was found
        if (data.length === 0) {
          return res.status(404).json({
            success: true,
            message: `No messages found with id: ${req.params.id}`,
          });
        }

        //Message have been found
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

// create messages
const createMessages = (req, res) => {
    const info = [
        req.body.message_text,
        req.body.senderID,
        req.body.listingID,
        req.body.recieverID,
      ];
      //insert the listings information
      db.query(
        " INSERT INTO messages (message_text, sender_id, listing_id, reciever_id) VALUE (?)",
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
            message: "Message have been Sent",
          });
        }
      );
    };
//Delete a listing profile
const deleteMessages = (req, res) => {
    
  
    const id = req.params.id;

    
      //Checking if the listings exist
      db.query(
        "SELECT * FROM messages where message_id = ?",
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

          //Check if the Messages will found
          if (data.length === 0) {
            return res.status(404).json({
              success: true,
              message: `No Messages was found with id: ${req.params.id}`,
            });
          }
        }
      );

      //Delete the user information
      db.query(
        "DELETE FROM messages WHERE message_id = ?;",
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
            message: "user Message have been Deleted",
          });
        }
      );
 
};
      

module.exports = {getMessage , createMessages, deleteMessages}