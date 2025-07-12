import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { TrendingUp, TrendingDown, ArrowLeft, Calendar, DollarSign, TrendingUpIcon, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import NewsArticleCard from "@/components/news-article";
import SEOHead from "@/components/seo-head";
import type { PreferredStock, NewsArticle } from "@shared/schema";

export default function StockDetail() {
  const { ticker } = useParams<{ ticker: string }>();

  const { data: stock, isLoading: loadingStock, error } = useQuery<PreferredStock>({
    queryKey: ["/api/stocks", ticker],
    enabled: !!ticker,
    staleTime: 30000,
  });

  const { data: relatedNews, isLoading: loadingNews } = useQuery<NewsArticle[]>({
    queryKey: ["/api/news/ticker", ticker],
    enabled: !!ticker,
    staleTime: 60000,
  });

  if (loadingStock) {
    return (
      <div className="bg-neutral-light min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-10 w-40 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <Skeleton className="h-8 w-32 mb-2" />
                  <Skeleton className="h-6 w-64" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-12 w-40 mb-4" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stock) {
    return (
      <div className="bg-neutral-light min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-secondary mb-4">Stock Not Found</h1>
              <p className="text-neutral-medium mb-6">
                The ticker symbol "{ticker}" could not be found in our database.
              </p>
              <Link href="/stocks">
                <Button className="bg-primary hover:bg-blue-700 text-white">
                  Browse All Stocks
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/New_York'
    }) + ' EST';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <SEOHead
        title={`${stock.ticker} - ${stock.name} | PreferredStockHub`}
        description={`Real-time data for ${stock.name} (${stock.ticker}). Current price: $${stock.price.toFixed(2)}, Dividend Yield: ${stock.dividendYield.toFixed(1)}%. Get detailed preferred stock analysis and news.`}
        keywords={`${stock.ticker}, ${stock.name}, preferred stock, dividend yield, stock price, financial data`}
        canonical={`/stocks/${stock.ticker}`}
        ogTitle={`${stock.ticker} - ${stock.name} | PreferredStockHub`}
        ogDescription={`Real-time data for ${stock.name} (${stock.ticker}). Current price: $${stock.price.toFixed(2)}, Dividend Yield: ${stock.dividendYield.toFixed(1)}%.`}
        ogUrl={`/stocks/${stock.ticker}`}
      />

      <div className="bg-neutral-light min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href="/stocks">
              <Button variant="ghost" className="text-primary hover:text-blue-800 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Stocks
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Stock Header */}
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-3xl font-bold text-secondary mb-2">
                        {stock.ticker}
                      </CardTitle>
                      <p className="text-xl text-neutral-medium">{stock.name}</p>
                      {stock.sector && (
                        <Badge variant="secondary" className="mt-2">
                          {stock.sector}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-secondary mb-2">
                        ${stock.price.toFixed(2)}
                      </div>
                      <div className={`text-lg font-semibold flex items-center justify-end ${
                        stock.changePercent >= 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        {stock.changePercent >= 0 ? (
                          <TrendingUp className="h-5 w-5 mr-1" />
                        ) : (
                          <TrendingDown className="h-5 w-5 mr-1" />
                        )}
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </div>
                      <div className="text-sm text-neutral-medium mt-1">
                        Last updated: {formatTime(stock.lastTrade)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-sm text-neutral-medium">Dividend Yield</div>
                      <div className="text-xl font-bold text-secondary">{stock.dividendYield.toFixed(2)}%</div>
                    </div>
                    <div className="text-center">
                      <Building2 className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-sm text-neutral-medium">Market Cap</div>
                      <div className="text-xl font-bold text-secondary">{stock.marketCap}</div>
                    </div>
                    <div className="text-center">
                      <TrendingUpIcon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-sm text-neutral-medium">Volume</div>
                      <div className="text-xl font-bold text-secondary">{stock.volume.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-sm text-neutral-medium">Last Trade</div>
                      <div className="text-xl font-bold text-secondary">{formatDate(stock.lastTrade)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stock Description */}
              {stock.description && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-secondary">About {stock.ticker}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-medium text-lg leading-relaxed">
                      {stock.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Related News */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-secondary">
                    Related News for {stock.ticker}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingNews ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-start space-x-4">
                          <Skeleton className="w-20 h-20 rounded-lg" />
                          <div className="flex-1">
                            <Skeleton className="h-6 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : relatedNews && relatedNews.length > 0 ? (
                    <div className="space-y-4">
                      {relatedNews.map((article) => (
                        <NewsArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-neutral-medium text-lg">
                        No recent news found for {stock.ticker}
                      </p>
                      <Link href="/news">
                        <Button variant="outline" className="mt-4">
                          View All News
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-secondary">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Current Price</span>
                    <span className="font-semibold">${stock.price.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Day Change</span>
                    <span className={`font-semibold ${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Day Change %</span>
                    <span className={`font-semibold ${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Dividend Yield</span>
                    <span className="font-semibold">{stock.dividendYield.toFixed(2)}%</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Volume</span>
                    <span className="font-semibold">{stock.volume.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Market Cap</span>
                    <span className="font-semibold">{stock.marketCap}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-secondary">Investment Disclaimer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-medium">
                    This information is for educational purposes only and should not be considered investment advice. 
                    Always consult with a qualified financial advisor before making investment decisions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
