//External Lib Import
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const csv = require("csvtojson");

//Internal Lib Import
const { isFileValid } = require("../middleware/multer");
const { join } = require("path");
const Message = require("./messages.mode");

/**
 * @desc message create
 * @access private
 * @route /api/v1/message/messageCreate
 * @methud POST
 */

const messageCreate = async (req, res, next) => {
  try {
    let entries = [];
    let count = 0;
    csv({ delimiter: ";" })
      .fromFile(`./uploads/${req.fileName}`)
      .then(async (json) => {
        json.forEach((row) => {
          count++;
          entries.push(row);
          if (count % 100 == 0) {
            count = 0;
            entries = []; // clear the array
          }
        });

        const data = await Promise.all(
          entries.map(async ({ number, description }) => {
            return await new Message({
              number: "+8801887878787",
              description: "sdf",
            }).save();
          }),
        );

        fs.unlinkSync(`./uploads/${req.fileName}`);
        res.json({ message: `Message Send Successfull Total ${count}`, data });
      })
      .catch((err) => {
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  messageCreate,
};
