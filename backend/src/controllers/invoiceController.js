import Invoice from "../models/Invoice.js";

// @desc   Upload invoices
// @route  POST /api/invoices/upload
export const uploadInvoices = async (req, res) => {
  try {
    const invoices = req.body.invoices; // Expect array of invoices

    const savedInvoices = [];

    for (const inv of invoices) {
      const duplicate = await Invoice.findOne({
        vendor: inv.vendor,
        amount: inv.amount,
        date: inv.date,
      });

      if (duplicate) {
        inv.isDuplicate = true;
      }

      // Early-payment discount suggestion (dummy rule)
      if (inv.amount < 50000) {
        inv.discountSuggested = "2% discount if paid early";
      }

      // Approval rules
      if (inv.amount > 100000) {
        inv.approvalStatus = "Manager approval required";
      }

      const newInvoice = await Invoice.create(inv);
      savedInvoices.push(newInvoice);
    }

    res.status(201).json({ message: "Invoices uploaded", invoices: savedInvoices });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// @desc   Approve/Reject an invoice
// @route  PUT /api/invoices/:id/approve
export const approveInvoice = async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    invoice.approvalStatus = status;
    await invoice.save();

    res.json({ message: `Invoice ${status}`, invoice });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// @desc   Get all invoices
// @route  GET /api/invoices
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch invoices", error: error.message });
  }
};
