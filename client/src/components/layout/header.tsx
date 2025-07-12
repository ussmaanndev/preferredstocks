import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "@/components/search-bar";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Stocks", href: "/stocks" },
    { name: "News", href: "/news" },
    { name: "Analysis", href: "/analysis" },
    { name: "Education", href: "/education" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary cursor-pointer">
                  PreferredStockHub
                </h1>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`text-lg font-medium transition-colors cursor-pointer ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden" size="icon">
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-6">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span
                        className={`text-lg font-medium block py-2 transition-colors cursor-pointer ${
                          isActive(item.href)
                            ? "text-primary"
                            : "text-secondary hover:text-primary"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar />
        </div>
      </div>
    </>
  );
}
