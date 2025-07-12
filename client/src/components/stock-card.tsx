import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { PreferredStock } from "@shared/schema";

interface StockCardProps {
  stock: PreferredStock;
}

export default function StockCard({ stock }: StockCardProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/New_York'
    }) + ' EST';
  };

  return (
    <Card className="bg-white shadow-md border hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-secondary">{stock.ticker}</h3>
            <p className="text-neutral-medium">{stock.name}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-secondary">
              ${stock.price.toFixed(2)}
            </div>
            <div className={`text-sm font-medium flex items-center ${
              stock.changePercent >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {stock.changePercent >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%)
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-neutral-medium">Dividend Yield</div>
            <div className="text-lg font-semibold text-secondary">
              {stock.dividendYield.toFixed(1)}%
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-medium">Market Cap</div>
            <div className="text-lg font-semibold text-secondary">
              {stock.marketCap}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-neutral-medium">Last Trade</div>
            <div className="text-sm font-medium text-secondary">
              {formatTime(stock.lastTrade)}
            </div>
          </div>
          <Link href={`/stocks/${stock.ticker}`}>
            <Button className="bg-primary hover:bg-blue-700 text-white font-medium transition-colors">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
