import { useEffect } from "react";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  useEffect(() => {
    document.title = "QuickBill - Smart Billing Made Easy";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white transition-colors duration-300">
      {/* Navbar */}
      <header className="flex items-center justify-between p-6 shadow-md bg-gray-800">
        <h1 className="text-2xl font-bold text-blue-400">QuickBill</h1>

        <nav className="space-x-6 text-gray-200 hidden md:block">
          <a href="#features" className="hover:text-blue-400">
            Features
          </a>
          <a href="#testimonials" className="hover:text-blue-400">
            Testimonials
          </a>
          <a href="#contact" className="hover:text-blue-400">
            Contact
          </a>
        </nav>

        <Link to="/login">
          <button className="cursor-pointer hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simplify Your Billing with{" "}
            <span className="text-blue-400">QuickBill</span>
          </h2>
          <p className="text-lg mb-6">
            Manage your clients, generate invoices, and track payments — all in
            one place.
          </p>
          <Link to="/register">
            <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition flex items-center">
              Get Started <MoveRight className="ml-2" />
            </button>
          </Link>
        </motion.div>

        <motion.img
          src="/images/hero.svg"
          alt="billing illustration"
          className="w-full md:w-1/2 mt-10 md:mt-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* Features */}
      <section id="features" className="p-10 md:p-20 bg-gray-900">
        <h3 className="text-3xl font-bold text-center mb-10">
          Why Choose QuickBill?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            [
              "Fast Billing",
              "Generate invoices instantly with our optimized flow.",
            ],
            ["Secure Auth", "Your data is encrypted and safe with us."],
            ["Real-Time Dashboard", "Track your earnings and invoices live."],
            ["Easy to Use", "No learning curve — just sign up and go."],
          ].map(([title, desc], i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold text-blue-400 mb-2">
                {title}
              </h4>
              <p className="text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="p-10 md:p-20 bg-gray-800">
        <h3 className="text-3xl font-bold text-center mb-10">Loved by Users</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["Ayush Kumar", "QuickBill saved me hours every week. Love it!"],
            ["Pankaj R.", "Super simple and efficient for my freelance work."],
            [
              "Ravi M.",
              "Invoices, tracking, and clients — all handled in one place!",
            ],
          ].map(([name, review], i) => (
            <div key={i} className="bg-gray-700 p-6 rounded-2xl shadow">
              <p className="text-gray-200 italic">“{review}”</p>
              <p className="mt-4 font-semibold text-blue-400">– {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-blue-600 text-white p-6 text-center">
        <p>QuickBill © {new Date().getFullYear()} | Made with ❤️</p>
        <p className="text-sm mt-1">Contact: ayushk92003@gmail.com</p>
      </footer>
    </div>
  );
}
