
import { Link } from "react-router-dom";
import { BarChart3, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BarChart3 className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">CreditAI</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Empowering financial inclusion through AI-powered alternative credit scoring.
            </p>
            <div className="flex space-x-4">
              <div className="bg-orange-500 p-2 rounded">
                <Mail className="h-4 w-4" />
              </div>
              <div className="bg-blue-500 p-2 rounded">
                <Phone className="h-4 w-4" />
              </div>
              <div className="bg-green-500 p-2 rounded">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-orange-500 transition-colors">How It Works</Link></li>
              <li><Link to="/target-users" className="text-gray-400 hover:text-orange-500 transition-colors">Who It's For</Link></li>
              <li><Link to="/demo" className="text-gray-400 hover:text-orange-500 transition-colors">Live Demo</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-orange-500 transition-colors">Blog</Link></li>
              <li><Link to="/faqs" className="text-gray-400 hover:text-orange-500 transition-colors">FAQs</Link></li>
              <li><Link to="/testimonials" className="text-gray-400 hover:text-orange-500 transition-colors">Success Stories</Link></li>
              <li><Link to="/impact" className="text-gray-400 hover:text-orange-500 transition-colors">Impact Metrics</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CreditAI. All rights reserved. Empowering financial inclusion worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
