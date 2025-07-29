import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, User, Trash2 } from "lucide-react";
import API from "../axios";
import Navbar from "../components/Navbar";
import ConfirmModal from "../components/ConfirmsModal";
import { toast } from "react-toastify";

export default function InvoiceDetail() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await API.get(`/invoices/${id}`, { withCredentials: true });
        setInvoice(res.data);
      } catch (err) {
        toast.error("Error fetching invoice");
      }
    };
    fetchInvoice();
  }, [id]);

  const handleDelete = async () => {
    setShowConfirm(true); 
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/invoices/${id}`, { withCredentials: true });
      toast.success("Invoice deleted successfully!");
      navigate("/invoices");
    } catch (err) {
      toast.error("Error deleting invoice");
    } finally {
      setShowConfirm(false);
    }
  };

  if (!invoice) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Navbar />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center text-sm text-gray-300 hover:text-white"
          >
            <ArrowLeft className="mr-1" size={18} />
            Back
          </button>

          <button
            onClick={handleDelete}
            className="mt-3 cursor-pointer flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

        {/* Invoice Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                Invoice #{invoice._id.slice(-6)}
              </h2>
              <p className="text-sm text-gray-400">
                Issued on: {new Date(invoice.createdAt).toDateString()}
              </p>
            </div>
            <div className="bg-green-600 text-sm px-3 py-1 rounded-full">
              Success
            </div>
          </div>

          {/* Client Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-400">
                Client Information
              </h3>
              <p className="flex items-center gap-2">
                <User size={14} /> {invoice.clientName}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} /> {invoice.clientEmail}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={14} /> {invoice.clientAddress}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-1">
                Summary
              </h3>
              <ul className="text-sm space-y-1">
                <li>Tax Rate: {invoice.taxRate}%</li>
                <li className="font-medium text-lg mt-1">
                  Total: ₹{invoice.totalAmount}
                </li>
              </ul>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Items</h3>
            <div className="divide-y divide-gray-700 border border-gray-700 rounded-md">
              <div className="grid grid-cols-4 text-sm font-semibold p-2 bg-gray-700">
                <span>Name</span>
                <span className="text-center">Qty</span>
                <span className="text-center">Price</span>
                <span className="text-right">Total</span>
              </div>
              {invoice.items.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 text-sm p-2 hover:bg-gray-700 transition"
                >
                  <span>{item.name}</span>
                  <span className="text-center">{item.quantity}</span>
                  <span className="text-center">₹{item.price}</span>
                  <span className="text-right">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showConfirm && (
        <ConfirmModal
          isOpen={showConfirm}
          title="Confirm Delete"
          message="Are you sure you want to delete this invoice?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
