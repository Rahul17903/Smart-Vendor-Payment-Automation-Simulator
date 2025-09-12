import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";
import InvoiceTable from "../components/InvoiceTable";
import { uploadInvoices, getInvoices, approveInvoice } from "../api/invoiceApi";

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
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-xl font-bold mb-4">Upload Vendor Invoices</h1>
        <FileUpload onUpload={handleUpload} />
        <InvoiceTable invoices={invoices} onApprove={handleApprove} />
      </div>
    </>
  );
};

export default UploadPage;
