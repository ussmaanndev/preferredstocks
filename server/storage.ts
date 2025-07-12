import { preferredStocks, newsArticles, marketData, type PreferredStock, type InsertPreferredStock, type NewsArticle, type InsertNewsArticle, type MarketData, type InsertMarketData } from "@shared/schema";

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

  private initializeData() {
    // Initialize with sample preferred stocks data
    const sampleStocks: InsertPreferredStock[] = [
      {
        ticker: "JPM-PA",
        name: "JPMorgan Chase & Co. Series A",
        price: 24.85,
        change: 0.45,
        changePercent: 1.8,
        dividendYield: 6.2,
        marketCap: "$1.2B",
        volume: 42500,
        lastTrade: new Date(),
        sector: "Financial Services",
        description: "JPMorgan Chase preferred stock series A with attractive dividend yield",
        isActive: true,
      },
      {
        ticker: "BAC-PB",
        name: "Bank of America Series B",
        price: 23.12,
        change: -0.15,
        changePercent: -0.6,
        dividendYield: 5.8,
        marketCap: "$925M",
        volume: 31200,
        lastTrade: new Date(),
        sector: "Financial Services",
        description: "Bank of America preferred stock series B",
        isActive: true,
      },
      {
        ticker: "WFC-PC",
        name: "Wells Fargo Series C",
        price: 25.67,
        change: 0.32,
        changePercent: 1.3,
        dividendYield: 6.5,
        marketCap: "$1.1B",
        volume: 28900,
        lastTrade: new Date(),
        sector: "Financial Services",
        description: "Wells Fargo preferred stock series C",
        isActive: true,
      },
      {
        ticker: "MS-PA",
        name: "Morgan Stanley Series A",
        price: 26.43,
        change: 0.78,
        changePercent: 3.0,
        dividendYield: 5.9,
        marketCap: "$1.3B",
        volume: 45200,
        lastTrade: new Date(),
        sector: "Financial Services",
        description: "Morgan Stanley preferred stock series A",
        isActive: true,
      },
      {
        ticker: "C-PB",
        name: "Citigroup Series B",
        price: 24.89,
        change: 0.65,
        changePercent: 2.7,
        dividendYield: 6.1,
        marketCap: "$980M",
        volume: 32100,
        lastTrade: new Date(),
        sector: "Financial Services",
        description: "Citigroup preferred stock series B",
        isActive: true,
      },
      {
        ticker: "GS-PA",
        name: "Goldman Sachs Series A",
        price: 25.34,
        change: 0.52,
        changePercent: 2.1,
        dividendYield: 5.7,
        marketCap: "$1.1B",
        volume: 28900,
        lastTrade: new Date(),
        sector: "Financial Services",
        description: "Goldman Sachs preferred stock series A",
        isActive: true,
      },
    ];

    // Add more stocks to reach 1000+ tickers
    for (let i = 0; i < 1000; i++) {
      const companies = ["Apple", "Microsoft", "Amazon", "Google", "Tesla", "Netflix", "Meta", "Berkshire", "Johnson", "Visa"];
      const series = ["A", "B", "C", "D", "E"];
      const company = companies[i % companies.length];
      const seriesLetter = series[i % series.length];
      const ticker = `${company.substring(0, 3).toUpperCase()}-P${seriesLetter}`;
      
      if (!sampleStocks.find(s => s.ticker === ticker)) {
        sampleStocks.push({
          ticker,
          name: `${company} Preferred Series ${seriesLetter}`,
          price: 20 + Math.random() * 10,
          change: -2 + Math.random() * 4,
          changePercent: -5 + Math.random() * 10,
          dividendYield: 4 + Math.random() * 4,
          marketCap: `$${Math.floor(500 + Math.random() * 1500)}M`,
          volume: Math.floor(10000 + Math.random() * 50000),
          lastTrade: new Date(),
          sector: i % 3 === 0 ? "Financial Services" : i % 3 === 1 ? "Technology" : "Consumer",
          description: `${company} preferred stock series ${seriesLetter}`,
          isActive: true,
        });
      }
    }

    sampleStocks.forEach(stock => {
      const id = this.stockIdCounter++;
      this.preferredStocks.set(stock.ticker, { ...stock, id });
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
        content: "Bank of America announces the issuance of a new preferred stock series with attractive dividend yields for income-focused investors.",
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
        content: "Analysis shows how recent interest rate changes are affecting preferred stock prices and dividend yields across major financial institutions.",
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
      this.newsArticles.set(id, { ...article, id });
    });

    // Initialize market data
    this.marketData = {
      id: this.marketDataIdCounter++,
      sp500: 4432.35,
      sp500Change: 0.8,
      dow: 34721.12,
      dowChange: 0.5,
      nasdaq: 15932.44,
      nasdaqChange: -0.2,
      treasury10y: 4.23,
      treasury10yChange: 0.05,
      vix: 18.45,
      vixChange: -2.1,
      preferredAvgYield: 6.8,
      preferredAvgYieldChange: 0.1,
      updatedAt: new Date(),
    };
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
    return stocks.slice(0, 3);
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
    const newStock: PreferredStock = { ...stock, id };
    this.preferredStocks.set(stock.ticker, newStock);
    return newStock;
  }

  async updatePreferredStock(ticker: string, stock: Partial<InsertPreferredStock>): Promise<PreferredStock | undefined> {
    const existingStock = this.preferredStocks.get(ticker);
    if (!existingStock) return undefined;
    
    const updatedStock = { ...existingStock, ...stock };
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
    const newArticle: NewsArticle = { ...article, id };
    this.newsArticles.set(id, newArticle);
    return newArticle;
  }

  // Market Data methods
  async getLatestMarketData(): Promise<MarketData | undefined> {
    return this.marketData;
  }

  async createMarketData(data: InsertMarketData): Promise<MarketData> {
    const id = this.marketDataIdCounter++;
    this.marketData = { ...data, id };
    return this.marketData;
  }
}

export const storage = new MemStorage();
