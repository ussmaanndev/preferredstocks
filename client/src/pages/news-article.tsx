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

          {/* Full Content Placeholder */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 p-8 rounded-lg text-center border-2 border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Full Article Content
              </h3>
              <p className="text-blue-700 mb-4">
                Full article will appear here for: <strong>{article.title}</strong>
              </p>
              <p className="text-sm text-blue-600">
                Article ID: {id}
              </p>
            </div>
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