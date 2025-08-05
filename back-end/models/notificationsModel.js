const mongoose = require("mongoose");

const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    notification: {
      type: String,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("Notifications", NotificationSchema);

module.exports = NotificationModel;
