import { useState, useEffect } from "react";
import { uploadInvoices, getInvoices, approveInvoice } from "../api/invoiceApi";
import InvoiceTable from "../components/InvoiceTable";
import FileUpload from "../components/FileUpload";
import { CloudUpload, FileSpreadsheet } from "lucide-react"; // nice icons

const UploadPage = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const { data } = await getInvoices();
      setInvoices(data);
    } catch (err) {
      alert("Failed to fetch invoices");
    }
  };

  const handleUpload = async (rows) => {
    try {
      const { data } = await uploadInvoices({ invoices: rows });
      alert("Invoices uploaded!");
      setInvoices(data.invoices);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  const handleApprove = async (id, status) => {
    try {
      await approveInvoice(id, status);
      fetchInvoices();
    } catch (err) {
      alert("Failed to update approval");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-8 text-center shadow-lg">
        <h1 className="text-4xl font-extrabold mb-2">
          Vendor Invoice Management
        </h1>
        <p className="text-blue-100 max-w-2xl mx-auto">
          Upload, track, and approve invoices with real-time duplicate detection
          and smart suggestions.
        </p>
      </div>

      {/* 🔹 Upload Section */}
      <div className="max-w-5xl mx-auto -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center mb-6">
            <CloudUpload className="text-blue-600 mr-3" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">
              Upload Vendor Invoices
            </h2>
          </div>

          {/* Custom drag & drop */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-blue-400 transition cursor-pointer mb-8">
            <FileSpreadsheet className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-600">
              Drag & Drop CSV/Excel file here or{" "}
              <span className="text-blue-600 font-semibold">browse</span>
            </p>
            <FileUpload onUpload={handleUpload} />
          </div>
        </div>
      </div>

      {/* 🔹 Invoice Table Section */}
      <div className="max-w-6xl mx-auto mt-12 p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <FileSpreadsheet className="text-green-600 mr-3" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">
              Uploaded Invoices
            </h2>
          </div>

          {invoices.length > 0 ? (
            <div className="animate-fade-in">
              <InvoiceTable invoices={invoices} onApprove={handleApprove} />
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No invoices uploaded yet. Start by uploading a file above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
