import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Palette, Globe, Shield, Bell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

const Settings = () => {
  const { user } = useAuth();
  const { theme, setTheme, customColors, setCustomColors } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [customThemeColors, setCustomThemeColors] = useState({
    primary: '#ea580c',
    secondary: '#f9ac56',
    accent: '#fbbf24',
    background: '#ffffff',
  });

  useEffect(() => {
    if (customColors) {
      setCustomThemeColors(customColors);
    }
  }, [customColors]);

  const handleThemeChange = async (newTheme: string) => {
    await setTheme(newTheme as any);
    toast({
      title: 'Theme Updated',
      description: `Theme changed to ${newTheme}`,
    });
  };

  const handleLanguageChange = async (newLanguage: string) => {
    await setLanguage(newLanguage as any);
    toast({
      title: 'Language Updated',
      description: `Language changed to ${newLanguage}`,
    });
  };

  const handleCustomColorChange = (colorKey: string, value: string) => {
    setCustomThemeColors(prev => ({ ...prev, [colorKey]: value }));
  };

  const saveCustomColors = async () => {
    await setCustomColors(customThemeColors);
    toast({
      title: 'Custom Colors Saved',
      description: 'Your custom theme colors have been applied',
    });
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System Default' },
    { value: 'custom', label: 'Custom' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-orange-700">Settings</h1>
          <p className="text-orange-500">Customize your CreditAI experience</p>
        </div>

        {/* Theme Settings */}
        <Card className="bg-white border-orange-100 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <Palette className="h-5 w-5 mr-2 text-orange-600" />
              Theme & Appearance
            </CardTitle>
            <CardDescription className="text-orange-400">
              Customize how CreditAI looks and feels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-orange-800">Theme</Label>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger className="bg-white border-orange-200 focus:ring-orange-300">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="bg-white border-orange-200 z-50">
                  {themeOptions.map((option) => (
                    <SelectItem className="hover:bg-orange-50" key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {theme === 'custom' && (
              <div className="space-y-4 p-4 border border-orange-200 rounded-lg bg-orange-50">
                <h4 className="font-semibold text-orange-900">Custom Colors</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary" className="text-orange-700">Primary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="primary"
                        type="color"
                        value={customThemeColors.primary}
                        onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                        className="w-16 h-10 p-1 border border-orange-200 rounded bg-white"
                      />
                      <Input
                        value={customThemeColors.primary}
                        onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                        placeholder="#ea580c"
                        className="flex-1 border-orange-200"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary" className="text-orange-700">Secondary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="secondary"
                        type="color"
                        value={customThemeColors.secondary}
                        onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                        className="w-16 h-10 p-1 border border-orange-200 rounded bg-white"
                      />
                      <Input
                        value={customThemeColors.secondary}
                        onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                        placeholder="#f9ac56"
                        className="flex-1 border-orange-200"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accent" className="text-orange-700">Accent Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="accent"
                        type="color"
                        value={customThemeColors.accent}
                        onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                        className="w-16 h-10 p-1 border border-orange-200 rounded bg-white"
                      />
                      <Input
                        value={customThemeColors.accent}
                        onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                        placeholder="#fbbf24"
                        className="flex-1 border-orange-200"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="background" className="text-orange-700">Background Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="background"
                        type="color"
                        value={customThemeColors.background}
                        onChange={(e) => handleCustomColorChange('background', e.target.value)}
                        className="w-16 h-10 p-1 border border-orange-200 rounded bg-white"
                      />
                      <Input
                        value={customThemeColors.background}
                        onChange={(e) => handleCustomColorChange('background', e.target.value)}
                        placeholder="#ffffff"
                        className="flex-1 border-orange-200"
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={saveCustomColors} 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 rounded-lg shadow-none"
                >
                  Apply Custom Colors
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="bg-white border-orange-100 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <Globe className="h-5 w-5 mr-2 text-orange-600" />
              Language & Region
            </CardTitle>
            <CardDescription className="text-orange-400">
              Change your language preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="language" className="text-orange-800">Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="bg-white border-orange-200 focus:ring-orange-300">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-white border-orange-200 z-50">
                  {languageOptions.map((option) => (
                    <SelectItem className="hover:bg-orange-50" key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white border-orange-100 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <Bell className="h-5 w-5 mr-2 text-orange-600" />
              Notifications
            </CardTitle>
            <CardDescription className="text-orange-400">
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-orange-800">Score Updates</p>
                  <p className="text-sm text-orange-400">Get notified when your credit score changes</p>
                </div>
                <Button 
                  className="rounded-xl px-8 shadow-none text-orange-600 bg-[#181511] hover:bg-[#28221b] border-0 font-semibold text-base"
                >
                  Configure
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-orange-800">Monthly Reports</p>
                  <p className="text-sm text-orange-400">Receive monthly credit report summaries</p>
                </div>
                <Button 
                  className="rounded-xl px-8 shadow-none text-orange-600 bg-[#181511] hover:bg-[#28221b] border-0 font-semibold text-base"
                >
                  Configure
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-orange-800">Security Alerts</p>
                  <p className="text-sm text-orange-400">Important security and fraud alerts</p>
                </div>
                <Button 
                  className="rounded-xl px-8 shadow-none text-orange-600 bg-[#181511] hover:bg-[#28221b] border-0 font-semibold text-base"
                >
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white border-orange-100 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <Shield className="h-5 w-5 mr-2 text-orange-600" />
              Security & Privacy
            </CardTitle>
            <CardDescription className="text-orange-400">
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-orange-800">Change Password</p>
                  <p className="text-sm text-orange-400">Update your account password</p>
                </div>
                <Button 
                  className="rounded-xl px-8 shadow-none text-orange-600 bg-[#181511] hover:bg-[#28221b] border-0 font-semibold text-base"
                >
                  Change
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-orange-800">Two-Factor Authentication</p>
                  <p className="text-sm text-orange-400">Add an extra layer of security</p>
                </div>
                <Button 
                  className="rounded-xl px-8 shadow-none text-orange-600 bg-[#181511] hover:bg-[#28221b] border-0 font-semibold text-base"
                >
                  Enable
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-orange-800">Delete Account</p>
                  <p className="text-sm text-orange-400">Permanently delete your account and data</p>
                </div>
                <Button 
                  variant="destructive" 
                  className="rounded-xl px-8 shadow-none bg-orange-500 text-white hover:bg-orange-600 border-0 font-semibold text-base"
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
