//External import
const { model, Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
      validate(value) {
        if (!value.match("^(?:\\+88|88)?(01[3-9]\\d{8})$")) {
          throw new Error("Please enter the correct number");
        }
      },
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const Message = model("Message", messageSchema);
module.exports = Message;
