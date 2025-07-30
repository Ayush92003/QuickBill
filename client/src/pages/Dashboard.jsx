import { useEffect, useState } from "react";
import API from "../axios";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Navbar from "../components/Navbar";

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#22D3EE",
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/user", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await API.get("/invoices", { withCredentials: true });
        setInvoices(res.data);
        setLoading(false);
      } catch (err) {
        alert("Failed to load invoices");
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  if (loading) return <div className="text-white p-6">Loading...</div>;

  const totalAmount = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);

  const monthlyData = invoices.reduce((acc, invoice) => {
    const date = new Date(invoice.createdAt);
    const month = date.toLocaleString("default", { month: "short" });
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ month, count: 1 });
    }
    return acc;
  }, []);

  const revenueData = invoices.reduce((acc, invoice) => {
    const client = invoice.clientName;
    const amount = invoice.totalAmount;
    const existing = acc.find((item) => item.name === client);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: client, value: amount });
    }
    return acc;
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">📊 Dashboard</h1>
          {user && (
            <div className="text-sm text-gray-300 md:text-right">
              <div>👤 {user.fullName}</div>
              <div>📧 {user.email}</div>
            </div>
          )}
        </div>

        {/* Summary Box */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-xl mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-2">
            Total Invoices
          </h2>
          <p className="text-2xl md:text-3xl font-bold">
            ₹{totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Monthly Invoices */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-xl">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Monthly Invoice Count
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "none",
                    borderRadius: "10px",
                  }}
                />
                <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Client */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-xl">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Revenue by Client
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {revenueData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "10px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
