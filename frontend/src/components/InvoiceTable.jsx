const InvoiceTable = ({ invoices, onApprove }) => {
  return (
    <table className="min-w-full border mt-4 text-sm">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">Vendor</th>
          <th className="border p-2">Amount</th>
          <th className="border p-2">Date</th>
          <th className="border p-2">Duplicate</th>
          <th className="border p-2">Discount</th>
          <th className="border p-2">Approval</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv) => (
          <tr
            key={inv._id}
            className={inv.isDuplicate ? "bg-red-100" : ""}
          >
            <td className="border p-2">{inv.vendor}</td>
            <td className="border p-2">₹{inv.amount}</td>
            <td className="border p-2">
              {new Date(inv.date).toLocaleDateString()}
            </td>
            <td className="border p-2">
              {inv.isDuplicate ? "Yes" : "No"}
            </td>
            <td className="border p-2">{inv.discountSuggested || "-"}</td>
            <td className="border p-2">{inv.approvalStatus}</td>
            <td className="border p-2 flex gap-2">
              {inv.approvalStatus === "Manager approval required" && (
                <>
                  <button
                    onClick={() => onApprove(inv._id, "Approved")}
                    className="bg-green-500 px-2 py-1 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onApprove(inv._id, "Rejected")}
                    className="bg-red-500 px-2 py-1 text-white rounded"
                  >
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
