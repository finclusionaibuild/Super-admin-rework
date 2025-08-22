import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, CheckIcon, PlayIcon } from "lucide-react";

export const SignUp = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in a real app, you'd validate against a backend
    if (formData.firstName && formData.lastName && formData.email && 
        formData.password && formData.confirmPassword && 
        formData.password === formData.confirmPassword && 
        formData.agreeToTerms && passwordStrength >= 3) {
      // Navigate to dashboard after successful sign up
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[#4340ff] hover:text-[#3632e6] mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/Logo Main Trans.png" 
              alt="SureBanker" 
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#201f4f] mb-2 font-raleway">
              Create your account
            </h1>
            <p className="text-[#667085] text-base">
              Join SureBanker and start your financial journey
            </p>
          </div>

          {/* Demo Login Banner */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PlayIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 text-sm mb-1">Try Demo Accounts</h3>
                  <p className="text-xs text-blue-700">Experience different user roles with one-click login</p>
                </div>
                <Link to="/demo">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-4 py-2">
                    Demo Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Sign Up Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[#201f4f] mb-2">
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="First name"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4340ff] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[#201f4f] mb-2">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Last name"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4340ff] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#201f4f] mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4340ff] focus:border-transparent"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#201f4f] mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Create a password"
                  className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4340ff] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#4340ff] transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${passwordStrength >= 3 ? "text-green-600" : "text-orange-600"}`}>
                    Password strength: {strengthLabels[passwordStrength - 1] || "Very Weak"}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#201f4f] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4340ff] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#4340ff] transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-2">
                  {formData.password === formData.confirmPassword ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckIcon className="w-4 h-4" />
                      <span className="text-xs">Passwords match</span>
                    </div>
                  ) : (
                    <p className="text-xs text-red-600">Passwords don't match</p>
                  )}
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                className="w-4 h-4 text-[#4340ff] border-gray-300 rounded focus:ring-[#4340ff] mt-1"
                required
              />
              <span className="text-sm text-[#667085]">
                I agree to the{" "}
                <Link to="/terms" className="text-[#4340ff] hover:text-[#3632e6] font-medium">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#4340ff] hover:text-[#3632e6] font-medium">
                  Privacy Policy
                </Link>
              </span>
            </div>

            {/* Sign Up Button */}
            <Button 
              type="submit"
              disabled={!formData.agreeToTerms || formData.password !== formData.confirmPassword || passwordStrength < 3}
              className="w-full h-12 bg-[#4340ff] text-white font-semibold rounded-xl hover:bg-[#3632e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#f8f9ff] text-[#667085]">Or continue with</span>
              </div>
            </div>

            {/* Social Sign Up */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5 mr-2" />
                Apple
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <span className="text-[#667085]">Already have an account? </span>
              <Link 
                to="/signin" 
                className="text-[#4340ff] hover:text-[#3632e6] font-medium transition-colors"
              >
                Sign in
              </Link>
              <div className="mt-2">
                <span className="text-[#667085]">Want to open a business account? </span>
                <Link 
                  to="/business-onboarding" 
                  className="text-[#4340ff] hover:text-[#3632e6] font-medium transition-colors"
                >
                  Business Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Much Bigger Image */}
      <div className="hidden lg:flex w-3/5 bg-white items-center justify-center p-4 relative overflow-hidden">
        <div className="flex items-center justify-center w-full h-full">
          <img 
            src="/Frame 1618874613 (1).png" 
            alt="SureBanker Mobile App" 
            className="w-full h-full object-contain scale-110"
          />
        </div>
      </div>
    </div>
  );
};