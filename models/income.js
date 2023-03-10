const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Sales", "Uncategorized Income"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    account: {
      type: String,
      enum: ["Checking", "Savings", "Credit Card", "Cash"],
    },
    notes: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Income", incomeSchema);
