"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, Sparkles, Zap, Users, Globe, Award, Clock, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const validatePassword = (password: string) => {
    const checks = {
      length: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasLetter: /[a-zA-Z]/.test(password)
    };
    return checks;
  };

  const passwordChecks = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!isPasswordValid) {
      setError('Password does not meet requirements');
      setIsLoading(false);
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-green-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        
        <div className="w-full max-w-md text-center relative z-10">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-10 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-6 relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-100" />
              <Check size={36} className="relative z-10 drop-shadow-sm" />
              <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
              Registration Successful!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-6">
              Your account has been created successfully. Redirecting to login...
            </p>
            <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Security-themed floating elements */}
        <div className="absolute top-16 right-20 w-20 h-20 bg-gradient-to-br from-emerald-400/30 to-green-600/30 rounded-3xl rotate-12 animate-pulse delay-800" />
        <div className="absolute bottom-28 left-16 w-14 h-14 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-2xl animate-pulse delay-1100" />
        <div className="absolute top-2/5 left-12 w-10 h-10 bg-gradient-to-br from-violet-400/30 to-purple-600/30 rounded-xl rotate-45 animate-pulse delay-400" />
        <div className="absolute bottom-1/3 right-12 w-6 h-6 bg-gradient-to-br from-pink-400/30 to-rose-600/30 rounded-lg animate-pulse delay-600" />
      </div>
      
      <div className="w-full max-w-7xl flex items-center justify-center gap-16 relative z-10">
        {/* Left side - Security Benefits Showcase */}
        <div className="hidden xl:flex flex-col space-y-8 max-w-lg">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-slate-200 dark:via-slate-300 dark:to-slate-400 bg-clip-text text-transparent mb-4">
              Join the Security Revolution
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Experience next-generation cybersecurity with AI-powered threat detection and zero-trust architecture.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-200">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-3">
                <Shield size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">99.9% Uptime</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Enterprise reliability</p>
            </div>
            
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-3">
                <Zap size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">AI-Powered</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Smart threat detection</p>
            </div>
            
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-3">
                <Database size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">Zero-Trust</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Advanced architecture</p>
            </div>
            
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-3">
                <Award size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">ISO Certified</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Industry standards</p>
            </div>
          </div>
          
          <div className="space-y-4 animate-fade-in-up delay-300">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Setup in under 2 minutes</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Get protected instantly</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Users size={16} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Join 50,000+ protected users</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Growing security community</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Center/Right side - Registration Form */}
        <div className="w-full max-w-md xl:max-w-sm 2xl:max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-2xl mb-6 relative group hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Shield size={36} className="drop-shadow-sm relative z-10" />
            <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Join <span className="font-semibold text-primary">Sentinel Shield</span> to secure your digital life
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-8 relative group hover:shadow-3xl transition-all duration-500 animate-fade-in-up delay-200">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Name Field */}
            <div className="space-y-2 group">
              <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 group-focus-within:text-primary transition-colors duration-200">
                <User size={16} className="text-slate-500 dark:text-slate-400 group-focus-within:text-primary transition-colors duration-200" />
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-4 pl-12 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 backdrop-blur-md hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600"
                  placeholder="Enter your full name"
                />
                <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2 group">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 group-focus-within:text-primary transition-colors duration-200">
                <Mail size={16} className="text-slate-500 dark:text-slate-400 group-focus-within:text-primary transition-colors duration-200" />
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 pl-12 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 backdrop-blur-md hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600"
                  placeholder="Enter your email"
                />
                <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 group-focus-within:text-primary transition-colors duration-200">
                <Lock size={16} className="text-slate-500 dark:text-slate-400 group-focus-within:text-primary transition-colors duration-200" />
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-4 pl-12 pr-12 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 backdrop-blur-md hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600"
                  placeholder="Create a password"
                />
                <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-4 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-3">Password requirements:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs">
                      <div className={cn(
                        "w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center",
                        passwordChecks.length ? "bg-green-500 scale-110" : "bg-slate-300 dark:bg-slate-600"
                      )}>
                        {passwordChecks.length && <Check size={8} className="text-white" />}
                      </div>
                      <span className={cn(
                        "transition-colors duration-200 font-medium",
                        passwordChecks.length ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"
                      )}>
                        At least 6 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className={cn(
                        "w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center",
                        passwordChecks.hasNumber ? "bg-green-500 scale-110" : "bg-slate-300 dark:bg-slate-600"
                      )}>
                        {passwordChecks.hasNumber && <Check size={8} className="text-white" />}
                      </div>
                      <span className={cn(
                        "transition-colors duration-200 font-medium",
                        passwordChecks.hasNumber ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"
                      )}>
                        Contains a number
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className={cn(
                        "w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center",
                        passwordChecks.hasLetter ? "bg-green-500 scale-110" : "bg-slate-300 dark:bg-slate-600"
                      )}>
                        {passwordChecks.hasLetter && <Check size={8} className="text-white" />}
                      </div>
                      <span className={cn(
                        "transition-colors duration-200 font-medium",
                        passwordChecks.hasLetter ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"
                      )}>
                        Contains a letter
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2 group">
              <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 group-focus-within:text-primary transition-colors duration-200">
                <Lock size={16} className="text-slate-500 dark:text-slate-400 group-focus-within:text-primary transition-colors duration-200" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-4 pl-12 pr-12 rounded-2xl border-2 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 backdrop-blur-md hover:bg-white/80 dark:hover:bg-slate-800/80",
                    formData.confirmPassword && !passwordsMatch
                      ? "border-red-300 dark:border-red-600 hover:border-red-400 dark:hover:border-red-500"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  )}
                  placeholder="Confirm your password"
                />
                <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-1"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50/80 dark:bg-red-900/20 p-2 rounded-lg border border-red-200/50 dark:border-red-800/50">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  Passwords do not match
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-2xl bg-red-50/90 dark:bg-red-900/30 backdrop-blur-sm border-2 border-red-200/50 dark:border-red-800/50 text-red-700 dark:text-red-300 text-sm animate-shake relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent animate-pulse" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isPasswordValid || !passwordsMatch}
              className={cn(
                "w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group",
                isLoading || !isPasswordValid || !passwordsMatch
                  ? "bg-slate-400 dark:bg-slate-600 cursor-not-allowed opacity-60"
                  : "bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:via-primary/95 hover:to-primary/70 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="relative z-10">Creating Account...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Create Account</span>
                  <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center animate-fade-in-up delay-300">
            <p className="text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-bold text-primary hover:text-primary/80 transition-all duration-200 hover:underline underline-offset-4 decoration-2 decoration-primary/30 hover:decoration-primary/60"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

          {/* Footer */}
          <div className="text-center mt-8 animate-fade-in-up delay-500">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-slate-700/30">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Bank-grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={12} className="text-slate-500" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Global Protection</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                By creating an account, you agree to our{' '}
                <a href="#" className="font-semibold text-primary hover:text-primary/80 transition-all duration-200 hover:underline underline-offset-2">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-semibold text-primary hover:text-primary/80 transition-all duration-200 hover:underline underline-offset-2">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}