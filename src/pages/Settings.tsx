
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
    secondary: '#2563eb',
    accent: '#059669',
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
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Customize your CreditAI experience</p>
        </div>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2 text-orange-600" />
              Theme & Appearance
            </CardTitle>
            <CardDescription>
              Customize how CreditAI looks and feels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {themeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {theme === 'custom' && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-semibold text-gray-900">Custom Colors</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary">Primary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="primary"
                        type="color"
                        value={customThemeColors.primary}
                        onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={customThemeColors.primary}
                        onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                        placeholder="#ea580c"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary">Secondary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="secondary"
                        type="color"
                        value={customThemeColors.secondary}
                        onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={customThemeColors.secondary}
                        onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                        placeholder="#2563eb"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accent">Accent Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="accent"
                        type="color"
                        value={customThemeColors.accent}
                        onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={customThemeColors.accent}
                        onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                        placeholder="#059669"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="background">Background Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="background"
                        type="color"
                        value={customThemeColors.background}
                        onChange={(e) => handleCustomColorChange('background', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={customThemeColors.background}
                        onChange={(e) => handleCustomColorChange('background', e.target.value)}
                        placeholder="#ffffff"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <Button onClick={saveCustomColors} className="w-full">
                  Apply Custom Colors
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-600" />
              Language & Region
            </CardTitle>
            <CardDescription>
              Change your language preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-green-600" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Score Updates</p>
                  <p className="text-sm text-gray-500">Get notified when your credit score changes</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Monthly Reports</p>
                  <p className="text-sm text-gray-500">Receive monthly credit report summaries</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Security Alerts</p>
                  <p className="text-sm text-gray-500">Important security and fraud alerts</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-600" />
              Security & Privacy
            </CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-gray-500">Update your account password</p>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-gray-500">Permanently delete your account and data</p>
                </div>
                <Button variant="destructive" size="sm">
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
