import express from "express";
import {
  uploadInvoices,
  approveInvoice,
  getInvoices,
} from "../controllers/invoiceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, uploadInvoices);
router.get("/", protect, getInvoices);
router.put("/:id/approve", protect, approveInvoice);

export default router;
