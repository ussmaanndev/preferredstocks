import { TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PreferredSharesInfo() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Understanding Preferred Shares
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* First paragraph */}
            <p className="text-lg text-gray-700 leading-relaxed">
              Preferred shares usually have a par value of $25 per share. However, they often trade at a different market price.
            </p>
            
            {/* Benefits list */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">High dividend yield</h4>
                  <p className="text-gray-700">Buying at a discount increases the yield on fixed dividends.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Capital gain opportunity</h4>
                  <p className="text-gray-700">If redeemed by the company, it's usually at the par value of $25.</p>
                </div>
              </div>
            </div>
            
            {/* Example card */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
              <CardContent className="pt-6">
                <p className="text-gray-800 font-medium">
                  For example, AHT.PRG has a par value of $25 but is currently trading at $15.58, which is a{' '}
                  <span className="text-blue-600 font-bold">37.68% discount</span>.
                </p>
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