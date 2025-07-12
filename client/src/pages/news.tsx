import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Newspaper, Filter, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import NewsArticleCard from "@/components/news-article";
import SEOHead from "@/components/seo-head";
import type { NewsArticle } from "@shared/schema";

export default function News() {
  const [filterByCategory, setFilterByCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'source'>('date');

  const { data: newsArticles, isLoading, error } = useQuery<NewsArticle[]>({
    queryKey: ["/api/news"],
    staleTime: 60000,
  });

  const filteredAndSortedArticles = newsArticles?.filter(article => {
    if (filterByCategory === 'all') return true;
    return article.category === filterByCategory;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    } else {
      return a.source.localeCompare(b.source);
    }
  });

  const categories = newsArticles ? [...new Set(newsArticles.map(article => article.category).filter(Boolean))] : [];
  const sources = newsArticles ? [...new Set(newsArticles.map(article => article.source))].sort() : [];

  return (
    <>
      <SEOHead
        title="Latest Preferred Stock News | PreferredStockHub"
        description="Stay updated with the latest preferred stock news, market analysis, and financial insights. Get real-time updates on preferred stock market developments."
        keywords="preferred stock news, financial news, market analysis, dividend news, investment updates"
        canonical="/news"
        ogTitle="Latest Preferred Stock News | PreferredStockHub"
        ogDescription="Stay updated with the latest preferred stock news, market analysis, and financial insights. Get real-time updates on preferred stock market developments."
        ogUrl="/news"
      />

      <div className="bg-neutral-light min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary mb-2 flex items-center">
              <Newspaper className="h-8 w-8 mr-3 text-primary" />
              Latest Preferred Stock News
            </h1>
            <p className="text-neutral-medium text-lg">
              Stay updated with the latest news and analysis on preferred stocks
            </p>
          </div>

          {/* Filter Controls */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-secondary flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={filterByCategory} onValueChange={setFilterByCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'date' | 'source')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Latest First</SelectItem>
                    <SelectItem value="source">Source</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center text-sm text-neutral-medium">
                  <Clock className="h-4 w-4 mr-2" />
                  {isLoading ? (
                    <Skeleton className="h-4 w-24" />
                  ) : (
                    `${filteredAndSortedArticles?.length || 0} articles`
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* News Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoading ? (
              [...Array(8)].map((_, i) => (
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
            ) : error ? (
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-destructive text-lg">
                      Error loading news articles. Please try again.
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : filteredAndSortedArticles && filteredAndSortedArticles.length > 0 ? (
              filteredAndSortedArticles.map((article) => (
                <NewsArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-neutral-medium text-lg">
                      {filterByCategory !== 'all' ? `No articles found in "${filterByCategory}" category` : 'No news articles available'}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* News Sources */}
          {sources.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-secondary">Our News Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {sources.map((source) => (
                    <Badge key={source} variant="outline" className="text-sm">
                      {source}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-neutral-medium mt-4">
                  We aggregate news from trusted financial sources to provide comprehensive coverage of the preferred stock market.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
