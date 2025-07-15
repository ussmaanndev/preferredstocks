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
import PreferredSharesInfo from "@/components/preferred-shares-info";
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

      {/* Preferred Shares Information */}
      <PreferredSharesInfo />

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
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-white"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white bg-opacity-5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-white bg-opacity-5 rounded-full animate-pulse delay-500"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-15 rounded-full mb-8 backdrop-blur-sm">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Start Your Preferred Stock
            <span className="block text-yellow-300">Journey Today</span>
          </h2>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-4 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Access professional-grade tools and insights to make informed investment decisions
          </p>
          
          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span className="opacity-90">900+ Preferred Stocks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span className="opacity-90">Real-time Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span className="opacity-90">Professional Analysis</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/stocks">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-lg px-10 py-4 min-w-[220px] font-semibold shadow-lg">
                <BarChart3 className="mr-3 h-5 w-5" />
                Explore Stocks
              </Button>
            </Link>
            <Link href="/analysis">
              <Button variant="outline" className="border-2 border-white text-white bg-white bg-opacity-10 hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 text-lg px-10 py-4 min-w-[220px] font-semibold backdrop-blur-sm">
                <BookOpen className="mr-3 h-5 w-5" />
                Learn More
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicator */}
          <div className="mt-12 pt-8 border-t border-white border-opacity-20">
            <p className="text-sm opacity-75 mb-4">Trusted by thousands of investors worldwide</p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-yellow-300 opacity-95">4.8★</div>
                <div className="text-xs opacity-70">User Rating</div>
              </div>
              <div className="h-8 w-px bg-white bg-opacity-30"></div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-yellow-300 opacity-95">50K+</div>
                <div className="text-xs opacity-70">Active Users</div>
              </div>
              <div className="h-8 w-px bg-white bg-opacity-30"></div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-yellow-300 opacity-95">99.9%</div>
                <div className="text-xs opacity-70">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}