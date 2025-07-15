interface FinnhubNewsItem {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

interface CompanyNews {
  title: string;
  excerpt: string;
  content: string;
  source: string;
  url: string;
  publishedAt: Date;
  relatedTickers: string[];
  category: string;
  imageUrl?: string;
  isActive: boolean;
}

export class NewsService {
  private readonly FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || '';
  private readonly BASE_URL = 'https://finnhub.io/api/v1';

  async fetchCompanyNews(symbol: string, fromDate: string, toDate: string): Promise<CompanyNews[]> {
    if (!this.FINNHUB_API_KEY) {
      console.error('FINNHUB_API_KEY is not configured');
      return [];
    }

    try {
      const url = `${this.BASE_URL}/company-news?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${this.FINNHUB_API_KEY}`;
      console.log(`Fetching news from: ${url}`);

      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`Finnhub API error: ${response.status} - ${response.statusText}`);
        return [];
      }

      const data: FinnhubNewsItem[] = await response.json();
      
      if (!Array.isArray(data)) {
        console.error('Invalid response format from Finnhub API');
        return [];
      }

      // Transform Finnhub data to our news format
      return data.map((item): CompanyNews => ({
        title: item.headline,
        excerpt: item.summary.length > 200 ? item.summary.substring(0, 200) + '...' : item.summary,
        content: item.summary,
        source: item.source,
        url: item.url,
        publishedAt: new Date(item.datetime * 1000), // Convert Unix timestamp to Date
        relatedTickers: [symbol],
        category: item.category || 'Company News',
        imageUrl: item.image || undefined,
        isActive: true
      })).filter(news => news.title && news.content); // Filter out invalid entries

    } catch (error) {
      console.error('Error fetching company news:', error);
      return [];
    }
  }

  async fetchBankOfAmericaNews(): Promise<CompanyNews[]> {
    const toDate = new Date().toISOString().split('T')[0]; // Today's date
    const fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 days ago
    
    return this.fetchCompanyNews('BAC', fromDate, toDate);
  }

  async fetchMultipleCompanyNews(symbols: string[]): Promise<CompanyNews[]> {
    const toDate = new Date().toISOString().split('T')[0];
    const fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const newsPromises = symbols.map(symbol => this.fetchCompanyNews(symbol, fromDate, toDate));
    const newsArrays = await Promise.all(newsPromises);
    
    // Combine all news and sort by publication date
    const allNews = newsArrays.flat();
    return allNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
}

export const newsService = new NewsService();