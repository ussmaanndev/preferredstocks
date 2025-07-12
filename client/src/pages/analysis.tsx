import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, DollarSign, Percent, BarChart3, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOHead from "@/components/seo-head";
import type { PreferredStock, MarketData } from "@shared/schema";

export default function Analysis() {
  const { data: marketData, isLoading: loadingMarket } = useQuery<MarketData>({
    queryKey: ["/api/market-data"],
    staleTime: 30000,
  });

  const { data: stocks, isLoading: loadingStocks } = useQuery<PreferredStock[]>({
    queryKey: ["/api/stocks"],
    staleTime: 60000,
  });

  const { data: topPerformers, isLoading: loadingTopPerformers } = useQuery<PreferredStock[]>({
    queryKey: ["/api/stocks/top-performers"],
    staleTime: 60000,
  });

  // Calculate market analysis data
  const marketAnalysis = stocks ? {
    totalStocks: stocks.length,
    averageYield: (stocks.reduce((sum, stock) => sum + stock.dividendYield, 0) / stocks.length).toFixed(2),
    averagePrice: (stocks.reduce((sum, stock) => sum + stock.price, 0) / stocks.length).toFixed(2),
    positiveStocks: stocks.filter(stock => stock.changePercent > 0).length,
    negativeStocks: stocks.filter(stock => stock.changePercent < 0).length,
    sectorBreakdown: stocks.reduce((acc, stock) => {
      const sector = stock.sector || 'Other';
      acc[sector] = (acc[sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    highYieldStocks: stocks.filter(stock => stock.dividendYield > 7).length,
    lowVolatilityStocks: stocks.filter(stock => Math.abs(stock.changePercent) < 1).length,
  } : null;

  return (
    <>
      <SEOHead
        title="Market Analysis & Insights | PreferredStockHub"
        description="Comprehensive analysis of preferred stock market trends, sector performance, and investment insights. Get detailed market data and analytics for informed investment decisions."
        keywords="preferred stock analysis, market trends, investment insights, sector performance, dividend analysis"
        canonical="/analysis"
        ogTitle="Market Analysis & Insights | PreferredStockHub"
        ogDescription="Comprehensive analysis of preferred stock market trends, sector performance, and investment insights."
        ogUrl="/analysis"
      />

      <div className="bg-neutral-light min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary mb-2">Market Analysis & Insights</h1>
            <p className="text-neutral-medium text-lg">
              Comprehensive analysis of preferred stock market trends and performance
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Market Overview</TabsTrigger>
              <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="insights">Key Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {loadingStocks ? <Skeleton className="h-8 w-16" /> : marketAnalysis?.totalStocks || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Preferred stocks tracked
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Yield</CardTitle>
                    <Percent className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {loadingStocks ? <Skeleton className="h-8 w-16" /> : `${marketAnalysis?.averageYield || 0}%`}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Market average dividend yield
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Price</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {loadingStocks ? <Skeleton className="h-8 w-16" /> : `$${marketAnalysis?.averagePrice || 0}`}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Market average price per share
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Market Direction</CardTitle>
                    {marketAnalysis && marketAnalysis.positiveStocks > marketAnalysis.negativeStocks ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {loadingStocks ? <Skeleton className="h-8 w-16" /> : (
                        marketAnalysis && marketAnalysis.positiveStocks > marketAnalysis.negativeStocks ? 
                        `+${marketAnalysis.positiveStocks}` : 
                        `-${marketAnalysis?.negativeStocks || 0}`
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {marketAnalysis && marketAnalysis.positiveStocks > marketAnalysis.negativeStocks ? 
                        'Stocks gaining today' : 'Stocks declining today'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Market Data Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">S&P 500</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingMarket ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl font-bold">{marketData?.sp500.toFixed(2)}</div>
                        <div className={`text-sm ${marketData && marketData.sp500Change >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {marketData && marketData.sp500Change >= 0 ? '+' : ''}{marketData?.sp500Change.toFixed(2)}%
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">NASDAQ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingMarket ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl font-bold">{marketData?.nasdaq.toFixed(2)}</div>
                        <div className={`text-sm ${marketData && marketData.nasdaqChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {marketData && marketData.nasdaqChange >= 0 ? '+' : ''}{marketData?.nasdaqChange.toFixed(2)}%
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">10-Year Treasury</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingMarket ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl font-bold">{marketData?.treasury10y.toFixed(3)}%</div>
                        <div className={`text-sm ${marketData && marketData.treasury10yChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {marketData && marketData.treasury10yChange >= 0 ? '+' : ''}{marketData?.treasury10yChange.toFixed(3)}%
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sectors">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Sector Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingStocks ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {marketAnalysis && Object.entries(marketAnalysis.sectorBreakdown)
                        .sort(([,a], [,b]) => b - a)
                        .map(([sector, count]) => (
                          <div key={sector} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="text-lg font-medium">{sector}</div>
                              <Badge variant="secondary">{count} stocks</Badge>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">{((count / marketAnalysis.totalStocks) * 100).toFixed(1)}%</div>
                              <div className="text-sm text-muted-foreground">of total</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Top Performers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingTopPerformers ? (
                      <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {topPerformers?.slice(0, 5).map((stock) => (
                          <div key={stock.ticker} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{stock.ticker}</div>
                              <div className="text-sm text-muted-foreground">{stock.name}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-success">
                                +{stock.changePercent.toFixed(2)}%
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ${stock.price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Market Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingStocks ? (
                      <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-medium">High Yield Stocks</div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{marketAnalysis?.highYieldStocks || 0}</div>
                            <div className="text-sm text-muted-foreground">Above 7% yield</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-medium">Low Volatility</div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{marketAnalysis?.lowVolatilityStocks || 0}</div>
                            <div className="text-sm text-muted-foreground">Under 1% change</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-medium">Market Sentiment</div>
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              {marketAnalysis && marketAnalysis.positiveStocks > marketAnalysis.negativeStocks ? 
                                'Bullish' : 'Bearish'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {marketAnalysis?.positiveStocks || 0} up, {marketAnalysis?.negativeStocks || 0} down
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Key Market Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4">
                        <h3 className="font-semibold text-lg mb-2">Dividend Yield Analysis</h3>
                        <p className="text-neutral-medium">
                          The average dividend yield across all preferred stocks is {marketAnalysis?.averageYield || 0}%, 
                          which is {marketData && parseFloat(marketAnalysis?.averageYield || '0') > marketData.treasury10y ? 'above' : 'below'} 
                          the current 10-year Treasury yield of {marketData?.treasury10y.toFixed(3)}%.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-secondary pl-4">
                        <h3 className="font-semibold text-lg mb-2">Market Sentiment</h3>
                        <p className="text-neutral-medium">
                          {marketAnalysis && marketAnalysis.positiveStocks > marketAnalysis.negativeStocks ? 
                            `Bullish sentiment with ${marketAnalysis.positiveStocks} stocks advancing versus ${marketAnalysis.negativeStocks} declining.` :
                            `Bearish sentiment with ${marketAnalysis?.negativeStocks || 0} stocks declining versus ${marketAnalysis?.positiveStocks || 0} advancing.`
                          }
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-accent pl-4">
                        <h3 className="font-semibold text-lg mb-2">Sector Concentration</h3>
                        <p className="text-neutral-medium">
                          {marketAnalysis && Object.entries(marketAnalysis.sectorBreakdown)[0] && 
                            `${Object.entries(marketAnalysis.sectorBreakdown)[0][0]} leads with ${Object.entries(marketAnalysis.sectorBreakdown)[0][1]} stocks, 
                            representing ${((Object.entries(marketAnalysis.sectorBreakdown)[0][1] / marketAnalysis.totalStocks) * 100).toFixed(1)}% of the market.`
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Investment Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-success/10 rounded-lg">
                        <h4 className="font-semibold text-success mb-2">High Yield Opportunity</h4>
                        <p className="text-sm">
                          {marketAnalysis?.highYieldStocks || 0} stocks offer yields above 7%, 
                          providing attractive income opportunities in the current market environment.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">Diversification Benefits</h4>
                        <p className="text-sm">
                          With {marketAnalysis ? Object.keys(marketAnalysis.sectorBreakdown).length : 0} different sectors represented, 
                          preferred stocks offer good diversification across industries.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-700 mb-2">Risk Consideration</h4>
                        <p className="text-sm">
                          Monitor interest rate changes as they significantly impact preferred stock valuations. 
                          Current 10-year Treasury at {marketData?.treasury10y.toFixed(3)}% provides context for yield comparisons.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}