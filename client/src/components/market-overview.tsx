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
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold text-secondary mb-6">Today's Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Skeleton className="h-6 w-32 mb-3 mx-auto" />
                  <Skeleton className="h-12 w-40 mb-4 mx-auto" />
                  <Skeleton className="h-6 w-24 mx-auto" />
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
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold text-secondary mb-6">Today's Market Overview</h2>
          <div className="text-center text-xl text-gray-600">
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
      value: marketData.treasury10y ? `${marketData.treasury10y.toFixed(3)}%` : "N/A",
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
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-secondary mb-6">Today's Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketItems.map((item) => (
            <Card key={item.label} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-lg font-bold text-gray-600 mb-2">
                  {item.label}
                </div>
                <div className="text-4xl font-bold text-secondary mb-3">
                  {item.value}
                </div>
                <div className={`text-lg font-semibold flex items-center justify-center ${
                  item.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change >= 0 ? (
                    <TrendingUp className="w-6 h-6 mr-2" />
                  ) : (
                    <TrendingDown className="w-6 h-6 mr-2" />
                  )}
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {item.change >= 0 ? 'Higher' : 'Lower'} than yesterday
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Market data updated every minute • Last updated: {new Date(marketData.updatedAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}