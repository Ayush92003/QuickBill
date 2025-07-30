import { useEffect, useState } from "react";
import { MoveRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "QuickBill - Smart Billing Made Easy";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-gray-800 sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-400">QuickBill</h1>

        {/* Desktop Nav */}
        <nav className="space-x-6 text-gray-200 hidden md:flex">
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

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="cursor-pointer hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>

          {/* Hamburger Icon */}
          <button
            className="cursor-pointer md:hidden text-gray-200 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-gray-200 shadow-lg px-6 py-4 space-y-3 z-40">
          <a href="#features" className="block hover:text-blue-400">
            Features
          </a>
          <a href="#testimonials" className="block hover:text-blue-400">
            Testimonials
          </a>
          <a href="#contact" className="block hover:text-blue-400">
            Contact
          </a>
          <Link to="/login">
            <button className="cursor-pointer w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-10 bg-gradient-to-br from-gray-800 to-gray-900">
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simplify Your Billing with{" "}
            <span className="text-blue-400">QuickBill</span>
          </h2>
          <p className="text-base md:text-lg mb-6">
            Manage your clients, generate invoices, and track payments — all in
            one place.
          </p>
          <Link to="/register">
            <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center transition">
              Get Started <MoveRight className="ml-2" />
            </button>
          </Link>
        </motion.div>

        <motion.img
          src="/images/hero.svg"
          alt="billing illustration"
          className="w-3/4 md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 md:px-20 py-14 bg-gray-900">
        <h3 className="text-3xl font-bold text-center mb-10">
          Why Choose QuickBill?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <p className="text-gray-300 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-6 md:px-20 py-14 bg-gray-800">
        <h3 className="text-3xl font-bold text-center mb-10">Loved by Users</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            ["Ayush Kumar", "QuickBill saved me hours every week. Love it!"],
            ["Pankaj R.", "Super simple and efficient for my freelance work."],
            [
              "Ravi M.",
              "Invoices, tracking, and clients — all handled in one place!",
            ],
          ].map(([name, review], i) => (
            <div key={i} className="bg-gray-700 p-6 rounded-2xl shadow">
              <p className="text-gray-200 italic text-sm">“{review}”</p>
              <p className="mt-4 font-semibold text-blue-400 text-sm">
                – {name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-blue-600 text-white p-6 text-center text-sm"
      >
        <p>QuickBill © {new Date().getFullYear()} | Made with ❤️</p>
        <p>Contact: ayushk92003@gmail.com</p>
      </footer>
    </div>
  );
}
