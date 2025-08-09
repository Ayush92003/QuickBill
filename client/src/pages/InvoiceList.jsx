import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../axios";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await API.get("/invoices", { withCredentials: true });
        setInvoices(res.data);
        setLoading(false);
      } catch (err) {
        alert("Failed to fetch invoices");
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/invoices/${id}`, { withCredentials: true });
      setInvoices((prev) => prev.filter((invoice) => invoice._id !== id));
    } catch (err) {
      alert("Failed to delete invoice");
    }
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Button and Title */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard", { replace: true })}
              className="cursor-pointer flex items-center text-sm text-gray-300 hover:text-white"
            >
              <ArrowLeft className="mr-1" size={18} />
              Back to Dashboard
            </button>
            <h2 className="text-2xl font-bold text-right">Your Invoices</h2>
          </div>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search by client name..."
            className="w-full border p-2 rounded-md text-white bg-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* No Invoices */}
          {filteredInvoices.length === 0 ? (
            <>
              <p className="text-center text-gray-400">
                No matching invoices found.
              </p>
              <a href="/create-invoice" className="text-blue-500 hover:underline">
                Create a new invoice
              </a>
            </>
          ) : (
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-x-auto">
              <table className="w-full table-auto text-left text-sm">
                <thead>
                  <tr className="bg-gray-700 text-gray-200">
                    <th className="px-4 py-3">Client</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Total (₹)</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr
                      key={invoice._id}
                      className="border-t border-gray-600 hover:bg-gray-700"
                    >
                      <td className="px-4 py-3">{invoice.clientName}</td>
                      <td className="px-4 py-3">
                        {invoice.createdAt?.slice(0, 10)}
                      </td>
                      <td className="px-4 py-3">
                        ₹{invoice.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 space-x-5">
                        <Link
                          to={`/invoices/${invoice._id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
