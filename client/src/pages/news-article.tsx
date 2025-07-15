import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Calendar, User, ExternalLink } from "lucide-react";
import { NewsArticle } from "@shared/schema";

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: article, isLoading, error } = useQuery<NewsArticle>({
    queryKey: ['/api/news', id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/news">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/news">
          <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </Link>
      </div>

      {/* Article Content */}
      <Card className="shadow-lg">
        <CardHeader className="pb-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary">{article.category}</Badge>
            {article.relatedTicker && (
              <Badge variant="outline">{article.relatedTicker}</Badge>
            )}
          </div>
          
          <CardTitle className="text-3xl font-bold text-gray-900 leading-tight">
            {article.title}
          </CardTitle>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{article.source}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Excerpt */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              {article.excerpt}
            </p>
          </div>

          {/* Full Content */}
          <div className="prose prose-lg max-w-none">
            {article.content ? (
              <div className="text-gray-800 leading-relaxed">
                <div className="whitespace-pre-wrap text-base leading-7">
                  {article.content}
                </div>
                
                {/* Additional content sections for better presentation */}
                <div className="mt-8 space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Highlights</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• This article provides important insights into preferred stock markets</li>
                      <li>• Investors should consider the impact on dividend yields and stock valuations</li>
                      <li>• Market conditions continue to evolve, affecting preferred stock performance</li>
                    </ul>
                  </div>
                  
                  {article.relatedTickers && article.relatedTickers.length > 0 && (
                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Stocks Mentioned</h3>
                      <div className="flex flex-wrap gap-2">
                        {article.relatedTickers.map((ticker) => (
                          <Link key={ticker} href={`/stocks/${ticker}`}>
                            <Badge variant="outline" className="hover:bg-blue-100 cursor-pointer">
                              {ticker}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment Implications</h3>
                    <p className="text-gray-700">
                      This development may affect preferred stock investors who focus on dividend income and capital preservation. 
                      Consider reviewing your portfolio allocation and consulting with a financial advisor to understand the potential impacts.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 text-center">
                <p className="text-yellow-800">
                  Article content is currently unavailable. Please check back later or contact support.
                </p>
              </div>
            )}
          </div>

          {/* Related Information */}
          {article.relatedTicker && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Related Stock
              </h3>
              <p className="text-gray-700 mb-4">
                This article is related to {article.relatedTicker} preferred stock.
              </p>
              <Link href={`/stocks/${article.relatedTicker}`}>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Stock Details
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}