// LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 animate-gradient">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-200/50 via-purple-300/40 to-transparent z-0 blur-3xl" />

      {/* Navbar */}
      <header className="relative z-10 flex justify-between items-center px-6 py-4 bg-white/70 backdrop-blur-md shadow-sm">
        <h1 className="text-2xl font-bold text-pink-600">🧑‍💻 DevTinder</h1>
        <div className="space-x-4">
          <a href="/login" className="text-gray-800 font-medium hover:text-pink-600">
            Login
          </a>
          <a
            href="/register"
            className="bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
          >
            Join Now
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight drop-shadow-md">
          Find your perfect dev match
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-xl">
          Connect with developers based on skills, goals, and passion. Build the future together.
        </p>
        <div className="mt-6 space-x-4">
          <Link
            to="/login"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 shadow-lg transition-all"
          >
            Get Started
          </Link>
          <Link to="/login" className="text-purple-700 font-medium hover:underline">
            Already have an account?
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} DevTinder. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
