import { useState } from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  cryptoList: { id: string; name: string }[];
}

export default function SearchBar({ searchTerm, onSearch, cryptoList }: SearchBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search for a cryptocurrency..."
        value={searchTerm}
        onChange={(e) => {
          onSearch(e.target.value);
          setShowDropdown(true);
        }}
        className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      {showDropdown && searchTerm && (
        <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
          {cryptoList
            .filter((crypto) =>
              crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 5)
            .map((crypto) => (
              <li
                key={crypto.id}
                className="p-2 hover:bg-purple-600 cursor-pointer text-white"
                onClick={() => {
                  onSearch(crypto.name);
                  setShowDropdown(false);
                }}
              >
                {crypto.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
