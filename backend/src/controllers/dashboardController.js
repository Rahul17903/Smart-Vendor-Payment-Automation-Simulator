import Invoice from "../models/Invoice.js";

// @desc   Dashboard summary
// @route  GET /api/dashboard/summary
export const getSummary = async (req, res) => {
  try {
    const totalInvoices = await Invoice.countDocuments();
    const duplicates = await Invoice.countDocuments({ isDuplicate: true });
    const approved = await Invoice.countDocuments({ approvalStatus: "Approved" });

    // Dummy savings calculation
    const estimatedSavings = duplicates * 200 + approved * 500;
    console.log(estimatedSavings, totalInvoices, duplicates);
    
    res.json({
      totalInvoices,
      duplicates,
      approved,
      estimatedSavings,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard data", error: error.message });
  }
};
