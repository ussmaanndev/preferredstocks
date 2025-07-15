import { pgTable, text, serial, real, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const preferredStocks = pgTable("preferred_stocks", {
  id: serial("id").primaryKey(),
  ticker: text("ticker").notNull().unique(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  change: real("change").notNull(),
  changePercent: real("change_percent").notNull(),
  dividendYield: real("dividend_yield").notNull(),
  marketCap: text("market_cap").notNull(),
  volume: integer("volume").notNull(),
  lastTrade: timestamp("last_trade").notNull(),
  sector: text("sector"),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const newsArticles = pgTable("news_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content"),
  source: text("source").notNull(),
  url: text("url"),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").notNull(),
  relatedTickers: text("related_tickers").array(),
  category: text("category"),
  isActive: boolean("is_active").default(true),
});

export const marketData = pgTable("market_data", {
  id: serial("id").primaryKey(),
  sp500: real("sp500").notNull(),
  sp500Change: real("sp500_change").notNull(),
  dow: real("dow").notNull(),
  dowChange: real("dow_change").notNull(),
  nasdaq: real("nasdaq").notNull(),
  nasdaqChange: real("nasdaq_change").notNull(),
  treasury10y: real("treasury_10y").notNull(),
  treasury10yChange: real("treasury_10y_change").notNull(),
  vix: real("vix").notNull(),
  vixChange: real("vix_change").notNull(),
  preferredAvgYield: real("preferred_avg_yield").notNull(),
  preferredAvgYieldChange: real("preferred_avg_yield_change").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPreferredStockSchema = createInsertSchema(preferredStocks).omit({
  id: true,
  updatedAt: true,
});

export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({
  id: true,
});

export const insertMarketDataSchema = createInsertSchema(marketData).omit({
  id: true,
  updatedAt: true,
});

export type PreferredStock = typeof preferredStocks.$inferSelect;
export type InsertPreferredStock = z.infer<typeof insertPreferredStockSchema>;
export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;
export type MarketData = typeof marketData.$inferSelect;
export type InsertMarketData = z.infer<typeof insertMarketDataSchema>;
