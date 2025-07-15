import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPreferredStockSchema, insertNewsArticleSchema, insertMarketDataSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Preferred Stocks routes
  app.get("/api/stocks", async (req, res) => {
    try {
      const { search } = req.query;
      let stocks;
      
      if (search && typeof search === 'string') {
        stocks = await storage.searchPreferredStocks(search);
      } else {
        stocks = await storage.getAllPreferredStocks();
      }
      
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stocks" });
    }
  });

  app.get("/api/stocks/featured", async (req, res) => {
    try {
      const stocks = await storage.getFeaturedPreferredStocks();
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured stocks" });
    }
  });

  app.get("/api/stocks/top-performers", async (req, res) => {
    try {
      const stocks = await storage.getTopPerformers();
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch top performers" });
    }
  });

  app.get("/api/stocks/:ticker", async (req, res) => {
    try {
      const { ticker } = req.params;
      const stock = await storage.getPreferredStock(ticker);
      
      if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
      }
      
      res.json(stock);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stock" });
    }
  });

  // Real-time stock search for any ticker
  app.get("/api/stocks/search/:ticker", async (req, res) => {
    try {
      const { ticker } = req.params;
      const upperTicker = ticker.toUpperCase();
      
      // First check if it's a preferred stock in our database
      const preferredStock = await storage.getPreferredStock(upperTicker);
      if (preferredStock) {
        return res.json({
          type: 'preferred',
          data: preferredStock
        });
      }
      
      // If not found in preferred stocks, fetch real-time data from external APIs
      const { marketDataService } = await import('./services/market-data');
      const stockData = await marketDataService.fetchPreferredStockData(upperTicker);
      
      if (stockData) {
        // Create a stock-like object with the fetched data
        const realTimeStock = {
          ticker: upperTicker,
          name: `${upperTicker} Stock`,
          price: stockData.price,
          change: stockData.change,
          changePercent: stockData.changePercent,
          lastTrade: stockData.lastTrade,
          volume: 0, // Not available from API
          dividendYield: 0, // Not available from API
          marketCap: 'N/A',
          sector: 'Unknown',
          description: `Real-time data for ${upperTicker}`,
          isActive: true,
          type: 'regular'
        };
        
        return res.json({
          type: 'regular',
          data: realTimeStock
        });
      }
      
      return res.status(404).json({ message: "Stock not found" });
    } catch (error) {
      console.error(`Error searching for stock ${req.params.ticker}:`, error);
      res.status(500).json({ message: "Failed to search for stock" });
    }
  });

  app.post("/api/stocks", async (req, res) => {
    try {
      const stockData = insertPreferredStockSchema.parse(req.body);
      const stock = await storage.createPreferredStock(stockData);
      res.status(201).json(stock);
    } catch (error) {
      res.status(400).json({ message: "Invalid stock data" });
    }
  });

  // News Articles routes
  app.get("/api/news", async (req, res) => {
    try {
      const { limit } = req.query;
      const limitNum = limit ? parseInt(limit as string) : 10;
      const articles = await storage.getLatestNewsArticles(limitNum);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const article = await storage.getNewsArticle(parseInt(id));
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.get("/api/news/ticker/:ticker", async (req, res) => {
    try {
      const { ticker } = req.params;
      const articles = await storage.getNewsArticlesByTicker(ticker);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news for ticker" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      const articleData = insertNewsArticleSchema.parse(req.body);
      const article = await storage.createNewsArticle(articleData);
      res.status(201).json(article);
    } catch (error) {
      res.status(400).json({ message: "Invalid article data" });
    }
  });

  app.post("/api/news/refresh", async (req, res) => {
    try {
      await storage.refreshNewsFromAPI();
      res.json({ message: "News refreshed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to refresh news" });
    }
  });

  // Market Data routes
  app.get("/api/market-data", async (req, res) => {
    try {
      const marketData = await storage.getLatestMarketData();
      
      if (!marketData) {
        return res.status(404).json({ message: "Market data not found" });
      }
      
      res.json(marketData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market data" });
    }
  });

  app.post("/api/market-data", async (req, res) => {
    try {
      const marketData = insertMarketDataSchema.parse(req.body);
      const data = await storage.createMarketData(marketData);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ message: "Invalid market data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
