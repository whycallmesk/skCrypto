import { CryptoData } from '../types/crypto';

interface CryptoCardProps {
  coin: CryptoData;
  index: number;
}

export default function CryptoCard({ coin, index }: CryptoCardProps) {
  return (
    <div
      className="crypto-card animate-slide-up shadow-lg border border-neon-green p-6 rounded-xl backdrop-blur-md bg-black/90 hover:shadow-neon transition-all duration-300 ease-in-out transform hover:scale-105"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={coin.image} 
          alt={coin.name} 
          className="w-16 h-16 rounded-full border-2 border-neon-green shadow-md transform hover:scale-110 transition-transform duration-200 ease-in-out" 
        />
        <div>
          <h2 className="font-extrabold text-2xl text-neon-green tracking-wider drop-shadow-lg">{coin.name}</h2>
          <p className="text-gray-400 uppercase text-sm font-medium tracking-wider">{coin.symbol}</p>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-cyan-400 drop-shadow-lg">
          ${coin.current_price.toLocaleString()}
        </p>
        <p className={`text-lg font-semibold drop-shadow-md ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}> 
          {coin.price_change_percentage_24h > 0 ? '▲' : '▼'}
          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </p>
        <p className="text-gray-300 text-sm font-light tracking-wide">
          Market Cap: <span className="font-semibold text-neon-green">${coin.market_cap.toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
}