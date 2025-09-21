const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodoItem", todoItemSchema);
