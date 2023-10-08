const mongoose = require("mongoose");

const FileSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    ETag: {
      type: String,
    },
    Location: {
      type: String,
      required: true,
    },
    Key: {
      type: String,
      required: true,
    },
    Bucket: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, sort: { createdAt: -1 } }
);

module.exports = mongoose.model("files", FileSchema);
