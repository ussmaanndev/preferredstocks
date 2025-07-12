import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { MarketData } from "@shared/schema";

export default function MarketOverview() {
  const { data: marketData, isLoading } = useQuery<MarketData>({
    queryKey: ["/api/market-data"],
    refetchInterval: 60000, // Refresh every minute
  });

  if (isLoading) {
    return (
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-2xl font-semibold text-secondary mb-4">Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-neutral-light">
                <CardContent className="p-4 text-center">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-4 w-12" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!marketData) {
    return (
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-2xl font-semibold text-secondary mb-4">Market Overview</h2>
          <div className="text-center text-neutral-medium">
            Market data temporarily unavailable
          </div>
        </div>
      </div>
    );
  }

  const marketItems = [
    {
      label: "S&P 500",
      value: marketData.sp500 ? marketData.sp500.toFixed(2) : "N/A",
      change: marketData.sp500Change || 0,
    },
    {
      label: "Dow Jones",
      value: marketData.dow ? marketData.dow.toFixed(2) : "N/A",
      change: marketData.dowChange || 0,
    },
    {
      label: "NASDAQ",
      value: marketData.nasdaq ? marketData.nasdaq.toFixed(2) : "N/A",
      change: marketData.nasdaqChange || 0,
    },
    {
      label: "10-Year Treasury",
      value: marketData.treasury10y ? `${marketData.treasury10y.toFixed(2)}%` : "N/A",
      change: marketData.treasury10yChange || 0,
    },
    {
      label: "VIX",
      value: marketData.vix ? marketData.vix.toFixed(2) : "N/A",
      change: marketData.vixChange || 0,
    },
    {
      label: "Preferred Avg Yield",
      value: marketData.preferredAvgYield ? `${marketData.preferredAvgYield.toFixed(1)}%` : "N/A",
      change: marketData.preferredAvgYieldChange || 0,
    },
  ];

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {marketItems.map((item) => (
            <Card key={item.label} className="bg-neutral-light">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-neutral-medium">{item.label}</div>
                <div className="text-2xl font-bold text-secondary">{item.value}</div>
                <div className={`text-sm font-medium flex items-center justify-center ${
                  item.change >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {item.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
