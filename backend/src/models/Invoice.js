import mongoose, { Schema } from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    vendor: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isDuplicate: {
      type: Boolean,
      default: false,
    },
    discountSuggested: {
      type: String,
      default: null,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Manager approval required", "Approved", "Rejected"],
      default: "Pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
