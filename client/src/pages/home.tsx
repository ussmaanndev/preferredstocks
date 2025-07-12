import { useQuery } from "@tanstack/react-query";
import { TrendingUp, GraduationCap, Lightbulb, DollarSign, Shield, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import MarketOverview from "@/components/market-overview";
import StockCard from "@/components/stock-card";
import NewsArticleCard from "@/components/news-article";
import SEOHead from "@/components/seo-head";
import { Skeleton } from "@/components/ui/skeleton";
import type { PreferredStock, NewsArticle } from "@shared/schema";

export default function Home() {
  const { data: featuredStocks, isLoading: loadingStocks } = useQuery<PreferredStock[]>({
    queryKey: ["/api/stocks/featured"],
    staleTime: 30000,
  });

  const { data: topPerformers, isLoading: loadingPerformers } = useQuery<PreferredStock[]>({
    queryKey: ["/api/stocks/top-performers"],
    staleTime: 30000,
  });

  const { data: newsArticles, isLoading: loadingNews } = useQuery<NewsArticle[]>({
    queryKey: ["/api/news"],
    staleTime: 60000,
  });

  return (
    <>
      <SEOHead
        title="PreferredStockHub - Real-Time Preferred Stock Data & Analysis"
        description="Your trusted source for preferred stock data, analysis, and education. Access real-time data on 1,000+ preferred stocks with comprehensive market insights."
        keywords="preferred stocks, dividend yields, financial data, stock analysis, investment research"
        canonical="/"
        ogTitle="PreferredStockHub - Real-Time Preferred Stock Data & Analysis"
        ogDescription="Your trusted source for preferred stock data, analysis, and education. Access real-time data on 1,000+ preferred stocks with comprehensive market insights."
        ogUrl="/"
      />

      <div className="bg-neutral-light">
        <MarketOverview />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Featured Stocks Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-secondary">Featured Preferred Stocks</h2>
              <Link href="/stocks">
                <Button variant="ghost" className="text-primary hover:text-blue-800 text-lg font-medium">
                  View All →
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {loadingStocks ? (
                [...Array(3)].map((_, i) => (
                  <Card key={i} className="bg-white shadow-md border">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <Skeleton className="h-6 w-20 mb-2" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                        <div className="text-right">
                          <Skeleton className="h-8 w-16 mb-2" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <Skeleton className="h-4 w-20 mb-1" />
                          <Skeleton className="h-6 w-12" />
                        </div>
                        <div>
                          <Skeleton className="h-4 w-20 mb-1" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <Skeleton className="h-4 w-16 mb-1" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-10 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                featuredStocks?.map((stock) => (
                  <StockCard key={stock.ticker} stock={stock} />
                ))
              )}
            </div>
          </section>

          {/* Top Performers Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-6">Top Performers Today</h2>
            <Card className="bg-white shadow-md border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-light">
                    <tr>
                      <th className="text-left py-4 px-6 text-lg font-semibold text-secondary">Ticker</th>
                      <th className="text-left py-4 px-6 text-lg font-semibold text-secondary">Name</th>
                      <th className="text-right py-4 px-6 text-lg font-semibold text-secondary">Price</th>
                      <th className="text-right py-4 px-6 text-lg font-semibold text-secondary">Change</th>
                      <th className="text-right py-4 px-6 text-lg font-semibold text-secondary">Yield</th>
                      <th className="text-right py-4 px-6 text-lg font-semibold text-secondary">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loadingPerformers ? (
                      [...Array(3)].map((_, i) => (
                        <tr key={i} className="hover:bg-neutral-light transition-colors">
                          <td className="py-4 px-6"><Skeleton className="h-6 w-16" /></td>
                          <td className="py-4 px-6"><Skeleton className="h-6 w-48" /></td>
                          <td className="py-4 px-6 text-right"><Skeleton className="h-6 w-16 ml-auto" /></td>
                          <td className="py-4 px-6 text-right"><Skeleton className="h-6 w-20 ml-auto" /></td>
                          <td className="py-4 px-6 text-right"><Skeleton className="h-6 w-12 ml-auto" /></td>
                          <td className="py-4 px-6 text-right"><Skeleton className="h-6 w-16 ml-auto" /></td>
                        </tr>
                      ))
                    ) : (
                      topPerformers?.slice(0, 3).map((stock) => (
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
                            <div className={`text-lg font-semibold flex items-center justify-end ${
                              stock.changePercent >= 0 ? 'text-success' : 'text-destructive'
                            }`}>
                              <TrendingUp className="h-4 w-4 mr-1" />
                              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%)
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="text-lg font-semibold text-secondary">{stock.dividendYield.toFixed(1)}%</div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="text-lg text-secondary">{stock.volume.toLocaleString()}</div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-neutral-light px-6 py-4 text-center">
                <Link href="/stocks">
                  <Button variant="ghost" className="text-primary hover:text-blue-800 text-lg font-medium">
                    View All Top Performers →
                  </Button>
                </Link>
              </div>
            </Card>
          </section>

          {/* News Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-6">Latest Preferred Stock News</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {loadingNews ? (
                [...Array(4)].map((_, i) => (
                  <Card key={i} className="bg-white shadow-md border">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Skeleton className="w-20 h-20 rounded-lg" />
                        <div className="flex-1">
                          <Skeleton className="h-6 w-full mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4 mb-3" />
                          <div className="flex justify-between items-center">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                newsArticles?.map((article) => (
                  <NewsArticleCard key={article.id} article={article} />
                ))
              )}
            </div>
            <div className="text-center mt-8">
              <Link href="/news">
                <Button className="bg-primary hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium">
                  View All News
                </Button>
              </Link>
            </div>
          </section>

          {/* Educational Content Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-6">Understanding Preferred Stocks</h2>
            <Card className="bg-white shadow-md border">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-4 flex items-center">
                      <GraduationCap className="text-primary mr-2" />
                      What are Preferred Stocks?
                    </h3>
                    <p className="text-neutral-medium text-lg mb-6">
                      Preferred stocks are hybrid securities that combine features of both stocks and bonds. 
                      They typically offer higher dividend yields than common stocks and have priority over 
                      common stockholders in dividend payments.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                        <span className="text-lg">Higher dividend yields than common stocks</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                        <span className="text-lg">Priority in dividend payments</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                        <span className="text-lg">Less volatility than common stocks</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-4 flex items-center">
                      <Lightbulb className="text-primary mr-2" />
                      Key Benefits for Investors
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <DollarSign className="text-success mr-3 mt-1 h-5 w-5" />
                        <div>
                          <strong className="text-lg">Steady Income:</strong>
                          <p className="text-neutral-medium">Regular dividend payments provide consistent income stream</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Shield className="text-success mr-3 mt-1 h-5 w-5" />
                        <div>
                          <strong className="text-lg">Lower Risk:</strong>
                          <p className="text-neutral-medium">Generally less risky than common stocks</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <BarChart3 className="text-success mr-3 mt-1 h-5 w-5" />
                        <div>
                          <strong className="text-lg">Portfolio Diversification:</strong>
                          <p className="text-neutral-medium">Excellent addition to balanced investment portfolios</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <Button className="bg-secondary hover:bg-gray-600 text-white px-8 py-3 text-lg font-medium">
                    Learn More About Preferred Stocks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </>
  );
}
