import { useState, useEffect } from "react";
import { getInvoices } from "../api/invoiceApi";
import {
  FileText,
  Copy,
  CheckCircle,
  DollarSign,
  Clock,
  XCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const DashboardPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [summary, setSummary] = useState({
    totalInvoices: 0,
    duplicates: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    estimatedSavings: 0,
  });
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const { data } = await getInvoices();
      setInvoices(data);
      calculateSummary(data);
      generateLineData(data);
    } catch (err) {
      alert("Failed to fetch dashboard data");
    }
  };

  const calculateSummary = (data) => {
    const totalInvoices = data.length;
    const duplicates = data.filter((inv) => inv.isDuplicate).length;
    const approved = data.filter(
      (inv) => inv.approvalStatus === "Approved"
    ).length;
    const pending = data.filter(
      (inv) => inv.approvalStatus === "Manager approval required"
    ).length;
    const rejected = data.filter(
      (inv) => inv.approvalStatus === "Rejected"
    ).length;

    const estimatedSavings = data.reduce((sum, inv) => {
      if (inv.discountSuggested) {
        return sum + (inv.amount * inv.discountSuggested) / 100;
      }
      return sum;
    }, 0);

    setSummary({
      totalInvoices,
      duplicates,
      approved,
      pending,
      rejected,
      estimatedSavings,
    });
  };

  // 📈 Generate Line Chart Data (Invoices per Month)
  const generateLineData = (data) => {
    const monthlyCount = {};

    data.forEach((inv) => {
      const date = new Date(inv.createdAt);
      const month = date.toLocaleString("default", { month: "short" });
      monthlyCount[month] = (monthlyCount[month] || 0) + 1;
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedData = months.map((m) => ({
      month: m,
      invoices: monthlyCount[m] || 0,
    }));

    setLineData(formattedData);
  };

  const cards = [
    {
      title: "Total Invoices",
      value: summary.totalInvoices,
      icon: <FileText size={32} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Duplicates",
      value: summary.duplicates,
      icon: <Copy size={32} />,
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Approved",
      value: summary.approved,
      icon: <CheckCircle size={32} />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Pending",
      value: summary.pending,
      icon: <Clock size={32} />,
      color: "from-yellow-500 to-amber-600",
    },
    {
      title: "Rejected",
      value: summary.rejected,
      icon: <XCircle size={32} />,
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Estimated Savings",
      value: `₹${summary.estimatedSavings.toFixed(2)}`,
      icon: <DollarSign size={32} />,
      color: "from-purple-500 to-violet-600",
    },
  ];

  // 📊 Bar Chart Data
  const barData = [
    { name: "Total", value: summary.totalInvoices },
    { name: "Approved", value: summary.approved },
    { name: "Pending", value: summary.pending },
    { name: "Rejected", value: summary.rejected },
    { name: "Duplicates", value: summary.duplicates },
  ];

  // 🥧 Pie Chart Data
  const pieData = [
    { name: "Approved", value: summary.approved },
    { name: "Pending", value: summary.pending },
    { name: "Rejected", value: summary.rejected },
    { name: "Duplicates", value: summary.duplicates },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

  return (
    <div className="p-8 space-y-10 bg-gray-50 min-h-screen">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-lg p-6 text-white bg-gradient-to-br ${card.color}
            transform hover:scale-105 transition duration-300 ease-in-out`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide">{card.title}</p>
                <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
              </div>
              <div className="opacity-80">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Invoice Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Invoice Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Monthly Invoice Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="invoices"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 6, fill: "#10b981" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
