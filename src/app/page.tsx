'use client';

import Link from "next/link";
import { Shield, ArrowRight, CheckCircle, Zap, Users, Lock, Globe, Award, Clock, Database, Star, TrendingUp, Eye, Sparkles, ChevronRight, Play, MousePointer2, Rocket, BarChart3, Check, ChevronUp } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden antialiased">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Floating security elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-green-400/30 to-emerald-600/30 rounded-2xl rotate-12 animate-pulse delay-700" />
        <div className="absolute bottom-32 right-24 w-12 h-12 bg-gradient-to-br from-blue-400/30 to-cyan-600/30 rounded-full animate-pulse delay-1200" />
        <div className="absolute top-1/3 right-16 w-8 h-8 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-lg rotate-45 animate-pulse delay-300" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8 backdrop-blur-sm bg-white/10 dark:bg-slate-900/10 border-b border-white/20 dark:border-slate-700/20">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary" />
            <Sparkles className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
            Sentinel Shield
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-all duration-200 font-medium px-4 py-2 rounded-lg hover:bg-white/20 dark:hover:bg-slate-800/20 backdrop-blur-sm"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-2 rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Enhanced Trust Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/50 dark:to-blue-950/50 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="relative">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Live Protection Active</span>
            <div className="w-px h-4 bg-emerald-300 dark:bg-emerald-700" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">50,000+ organizations protected</span>
            <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
          </div>
          
          {/* Enhanced Main Heading */}
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
              <div className="relative inline-block">
                <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent animate-gradient">
                  Enterprise
                </span>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-bounce" />
              </div>
              <br />
              <div className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                  Security Platform
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-indigo-600/30 rounded-full" />
              </div>
            </h1>
            
            {/* Floating Security Icons */}
            <div className="absolute -top-8 -left-8 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl rotate-12 animate-float hidden lg:block">
              <Shield className="w-6 h-6 text-blue-600 m-3" />
            </div>
            <div className="absolute -top-4 -right-12 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl -rotate-12 animate-float-delayed hidden lg:block">
              <Lock className="w-5 h-5 text-purple-600 m-2.5" />
            </div>
          </div>
          
          {/* Enhanced Subtitle */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl md:text-2xl leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
              Comprehensive cybersecurity dashboard that monitors your entire digital infrastructure in real-time. Get <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">instant threat alerts</span>, 
              <span className="font-bold text-emerald-600 dark:text-emerald-400">vulnerability assessments</span>, and 
              <span className="font-bold text-orange-600 dark:text-orange-400">compliance tracking</span> all in one unified platform.
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              Monitor network traffic, manage user access, track security incidents, and generate detailed reports. Everything you need to keep your organization secure and compliant.
            </p>
          </div>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <Link
              href="/register"
              className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 min-w-[240px] justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <span>Launch Protection</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <Link
              href="#demo"
              className="group text-slate-700 dark:text-slate-300 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-300 backdrop-blur-sm border-2 border-slate-300/50 dark:border-slate-600/50 hover:border-slate-400/70 dark:hover:border-slate-500/70 flex items-center gap-3 min-w-[240px] justify-center"
            >
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Watch Demo</span>
              <MousePointer2 className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Link>
          </div>
          
          {/* Enhanced Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-300 group">
              <CheckCircle className="h-5 w-5 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 dark:text-slate-300">Free Forever</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-300 group">
              <Award className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 dark:text-slate-300">Lifetime Access</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-300 group">
              <Clock className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 dark:text-slate-300">No Subscriptions</span>
            </div>
          </div>
          
          {/* Security Metrics Preview */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center group cursor-pointer">
              <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                99.9%
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">Threat Detection</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                &lt;10ms
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">Response Time</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">Monitoring</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                0
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">Breaches</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 dark:via-blue-950/30 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-500/30 mb-6">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Enterprise Security</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                Advanced Security
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive protection powered by cutting-edge AI technology and military-grade security protocols
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "AI Threat Detection",
                description: "Advanced machine learning algorithms continuously analyze patterns and identify potential security threats in real-time, preventing attacks before they happen.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-500/10 to-cyan-500/5",
                stats: "99.9% Detection Rate"
              },
              {
                icon: Lock,
                title: "Military Encryption",
                description: "AES-256 military-grade encryption with quantum-resistant algorithms ensures your data remains secure against current and future threats.",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-500/10 to-pink-500/5",
                stats: "256-bit Encryption"
              },
              {
                icon: Eye,
                title: "24/7 Monitoring",
                description: "Global security operations center with expert analysts providing round-the-clock surveillance and instant threat response capabilities.",
                gradient: "from-emerald-500 to-teal-500",
                bgGradient: "from-emerald-500/10 to-teal-500/5",
                stats: "<1ms Response Time"
              },
              {
                icon: Zap,
                title: "Instant Response",
                description: "Automated incident response system with AI-powered threat neutralization and real-time security orchestration across all endpoints.",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-500/10 to-red-500/5",
                stats: "Automated Defense"
              },
              {
                icon: Users,
                title: "Team Security",
                description: "Enterprise-grade collaboration platform with zero-trust architecture, role-based access controls, and comprehensive audit trails.",
                gradient: "from-indigo-500 to-blue-500",
                bgGradient: "from-indigo-500/10 to-blue-500/5",
                stats: "Zero-Trust Model"
              },
              {
                icon: BarChart3,
                title: "Security Analytics",
                description: "Comprehensive security intelligence dashboard with predictive analytics, threat hunting capabilities, and detailed compliance reporting.",
                gradient: "from-violet-500 to-purple-500",
                bgGradient: "from-violet-500/10 to-purple-500/5",
                stats: "Real-time Insights"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`group relative p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} dark:${feature.bgGradient} backdrop-blur-sm border border-white/20 dark:border-slate-700/20 hover:border-white/30 dark:hover:border-slate-600/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 cursor-pointer overflow-hidden`}
                >
                  {/* Card Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Stats Badge */}
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/30 backdrop-blur-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{feature.stats}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 dark:group-hover:from-slate-100 dark:group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                      <MousePointer2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-600/30 dark:to-purple-600/30 border border-blue-500/30 dark:border-blue-500/40 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">All systems operational</span>
              </div>
              <div className="w-px h-6 bg-slate-400 dark:bg-slate-600" />
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Deploy in under 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <section className="relative z-10 py-32 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-slate-50/60 to-white/80 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-slate-900/80" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute -top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-500/10 to-slate-600/10 border border-slate-500/20 dark:border-slate-500/30 mb-6">
              <BarChart3 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Trusted Worldwide</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                Numbers That
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Speak Volumes
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of organizations worldwide who trust Sentinel Shield to protect their digital assets
            </p>
          </div>
          
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                number: "99.9%",
                label: "Uptime Guarantee",
                description: "Enterprise reliability",
                icon: Shield,
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
                borderColor: "border-blue-200 dark:border-blue-800"
              },
              {
                number: "50K+",
                label: "Protected Organizations",
                description: "Across all industries",
                icon: Globe,
                gradient: "from-emerald-500 to-teal-500",
                bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
                borderColor: "border-emerald-200 dark:border-emerald-800"
              },
              {
                number: "10M+",
                label: "Threats Blocked Daily",
                description: "Malicious activities stopped",
                icon: Zap,
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
                borderColor: "border-purple-200 dark:border-purple-800"
              },
              {
                number: "24/7",
                label: "Expert Monitoring",
                description: "Never-ending vigilance",
                icon: Eye,
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30",
                borderColor: "border-orange-200 dark:border-orange-800"
              }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className={`group relative p-8 rounded-3xl bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor} hover:border-opacity-60 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-sm`}>
                  {/* Floating Icon */}
                  <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Main Number */}
                  <div className={`text-6xl md:text-7xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform duration-300 animate-gradient`}>
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-opacity-80 transition-colors">
                    {stat.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                  
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.gradient} opacity-20 blur-sm`} />
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Additional Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Enterprise Customers",
                value: "2,500+",
                description: "Fortune 500 companies trust us",
                icon: Award,
                color: "text-blue-600 dark:text-blue-400"
              },
              {
                title: "Security Incidents Prevented",
                value: "1.2M+",
                description: "This month alone",
                icon: Shield,
                color: "text-emerald-600 dark:text-emerald-400"
              },
              {
                title: "Countries Protected",
                value: "150+",
                description: "Global security coverage",
                icon: Globe,
                color: "text-purple-600 dark:text-purple-400"
              }
            ].map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <div key={index} className="group text-center p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-lg">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`w-6 h-6 ${indicator.color}`} />
                    </div>
                  </div>
                  
                  <div className={`text-3xl font-bold ${indicator.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                    {indicator.value}
                  </div>
                  
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {indicator.title}
                  </h4>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {indicator.description}
                  </p>
                </div>
              );
            })}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              Ready to join the ranks of protected organizations?
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Rocket className="w-5 h-5" />
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="relative z-10 py-32 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-white/60 to-slate-50/80 dark:from-slate-800/80 dark:via-slate-900/60 dark:to-slate-800/80" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 dark:border-purple-500/30 mb-6">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Customer Stories</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                Trusted by
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              See how organizations worldwide are transforming their security posture with Sentinel Shield
            </p>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "Sentinel Shield transformed our security posture. The AI-powered threat detection caught vulnerabilities our previous solution missed.",
                author: "John Smith",
                role: "CISO",
                company: "TechCorp",
                initials: "JS",
                gradient: "from-blue-500 to-purple-600",
                bgGradient: "from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30",
                borderColor: "border-blue-200 dark:border-blue-800",
                rating: 5,
                highlight: "AI-powered threat detection"
              },
              {
                quote: "The zero-trust architecture and seamless integration made our migration effortless. Best security investment we've made.",
                author: "Maria Johnson",
                role: "CTO",
                company: "FinanceFlow",
                initials: "MJ",
                gradient: "from-emerald-500 to-teal-600",
                bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
                borderColor: "border-emerald-200 dark:border-emerald-800",
                rating: 5,
                highlight: "zero-trust architecture"
              },
              {
                quote: "Outstanding support and the most comprehensive security dashboard we've used. Highly recommend for enterprise security.",
                author: "David Lee",
                role: "VP Security",
                company: "DataVault",
                initials: "DL",
                gradient: "from-purple-500 to-pink-600",
                bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
                borderColor: "border-purple-200 dark:border-purple-800",
                rating: 5,
                highlight: "comprehensive security dashboard"
              },
              {
                quote: "Implementation was smooth and the ROI was immediate. Our security incidents dropped by 95% in the first month.",
                author: "Sarah Chen",
                role: "Security Manager",
                company: "DataFlow Inc",
                initials: "SC",
                gradient: "from-orange-500 to-red-600",
                bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30",
                borderColor: "border-orange-200 dark:border-orange-800",
                rating: 5,
                highlight: "95% reduction"
              },
              {
                quote: "The compliance reporting features saved us weeks of work during our SOC 2 audit. Absolutely essential for any enterprise.",
                author: "Michael Torres",
                role: "Compliance Officer",
                company: "FinanceFirst",
                initials: "MT",
                gradient: "from-cyan-500 to-blue-600",
                bgGradient: "from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30",
                borderColor: "border-cyan-200 dark:border-cyan-800",
                rating: 5,
                highlight: "compliance reporting"
              },
              {
                quote: "24/7 monitoring gives us peace of mind. The threat intelligence updates are incredibly valuable for staying ahead.",
                author: "Lisa Wang",
                role: "CISO",
                company: "GlobalTech",
                initials: "LW",
                gradient: "from-indigo-500 to-purple-600",
                bgGradient: "from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30",
                borderColor: "border-indigo-200 dark:border-indigo-800",
                rating: 5,
                highlight: "threat intelligence"
              }
            ].map((testimonial, index) => (
              <div key={index} className={`group relative p-8 rounded-3xl bg-gradient-to-br ${testimonial.bgGradient} border ${testimonial.borderColor} hover:border-opacity-60 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-sm ${index >= 3 ? 'lg:col-span-1' : ''}`}>
                {/* Quote Icon */}
                <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <span className="text-white text-2xl font-bold">"</span>
                </div>
                
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                  <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-400">5.0</span>
                </div>
                
                {/* Quote */}
                <blockquote className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed text-lg font-medium relative">
                  {testimonial.quote.split(testimonial.highlight).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={`bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent font-bold`}>
                          {testimonial.highlight}
                        </span>
                      )}
                    </span>
                  ))}
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {testimonial.initials}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-lg group-hover:text-opacity-80 transition-colors">
                      {testimonial.author}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 font-medium">
                      {testimonial.role}
                    </div>
                    <div className={`text-sm font-semibold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                      {testimonial.company}
                    </div>
                  </div>
                  
                  {/* Company Badge */}
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${testimonial.gradient} bg-opacity-10 border border-current border-opacity-20`}>
                    <span className={`text-xs font-bold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                      Verified
                    </span>
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
              </div>
            ))}
          </div>
          
          {/* Trust Indicators */}
          <div className="text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { value: "4.9/5", label: "Average Rating", icon: Star, color: "text-yellow-500" },
                { value: "50K+", label: "Happy Customers", icon: Users, color: "text-blue-500" },
                { value: "99.9%", label: "Customer Satisfaction", icon: Shield, color: "text-emerald-500" },
                { value: "24/7", label: "Support Available", icon: Clock, color: "text-purple-500" }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="group text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                    
                    <div className={`text-2xl font-bold ${stat.color} mb-1 group-hover:scale-105 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Bottom CTA */}
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              Join thousands of satisfied customers protecting their digital assets
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Shield className="w-5 h-5" />
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

       {/* Pricing Section */}
       <section className="relative z-10 py-32 px-6 lg:px-8 overflow-hidden">
         {/* Background Elements */}
         <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-blue-50/30 to-purple-50/20 dark:from-slate-950/50 dark:via-blue-950/30 dark:to-purple-950/20" />
         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
         
         <div className="max-w-7xl mx-auto relative">
           <div className="text-center mb-20">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-blue-500/30 mb-6">
               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
               <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Flexible Pricing</span>
             </div>
             
             <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
               <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                 Choose Your
               </span>
               <br />
               <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                 Protection Plan
               </span>
             </h2>
             
             <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
               Enterprise-grade security solutions designed to scale with your business needs
             </p>

           </div>
           
           <div className="grid lg:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
             {/* Free Plan */}
             <div className="group relative p-8 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2">
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
               
               <div className="relative">
                 <div className="flex items-center justify-between mb-6">
                   <div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Free</h3>
                     <p className="text-slate-600 dark:text-slate-400">Perfect for getting started</p>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                     <CheckCircle className="w-6 h-6 text-white" />
                   </div>
                 </div>
                 
                 <div className="mb-8">
                   <div className="flex items-baseline mb-2">
                     <span className="text-5xl font-bold text-slate-900 dark:text-slate-100">$0</span>
                     <span className="text-slate-600 dark:text-slate-400 ml-2 text-lg">forever</span>
                   </div>
                   <p className="text-sm text-slate-500 dark:text-slate-500">No credit card required</p>
                 </div>
                 
                 <ul className="space-y-4 mb-8">
                   {[
                     "Up to 5 team members",
                     "Basic threat monitoring",
                     "Email notifications",
                     "Community support",
                     "Basic dashboard",
                     "Mobile app access"
                   ].map((feature, index) => (
                     <li key={index} className="flex items-center text-slate-700 dark:text-slate-300">
                       <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                         <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                       </div>
                       {feature}
                     </li>
                   ))}
                 </ul>
                 
                 <Link
                   href="/register"
                   className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105 inline-block text-center"
                 >
                   Get Started Free
                 </Link>
                 
                 <p className="text-center text-sm text-slate-500 dark:text-slate-500 mt-4">Always free • No hidden costs</p>
               </div>
             </div>
             
             {/* Lifetime Plan */}
             <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-2 border-blue-300 dark:border-blue-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500 transform scale-105 shadow-2xl shadow-blue-500/20">
               {/* Popular Badge */}
               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                   <span className="flex items-center gap-2">
                     <Award className="w-4 h-4" />
                     Best Value
                   </span>
                 </div>
               </div>
               
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500 rounded-3xl" />
               
               <div className="relative">
                 <div className="flex items-center justify-between mb-6">
                   <div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Lifetime</h3>
                     <p className="text-slate-600 dark:text-slate-400">One-time payment, forever access</p>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                     <Rocket className="w-6 h-6 text-white" />
                   </div>
                 </div>
                 
                 <div className="mb-8">
                   <div className="flex items-baseline mb-2">
                     <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$39</span>
                     <span className="text-slate-600 dark:text-slate-400 ml-2 text-lg">once</span>
                   </div>
                   <p className="text-sm text-slate-500 dark:text-slate-500">One-time payment • Lifetime access</p>
                 </div>
                 
                 <ul className="space-y-4 mb-8">
                   {[
                     "Unlimited team members",
                     "Advanced threat detection",
                     "Real-time alerts & notifications",
                     "Priority email support",
                     "Advanced analytics & reporting",
                     "API access",
                     "Custom integrations",
                     "Lifetime updates"
                   ].map((feature, index) => (
                     <li key={index} className="flex items-center text-slate-700 dark:text-slate-300">
                       <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3 flex-shrink-0">
                         <CheckCircle className="w-3 h-3 text-white" />
                       </div>
                       {feature}
                     </li>
                   ))}
                 </ul>
                 
                 <Link
                   href="/register"
                   className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl group-hover:scale-105 inline-block text-center"
                 >
                   Get Lifetime Access
                 </Link>
                 
                 <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">Pay once, use forever • No recurring fees</p>
               </div>
             </div>

           </div>
           
           {/* Enhanced Trust Indicators */}
           <div className="text-center">
             <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 font-medium">
               Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">10,000+</span> companies worldwide
             </p>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { icon: Shield, label: "SOC 2 Type II", sublabel: "Certified" },
                 { icon: Lock, label: "GDPR & CCPA", sublabel: "Compliant" },
                 { icon: Award, label: "ISO 27001", sublabel: "Certified" },
                 { icon: BarChart3, label: "99.99%", sublabel: "Uptime SLA" }
               ].map((item, index) => {
                 const IconComponent = item.icon;
                 return (
                   <div key={index} className="group flex flex-col items-center p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg">
                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                       <IconComponent className="w-6 h-6 text-white" />
                     </div>
                     <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{item.label}</h4>
                     <p className="text-sm text-slate-600 dark:text-slate-400">{item.sublabel}</p>
                   </div>
                 );
               })}
             </div>
             
             {/* Money Back Guarantee */}
             <div className="mt-12 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
               <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                 <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
               </div>
               <div className="text-left">
                 <p className="font-semibold text-green-800 dark:text-green-300">30-Day Money-Back Guarantee</p>
                 <p className="text-sm text-green-600 dark:text-green-400">No questions asked, full refund policy</p>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* How It Works Section */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/30 to-transparent dark:via-slate-950/30" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 dark:border-emerald-500/30 mb-6">
                <Play className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Simple Process</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                  How It
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Works
                </span>
              </h2>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Get enterprise-grade security up and running in minutes, not months
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {[
                {
                  step: "01",
                  title: "Quick Setup",
                  description: "Deploy our lightweight agent across your infrastructure in under 5 minutes. No complex configurations or lengthy installations required.",
                  icon: Rocket,
                  gradient: "from-blue-500 to-cyan-500",
                  bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
                },
                {
                  step: "02",
                  title: "AI Learning",
                  description: "Our AI immediately begins learning your environment, establishing baselines, and identifying normal vs. suspicious behavior patterns.",
                  icon: BarChart3,
                  gradient: "from-purple-500 to-pink-500",
                  bgColor: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30"
                },
                {
                  step: "03",
                  title: "Active Protection",
                  description: "Real-time threat detection and automated response systems activate, providing 24/7 protection with continuous monitoring and alerts.",
                  icon: Shield,
                  gradient: "from-emerald-500 to-teal-500",
                  bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30"
                }
              ].map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="group relative">
                    {/* Connection Line */}
                    {index < 2 && (
                      <div className="hidden lg:block absolute top-16 left-full w-12 h-px bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-600 z-10" />
                    )}
                    
                    <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${step.bgColor} border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group`}>
                      {/* Step Number */}
                      <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold text-lg">{step.step}</span>
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">{step.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Bottom Stats */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "<5min", label: "Average Setup Time" },
                { number: "99.9%", label: "Threat Detection Rate" },
                { number: "24/7", label: "Continuous Monitoring" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">{stat.number}</div>
                  <div className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Security Benefits Section */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-orange-50/20 to-red-50/20 dark:from-slate-950/50 dark:via-orange-950/20 dark:to-red-950/20" />
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-orange-500/10 to-transparent rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 dark:border-orange-500/30 mb-6">
                  <Shield className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Security Benefits</span>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                    Why Choose
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                    Sentinel Shield?
                  </span>
                </h2>
                
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                  Experience the difference that enterprise-grade security makes for your business operations and peace of mind.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Reduce Security Incidents by 95%",
                      description: "Our AI-powered threat detection prevents attacks before they impact your business"
                    },
                    {
                      title: "Save 40+ Hours Per Week",
                      description: "Automated security operations eliminate manual monitoring and response tasks"
                    },
                    {
                      title: "Ensure 99.99% Compliance",
                      description: "Built-in compliance frameworks keep you audit-ready at all times"
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{benefit.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Shield, title: "Threat Prevention", value: "99.9%", color: "from-blue-500 to-cyan-500" },
                    { icon: Zap, title: "Response Time", value: "<1ms", color: "from-purple-500 to-pink-500" },
                    { icon: Lock, title: "Data Protection", value: "256-bit", color: "from-emerald-500 to-teal-500" },
                    { icon: BarChart3, title: "Uptime SLA", value: "99.99%", color: "from-orange-500 to-red-500" }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className={`group p-6 rounded-2xl bg-gradient-to-br ${item.color} text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}>
                        <IconComponent className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                        <div className="text-3xl font-bold mb-1">{item.value}</div>
                        <div className="text-sm opacity-90">{item.title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/30" />
          
          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 dark:border-blue-500/30 mb-6">
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Common Questions</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                  Frequently Asked
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Everything you need to know about Sentinel Shield security solutions
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "How quickly can I deploy Sentinel Shield?",
                  answer: "Sentinel Shield can be deployed in under 5 minutes. Our lightweight agent requires no complex configuration and automatically begins protecting your infrastructure immediately after installation."
                },
                {
                  question: "What types of threats does Sentinel Shield detect?",
                  answer: "Our AI-powered system detects malware, ransomware, insider threats, data breaches, network intrusions, phishing attacks, and zero-day exploits. We continuously update our threat intelligence to stay ahead of emerging security risks."
                },
                {
                  question: "Is Sentinel Shield compliant with industry regulations?",
                  answer: "Yes, Sentinel Shield is built with compliance in mind. We support GDPR, HIPAA, SOC 2, ISO 27001, PCI DSS, and other major compliance frameworks with automated reporting and audit trails."
                },
                {
                  question: "Can I integrate Sentinel Shield with my existing security tools?",
                  answer: "Absolutely. Sentinel Shield offers extensive API access and pre-built integrations with popular SIEM systems, ticketing platforms, and security orchestration tools. Our team can help with custom integrations as needed."
                },
                {
                  question: "What kind of support do you provide?",
                  answer: "We offer 24/7 support for all plans, with priority support for Professional and Enterprise customers. Our security experts are available via chat, email, and phone, plus dedicated account management for Enterprise clients."
                },
                {
                  question: "How does pricing work for larger organizations?",
                  answer: "Enterprise pricing is customized based on your specific needs, including number of endpoints, data volume, and required features. Contact our sales team for a personalized quote and volume discounts."
                }
              ].map((faq, index) => (
                <div key={index} className="group p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Contact CTA */}
            <div className="text-center mt-16">
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                Still have questions? Our security experts are here to help.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Users className="w-5 h-5" />
                Contact Our Experts
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-blue-600/90 to-purple-600/90 backdrop-blur-sm" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Secure Your Digital Future?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of organizations that trust Sentinel Shield to protect their most valuable digital assets. 
              Start your free trial today and experience next-generation cybersecurity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group bg-white text-primary px-10 py-4 rounded-2xl text-lg font-bold hover:bg-slate-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center gap-3"
              >
                Start Your Free Trial
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border-2 border-white/30 flex items-center gap-3"
              >
                Contact Sales
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>24/7 support included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-white">
                  Sentinel Shield
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Next-generation cybersecurity solutions that evolve with the threat landscape.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/integrations" className="text-slate-400 hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="/api" className="text-slate-400 hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-slate-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="text-slate-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/status" className="text-slate-400 hover:text-white transition-colors">Status</Link></li>
                <li><Link href="/security" className="text-slate-400 hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-400">
                © 2024 Sentinel Shield. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Go to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
        aria-label="Go to top"
      >
        <ChevronUp className="w-6 h-6 group-hover:animate-bounce" />
      </button>
      </div>
    </>
  );
}
