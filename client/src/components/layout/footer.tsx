import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PreferredStockHub</h3>
            <p className="text-gray-300 text-base">
              Your trusted source for preferred stock data, analysis, and education. 
              Making preferred stock investing accessible to everyone.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/stocks">
                  <span className="text-gray-300 hover:text-white text-base transition-colors cursor-pointer">
                    All Preferred Stocks
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/stocks?filter=top-performers">
                  <span className="text-gray-300 hover:text-white text-base transition-colors cursor-pointer">
                    Top Performers
                  </span>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-base transition-colors">
                  Dividend Calendar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-base transition-colors">
                  Stock Screener
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Education</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-base transition-colors">
                  Preferred Stock Basics
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-base transition-colors">
                  Investment Strategies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-base transition-colors">
                  Risk Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-base transition-colors">
                  Tax Considerations
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-base transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-base transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-base transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-base transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-base">
            © 2024 PreferredStockHub. All rights reserved. | Data provided for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
