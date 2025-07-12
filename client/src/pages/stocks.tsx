import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import SEOHead from "@/components/seo-head";
import type { PreferredStock } from "@shared/schema";

export default function Stocks() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialSearch = urlParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<'ticker' | 'price' | 'change' | 'yield' | 'volume'>('ticker');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterBySector, setFilterBySector] = useState<string>('all');

  const { data: stocks, isLoading, error } = useQuery<PreferredStock[]>({
    queryKey: ["/api/stocks", searchQuery ? { search: searchQuery } : {}],
    staleTime: 30000,
  });

  const filteredAndSortedStocks = useMemo(() => {
    if (!stocks) return [];

    let filtered = stocks;

    // Filter by sector
    if (filterBySector !== 'all') {
      filtered = filtered.filter(stock => stock.sector === filterBySector);
    }

    // Sort stocks
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortBy) {
        case 'ticker':
          aValue = a.ticker;
          bValue = b.ticker;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'change':
          aValue = a.changePercent;
          bValue = b.changePercent;
          break;
        case 'yield':
          aValue = a.dividendYield;
          bValue = b.dividendYield;
          break;
        case 'volume':
          aValue = a.volume;
          bValue = b.volume;
          break;
        default:
          aValue = a.ticker;
          bValue = b.ticker;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });

    return filtered;
  }, [stocks, filterBySector, sortBy, sortOrder]);

  const sectors = useMemo(() => {
    if (!stocks) return [];
    const uniqueSectors = [...new Set(stocks.map(stock => stock.sector).filter(Boolean))];
    return uniqueSectors.sort();
  }, [stocks]);

  const handleSort = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (column: typeof sortBy) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  return (
    <>
      <SEOHead
        title="All Preferred Stocks | PreferredStockHub"
        description="Browse and search through 1,000+ preferred stocks with real-time data. Filter by sector, sort by performance, and find the best preferred stock investments."
        keywords="preferred stocks list, preferred stock screener, dividend stocks, financial stocks, investment research"
        canonical="/stocks"
        ogTitle="All Preferred Stocks | PreferredStockHub"
        ogDescription="Browse and search through 1,000+ preferred stocks with real-time data. Filter by sector, sort by performance, and find the best preferred stock investments."
        ogUrl="/stocks"
      />

      <div className="bg-neutral-light min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary mb-2">All Preferred Stocks</h1>
            <p className="text-neutral-medium text-lg">
              Browse and search through our comprehensive database of preferred stocks
            </p>
          </div>

          {/* Search and Filter Controls */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-secondary flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-medium" />
                  <Input
                    type="text"
                    placeholder="Search by ticker or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filterBySector} onValueChange={setFilterBySector}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ticker">Ticker</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="change">Change %</SelectItem>
                    <SelectItem value="yield">Dividend Yield</SelectItem>
                    <SelectItem value="volume">Volume</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="flex items-center"
                >
                  {sortOrder === 'asc' ? (
                    <>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Ascending
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Descending
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="text-neutral-medium">
                {isLoading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  `Showing ${filteredAndSortedStocks.length} ${searchQuery ? 'results' : 'stocks'}`
                )}
              </div>
              {searchQuery && (
                <Badge variant="secondary" className="text-sm">
                  Searching for: "{searchQuery}"
                </Badge>
              )}
            </div>
          </div>

          {/* Stock Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-light">
                  <tr>
                    <th className="text-left py-4 px-6">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('ticker')}
                        className="text-lg font-semibold text-secondary hover:text-primary flex items-center p-0"
                      >
                        Ticker {getSortIcon('ticker')}
                      </Button>
                    </th>
                    <th className="text-left py-4 px-6 text-lg font-semibold text-secondary">Name</th>
                    <th className="text-right py-4 px-6">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('price')}
                        className="text-lg font-semibold text-secondary hover:text-primary flex items-center p-0 ml-auto"
                      >
                        Price {getSortIcon('price')}
                      </Button>
                    </th>
                    <th className="text-right py-4 px-6">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('change')}
                        className="text-lg font-semibold text-secondary hover:text-primary flex items-center p-0 ml-auto"
                      >
                        Change {getSortIcon('change')}
                      </Button>
                    </th>
                    <th className="text-right py-4 px-6">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('yield')}
                        className="text-lg font-semibold text-secondary hover:text-primary flex items-center p-0 ml-auto"
                      >
                        Yield {getSortIcon('yield')}
                      </Button>
                    </th>
                    <th className="text-right py-4 px-6">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('volume')}
                        className="text-lg font-semibold text-secondary hover:text-primary flex items-center p-0 ml-auto"
                      >
                        Volume {getSortIcon('volume')}
                      </Button>
                    </th>
                    <th className="text-left py-4 px-6 text-lg font-semibold text-secondary">Sector</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    [...Array(10)].map((_, i) => (
                      <tr key={i} className="hover:bg-neutral-light transition-colors">
                        <td className="py-4 px-6"><Skeleton className="h-6 w-16" /></td>
                        <td className="py-4 px-6"><Skeleton className="h-6 w-48" /></td>
                        <td className="py-4 px-6 text-right"><Skeleton className="h-6 w-16 ml-auto" /></td>
                        <td className="py-4 px-6 text-right"><Skeleton className="h-6 w-20 ml-auto" /></td>
                        <td className="py-4 px-6 text-right"><Skeleton className="h-6 w-12 ml-auto" /></td>
                        <td className="py-4 px-6 text-right"><Skeleton className="h-6 w-16 ml-auto" /></td>
                        <td className="py-4 px-6"><Skeleton className="h-6 w-20" /></td>
                      </tr>
                    ))
                  ) : error ? (
                    <tr>
                      <td colSpan={7} className="py-8 px-6 text-center">
                        <div className="text-destructive">
                          Error loading stocks. Please try again.
                        </div>
                      </td>
                    </tr>
                  ) : filteredAndSortedStocks.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 px-6 text-center">
                        <div className="text-neutral-medium">
                          {searchQuery ? `No stocks found matching "${searchQuery}"` : 'No stocks found'}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedStocks.map((stock) => (
                      <tr key={stock.ticker} className="hover:bg-neutral-light transition-colors">
                        <td className="py-4 px-6">
                          <Link href={`/stocks/${stock.ticker}`}>
                            <div className="text-lg font-bold text-primary cursor-pointer hover:underline">
                              {stock.ticker}
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-lg text-secondary">{stock.name}</div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="text-lg font-bold text-secondary">${stock.price.toFixed(2)}</div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className={`text-lg font-semibold ${
                            stock.changePercent >= 0 ? 'text-success' : 'text-destructive'
                          }`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%)
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="text-lg font-semibold text-secondary">{stock.dividendYield.toFixed(1)}%</div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="text-lg text-secondary">{stock.volume.toLocaleString()}</div>
                        </td>
                        <td className="py-4 px-6">
                          {stock.sector && (
                            <Badge variant="secondary" className="text-sm">
                              {stock.sector}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
