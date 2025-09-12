import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { getSummary } from "../api/dashboardApi";

const DashboardPage = () => {
  const [summary, setSummary] = useState({
    totalInvoices: 0,
    duplicates: 0,
    approved: 0,
    estimatedSavings: 0,
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const { data } = await getSummary();
      setSummary(data);
    } catch (err) {
      alert("Failed to fetch dashboard data");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Invoices" value={summary.totalInvoices} color="bg-blue-600" />
        <DashboardCard title="Duplicates" value={summary.duplicates} color="bg-red-600" />
        <DashboardCard title="Approved" value={summary.approved} color="bg-green-600" />
        <DashboardCard title="Estimated Savings" value={`₹${summary.estimatedSavings}`} color="bg-purple-600" />
      </div>
    </>
  );
};

export default DashboardPage;
