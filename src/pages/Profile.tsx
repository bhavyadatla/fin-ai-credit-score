
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
    const first = profile.first_name.charAt(0) || '';
    const last = profile.last_name.charAt(0) || '';
    return `${first}${last}`.toUpperCase() || 'UN';
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white py-8 px-2 md:px-0 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-orange-600">Profile</h1>
            <p className="text-orange-500 text-lg">Manage your account information</p>
          </div>

          <Card className="shadow-xl rounded-2xl border border-orange-100 bg-white">
            <CardHeader>
              <CardTitle className="text-lg md:text-2xl text-orange-600 font-extrabold">Personal Information</CardTitle>
              <CardDescription className="text-orange-400">
                Update your personal details here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <ImageUpload
                  currentImage={profile.avatar_url}
                  onImageUpdate={handleImageUpdate}
                  fallbackText={getInitials()}
                  size="xl"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-base text-orange-600 font-semibold">First Name</Label>
                    <div className="relative">
                      <Input
                        id="first_name"
                        name="first_name"
                        value={profile.first_name}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        className="bg-white border-2 border-orange-200 text-orange-900 placeholder:text-orange-300 pl-10 focus:border-orange-500"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-base text-orange-600 font-semibold">Last Name</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={profile.last_name}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="bg-white border-2 border-orange-200 text-orange-900 placeholder:text-orange-300 focus:border-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base text-orange-600 font-semibold">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="bg-white border-2 border-orange-200 text-orange-900 placeholder:text-orange-300 pl-10 focus:border-orange-500"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base text-orange-600 font-semibold">Member Since</Label>
                    <div className="relative">
                      <Input
                        value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''}
                        disabled
                        className="bg-white border-2 border-orange-200 text-orange-400 placeholder:text-orange-200 pl-10"
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-300" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg px-8 py-2 text-lg font-semibold hover:from-orange-600 hover:to-orange-700 border-0"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
