import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import type { PreferredStock } from "@shared/schema";

interface StockCardProps {
  stock: PreferredStock;
}

export default function StockCard({ stock }: StockCardProps) {
  const formatTime = (date: Date) => {
    try {
      const validDate = new Date(date);
      if (isNaN(validDate.getTime())) {
        return 'Just updated';
      }
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(validDate);
    } catch (error) {
      return 'Just updated';
    }
  };

  const formatDate = (date: Date) => {
    try {
      const validDate = new Date(date);
      if (isNaN(validDate.getTime())) {
        return 'Just updated';
      }
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(validDate);
    } catch (error) {
      return 'Just updated';
    }
  };

  const isPositive = (stock.changePercent || 0) >= 0;

  return (
    <Link href={`/stocks/${stock.ticker}`}>
      <Card className="card-enhanced cursor-pointer group hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8">
          {/* Header with ticker and sector */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {stock.ticker}
                </h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed line-clamp-2">
                {stock.name}
              </p>
            </div>
            <Badge 
              variant={stock.sector === 'Financial' ? 'default' : 'secondary'}
              className="ml-4 text-sm px-3 py-1 font-medium"
            >
              {stock.sector}
            </Badge>
          </div>

          {/* Price and Change */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <p className="text-lg font-semibold text-blue-700">Current Price</p>
              </div>
              <p className="text-3xl font-bold text-blue-900">
                ${(stock.price || 0).toFixed(2)}
              </p>
            </div>
            
            <div className={`text-center p-4 rounded-xl ${
              isPositive 
                ? 'bg-gradient-to-br from-green-50 to-green-100' 
                : 'bg-gradient-to-br from-red-50 to-red-100'
            }`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                {isPositive ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
                <p className={`text-lg font-semibold ${
                  isPositive ? 'text-green-700' : 'text-red-700'
                }`}>
                  Daily Change
                </p>
              </div>
              <p className={`text-2xl font-bold ${
                isPositive ? 'text-green-800' : 'text-red-800'
              }`}>
                {isPositive ? '+' : ''}{(stock.changePercent || 0).toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Dividend and Volume */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <p className="text-lg font-semibold text-purple-700 mb-2">Dividend Yield</p>
              <p className="text-2xl font-bold text-purple-900">
                {(stock.dividendYield || 0).toFixed(2)}%
              </p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
              <p className="text-lg font-semibold text-amber-700 mb-2">Volume</p>
              <p className="text-xl font-bold text-amber-900">
                {(stock.volume || 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-700">Market Cap</p>
              <p className="text-gray-900 font-semibold">
                ${((stock.marketCap || 0) / 1000000000).toFixed(1)}B
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-700">P/E Ratio</p>
              <p className="text-gray-900 font-semibold">
                {stock.peRatio ? stock.peRatio.toFixed(1) : 'N/A'}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <p>Last Updated:</p>
              <p className="font-medium">{formatDate(stock.lastTrade)}</p>
            </div>
            <div className="text-blue-600 hover:text-blue-800 font-semibold group-hover:underline">
              View Full Details →
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}