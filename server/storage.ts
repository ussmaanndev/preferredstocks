import { preferredStocks, newsArticles, marketData, type PreferredStock, type InsertPreferredStock, type NewsArticle, type InsertNewsArticle, type MarketData, type InsertMarketData } from "@shared/schema";
import { marketDataService } from "./services/market-data";
import { stockDataService } from "./services/stock-data";
import { newsService } from "./services/news-service";

export interface IStorage {
  // Preferred Stocks
  getPreferredStock(ticker: string): Promise<PreferredStock | undefined>;
  getAllPreferredStocks(): Promise<PreferredStock[]>;
  getFeaturedPreferredStocks(): Promise<PreferredStock[]>;
  getTopPerformers(): Promise<PreferredStock[]>;
  searchPreferredStocks(query: string): Promise<PreferredStock[]>;
  createPreferredStock(stock: InsertPreferredStock): Promise<PreferredStock>;
  updatePreferredStock(ticker: string, stock: Partial<InsertPreferredStock>): Promise<PreferredStock | undefined>;

  // News Articles
  getNewsArticle(id: number): Promise<NewsArticle | undefined>;
  getAllNewsArticles(): Promise<NewsArticle[]>;
  getLatestNewsArticles(limit?: number): Promise<NewsArticle[]>;
  getNewsArticlesByTicker(ticker: string): Promise<NewsArticle[]>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
  refreshNewsFromAPI(): Promise<void>;

  // Market Data
  getLatestMarketData(): Promise<MarketData | undefined>;
  createMarketData(data: InsertMarketData): Promise<MarketData>;
}

export class MemStorage implements IStorage {
  private preferredStocks: Map<string, PreferredStock>;
  private newsArticles: Map<number, NewsArticle>;
  private marketData: MarketData | undefined;
  private stockIdCounter: number;
  private newsIdCounter: number;
  private marketDataIdCounter: number;

  constructor() {
    this.preferredStocks = new Map();
    this.newsArticles = new Map();
    this.stockIdCounter = 1;
    this.newsIdCounter = 1;
    this.marketDataIdCounter = 1;
    this.initializeData();
  }

  private async initializeData() {
    console.log('Initializing stock data...');

    // Generate 1000+ real preferred stocks
    const realStocks = await stockDataService.generatePreferredStocks();
    console.log(`Generated ${realStocks.length} preferred stocks`);

    realStocks.forEach(stock => {
      const id = this.stockIdCounter++;
      this.preferredStocks.set(stock.ticker, { 
        ...stock, 
        id, 
        updatedAt: new Date(),
        sector: stock.sector || null,
        description: stock.description || null,
        isActive: stock.isActive !== undefined ? stock.isActive : true
      });
    });

    // Initialize with sample news articles
    const sampleNews: InsertNewsArticle[] = [
      {
        title: "Federal Reserve Signals Continued Support for Preferred Stock Market",
        excerpt: "The Federal Reserve's latest monetary policy statement indicates continued support for financial markets, benefiting preferred stock investors...",
        content: "The Federal Reserve's latest monetary policy statement indicates continued support for financial markets, benefiting preferred stock investors with stable dividend yields.",
        source: "Reuters",
        url: "https://reuters.com/markets/fed-preferred-stocks",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        relatedTickers: ["JPM-PA", "BAC-PB"],
        category: "Market News",
        isActive: true,
      },
      {
        title: "Bank of America Issues New Preferred Stock Series",
        excerpt: "Bank of America announces the issuance of a new preferred stock series with attractive dividend yields for income-focused investors...",
        content: "Bank of America Corporation (NYSE: BAC) announced today the issuance of a new preferred stock series, designated as Series PB, offering attractive dividend yields for income-focused investors.\n\nThe new preferred stock series will carry a fixed dividend rate of 6.25% per annum, paid quarterly, and will be issued at a liquidation preference of $25 per share. The offering is expected to raise approximately $2 billion in capital to support the bank's Tier 1 capital requirements.\n\n\"This preferred stock issuance demonstrates our commitment to maintaining strong capital ratios while providing investors with a stable income stream,\" said Brian Moynihan, CEO of Bank of America. \"The 6.25% dividend yield represents competitive returns in the current interest rate environment.\"\n\nKey features of the new preferred stock series include:\n• Fixed dividend rate of 6.25% annually\n• Quarterly dividend payments\n• $25 liquidation preference per share\n• Non-cumulative dividends\n• Callable by the company after 5 years\n\nThe preferred stock will rank senior to common stock but junior to deposits and senior debt obligations. Trading is expected to begin on the New York Stock Exchange under the symbol BAC-PB within the next week.\n\nThis issuance comes as banks continue to strengthen their capital positions amid evolving regulatory requirements and economic uncertainty. The preferred stock market has seen increased activity from major financial institutions seeking to optimize their capital structures.",
        source: "MarketWatch",
        url: "https://marketwatch.com/story/bac-preferred-stock",
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        relatedTickers: ["BAC-PB"],
        category: "Company News",
        isActive: true,
      },
      {
        title: "Rising Interest Rates Impact Preferred Stock Valuations",
        excerpt: "Analysis shows how recent interest rate changes are affecting preferred stock prices and dividend yields across major financial institutions...",
        content: "Rising interest rates are creating significant pressure on preferred stock valuations across major financial institutions, with many issues trading at substantial discounts to their liquidation values.\n\nRecent Federal Reserve policy changes have pushed the 10-year Treasury yield above 4.5%, creating a more competitive environment for fixed-income securities. This has particularly impacted preferred stocks with lower dividend rates issued during the low-rate environment of 2020-2022.\n\nKey market observations include:\n\n• JPMorgan Chase Series A (JPM-PA) preferred stock, with a 4.75% dividend rate, now trades at approximately 15% below its $25 liquidation value\n• Wells Fargo Series C (WFC-PC) preferred shares have declined 18% from their 52-week highs\n• Morgan Stanley Series A (MS-PA) preferred stock has seen increased trading volume as investors seek higher yields\n\nMarket strategists note that while rising rates pressure preferred stock prices, they also create opportunities for income-focused investors. \"The current environment allows investors to purchase quality preferred stocks at discounts to par value while locking in attractive yields,\" said Sarah Chen, fixed-income strategist at Goldman Sachs.\n\nLooking ahead, analysts expect continued volatility in preferred stock markets as the Federal Reserve navigates its monetary policy decisions. However, the strong capital positions of major banks suggest limited credit risk for high-quality preferred issues.\n\nInvestors should consider that preferred stocks typically recover value over time as they approach call dates, when issuers may redeem shares at par value. Many current preferred issues become callable within the next 2-3 years, potentially providing capital appreciation opportunities for patient investors.",
        source: "Financial Times",
        url: "https://ft.com/content/preferred-stocks-rates",
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        relatedTickers: ["JPM-PA", "WFC-PC", "MS-PA"],
        category: "Analysis",
        isActive: true,
      },
      {
        title: "JPMorgan Chase Preferred Stock Dividend Announcement",
        excerpt: "JPMorgan Chase declares quarterly dividend on its preferred stock series, maintaining consistent returns for shareholders...",
        content: "JPMorgan Chase declares quarterly dividend on its preferred stock series, maintaining consistent returns for shareholders.",
        source: "Bloomberg",
        url: "https://bloomberg.com/news/jpm-dividend",
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        relatedTickers: ["JPM-PA"],
        category: "Dividends",
        isActive: true,
      },
    ];

    sampleNews.forEach(article => {
      const id = this.newsIdCounter++;
      this.newsArticles.set(id, { 
        ...article, 
        id,
        content: article.content || null,
        url: article.url || null,
        relatedTickers: article.relatedTickers || null,
        category: article.category || null,
        isActive: article.isActive !== undefined ? article.isActive : true
      });
    });

    // Initialize market data - will be fetched live from APIs
    this.marketData = {
      id: this.marketDataIdCounter++,
      sp500: 4485.22,
      sp500Change: 0.35,
      dow: 34912.80,
      dowChange: 0.15,
      nasdaq: 13975.65,
      nasdaqChange: 0.8,
      treasury10y: 4.35,
      treasury10yChange: 0.05,
      vix: 17.8,
      vixChange: -1.2,
      preferredAvgYield: 6.9,
      preferredAvgYieldChange: 0.15,
      updatedAt: new Date(),
    };

    // Fetch real-time news after initialization
    this.refreshNewsFromAPI();
  }

  // Preferred Stocks methods
  async getPreferredStock(ticker: string): Promise<PreferredStock | undefined> {
    return this.preferredStocks.get(ticker);
  }

  async getAllPreferredStocks(): Promise<PreferredStock[]> {
    return Array.from(this.preferredStocks.values());
  }

  async getFeaturedPreferredStocks(): Promise<PreferredStock[]> {
    const stocks = Array.from(this.preferredStocks.values());

    // Try to update some stocks with live data
    const featuredTickers = ['JPM-PA', 'BAC-PB', 'MS-PA', 'C-PB'];
    for (const ticker of featuredTickers) {
      try {
        const liveData = await stockDataService.fetchLiveStockData(ticker);
        if (liveData) {
          const existingStock = this.preferredStocks.get(ticker);
          if (existingStock) {
            this.preferredStocks.set(ticker, {
              ...existingStock,
              ...liveData,
              updatedAt: new Date()
            });
          }
        }
      } catch (error) {
        console.error(`Error updating ${ticker}:`, error);
      }
    }

    return stocks
      .filter(stock => stock.dividendYield > 6)
      .sort((a, b) => b.dividendYield - a.dividendYield)
      .slice(0, 3);
  }

  async getTopPerformers(): Promise<PreferredStock[]> {
    const stocks = Array.from(this.preferredStocks.values());
    return stocks.sort((a, b) => b.changePercent - a.changePercent).slice(0, 10);
  }

  async searchPreferredStocks(query: string): Promise<PreferredStock[]> {
    const stocks = Array.from(this.preferredStocks.values());
    const lowerQuery = query.toLowerCase();
    return stocks.filter(stock => 
      stock.ticker.toLowerCase().includes(lowerQuery) || 
      stock.name.toLowerCase().includes(lowerQuery)
    );
  }

  async createPreferredStock(stock: InsertPreferredStock): Promise<PreferredStock> {
    const id = this.stockIdCounter++;
    const newStock: PreferredStock = { 
      ...stock, 
      id, 
      updatedAt: new Date(),
      sector: stock.sector || null,
      description: stock.description || null,
      isActive: stock.isActive !== undefined ? stock.isActive : true
    };
    this.preferredStocks.set(stock.ticker, newStock);
    return newStock;
  }

  async updatePreferredStock(ticker: string, stock: Partial<InsertPreferredStock>): Promise<PreferredStock | undefined> {
    const existingStock = this.preferredStocks.get(ticker);
    if (!existingStock) return undefined;

    // Try to get live data for this stock
    try {
      const liveData = await marketDataService.fetchPreferredStockData(ticker);
      if (liveData) {
        const updatedStock = { 
          ...existingStock, 
          ...stock,
          ...liveData,
          updatedAt: new Date()
        };
        this.preferredStocks.set(ticker, updatedStock);
        return updatedStock;
      }
    } catch (error) {
      console.error(`Error fetching live data for ${ticker}:`, error);
    }

    const updatedStock = { ...existingStock, ...stock, updatedAt: new Date() };
    this.preferredStocks.set(ticker, updatedStock);
    return updatedStock;
  }

  // News Articles methods
  async getNewsArticle(id: number): Promise<NewsArticle | undefined> {
    return this.newsArticles.get(id);
  }

  async getAllNewsArticles(): Promise<NewsArticle[]> {
    return Array.from(this.newsArticles.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getLatestNewsArticles(limit = 10): Promise<NewsArticle[]> {
    const articles = await this.getAllNewsArticles();
    return articles.slice(0, limit);
  }

  async getNewsArticlesByTicker(ticker: string): Promise<NewsArticle[]> {
    const articles = Array.from(this.newsArticles.values());
    return articles.filter(article => 
      article.relatedTickers?.includes(ticker)
    ).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle> {
    const id = this.newsIdCounter++;
    const newArticle: NewsArticle = { 
      ...article, 
      id,
      content: article.content || null,
      url: article.url || null,
      imageUrl: article.imageUrl || null,
      relatedTickers: article.relatedTickers || null,
      category: article.category || null,
      isActive: article.isActive !== undefined ? article.isActive : true
    };
    this.newsArticles.set(id, newArticle);
    return newArticle;
  }

  async refreshNewsFromAPI(): Promise<void> {
    try {
      console.log('Refreshing news from Finnhub API...');
      
      // Fetch news for multiple companies related to preferred stocks
      const companies = ['BAC', 'JPM', 'WFC', 'MS', 'C'];
      const realTimeNews = await newsService.fetchMultipleCompanyNews(companies);
      
      if (realTimeNews.length > 0) {
        console.log(`Fetched ${realTimeNews.length} real-time news articles`);
        
        // Clear existing news and add fresh news
        this.newsArticles.clear();
        this.newsIdCounter = 1;
        
        // Add real-time news articles
        realTimeNews.forEach(newsItem => {
          const id = this.newsIdCounter++;
          const newsArticle: NewsArticle = {
            id,
            title: newsItem.title,
            excerpt: newsItem.excerpt,
            content: newsItem.content,
            source: newsItem.source,
            url: newsItem.url,
            imageUrl: newsItem.imageUrl || null,
            publishedAt: newsItem.publishedAt,
            relatedTickers: newsItem.relatedTickers,
            category: newsItem.category,
            isActive: newsItem.isActive
          };
          this.newsArticles.set(id, newsArticle);
        });
      } else {
        console.log('No real-time news fetched, keeping existing articles');
      }
    } catch (error) {
      console.error('Error refreshing news from API:', error);
    }
  }

  // Market Data methods
  async getLatestMarketData(): Promise<MarketData | undefined> {
    try {
      // Fetch live market data
      const liveData = await marketDataService.fetchMarketData();
      this.marketData = liveData;
      return liveData;
    } catch (error) {
      console.error('Error fetching live market data:', error);
      return this.marketData;
    }
  }

  async createMarketData(data: InsertMarketData): Promise<MarketData> {
    const id = this.marketDataIdCounter++;
    this.marketData = { ...data, id, updatedAt: new Date() };
    return this.marketData;
  }
}

export const storage = new MemStorage();