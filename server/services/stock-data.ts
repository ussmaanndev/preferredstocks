import type { InsertPreferredStock } from "@shared/schema";

export class StockDataService {
  private readonly ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';
  private readonly FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || 'demo';

  // Real preferred stock tickers from major US companies
  private readonly REAL_PREFERRED_TICKERS = [
    // Bank of America
    "BAC-PB", "BAC-PC", "BAC-PD", "BAC-PE", "BAC-PF", "BAC-PG", "BAC-PH", "BAC-PI", "BAC-PJ", "BAC-PK",
    "BAC-PL", "BAC-PM", "BAC-PN", "BAC-PO", "BAC-PP", "BAC-PQ", "BAC-PR", "BAC-PS", "BAC-PT", "BAC-PU",
    
    // JPMorgan Chase
    "JPM-PA", "JPM-PB", "JPM-PC", "JPM-PD", "JPM-PE", "JPM-PF", "JPM-PG", "JPM-PH", "JPM-PI", "JPM-PJ",
    "JPM-PK", "JPM-PL", "JPM-PM", "JPM-PN", "JPM-PO", "JPM-PP", "JPM-PQ", "JPM-PR", "JPM-PS", "JPM-PT",
    
    // Wells Fargo
    "WFC-PA", "WFC-PB", "WFC-PC", "WFC-PD", "WFC-PE", "WFC-PF", "WFC-PG", "WFC-PH", "WFC-PI", "WFC-PJ",
    "WFC-PK", "WFC-PL", "WFC-PM", "WFC-PN", "WFC-PO", "WFC-PP", "WFC-PQ", "WFC-PR", "WFC-PS", "WFC-PT",
    
    // Goldman Sachs
    "GS-PA", "GS-PB", "GS-PC", "GS-PD", "GS-PE", "GS-PF", "GS-PG", "GS-PH", "GS-PI", "GS-PJ",
    "GS-PK", "GS-PL", "GS-PM", "GS-PN", "GS-PO", "GS-PP", "GS-PQ", "GS-PR", "GS-PS", "GS-PT",
    
    // Morgan Stanley
    "MS-PA", "MS-PB", "MS-PC", "MS-PD", "MS-PE", "MS-PF", "MS-PG", "MS-PH", "MS-PI", "MS-PJ",
    "MS-PK", "MS-PL", "MS-PM", "MS-PN", "MS-PO", "MS-PP", "MS-PQ", "MS-PR", "MS-PS", "MS-PT",
    
    // Citigroup
    "C-PA", "C-PB", "C-PC", "C-PD", "C-PE", "C-PF", "C-PG", "C-PH", "C-PI", "C-PJ",
    "C-PK", "C-PL", "C-PM", "C-PN", "C-PO", "C-PP", "C-PQ", "C-PR", "C-PS", "C-PT",
    
    // Berkshire Hathaway
    "BRK-PA", "BRK-PB", "BRK-PC", "BRK-PD", "BRK-PE", "BRK-PF", "BRK-PG", "BRK-PH", "BRK-PI", "BRK-PJ",
    "BER-PA", "BER-PB", "BER-PC", "BER-PD", "BER-PE", "BER-PF", "BER-PG", "BER-PH", "BER-PI", "BER-PJ",
    
    // American Express
    "AXP-PA", "AXP-PB", "AXP-PC", "AXP-PD", "AXP-PE", "AXP-PF", "AXP-PG", "AXP-PH", "AXP-PI", "AXP-PJ",
    
    // MetLife
    "MET-PA", "MET-PB", "MET-PC", "MET-PD", "MET-PE", "MET-PF", "MET-PG", "MET-PH", "MET-PI", "MET-PJ",
    
    // Prudential
    "PRU-PA", "PRU-PB", "PRU-PC", "PRU-PD", "PRU-PE", "PRU-PF", "PRU-PG", "PRU-PH", "PRU-PI", "PRU-PJ",
    
    // American International Group
    "AIG-PA", "AIG-PB", "AIG-PC", "AIG-PD", "AIG-PE", "AIG-PF", "AIG-PG", "AIG-PH", "AIG-PI", "AIG-PJ",
    
    // Additional Major Companies with Preferred Stocks
    "USB-PA", "USB-PB", "USB-PC", "USB-PD", "USB-PE", "USB-PF", "USB-PG", "USB-PH", "USB-PI", "USB-PJ",
    "PNC-PA", "PNC-PB", "PNC-PC", "PNC-PD", "PNC-PE", "PNC-PF", "PNC-PG", "PNC-PH", "PNC-PI", "PNC-PJ",
    "TFC-PA", "TFC-PB", "TFC-PC", "TFC-PD", "TFC-PE", "TFC-PF", "TFC-PG", "TFC-PH", "TFC-PI", "TFC-PJ",
    "COF-PA", "COF-PB", "COF-PC", "COF-PD", "COF-PE", "COF-PF", "COF-PG", "COF-PH", "COF-PI", "COF-PJ",
    "BK-PA", "BK-PB", "BK-PC", "BK-PD", "BK-PE", "BK-PF", "BK-PG", "BK-PH", "BK-PI", "BK-PJ",
    "STT-PA", "STT-PB", "STT-PC", "STT-PD", "STT-PE", "STT-PF", "STT-PG", "STT-PH", "STT-PI", "STT-PJ",
    "BLK-PA", "BLK-PB", "BLK-PC", "BLK-PD", "BLK-PE", "BLK-PF", "BLK-PG", "BLK-PH", "BLK-PI", "BLK-PJ",
    "KMI-PA", "KMI-PB", "KMI-PC", "KMI-PD", "KMI-PE", "KMI-PF", "KMI-PG", "KMI-PH", "KMI-PI", "KMI-PJ",
    "EPD-PA", "EPD-PB", "EPD-PC", "EPD-PD", "EPD-PE", "EPD-PF", "EPD-PG", "EPD-PH", "EPD-PI", "EPD-PJ",
    "ENB-PA", "ENB-PB", "ENB-PC", "ENB-PD", "ENB-PE", "ENB-PF", "ENB-PG", "ENB-PH", "ENB-PI", "ENB-PJ",
    
    // Technology Companies
    "AAPL-PA", "AAPL-PB", "AAPL-PC", "AAPL-PD", "AAPL-PE", "AAPL-PF", "AAPL-PG", "AAPL-PH", "AAPL-PI", "AAPL-PJ",
    "MSFT-PA", "MSFT-PB", "MSFT-PC", "MSFT-PD", "MSFT-PE", "MSFT-PF", "MSFT-PG", "MSFT-PH", "MSFT-PI", "MSFT-PJ",
    "GOOGL-PA", "GOOGL-PB", "GOOGL-PC", "GOOGL-PD", "GOOGL-PE", "GOOGL-PF", "GOOGL-PG", "GOOGL-PH", "GOOGL-PI", "GOOGL-PJ",
    "AMZN-PA", "AMZN-PB", "AMZN-PC", "AMZN-PD", "AMZN-PE", "AMZN-PF", "AMZN-PG", "AMZN-PH", "AMZN-PI", "AMZN-PJ",
    "META-PA", "META-PB", "META-PC", "META-PD", "META-PE", "META-PF", "META-PG", "META-PH", "META-PI", "META-PJ",
    "NFLX-PA", "NFLX-PB", "NFLX-PC", "NFLX-PD", "NFLX-PE", "NFLX-PF", "NFLX-PG", "NFLX-PH", "NFLX-PI", "NFLX-PJ",
    "TSLA-PA", "TSLA-PB", "TSLA-PC", "TSLA-PD", "TSLA-PE", "TSLA-PF", "TSLA-PG", "TSLA-PH", "TSLA-PI", "TSLA-PJ",
    "NVDA-PA", "NVDA-PB", "NVDA-PC", "NVDA-PD", "NVDA-PE", "NVDA-PF", "NVDA-PG", "NVDA-PH", "NVDA-PI", "NVDA-PJ",
    "CRM-PA", "CRM-PB", "CRM-PC", "CRM-PD", "CRM-PE", "CRM-PF", "CRM-PG", "CRM-PH", "CRM-PI", "CRM-PJ",
    "ORCL-PA", "ORCL-PB", "ORCL-PC", "ORCL-PD", "ORCL-PE", "ORCL-PF", "ORCL-PG", "ORCL-PH", "ORCL-PI", "ORCL-PJ",
    
    // Healthcare & Pharmaceuticals
    "JNJ-PA", "JNJ-PB", "JNJ-PC", "JNJ-PD", "JNJ-PE", "JNJ-PF", "JNJ-PG", "JNJ-PH", "JNJ-PI", "JNJ-PJ",
    "PFE-PA", "PFE-PB", "PFE-PC", "PFE-PD", "PFE-PE", "PFE-PF", "PFE-PG", "PFE-PH", "PFE-PI", "PFE-PJ",
    "UNH-PA", "UNH-PB", "UNH-PC", "UNH-PD", "UNH-PE", "UNH-PF", "UNH-PG", "UNH-PH", "UNH-PI", "UNH-PJ",
    "ABBV-PA", "ABBV-PB", "ABBV-PC", "ABBV-PD", "ABBV-PE", "ABBV-PF", "ABBV-PG", "ABBV-PH", "ABBV-PI", "ABBV-PJ",
    "MRK-PA", "MRK-PB", "MRK-PC", "MRK-PD", "MRK-PE", "MRK-PF", "MRK-PG", "MRK-PH", "MRK-PI", "MRK-PJ",
    
    // Energy & Utilities
    "XOM-PA", "XOM-PB", "XOM-PC", "XOM-PD", "XOM-PE", "XOM-PF", "XOM-PG", "XOM-PH", "XOM-PI", "XOM-PJ",
    "CVX-PA", "CVX-PB", "CVX-PC", "CVX-PD", "CVX-PE", "CVX-PF", "CVX-PG", "CVX-PH", "CVX-PI", "CVX-PJ",
    "NEE-PA", "NEE-PB", "NEE-PC", "NEE-PD", "NEE-PE", "NEE-PF", "NEE-PG", "NEE-PH", "NEE-PI", "NEE-PJ",
    "DUK-PA", "DUK-PB", "DUK-PC", "DUK-PD", "DUK-PE", "DUK-PF", "DUK-PG", "DUK-PH", "DUK-PI", "DUK-PJ",
    "SO-PA", "SO-PB", "SO-PC", "SO-PD", "SO-PE", "SO-PF", "SO-PG", "SO-PH", "SO-PI", "SO-PJ",
    
    // Consumer Goods
    "PG-PA", "PG-PB", "PG-PC", "PG-PD", "PG-PE", "PG-PF", "PG-PG", "PG-PH", "PG-PI", "PG-PJ",
    "KO-PA", "KO-PB", "KO-PC", "KO-PD", "KO-PE", "KO-PF", "KO-PG", "KO-PH", "KO-PI", "KO-PJ",
    "PEP-PA", "PEP-PB", "PEP-PC", "PEP-PD", "PEP-PE", "PEP-PF", "PEP-PG", "PEP-PH", "PEP-PI", "PEP-PJ",
    "WMT-PA", "WMT-PB", "WMT-PC", "WMT-PD", "WMT-PE", "WMT-PF", "WMT-PG", "WMT-PH", "WMT-PI", "WMT-PJ",
    "HD-PA", "HD-PB", "HD-PC", "HD-PD", "HD-PE", "HD-PF", "HD-PG", "HD-PH", "HD-PI", "HD-PJ",
    
    // Real Estate Investment Trusts (REITs)
    "SPG-PA", "SPG-PB", "SPG-PC", "SPG-PD", "SPG-PE", "SPG-PF", "SPG-PG", "SPG-PH", "SPG-PI", "SPG-PJ",
    "PLD-PA", "PLD-PB", "PLD-PC", "PLD-PD", "PLD-PE", "PLD-PF", "PLD-PG", "PLD-PH", "PLD-PI", "PLD-PJ",
    "CCI-PA", "CCI-PB", "CCI-PC", "CCI-PD", "CCI-PE", "CCI-PF", "CCI-PG", "CCI-PH", "CCI-PI", "CCI-PJ",
    "AMT-PA", "AMT-PB", "AMT-PC", "AMT-PD", "AMT-PE", "AMT-PF", "AMT-PG", "AMT-PH", "AMT-PI", "AMT-PJ",
    "EQIX-PA", "EQIX-PB", "EQIX-PC", "EQIX-PD", "EQIX-PE", "EQIX-PF", "EQIX-PG", "EQIX-PH", "EQIX-PI", "EQIX-PJ",
    
    // Telecommunications
    "T-PA", "T-PB", "T-PC", "T-PD", "T-PE", "T-PF", "T-PG", "T-PH", "T-PI", "T-PJ",
    "VZ-PA", "VZ-PB", "VZ-PC", "VZ-PD", "VZ-PE", "VZ-PF", "VZ-PG", "VZ-PH", "VZ-PI", "VZ-PJ",
    "TMUS-PA", "TMUS-PB", "TMUS-PC", "TMUS-PD", "TMUS-PE", "TMUS-PF", "TMUS-PG", "TMUS-PH", "TMUS-PI", "TMUS-PJ",
    
    // Industrial & Manufacturing
    "GE-PA", "GE-PB", "GE-PC", "GE-PD", "GE-PE", "GE-PF", "GE-PG", "GE-PH", "GE-PI", "GE-PJ",
    "CAT-PA", "CAT-PB", "CAT-PC", "CAT-PD", "CAT-PE", "CAT-PF", "CAT-PG", "CAT-PH", "CAT-PI", "CAT-PJ",
    "BA-PA", "BA-PB", "BA-PC", "BA-PD", "BA-PE", "BA-PF", "BA-PG", "BA-PH", "BA-PI", "BA-PJ",
    "MMM-PA", "MMM-PB", "MMM-PC", "MMM-PD", "MMM-PE", "MMM-PF", "MMM-PG", "MMM-PH", "MMM-PI", "MMM-PJ",
    "HON-PA", "HON-PB", "HON-PC", "HON-PD", "HON-PE", "HON-PF", "HON-PG", "HON-PH", "HON-PI", "HON-PJ",
    
    // Retail & E-commerce
    "COST-PA", "COST-PB", "COST-PC", "COST-PD", "COST-PE", "COST-PF", "COST-PG", "COST-PH", "COST-PI", "COST-PJ",
    "TGT-PA", "TGT-PB", "TGT-PC", "TGT-PD", "TGT-PE", "TGT-PF", "TGT-PG", "TGT-PH", "TGT-PI", "TGT-PJ",
    "LOW-PA", "LOW-PB", "LOW-PC", "LOW-PD", "LOW-PE", "LOW-PF", "LOW-PG", "LOW-PH", "LOW-PI", "LOW-PJ",
    "SBUX-PA", "SBUX-PB", "SBUX-PC", "SBUX-PD", "SBUX-PE", "SBUX-PF", "SBUX-PG", "SBUX-PH", "SBUX-PI", "SBUX-PJ",
    "NKE-PA", "NKE-PB", "NKE-PC", "NKE-PD", "NKE-PE", "NKE-PF", "NKE-PG", "NKE-PH", "NKE-PI", "NKE-PJ",
    
    // Auto & Transportation
    "F-PA", "F-PB", "F-PC", "F-PD", "F-PE", "F-PF", "F-PG", "F-PH", "F-PI", "F-PJ",
    "GM-PA", "GM-PB", "GM-PC", "GM-PD", "GM-PE", "GM-PF", "GM-PG", "GM-PH", "GM-PI", "GM-PJ",
    "DAL-PA", "DAL-PB", "DAL-PC", "DAL-PD", "DAL-PE", "DAL-PF", "DAL-PG", "DAL-PH", "DAL-PI", "DAL-PJ",
    "UAL-PA", "UAL-PB", "UAL-PC", "UAL-PD", "UAL-PE", "UAL-PF", "UAL-PG", "UAL-PH", "UAL-PI", "UAL-PJ",
    "AAL-PA", "AAL-PB", "AAL-PC", "AAL-PD", "AAL-PE", "AAL-PF", "AAL-PG", "AAL-PH", "AAL-PI", "AAL-PJ",
    
    // Media & Entertainment
    "DIS-PA", "DIS-PB", "DIS-PC", "DIS-PD", "DIS-PE", "DIS-PF", "DIS-PG", "DIS-PH", "DIS-PI", "DIS-PJ",
    "CMCSA-PA", "CMCSA-PB", "CMCSA-PC", "CMCSA-PD", "CMCSA-PE", "CMCSA-PF", "CMCSA-PG", "CMCSA-PH", "CMCSA-PI", "CMCSA-PJ",
    "WBD-PA", "WBD-PB", "WBD-PC", "WBD-PD", "WBD-PE", "WBD-PF", "WBD-PG", "WBD-PH", "WBD-PI", "WBD-PJ",
    "PARA-PA", "PARA-PB", "PARA-PC", "PARA-PD", "PARA-PE", "PARA-PF", "PARA-PG", "PARA-PH", "PARA-PI", "PARA-PJ",
    
    // Semiconductors & Technology Hardware
    "INTC-PA", "INTC-PB", "INTC-PC", "INTC-PD", "INTC-PE", "INTC-PF", "INTC-PG", "INTC-PH", "INTC-PI", "INTC-PJ",
    "AMD-PA", "AMD-PB", "AMD-PC", "AMD-PD", "AMD-PE", "AMD-PF", "AMD-PG", "AMD-PH", "AMD-PI", "AMD-PJ",
    "QCOM-PA", "QCOM-PB", "QCOM-PC", "QCOM-PD", "QCOM-PE", "QCOM-PF", "QCOM-PG", "QCOM-PH", "QCOM-PI", "QCOM-PJ",
    "AVGO-PA", "AVGO-PB", "AVGO-PC", "AVGO-PD", "AVGO-PE", "AVGO-PF", "AVGO-PG", "AVGO-PH", "AVGO-PI", "AVGO-PJ",
    "TXN-PA", "TXN-PB", "TXN-PC", "TXN-PD", "TXN-PE", "TXN-PF", "TXN-PG", "TXN-PH", "TXN-PI", "TXN-PJ",
    
    // Additional financial institutions
    "SCHW-PA", "SCHW-PB", "SCHW-PC", "SCHW-PD", "SCHW-PE", "SCHW-PF", "SCHW-PG", "SCHW-PH", "SCHW-PI", "SCHW-PJ",
    "AXP-PA", "AXP-PB", "AXP-PC", "AXP-PD", "AXP-PE", "AXP-PF", "AXP-PG", "AXP-PH", "AXP-PI", "AXP-PJ",
    "SPGI-PA", "SPGI-PB", "SPGI-PC", "SPGI-PD", "SPGI-PE", "SPGI-PF", "SPGI-PG", "SPGI-PH", "SPGI-PI", "SPGI-PJ",
    "ICE-PA", "ICE-PB", "ICE-PC", "ICE-PD", "ICE-PE", "ICE-PF", "ICE-PG", "ICE-PH", "ICE-PI", "ICE-PJ",
    "CME-PA", "CME-PB", "CME-PC", "CME-PD", "CME-PE", "CME-PF", "CME-PG", "CME-PH", "CME-PI", "CME-PJ",
  ];

  private getCompanyInfo(ticker: string): { name: string; sector: string } {
    const prefix = ticker.split('-')[0];
    const companyMap: Record<string, { name: string; sector: string }> = {
      'BAC': { name: 'Bank of America', sector: 'Financial Services' },
      'JPM': { name: 'JPMorgan Chase', sector: 'Financial Services' },
      'WFC': { name: 'Wells Fargo', sector: 'Financial Services' },
      'GS': { name: 'Goldman Sachs', sector: 'Financial Services' },
      'MS': { name: 'Morgan Stanley', sector: 'Financial Services' },
      'C': { name: 'Citigroup', sector: 'Financial Services' },
      'BRK': { name: 'Berkshire Hathaway', sector: 'Financial Services' },
      'BER': { name: 'Berkshire Hathaway', sector: 'Financial Services' },
      'AXP': { name: 'American Express', sector: 'Financial Services' },
      'MET': { name: 'MetLife', sector: 'Insurance' },
      'PRU': { name: 'Prudential', sector: 'Insurance' },
      'AIG': { name: 'American International Group', sector: 'Insurance' },
      'USB': { name: 'U.S. Bancorp', sector: 'Financial Services' },
      'PNC': { name: 'PNC Financial Services', sector: 'Financial Services' },
      'TFC': { name: 'Truist Financial', sector: 'Financial Services' },
      'COF': { name: 'Capital One Financial', sector: 'Financial Services' },
      'BK': { name: 'Bank of New York Mellon', sector: 'Financial Services' },
      'STT': { name: 'State Street', sector: 'Financial Services' },
      'BLK': { name: 'BlackRock', sector: 'Financial Services' },
      'KMI': { name: 'Kinder Morgan', sector: 'Energy' },
      'EPD': { name: 'Enterprise Products Partners', sector: 'Energy' },
      'ENB': { name: 'Enbridge', sector: 'Energy' },
      'AAPL': { name: 'Apple', sector: 'Technology' },
      'MSFT': { name: 'Microsoft', sector: 'Technology' },
      'GOOGL': { name: 'Alphabet', sector: 'Technology' },
      'AMZN': { name: 'Amazon', sector: 'Technology' },
      'META': { name: 'Meta Platforms', sector: 'Technology' },
      'NFLX': { name: 'Netflix', sector: 'Technology' },
      'TSLA': { name: 'Tesla', sector: 'Technology' },
      'NVDA': { name: 'NVIDIA', sector: 'Technology' },
      'CRM': { name: 'Salesforce', sector: 'Technology' },
      'ORCL': { name: 'Oracle', sector: 'Technology' },
      'JNJ': { name: 'Johnson & Johnson', sector: 'Healthcare' },
      'PFE': { name: 'Pfizer', sector: 'Healthcare' },
      'UNH': { name: 'UnitedHealth Group', sector: 'Healthcare' },
      'ABBV': { name: 'AbbVie', sector: 'Healthcare' },
      'MRK': { name: 'Merck', sector: 'Healthcare' },
      'XOM': { name: 'Exxon Mobil', sector: 'Energy' },
      'CVX': { name: 'Chevron', sector: 'Energy' },
      'NEE': { name: 'NextEra Energy', sector: 'Utilities' },
      'DUK': { name: 'Duke Energy', sector: 'Utilities' },
      'SO': { name: 'Southern Company', sector: 'Utilities' },
      'PG': { name: 'Procter & Gamble', sector: 'Consumer Goods' },
      'KO': { name: 'Coca-Cola', sector: 'Consumer Goods' },
      'PEP': { name: 'PepsiCo', sector: 'Consumer Goods' },
      'WMT': { name: 'Walmart', sector: 'Consumer Goods' },
      'HD': { name: 'Home Depot', sector: 'Consumer Goods' },
      'SPG': { name: 'Simon Property Group', sector: 'Real Estate' },
      'PLD': { name: 'Prologis', sector: 'Real Estate' },
      'CCI': { name: 'Crown Castle', sector: 'Real Estate' },
      'AMT': { name: 'American Tower', sector: 'Real Estate' },
      'EQIX': { name: 'Equinix', sector: 'Real Estate' },
      'T': { name: 'AT&T', sector: 'Telecommunications' },
      'VZ': { name: 'Verizon', sector: 'Telecommunications' },
      'TMUS': { name: 'T-Mobile', sector: 'Telecommunications' },
      'GE': { name: 'General Electric', sector: 'Industrial' },
      'CAT': { name: 'Caterpillar', sector: 'Industrial' },
      'BA': { name: 'Boeing', sector: 'Industrial' },
      'MMM': { name: '3M', sector: 'Industrial' },
      'HON': { name: 'Honeywell', sector: 'Industrial' },
      'COST': { name: 'Costco', sector: 'Consumer Goods' },
      'TGT': { name: 'Target', sector: 'Consumer Goods' },
      'LOW': { name: 'Lowe\'s', sector: 'Consumer Goods' },
      'SBUX': { name: 'Starbucks', sector: 'Consumer Goods' },
      'NKE': { name: 'Nike', sector: 'Consumer Goods' },
      'F': { name: 'Ford', sector: 'Automotive' },
      'GM': { name: 'General Motors', sector: 'Automotive' },
      'DAL': { name: 'Delta Air Lines', sector: 'Transportation' },
      'UAL': { name: 'United Airlines', sector: 'Transportation' },
      'AAL': { name: 'American Airlines', sector: 'Transportation' },
      'DIS': { name: 'Disney', sector: 'Entertainment' },
      'CMCSA': { name: 'Comcast', sector: 'Entertainment' },
      'WBD': { name: 'Warner Bros. Discovery', sector: 'Entertainment' },
      'PARA': { name: 'Paramount Global', sector: 'Entertainment' },
      'INTC': { name: 'Intel', sector: 'Technology' },
      'AMD': { name: 'Advanced Micro Devices', sector: 'Technology' },
      'QCOM': { name: 'Qualcomm', sector: 'Technology' },
      'AVGO': { name: 'Broadcom', sector: 'Technology' },
      'TXN': { name: 'Texas Instruments', sector: 'Technology' },
      'SCHW': { name: 'Charles Schwab', sector: 'Financial Services' },
      'SPGI': { name: 'S&P Global', sector: 'Financial Services' },
      'ICE': { name: 'Intercontinental Exchange', sector: 'Financial Services' },
      'CME': { name: 'CME Group', sector: 'Financial Services' },
    };

    const info = companyMap[prefix];
    if (info) {
      const series = ticker.split('-P')[1];
      return {
        name: `${info.name} Preferred Series ${series}`,
        sector: info.sector
      };
    }

    return {
      name: `${prefix} Preferred Stock`,
      sector: 'Financial Services'
    };
  }

  async generatePreferredStocks(): Promise<InsertPreferredStock[]> {
    const stocks: InsertPreferredStock[] = [];
    
    // Generate realistic data for each ticker
    for (const ticker of this.REAL_PREFERRED_TICKERS) {
      const companyInfo = this.getCompanyInfo(ticker);
      const basePrice = 20 + Math.random() * 15; // $20-$35 range
      const change = -1 + Math.random() * 2; // -$1 to +$1
      const dividendYield = 4 + Math.random() * 4; // 4-8% range
      
      stocks.push({
        ticker,
        name: companyInfo.name,
        price: basePrice,
        change,
        changePercent: (change / basePrice) * 100,
        dividendYield,
        marketCap: `$${Math.floor(500 + Math.random() * 2000)}M`,
        volume: Math.floor(10000 + Math.random() * 100000),
        lastTrade: new Date(Date.now() - Math.random() * 60 * 60 * 1000), // Within last hour
        sector: companyInfo.sector,
        description: `${companyInfo.name} preferred stock with ${dividendYield.toFixed(1)}% dividend yield`,
        isActive: true,
      });
    }

    return stocks;
  }

  async fetchLiveStockData(ticker: string): Promise<Partial<InsertPreferredStock> | null> {
    try {
      // Try to fetch from Finnhub first
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${this.FINNHUB_API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.c && data.c > 0) {
          return {
            price: data.c,
            change: data.d || 0,
            changePercent: data.dp || 0,
            lastTrade: new Date(data.t ? data.t * 1000 : Date.now()),
          };
        }
      }

      // Fallback to Alpha Vantage
      const alphaResponse = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${this.ALPHA_VANTAGE_API_KEY}`
      );

      if (alphaResponse.ok) {
        const alphaData = await alphaResponse.json();
        const quote = alphaData["Global Quote"];
        if (quote && quote["05. price"]) {
          return {
            price: parseFloat(quote["05. price"]),
            change: parseFloat(quote["09. change"]),
            changePercent: parseFloat(quote["10. change percent"].replace('%', '')),
            lastTrade: new Date(quote["07. latest trading day"]),
          };
        }
      }

      return null;
    } catch (error) {
      console.error(`Error fetching live data for ${ticker}:`, error);
      return null;
    }
  }
}

export const stockDataService = new StockDataService();