import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function CreateInvoice() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] =
      name === "quantity" || name === "price" ? Number(value) : value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + (taxRate / 100) * subtotal;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(
        "/invoices",
        {
          clientName,
          clientEmail,
          clientAddress,
          items,
          taxRate,
        },
        { withCredentials: true }
      );
      toast.success("Invoice created successfully")
      navigate("/dashboard");
    } catch (err) {
      toast.error("Error creating invoice")
    }
  };

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
        <button
          onClick={() => navigate("/dashboard", { replace: true })}
          className="mb-4 cursor-pointer flex items-center text-sm text-gray-300 hover:text-white"
        >
          <ArrowLeft className="mr-1" size={18} />
          Back to Dashboard
        </button>
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Create Invoice
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-1">Client Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Client Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Client Address</label>
              <textarea
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                rows="2"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                required
              ></textarea>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Items</h3>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center mb-3 flex-wrap"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Item name"
                    className="flex-1 px-3 py-2 rounded bg-gray-700 text-white"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  />
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    className="w-24 px-3 py-2 rounded bg-gray-700 text-white"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    min="0"
                    className="w-24 px-3 py-2 rounded bg-gray-700 text-white"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  />
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✖
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addItem}
                className="cursor-pointer mt-2 px-4 py-1 bg-blue-600 rounded hover:bg-blue-700"
              >
                + Add Item
              </button>
            </div>

            <div>
              <label className="block text-sm mb-1">Tax Rate (%)</label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
              />
            </div>

            <div className="text-right text-xl font-semibold">
              Total: ₹ {calculateTotal().toFixed(2)}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-green-600 py-2 rounded hover:bg-green-700 transition"
            >
              Create Invoice
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
