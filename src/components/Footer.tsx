
import { Link } from "react-router-dom";
import { BarChart3, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="animate-slide-in">
            <Link to="/" className="flex items-center space-x-2 mb-4 hover-lift">
              <BarChart3 className="h-8 w-8 text-orange-500 animate-float" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">CreditAI</span>
            </Link>
            <p className="text-slate-300 mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Empowering financial inclusion through AI-powered alternative credit scoring.
            </p>
            <div className="flex space-x-4 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <button className="bg-orange-500 p-3 rounded-lg hover-lift cursor-pointer transition-all duration-300 hover:bg-orange-600 flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </button>
              <button className="bg-blue-500 p-3 rounded-lg hover-lift cursor-pointer transition-all duration-300 hover:bg-blue-600 flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </button>
              <button className="bg-green-500 p-3 rounded-lg hover-lift cursor-pointer transition-all duration-300 hover:bg-green-600 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-300 hover:text-orange-500 transition-colors hover-lift inline-block">About Us</Link></li>
              <li><Link to="/how-it-works" className="text-slate-300 hover:text-orange-500 transition-colors hover-lift inline-block">How It Works</Link></li>
              <li><Link to="/target-users" className="text-slate-300 hover:text-orange-500 transition-colors hover-lift inline-block">Who It's For</Link></li>
              <li><Link to="/demo" className="text-slate-300 hover:text-orange-500 transition-colors hover-lift inline-block">Live Demo</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-slate-300 hover:text-orange-500 transition-colors hover-lift inline-block">Blog</Link></li>
              <li><Link to="/faqs" className="text-slate-300 hover:text-orange-500 transition-colors hover-lift inline-block">FAQs</Link></li>
              <li><Link to="/testimonials" className="text-slate-300 hover:text-orange-500 transition-colors hover-lift inline-block">Success Stories</Link></li>
              <li><Link to="/impact" className="text-slate-300 hover:text-orange-500 transition-colors hover-lift inline-block">Impact Metrics</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-slate-300 hover:text-orange-500 transition-colors hover-lift inline-block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-orange-500 transition-colors hover-lift inline-block">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-orange-500 transition-colors hover-lift inline-block">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p>&copy; 2024 CreditAI. All rights reserved. Empowering financial inclusion worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
