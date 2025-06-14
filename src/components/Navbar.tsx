
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BarChart3 } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-orange-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              CreditAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-orange-600 transition-colors">
              How It Works
            </Link>
            <Link to="/target-users" className="text-gray-700 hover:text-orange-600 transition-colors">
              Who It's For
            </Link>
            <Link to="/demo" className="text-gray-700 hover:text-orange-600 transition-colors">
              Demo
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-orange-600 transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">
              Contact
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-orange-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-orange-600">
                Home
              </Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-orange-600">
                About
              </Link>
              <Link to="/how-it-works" className="block px-3 py-2 text-gray-700 hover:text-orange-600">
                How It Works
              </Link>
              <Link to="/target-users" className="block px-3 py-2 text-gray-700 hover:text-orange-600">
                Who It's For
              </Link>
              <Link to="/demo" className="block px-3 py-2 text-gray-700 hover:text-orange-600">
                Demo
              </Link>
              <Link to="/blog" className="block px-3 py-2 text-gray-700 hover:text-orange-600">
                Blog
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-orange-600">
                Contact
              </Link>
              <Link to="/login" className="block px-3 py-2">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
