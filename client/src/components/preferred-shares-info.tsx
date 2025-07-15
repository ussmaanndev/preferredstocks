import { TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PreferredSharesInfo() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Understanding Preferred Shares
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Liquidation Preference Explanation */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Liquidation Preference</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Preferred shares typically have a par value of $25 per share, which is called the <strong>liquidation preference</strong>. 
                This means if the company is liquidated or redeems the shares, investors receive $25 per share regardless of the current market price.
              </p>
            </div>
            
            {/* Real Example with Detailed Information */}
            <Card className="bg-white border-2 border-gray-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Real Example: AHT.PRG</h3>
                  <p className="text-gray-600 mb-4">Ashford Hospitality Prime Preferred Stock Series G</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Trading Information */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">Trading Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Price:</span>
                        <span className="font-semibold text-gray-900">$15.58</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Liquidation Value:</span>
                        <span className="font-semibold text-gray-900">$25.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discount:</span>
                        <span className="font-bold text-red-600">37.68%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dividend Information */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">Dividend Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Dividend:</span>
                        <span className="font-semibold text-gray-900">$1.8436</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Yield:</span>
                        <span className="font-bold text-green-600">11.83%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Original Coupon:</span>
                        <span className="font-semibold text-gray-900">7.375%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment:</span>
                        <span className="font-semibold text-gray-900">Quarterly</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Investment Opportunities */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Enhanced Dividend Yield</h4>
                </div>
                <p className="text-gray-700">
                  Buying at $15.58 instead of $25 increases your effective yield from 7.375% to 11.83% on the same dividend payments.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Capital Appreciation Potential</h4>
                </div>
                <p className="text-gray-700">
                  If redeemed by the company, you would receive $25 per share, representing a 60.45% capital gain on your $15.58 investment.
                </p>
              </div>
            </div>
            
            {/* Why Attractive for Income Investors */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why This Appeals to Income-Focused Investors</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700"><strong>Predictable Income:</strong> Quarterly dividend payments of $0.4609 per share ($1.8436 annually)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700"><strong>Superior Yield:</strong> 11.83% current yield significantly outpaces most traditional income investments</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700"><strong>Principal Protection:</strong> $25 liquidation preference provides downside protection</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700"><strong>Priority Claims:</strong> Preferred shareholders receive dividends before common stock holders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Call to action */}
            <div className="text-center pt-4">
              <Link href="/stocks">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Explore Preferred Stocks
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}