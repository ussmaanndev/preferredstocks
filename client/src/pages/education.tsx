import { BookOpen, GraduationCap, Target, TrendingUp, Shield, DollarSign, AlertTriangle, Calendar, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import SEOHead from "@/components/seo-head";
import PreferredSharesInfo from "@/components/preferred-shares-info";

export default function Education() {
  return (
    <>
      <SEOHead
        title="Preferred Stock Education Center | PreferredStockHub"
        description="Learn about preferred stocks, investment strategies, and market analysis. Comprehensive educational resources for investors of all levels."
        keywords="preferred stock education, investment learning, dividend investing, preferred stock basics, investment strategies"
        canonical="/education"
        ogTitle="Preferred Stock Education Center | PreferredStockHub"
        ogDescription="Learn about preferred stocks, investment strategies, and market analysis. Comprehensive educational resources for investors of all levels."
        ogUrl="/education"
      />

      <div className="bg-neutral-light min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Preferred Stock Education Center
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Master the fundamentals of preferred stock investing with our comprehensive educational resources
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Learning Path */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4">
                Your Learning Journey
              </h2>
              <p className="text-lg text-neutral-medium max-w-2xl mx-auto">
                Follow our structured learning path to become a confident preferred stock investor
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Beginner</CardTitle>
                      <Badge variant="secondary" className="mt-1">Start Here</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      What are preferred stocks?
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Types of preferred stocks
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Benefits and risks
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Basic terminology
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Intermediate</CardTitle>
                      <Badge variant="secondary" className="mt-1">Build Skills</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Reading preferred stock data
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Valuation methods
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Portfolio diversification
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Tax considerations
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Advanced</CardTitle>
                      <Badge variant="secondary" className="mt-1">Expert Level</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Advanced strategies
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Risk management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Market timing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Professional tools
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Educational Content Tabs */}
          <Tabs defaultValue="basics" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="risks">Risks</TabsTrigger>
            </TabsList>

            <TabsContent value="basics" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                    Understanding Preferred Stocks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">What Are Preferred Stocks?</h3>
                    <p className="text-neutral-medium leading-relaxed">
                      Preferred stocks are hybrid securities that combine features of both stocks and bonds. They typically pay fixed dividends and have priority over common stock in terms of dividend payments and liquidation proceeds, but usually don't have voting rights.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Key Characteristics</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <DollarSign className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-medium">Fixed Dividends</h4>
                          <p className="text-sm text-neutral-medium">Regular, predictable dividend payments</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium">Priority Status</h4>
                          <p className="text-sm text-neutral-medium">Priority over common stock for dividends</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-medium">Maturity Options</h4>
                          <p className="text-sm text-neutral-medium">Perpetual or fixed-term securities</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-orange-600 mt-1" />
                        <div>
                          <h4 className="font-medium">Limited Voting</h4>
                          <p className="text-sm text-neutral-medium">Usually no voting rights</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <PreferredSharesInfo />
            </TabsContent>

            <TabsContent value="analysis" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                    How to Analyze Preferred Stocks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Key Metrics to Evaluate</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Dividend Yield</h4>
                        <p className="text-sm text-blue-700">
                          Annual dividend payment divided by current stock price. Higher yields may indicate higher risk.
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Credit Rating</h4>
                        <p className="text-sm text-green-700">
                          Company's creditworthiness affects dividend security. Look for investment-grade ratings.
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">Call Protection</h4>
                        <p className="text-sm text-purple-700">
                          Period during which the issuer cannot redeem the preferred stock, protecting your investment.
                        </p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">Liquidation Value</h4>
                        <p className="text-sm text-orange-700">
                          Amount you'd receive if the company liquidates. Usually $25 per share for most preferreds.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Target className="h-6 w-6 mr-2 text-purple-600" />
                    Investment Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-3">Income-Focused Strategy</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Target high-quality, high-yield preferreds</li>
                        <li>• Focus on established companies</li>
                        <li>• Reinvest dividends for compound growth</li>
                        <li>• Hold for long-term income generation</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-3">Value Strategy</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Look for preferreds trading below par</li>
                        <li>• Focus on temporary market dislocations</li>
                        <li>• Consider interest rate cycle timing</li>
                        <li>• Target call dates for potential gains</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risks" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <AlertTriangle className="h-6 w-6 mr-2 text-red-600" />
                    Understanding Risks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h3 className="text-lg font-semibold text-red-800 mb-2">Interest Rate Risk</h3>
                      <p className="text-sm text-red-700">
                        Rising interest rates can cause preferred stock prices to fall, similar to bonds.
                      </p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <h3 className="text-lg font-semibold text-orange-800 mb-2">Credit Risk</h3>
                      <p className="text-sm text-orange-700">
                        Company financial troubles can lead to suspended or reduced dividend payments.
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Call Risk</h3>
                      <p className="text-sm text-yellow-700">
                        Issuer may redeem preferred shares when interest rates fall, limiting upside.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Liquidity Risk</h3>
                      <p className="text-sm text-blue-700">
                        Some preferred stocks may be difficult to sell quickly without affecting price.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <section className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
                <p className="text-xl mb-6 opacity-90">
                  Apply your knowledge with our professional-grade platform
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/stocks">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                      Browse Stocks
                    </Button>
                  </Link>
                  <Link href="/analysis">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
                      View Analysis
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
}