import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import axios from 'axios';
import { apiUrl } from '@/config/api';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

const Prices = () => {
  const { t, isRTL } = useLanguage();
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from our backend first
      try {
        const response = await axios.get(apiUrl('/get-price'));
        console.log('Backend price data:', response.data);
        
        // If backend returns data, use it, otherwise fallback to CoinGecko
        if (response.data) {
          setLastUpdated(new Date());
          // For now, still using CoinGecko as fallback until backend provides full coin data
        }
      } catch (backendError) {
        console.log('Backend not available, using CoinGecko fallback');
      }
      
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1'
      );
      
      setCoins(response.data);
      setLastUpdated(new Date());
      
      // Cache the data
      localStorage.setItem('cached-coins', JSON.stringify(response.data));
      localStorage.setItem('cached-coins-timestamp', new Date().toISOString());
    } catch (err) {
      setError(t('errorFetch'));
      
      // Try to load cached data
      const cachedData = localStorage.getItem('cached-coins');
      if (cachedData) {
        setCoins(JSON.parse(cachedData));
        const cachedTimestamp = localStorage.getItem('cached-coins-timestamp');
        if (cachedTimestamp) {
          setLastUpdated(new Date(cachedTimestamp));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchCoins, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(6)}`;
    }
    return `$${price.toLocaleString()}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  return (
    <div className={`min-h-screen bg-lira-gradient text-white pb-20 px-4 pt-8 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-lira-green bg-clip-text text-transparent">
            {t('pricesTitle')}
          </h1>
          <div className="flex justify-center items-center gap-4 mb-4">
            <Button
              onClick={fetchCoins}
              disabled={loading}
              className="bg-button-gradient hover:bg-button-gradient text-black font-bold text-sm px-4 py-2 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} ${loading ? 'animate-spin' : ''}`} />
              {t('refresh')}
            </Button>
          </div>
          {lastUpdated && (
            <p className="text-gray-400 text-sm">
              {t('lastUpdated')}: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-6 text-center">
            <p className="text-red-400">{error}</p>
            {coins.length > 0 && (
              <p className="text-gray-400 text-sm mt-2">{t('showingCached')}</p>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && coins.length === 0 && (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 text-lira-green mx-auto mb-4 animate-spin" />
            <p className="text-gray-300">{t('loadingCrypto')}</p>
          </div>
        )}

        {/* Coins Grid */}
        <div className="grid gap-3">
          {coins.map((coin) => (
            <Card 
              key={coin.id} 
              className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow hover:shadow-glow transition-all duration-300"
            >
              <CardContent className="p-4">
                <div className={`flex items-center gap-x-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {/* Coin Info - 35% width */}
                  <div className={`flex items-center gap-3 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`} style={{ width: '35%' }}>
                    <img 
                      src={coin.image} 
                      alt={coin.name} 
                      className="w-10 h-10 rounded-full flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white text-sm truncate">
                        {coin.name}
                      </h3>
                      <p className="text-gray-400 text-xs uppercase">
                        {coin.symbol}
                      </p>
                    </div>
                  </div>
                  
                  {/* Price - 20% width */}
                  <div className="flex-shrink-0 text-center" style={{ width: '20%' }}>
                    <p className="font-bold text-white text-sm">
                      {formatPrice(coin.current_price)}
                    </p>
                  </div>

                  {/* 24h Change - 20% width */}
                  <div className={`flex items-center justify-center gap-1 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`} style={{ width: '20%' }}>
                    {coin.price_change_percentage_24h > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span 
                      className={`text-sm font-medium ${
                        coin.price_change_percentage_24h > 0 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>

                  {/* Market Cap - 25% width */}
                  <div className="flex-shrink-0 text-center" style={{ width: '25%' }}>
                    <p className="text-gray-300 text-sm font-medium">
                      {formatMarketCap(coin.market_cap)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prices;
