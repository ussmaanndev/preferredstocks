import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import StockDetail from "@/pages/stock-detail";
import Stocks from "@/pages/stocks";
import News from "@/pages/news";
import NewsArticle from "@/pages/news-article";
import Analysis from "@/pages/analysis";
import Education from "@/pages/education";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/stocks" component={Stocks} />
          <Route path="/stocks/:ticker" component={StockDetail} />
          <Route path="/news" component={News} />
          <Route path="/news/:id" component={NewsArticle} />
          <Route path="/analysis" component={Analysis} />
          <Route path="/education" component={Education} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
