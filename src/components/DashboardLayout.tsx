
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BarChart3, 
  User, 
  Settings, 
  CreditCard, 
  TrendingUp, 
  Bell, 
  LogOut,
  Home,
  FileText,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setProfile(data);
    }
  };

  const sidebarItems = [
    { icon: Home, label: t('dashboard'), href: "/dashboard", key: 'dashboard' },
    { icon: User, label: t('profile'), href: "/profile", key: 'profile' },
    { icon: CreditCard, label: t('creditReport'), href: "/credit-report", key: 'credit-report' },
    { icon: TrendingUp, label: t('scoreHistory'), href: "/score-history", key: 'score-history' },
    { icon: FileText, label: t('documents'), href: "/documents", key: 'documents' },
    { icon: Settings, label: t('settings'), href: "/settings", key: 'settings' },
  ];

  const getUserInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`.toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const getUserName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 animate-slide-in`}>
        <div className="flex items-center justify-between p-6 border-b">
          <Link to="/" className="flex items-center space-x-2 hover-lift">
            <BarChart3 className="h-8 w-8 text-orange-600 animate-bounce-custom" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              CreditAI
            </span>
          </Link>
          <button 
            className="lg:hidden hover-lift"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.key} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover-lift ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button variant="outline" className="w-full justify-start hover-lift" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            {t('logout')}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b p-4 animate-slide-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden hover-lift"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hover-lift">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3 animate-fade-in">
                <Avatar className="h-9 w-9 hover-lift">
                  <AvatarImage src={profile?.avatar_url} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-r from-orange-500 to-blue-600 text-white text-sm font-semibold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">{getUserName()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
