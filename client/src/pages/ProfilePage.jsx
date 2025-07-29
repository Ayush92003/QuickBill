import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import API from "../axios";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmModal from "../components/ConfirmsModal";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await API.delete("/auth/delete-account", { withCredentials: true });
      toast.success("Account deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete account");
    } finally {
      setShowConfirm(false);
    }
  };

  if (isLoading) return <div className="text-white p-6">Loading...</div>;
  if (!user) return <div className="text-red-500 p-6">User not found</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-10">
        <div className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-8 space-y-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard", { replace: true })}
            className="cursor-pointer flex items-center text-sm text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Dashboard
          </button>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            User Profile
          </h2>

          {/* Profile Info */}
          <div className="space-y-4 text-base">
            <div className="flex justify-between items-center border-b border-gray-700 py-2">
              <span className="text-gray-400">Name:</span>
              <span>{user.fullName}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 py-2">
              <span className="text-gray-400">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 py-2">
              <span className="text-gray-400">User ID:</span>
              <span className="truncate">{user._id}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Joined:</span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Delete Account */}
          <div className="text-center pt-4 border-t border-gray-700">
            <button
              onClick={() => setShowConfirm(true)}
              className="cursor-pointer mt-6 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md flex items-center justify-center gap-2 mx-auto"
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </>
  );
}
