
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreeMarketing: false
  });
  
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error", 
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
        }
      }
    });

    if (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registration Successful!",
        description: "Please check your email to confirm your account.",
      });
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2236] via-[#313947] to-[#4d5562] flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-lg">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <BarChart3 className="h-8 w-8 text-orange-500" />
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            CreditAI
          </span>
        </Link>

        <Card className="bg-gradient-to-br from-[#24303d] to-[#515e73] bg-opacity-80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-1 md:p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white mb-2">Create Your Account</CardTitle>
            <CardDescription className="text-lg text-blue-100/90">
              Join thousands who have discovered their financial potential
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-base text-white font-semibold">First Name</Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="pl-10 bg-black text-white placeholder:text-gray-400 border border-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-md"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-base text-white font-semibold">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="bg-black text-white placeholder:text-gray-400 border border-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-md"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base text-white font-semibold">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10 bg-black text-white placeholder:text-gray-400 border border-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-md"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base text-white font-semibold">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 bg-black text-white placeholder:text-gray-400 border border-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-md"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base text-white font-semibold">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="pl-10 pr-10 bg-black text-white placeholder:text-gray-400 border border-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-md"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-base text-white font-semibold">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="pl-10 pr-10 bg-black text-white placeholder:text-gray-400 border border-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-md"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleCheckboxChange('agreeTerms', checked as boolean)}
                    required
                    className="border-gray-400 bg-black data-[state=checked]:bg-orange-500 focus:ring-orange-500"
                  />
                  <Label htmlFor="agreeTerms" className="text-white text-sm">
                    I agree to the{" "}
                    <Link to="/terms" className="text-orange-500 hover:text-orange-600 underline font-medium">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-orange-500 hover:text-orange-600 underline font-medium">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onCheckedChange={(checked) => handleCheckboxChange('agreeMarketing', checked as boolean)}
                    className="border-gray-400 bg-black data-[state=checked]:bg-orange-500 focus:ring-orange-500"
                  />
                  <Label htmlFor="agreeMarketing" className="text-gray-300 text-sm">
                    I'd like to receive updates and marketing communications
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 mt-2 font-semibold text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-xl transition duration-200 shadow-orange-400/20 shadow-md"
                disabled={!formData.agreeTerms || loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-base text-gray-200">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium underline cursor-pointer inline-block">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
