import { CheckCircle, XCircle } from "lucide-react";

const InvoiceTable = ({ invoices, onApprove }) => {
  return (
    <div className="overflow-x-auto mt-6 rounded-2xl shadow-lg">
      <table className="min-w-full text-sm text-left text-gray-700">
        {/* Table Head */}
        <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 text-sm uppercase tracking-wide">
          <tr>
            <th className="px-6 py-3">Vendor</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Duplicate</th>
            <th className="px-6 py-3">Discount</th>
            <th className="px-6 py-3">Approval</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {invoices.map((inv) => (
            <tr
              key={inv._id}
              className={`border-b hover:bg-gray-50 transition ${
                inv.isDuplicate ? "bg-red-50" : "bg-white"
              }`}
            >
              {/* Vendor */}
              <td className="px-6 py-4 font-medium">{inv.vendor}</td>

              {/* Amount */}
              <td className="px-6 py-4 font-semibold text-gray-900">
                ₹{inv.amount}
              </td>

              {/* Date */}
              <td className="px-6 py-4">
                {new Date(inv.date).toLocaleDateString()}
              </td>

              {/* Duplicate */}
              <td className="px-6 py-4">
                {inv.isDuplicate ? (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                    Yes
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    No
                  </span>
                )}
              </td>

              {/* Discount */}
              <td className="px-6 py-4">
                {inv.discountSuggested ? (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {inv.discountSuggested}%
                  </span>
                ) : (
                  "-"
                )}
              </td>

              {/* Approval Status */}
              <td className="px-6 py-4">
                {inv.approvalStatus === "Approved" && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    Approved
                  </span>
                )}
                {inv.approvalStatus === "Rejected" && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                    Rejected
                  </span>
                )}
                {inv.approvalStatus === "Manager approval required" && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                )}
              </td>

              {/* Actions */}
              <td className="px-6 py-4 flex items-center justify-center gap-3">
                {inv.approvalStatus === "Manager approval required" && (
                  <>
                    <button
                      onClick={() => onApprove(inv._id, "Approved")}
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs transition"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>
                    <button
                      onClick={() => onApprove(inv._id, "Rejected")}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs transition"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
