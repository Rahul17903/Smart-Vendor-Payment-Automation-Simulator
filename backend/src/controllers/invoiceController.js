import Invoice from "../models/Invoice.js";

function excelDateToJSDate(serial) {
  // Excel starts from 1900-01-01, but has a leap year bug (treats 1900 as leap year)
  const excelEpoch = new Date(Date.UTC(1899, 11, 30));
  return new Date(excelEpoch.getTime() + serial * 86400000);
}

// @desc   Upload invoices
// @route  POST /api/invoices/upload
export const uploadInvoices = async (req, res) => {
  try {
    const invoices = req.body.invoices;
    const userId = req.user._id;

    const savedInvoices = [];

    for (const inv of invoices) {
      // ✅ Fix date conversion
      if (!isNaN(inv.date)) {
        inv.date = excelDateToJSDate(inv.date);
      } else {
        inv.date = new Date(inv.date);
      }

      // ✅ Duplicate check (same vendor, same amount, same day, same user)
      const startOfDay = new Date(inv.date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(inv.date);
      endOfDay.setHours(23, 59, 59, 999);

      const duplicate = await Invoice.findOne({
        vendor: inv.vendor,
        amount: inv.amount,
        date: { $gte: startOfDay, $lte: endOfDay },
        createdBy: userId,
      });

      if (duplicate) {
        inv.isDuplicate = true;
      }

      // ✅ Early-payment discount rule
      if (inv.amount < 50000) {
        inv.discountSuggested = "2% discount if paid early";
      }
      
      // ✅ Early-payment discount rule
      if (inv.amount < 50000) {
        inv.discountPercent = 2; // store % separately
        inv.discountAmount = (inv.amount * 2) / 100;
        
      } else {
        inv.discountPercent = 0;
        inv.discountAmount = 0;
      }

      // ✅ Approval rule
      if (inv.amount > 100000) {
        inv.approvalStatus = "Manager approval required";
      }

      // ✅ Ensure createdBy is stored
      const newInvoice = await Invoice.create({
        ...inv,
        createdBy: userId,
      });

      savedInvoices.push(newInvoice);
    }

    res
      .status(201)
      .json({ message: "Invoices uploaded", invoices: savedInvoices });
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

// @desc   Get invoices of logged-in user
// @route  GET /api/invoices
export const getInvoices = async (req, res) => {
  try {
    let invoices;

    // ✅ Admin/Manager see all, Finance sees only their own
    if (req.user.role === "Admin" || req.user.role === "Manager") {
      invoices = await Invoice.find().populate("createdBy", "name email role");
    } else {
      invoices = await Invoice.find({ createdBy: req.user._id });
    }

    res.json(invoices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch invoices", error: error.message });
  }
};
