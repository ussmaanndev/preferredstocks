import { Clock, ExternalLink, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsArticle } from "@shared/schema";

interface NewsArticleProps {
  article: NewsArticle;
}

export default function NewsArticleCard({ article }: NewsArticleProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const articleDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - articleDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const handleClick = () => {
    if (article.url) {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="bg-white shadow-md border hover:shadow-lg transition-shadow cursor-pointer" onClick={handleClick}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-neutral-light rounded-lg flex-shrink-0 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-neutral-medium" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-secondary hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              {article.url && (
                <ExternalLink className="h-4 w-4 text-neutral-medium ml-2 flex-shrink-0" />
              )}
            </div>
            
            <p className="text-neutral-medium text-base mb-3 line-clamp-3">
              {article.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {article.relatedTickers && article.relatedTickers.map((ticker) => (
                <Badge key={ticker} variant="secondary" className="text-xs">
                  {ticker}
                </Badge>
              ))}
              {article.category && (
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-neutral-medium">
                {article.source}
              </span>
              <div className="flex items-center text-sm text-neutral-medium">
                <Clock className="h-4 w-4 mr-1" />
                {formatTime(article.publishedAt)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
