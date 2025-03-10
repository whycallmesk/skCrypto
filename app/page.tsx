"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { CryptoData } from './types/crypto';
import CryptoCard from './components/CryptoCard';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';
import Error from './components/Error';

export default function Home() {
  const [data, setData] = useState<CryptoData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get<CryptoData[]>(
          " https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        setError(
          "Failed to fetch cryptocurrency data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSelection = (coinName: string) => {
    setSearchTerm(coinName);
  };

  const filteredData = searchTerm
    ? data.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data.slice(0, 12); // Show only top 12 cryptos initially

  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-900 to-black p-6 overflow-x-hidden text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 space-y-6">
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-400 animate-pulse font-mono">
            Crypto Price Tracker
          </h1>
          <SearchBar
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            cryptoList={data.map((coin) => ({ id: coin.id, name: coin.name }))}
          />
        </div>

        {isLoading && <Loading />}
        {error && <Error message={error} />}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredData.map((coin,index) => (
              <CryptoCard
              key={coin.id}
              coin={coin}
              index={index} 
              priceColor={
                coin.price_change_percentage_24h !== undefined && coin.price_change_percentage_24h >= 0
                  ? "text-green-300"
                  : "text-red-400"
              }
            />
            
            ))}
          </div>
        )}
      </div>

      <footer className="text-center text-gray-400 mt-12 py-4 border-t border-gray-700">
        Copyright © 2024, skCrypto - All Rights Reserved.
      </footer>
    </main>
  );
}
