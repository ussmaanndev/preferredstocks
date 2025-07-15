import { useQuery } from "@tanstack/react-query";
import {
  TrendingUp,
  Newspaper,
  DollarSign,
  LineChart,
  Shield,
  Users,
  Award,
  BarChart3,
  BookOpen,
  Target,
} from "lucide-react";
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
        title="PreferredStockHub - Professional Preferred Stock Investment Platform"
        description="Discover high-yield preferred stocks with real-time market data, expert analysis, and comprehensive investment tools designed for serious investors."
      />

      {/* Hero Section */}
      <section className="relative gradient-hero text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Professional Preferred Stock
            <span className="block text-yellow-300">Investment Platform</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium opacity-95 max-w-4xl mx-auto leading-relaxed">
            Access real-time data on 900+ preferred stocks with professional-grade analysis and insights for serious investors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link href="/stocks">
              <Button className="btn-professional text-lg px-8 py-4 min-w-[200px]">
                <BarChart3 className="mr-2 h-5 w-5" />
                Browse Stocks
              </Button>
            </Link>
            <Link href="/analysis">
              <Button variant="outline" className="text-lg px-8 py-4 min-w-[200px] bg-white bg-opacity-10 border-white border-2 text-white hover:bg-white hover:text-gray-900">
                <LineChart className="mr-2 h-5 w-5" />
                Market Analysis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <MarketOverview />

      {/* What Are Preferred Shares Educational Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Are Preferred Shares?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the fundamentals of preferred stock investing
            </p>
          </div>
          
          {/* Overview Card */}
          <div className="card-enhanced p-8 mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
            <div className="flex items-start gap-4">
              <div className="gradient-blue w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Preferred Shares Overview</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Preferred shares are a type of equity security that combines features of both stocks and bonds. They typically pay fixed dividends and have priority over common stock in dividend payments and asset distribution, but usually don't carry voting rights. This makes them attractive to income-focused investors seeking steady returns.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="card-enhanced p-6 text-center">
              <div className="gradient-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Fixed Dividends</h4>
              <p className="text-gray-600">
                Preferred shares typically pay fixed dividend rates, providing predictable income streams for investors.
              </p>
            </div>
            
            <div className="card-enhanced p-6 text-center">
              <div className="gradient-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Priority Status</h4>
              <p className="text-gray-600">
                Preferred shareholders receive dividends before common shareholders and have priority in liquidation.
              </p>
            </div>
            
            <div className="card-enhanced p-6 text-center">
              <div className="gradient-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">No Voting Rights</h4>
              <p className="text-gray-600">
                Most preferred shares don't carry voting rights, focusing purely on income generation.
              </p>
            </div>
          </div>

          {/* Benefits vs Risks */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card-enhanced p-8 border-l-4 border-green-500">
              <h4 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                Benefits
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Higher dividend yields than common stocks</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Priority in dividend payments</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Less volatile than common stocks</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Potential for capital appreciation</span>
                </li>
              </ul>
            </div>
            
            <div className="card-enhanced p-8 border-l-4 border-red-500">
              <h4 className="text-2xl font-bold text-red-700 mb-6 flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Considerations
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Interest rate sensitivity</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Call risk on some issues</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Limited growth potential</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Credit risk of issuing company</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Types of Preferred Shares */}
          <div className="card-enhanced p-8 mb-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Types of Preferred Shares</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">C</span>
                </div>
                <h5 className="font-semibold mb-2">Cumulative</h5>
                <p className="text-sm text-gray-600">Unpaid dividends accumulate and must be paid before common dividends</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">P</span>
                </div>
                <h5 className="font-semibold mb-2">Participating</h5>
                <p className="text-sm text-gray-600">Can receive additional dividends beyond the fixed rate</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">Co</span>
                </div>
                <h5 className="font-semibold mb-2">Convertible</h5>
                <p className="text-sm text-gray-600">Can be converted to common stock at a predetermined ratio</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 font-bold">Ca</span>
                </div>
                <h5 className="font-semibold mb-2">Callable</h5>
                <p className="text-sm text-gray-600">Can be redeemed by the issuer at predetermined prices</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link href="/stocks">
              <Button className="btn-professional text-lg px-8 py-4">
                <BarChart3 className="mr-2 h-5 w-5" />
                Explore Preferred Stocks
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose PreferredStockHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional tools and insights designed for serious preferred stock investors
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-enhanced p-8 text-center transition-smooth">
              <div className="gradient-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-Time Data</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Live market data for 900+ preferred stocks updated every minute with accurate pricing and performance metrics
              </p>
            </div>
            
            <div className="card-enhanced p-8 text-center transition-smooth">
              <div className="gradient-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional Analysis</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Expert-driven market insights and comprehensive analysis tools for informed investment decisions
              </p>
            </div>
            
            <div className="card-enhanced p-8 text-center transition-smooth">
              <div className="gradient-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">User-Friendly Design</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Clean, professional interface designed for easy navigation and clear data presentation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stocks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Preferred Stocks</h2>
              <p className="text-xl text-gray-600">
                Hand-picked high-quality preferred stocks with strong dividend yields
              </p>
            </div>
            <Link href="/stocks">
              <Button className="btn-professional">
                <TrendingUp className="mr-2 h-5 w-5" />
                View All Stocks
              </Button>
            </Link>
          </div>
          
          {loadingStocks ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-enhanced p-8">
                  <Skeleton className="h-8 w-32 mb-4" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredStocks?.slice(0, 6).map((stock) => (
                <StockCard key={stock.ticker} stock={stock} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Performers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Today's Top Performers</h2>
              <p className="text-xl text-gray-600">
                Preferred stocks with the highest gains today
              </p>
            </div>
            <Link href="/stocks">
              <Button className="btn-professional">
                <Award className="mr-2 h-5 w-5" />
                View Rankings
              </Button>
            </Link>
          </div>
          
          {loadingPerformers ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-enhanced p-8">
                  <Skeleton className="h-8 w-32 mb-4" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topPerformers?.slice(0, 6).map((stock) => (
                <StockCard key={stock.ticker} stock={stock} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Market News</h2>
              <p className="text-xl text-gray-600">
                Stay informed with the latest preferred stock market developments
              </p>
            </div>
            <Link href="/news">
              <Button className="btn-professional">
                <Newspaper className="mr-2 h-5 w-5" />
                Read All News
              </Button>
            </Link>
          </div>
          
          {loadingNews ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-enhanced p-8">
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles?.slice(0, 6).map((article) => (
                <NewsArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Trusted by Professional Investors</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of investors who rely on our platform for preferred stock investments
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="text-5xl font-bold text-blue-400 mb-4">900+</div>
              <p className="text-xl text-gray-300">Preferred Stocks Listed</p>
            </div>
            <div className="p-8">
              <div className="text-5xl font-bold text-green-400 mb-4">$50B+</div>
              <p className="text-xl text-gray-300">Total Market Cap Tracked</p>
            </div>
            <div className="p-8">
              <div className="text-5xl font-bold text-purple-400 mb-4">24/7</div>
              <p className="text-xl text-gray-300">Real-Time Market Data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 gradient-blue text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Preferred Stock Journey Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Access professional-grade tools and insights to make informed investment decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/stocks">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 min-w-[200px] font-semibold">
                <BarChart3 className="mr-2 h-5 w-5" />
                Explore Stocks
              </Button>
            </Link>
            <Link href="/analysis">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 min-w-[200px] font-semibold">
                <BookOpen className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}