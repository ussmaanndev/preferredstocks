import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import type { PreferredStock } from "@shared/schema";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();

  const { data: searchResults, isLoading } = useQuery<PreferredStock[]>({
    queryKey: ["/api/stocks", { search: query }],
    enabled: query.length > 0,
    staleTime: 30000,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/stocks?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTickerClick = (ticker: string) => {
    setLocation(`/stocks/${ticker}`);
    setQuery("");
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-medium" />
        </div>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-20 py-4 text-lg border-gray-300 focus:ring-primary focus:border-primary"
          placeholder="Search preferred stocks (e.g., AAPL-PA, BAC-PB)"
        />
        <Button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 bg-primary hover:bg-blue-700"
        >
          Search
        </Button>
      </form>

      {/* Search Results Dropdown */}
      {query.length > 0 && searchResults && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {searchResults.slice(0, 10).map((stock) => (
            <button
              key={stock.ticker}
              onClick={() => handleTickerClick(stock.ticker)}
              className="w-full px-4 py-3 text-left hover:bg-neutral-light transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-primary">{stock.ticker}</div>
                  <div className="text-sm text-neutral-medium">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${stock.price.toFixed(2)}</div>
                  <div className={`text-sm ${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {query.length > 0 && isLoading && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <div className="text-center text-neutral-medium">Searching...</div>
        </div>
      )}
    </div>
  );
}
