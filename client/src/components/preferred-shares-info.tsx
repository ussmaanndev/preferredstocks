import { 
  DollarSign, 
  Shield, 
  Users, 
  TrendingUp, 
  BookOpen, 
  BarChart3 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PreferredSharesInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Are Preferred Shares?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the fundamentals of preferred stock investing
          </p>
        </div>
        
        {/* Overview Card */}
        <div className="card-enhanced p-8 mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
          <div className="flex items-start gap-4">
            <div className="gradient-blue w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Preferred Shares Overview</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Preferred shares are a type of equity security that combines features of both stocks and bonds. They typically pay fixed dividends and have priority over common stock in dividend payments and asset distribution, but usually don't carry voting rights. This makes them attractive to income-focused investors seeking steady returns.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="card-enhanced p-6 text-center">
            <div className="gradient-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-3">Fixed Dividends</h4>
            <p className="text-gray-600">
              Preferred shares typically pay fixed dividend rates, providing predictable income streams for investors.
            </p>
          </div>
          
          <div className="card-enhanced p-6 text-center">
            <div className="gradient-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-3">Priority Status</h4>
            <p className="text-gray-600">
              Preferred shareholders receive dividends before common shareholders and have priority in liquidation.
            </p>
          </div>
          
          <div className="card-enhanced p-6 text-center">
            <div className="gradient-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-3">No Voting Rights</h4>
            <p className="text-gray-600">
              Most preferred shares don't carry voting rights, focusing purely on income generation.
            </p>
          </div>
        </div>

        {/* Benefits vs Risks */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card-enhanced p-8 border-l-4 border-green-500">
            <h4 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              Benefits
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">Higher dividend yields than common stocks</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">Priority in dividend payments</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">Less volatile than common stocks</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">Potential for capital appreciation</span>
              </li>
            </ul>
          </div>
          
          <div className="card-enhanced p-8 border-l-4 border-red-500">
            <h4 className="text-2xl font-bold text-red-700 mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Considerations
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">Interest rate sensitivity</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">Call risk on some issues</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">Limited growth potential</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">Credit risk of issuing company</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Types of Preferred Shares */}
        <div className="card-enhanced p-8 mb-8">
          <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Types of Preferred Shares</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">C</span>
              </div>
              <h5 className="font-semibold mb-2">Cumulative</h5>
              <p className="text-sm text-gray-600">Unpaid dividends accumulate and must be paid before common dividends</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">P</span>
              </div>
              <h5 className="font-semibold mb-2">Participating</h5>
              <p className="text-sm text-gray-600">Can receive additional dividends beyond the fixed rate</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">Co</span>
              </div>
              <h5 className="font-semibold mb-2">Convertible</h5>
              <p className="text-sm text-gray-600">Can be converted to common stock at a predetermined ratio</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">Ca</span>
              </div>
              <h5 className="font-semibold mb-2">Callable</h5>
              <p className="text-sm text-gray-600">Can be redeemed by the issuer at predetermined prices</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/stocks">
            <Button className="btn-professional text-lg px-8 py-4">
              <BarChart3 className="mr-2 h-5 w-5" />
              Explore Preferred Stocks
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}