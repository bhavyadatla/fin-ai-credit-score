
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/DashboardLayout';
import ImageUpload from '@/components/ImageUpload';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar_url: '',
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error loading profile:', error);
    } else if (data) {
      setProfile({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || user.email || '',
        avatar_url: data.avatar_url || '',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpdate = async (imageUrl: string) => {
    setProfile(prev => ({ ...prev, avatar_url: imageUrl }));
    
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({ avatar_url: imageUrl, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile image',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    }

    setLoading(false);
  };

  const getInitials = () => {
    return `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`.toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="animate-slide-in">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <Card className="hover-lift animate-scale-in">
          <CardHeader>
            <CardTitle className="text-gray-800">Personal Information</CardTitle>
            <CardDescription>Update your personal details here</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <ImageUpload
                currentImage={profile.avatar_url}
                onImageUpdate={handleImageUpdate}
                fallbackText={getInitials() || 'UN'}
                size="xl"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.1s' }}>
                  <Label htmlFor="first_name">First Name</Label>
                  <div className="relative">
                    <Input
                      id="first_name"
                      name="first_name"
                      value={profile.first_name}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="pl-10 hover-lift"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={profile.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="hover-lift"
                  />
                </div>

                <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.3s' }}>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="pl-10 hover-lift"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.4s' }}>
                  <Label>Member Since</Label>
                  <div className="relative">
                    <Input
                      value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''}
                      disabled
                      className="pl-10"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end animate-slide-in" style={{ animationDelay: '0.5s' }}>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover-lift"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
