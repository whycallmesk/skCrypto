"use client";
import { useState } from "react";

export default function Navbar({ selectedCurrency, onCurrencyChange }: { selectedCurrency: string; onCurrencyChange: (currency: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const currencies = ["USD", "INR", "EUR", "GBP"];

  return (
    <nav className="w-full bg-gray-900 text-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-purple-400">Crypto Tracker</h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-purple-400 cursor-pointer">Articles</li>
          <li className="hover:text-purple-400 cursor-pointer">Blog</li>
          <li className="hover:text-purple-400 cursor-pointer">Pricing</li>
        </ul>

        {/* Currency Selector */}
        <div className="relative">
          <select
            value={selectedCurrency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="bg-gray-800 text-white px-3 py-1 rounded-lg focus:outline-none"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center mt-3 space-y-3">
          <li className="hover:text-purple-400 cursor-pointer">Articles</li>
          <li className="hover:text-purple-400 cursor-pointer">Blog</li>
          <li className="hover:text-purple-400 cursor-pointer">Pricing</li>
        </ul>
      )}
    </nav>
  );
}
