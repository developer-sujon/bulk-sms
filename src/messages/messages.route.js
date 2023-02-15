//External Lib Import
const router = require("express").Router();

//Internal Lib Import
const upload = require("../middleware/multer");
const messageController = require("./messages.controller");

router.post(
  "/messageCreate",
  upload.single("doc"),
  messageController.messageCreate,
);

module.exports = router;
