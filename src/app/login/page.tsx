"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, CheckCircle, Zap, Users, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Use window.location.href to ensure a full page reload with the new cookie
        window.location.href = '/dashboard';
      } else {
        setError(data.error || 'Login failed');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Security-themed floating elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-green-400/30 to-emerald-600/30 rounded-2xl rotate-12 animate-pulse delay-700" />
        <div className="absolute bottom-32 right-24 w-12 h-12 bg-gradient-to-br from-blue-400/30 to-cyan-600/30 rounded-full animate-pulse delay-1200" />
        <div className="absolute top-1/3 right-16 w-8 h-8 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-lg rotate-45 animate-pulse delay-300" />
      </div>
      
      <div className="w-full max-w-6xl flex items-center justify-center gap-12 relative z-10">
        {/* Left side - Security Features Showcase */}
        <div className="hidden lg:flex flex-col space-y-8 max-w-md">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-slate-200 dark:via-slate-300 dark:to-slate-400 bg-clip-text text-transparent mb-4">
              Advanced Security
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Protect your digital life with enterprise-grade security features designed for modern threats.
            </p>
          </div>
          
          <div className="space-y-6 animate-fade-in-up delay-200">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <Shield size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Multi-Layer Protection</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Advanced encryption and real-time threat detection</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Real-time Monitoring</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">24/7 security monitoring and instant alerts</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Trusted by 10K+ Users</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Join thousands who trust us with their security</p>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in-up delay-400">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle size={20} className="text-primary" />
                <span className="font-semibold text-primary">Security Tip</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Enable two-factor authentication for an extra layer of security. Your account will be protected even if your password is compromised.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right side - Login Form */}
        <div className="w-full max-w-md lg:max-w-sm xl:max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-2xl mb-6 relative group hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Shield size={36} className="drop-shadow-sm relative z-10" />
            <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Sign in to your <span className="font-semibold text-primary">Sentinel Shield</span> account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-8 relative group hover:shadow-3xl transition-all duration-500 animate-fade-in-up delay-200">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <form onSubmit={handleSubmit} className="space-y-7 relative z-10">
            {/* Email Field */}
            <div className="space-y-3 group">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-2xl bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-white/90 dark:hover:bg-slate-700/90"
                  placeholder="Enter your email address"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3 group">
              <label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-primary" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-14 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-2xl bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-white/90 dark:hover:bg-slate-700/90"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary transition-all duration-200 hover:scale-110"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-2xl bg-red-50/80 dark:bg-red-900/30 border-2 border-red-200/60 dark:border-red-800/60 text-red-700 dark:text-red-400 text-sm backdrop-blur-sm animate-shake">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  {error}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden group",
                "bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground",
                "shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:translate-y-0",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-300"
              )}
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center relative z-10">
            <p className="text-slate-600 dark:text-slate-400 text-base">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-semibold text-primary hover:text-primary/80 transition-all duration-200 hover:underline underline-offset-4 decoration-2"
              >
                Create one here
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
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">256-bit SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={12} className="text-slate-500" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Global CDN</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Secured with enterprise-grade encryption • <span className="font-semibold text-primary">SOC 2 Compliant</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}