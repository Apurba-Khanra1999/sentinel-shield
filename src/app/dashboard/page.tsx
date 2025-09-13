
"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  KeyRound,
  NotebookText,
  FilePlus2,
  ListPlus,
  User,
  ChevronRight,
  Clock,
  Target,
  PieChart as PieChartIcon,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";

// Types
interface Password {
  id: string;
  category: string;
}

interface Note {
  id: string;
  category: string;
}

interface ShoppingList {
  id: number;
  name: string;
}

interface ShoppingItem {
  id: number;
  list_id: number;
  is_completed: boolean;
}

interface RecentActivity {
  type: 'password' | 'note' | 'list';
  action: string;
  target: string;
  time: string;
}

interface DashboardStats {
  totalPasswords: number;
  totalNotes: number;
  totalLists: number;
  completedItems: number;
  passwordCategories: { name: string; value: number; color: string }[];
  noteCategories: { name: string; value: number; fill: string }[];
  completionRate: number; // percentage of completed shopping items
  totalItems: number;     // total shopping items
  recentActivity: RecentActivity[];
}

const passwordCategoryData = [
  { name: "Personal", value: 1, color: "hsl(var(--chart-1))" },
  { name: "Social", value: 1, color: "hsl(var(--chart-2))" },
  { name: "Work", value: 1, color: "hsl(var(--chart-3))" },
  { name: "Banking", value: 1, color: "hsl(var(--chart-4))" },
];

const notesCategoryData = [
  { name: "Work", value: 2, fill: "hsl(var(--chart-1))" },
  { name: "Personal", value: 1, fill: "hsl(var(--chart-2))" },
  { name: "Ideas", value: 1, fill: "hsl(var(--chart-3))" },
];

// Mock data for fallback - will be replaced by real data from API
const mockRecentActivity = [
    { type: 'password', action: 'Added', target: 'Google', time: '2h ago' },
    { type: 'note', action: 'Created', target: 'Q3 Project Plan', time: '5h ago' },
    { type: 'list', action: 'Completed', target: 'Weekly Groceries', time: '1d ago' },
]

// Activity trend data for the past 7 days
const activityTrendData = [
  { day: 'Mon', passwords: 2, notes: 1, lists: 0, total: 3 },
  { day: 'Tue', passwords: 1, notes: 3, lists: 1, total: 5 },
  { day: 'Wed', passwords: 3, notes: 2, lists: 2, total: 7 },
  { day: 'Thu', passwords: 1, notes: 1, lists: 1, total: 3 },
  { day: 'Fri', passwords: 2, notes: 4, lists: 0, total: 6 },
  { day: 'Sat', passwords: 0, notes: 2, lists: 3, total: 5 },
  { day: 'Sun', passwords: 1, notes: 1, lists: 1, total: 3 },
]

// Security score data
const securityMetrics = [
  { name: 'Strong Passwords', value: 85, fill: 'hsl(var(--chart-1))' },
  { name: 'Weak Passwords', value: 15, fill: 'hsl(var(--chart-5))' },
]

// Productivity insights
const productivityData = [
  { category: 'Passwords', thisWeek: 12, lastWeek: 8 },
  { category: 'Notes', thisWeek: 15, lastWeek: 12 },
  { category: 'Lists', thisWeek: 8, lastWeek: 6 },
]

// Usage statistics over time
const usageStatsData = [
  { month: 'Jan', logins: 45, notes: 23, lists: 12 },
  { month: 'Feb', logins: 52, notes: 31, lists: 18 },
  { month: 'Mar', logins: 48, notes: 28, lists: 15 },
  { month: 'Apr', logins: 61, notes: 35, lists: 22 },
  { month: 'May', logins: 55, notes: 42, lists: 19 },
  { month: 'Jun', logins: 67, notes: 38, lists: 25 },
]

// Overall system health
const systemHealthData = [
  { name: 'Security Score', value: 92, fill: 'hsl(var(--chart-1))' },
  { name: 'Data Backup', value: 100, fill: 'hsl(var(--chart-2))' },
  { name: 'System Performance', value: 88, fill: 'hsl(var(--chart-3))' },
]

// Helper function to format timestamps
const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const created = new Date(timestamp);
  const diffMs = now.getTime() - created.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 60) {
    return `${diffMins} min ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
};

// Helper function to parse time ago for sorting
const parseTimeAgo = (timeAgo: string): number => {
  const match = timeAgo.match(/(\d+)\s+(min|hour|day)/);
  if (!match) return 0;
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  switch (unit) {
    case 'min': return value;
    case 'hour': return value * 60;
    case 'day': return value * 60 * 24;
    default: return 0;
  }
};

export default function DashboardPage() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalPasswords: 0,
    totalNotes: 0,
    totalLists: 0,
    completedItems: 0,
    passwordCategories: [],
    noteCategories: [],
    completionRate: 0,
    totalItems: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  // API functions
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch passwords
      const passwordsResponse = await fetch('/api/passwords');
      const passwordsData = passwordsResponse.ok ? await passwordsResponse.json() : { data: [] };
      const passwords: Password[] = passwordsData.data || [];
      
      // Fetch notes
      const notesResponse = await fetch('/api/notes');
      const notesData = notesResponse.ok ? await notesResponse.json() : { data: [] };
      const notes: Note[] = notesData.data || [];
      
      // Fetch shopping lists
      const listsResponse = await fetch('/api/shopping-lists');
      const listsData = listsResponse.ok ? await listsResponse.json() : { data: [] };
      const lists: ShoppingList[] = listsData.data || [];
      
      // Fetch shopping items for completion count
      let allItems: ShoppingItem[] = [];
      for (const list of lists) {
        try {
          const itemsResponse = await fetch(`/api/shopping-items?listId=${list.id}`);
          if (itemsResponse.ok) {
            const itemsData = await itemsResponse.json();
            allItems = [...allItems, ...(itemsData.data || [])];
          }
        } catch (error) {
          console.error(`Error fetching items for list ${list.id}:`, error);
        }
      }
      
      // Calculate password categories
      const passwordCategoryCount = passwords.reduce((acc, password) => {
        acc[password.category] = (acc[password.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const passwordCategories = Object.entries(passwordCategoryCount).map(([name, value], index) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: `hsl(var(--chart-${(index % 5) + 1}))`
      }));
      
      // Calculate note categories
      const noteCategoryCount = notes.reduce((acc, note) => {
        acc[note.category] = (acc[note.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const noteCategories = Object.entries(noteCategoryCount).map(([name, value], index) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        fill: `hsl(var(--chart-${(index % 5) + 1}))`
      }));
      
      const completedItems = allItems.filter(item => item.is_completed).length;
      const totalItems = allItems.length;
      const completionRate = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

      // Collect recent activity from all sources
      const recentActivity: RecentActivity[] = [];
      
      // Add recent passwords (last 5)
      passwords.slice(0, 5).forEach(password => {
        recentActivity.push({
          type: 'password',
          action: 'Added',
          target: password.title || password.website || 'Password',
          time: formatTimeAgo(password.created_at)
        });
      });
      
      // Add recent notes (last 5)
      notes.slice(0, 5).forEach(note => {
        recentActivity.push({
          type: 'note',
          action: 'Created',
          target: note.title || 'Note',
          time: formatTimeAgo(note.created_at)
        });
      });
      
      // Add recent shopping lists (last 5)
      lists.slice(0, 5).forEach(list => {
        recentActivity.push({
          type: 'list',
          action: 'Created',
          target: list.name,
          time: formatTimeAgo(list.created_at)
        });
      });
      
      // Sort by most recent and take top 5
      recentActivity.sort((a, b) => {
        const timeA = parseTimeAgo(a.time);
        const timeB = parseTimeAgo(b.time);
        return timeA - timeB;
      });
      
      setDashboardStats({
        totalPasswords: passwords.length,
        totalNotes: notes.length,
        totalLists: lists.length,
        completedItems,
        passwordCategories,
        noteCategories,
        completionRate,
        totalItems,
        recentActivity: recentActivity.slice(0, 5)
      });
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 space-y-6">
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Welcome to Sentinel Shield
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Your all-in-one personal security and productivity hub.
              </CardDescription>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Button asChild size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Link href="/dashboard/passwords">
                  <KeyRound className="mr-2 h-4 w-4" />
                  Add Password
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10">
                <Link href="/dashboard/notes">
                  <NotebookText className="mr-2 h-4 w-4" />
                  New Note
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50/50 to-background dark:from-blue-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passwords</CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <KeyRound className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {loading ? "..." : dashboardStats.totalPasswords}
            </div>
            <p className="text-xs text-muted-foreground">
              Stored securely
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50/50 to-background dark:from-purple-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Notes</CardTitle>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <NotebookText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {loading ? "..." : dashboardStats.totalNotes}
            </div>
            <p className="text-xs text-muted-foreground">
              Personal notes
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 bg-gradient-to-br from-green-50/50 to-background dark:from-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shopping Lists</CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ListPlus className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {loading ? "..." : dashboardStats.totalLists}
            </div>
            <p className="text-xs text-muted-foreground">
              Active lists
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50/50 to-background dark:from-orange-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              {loading ? "..." : dashboardStats.completedItems}
            </div>
            <p className="text-xs text-muted-foreground">
              Shopping items done
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Password Distribution */}
        <Card className="flex flex-col hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50/30 via-background to-purple-50/30 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-sm">
                <PieChartIcon className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Password Categories</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-[220px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-xl p-4 animate-in fade-in-0 zoom-in-95">
                            <div className="flex items-center gap-2 mb-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: payload[0].payload.color }}
                              />
                              <p className="font-semibold text-foreground">{payload[0].name}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">{payload[0].value}</span> passwords
                            </p>
                            <div className="text-xs text-muted-foreground mt-1">
                              {((payload[0].value / (dashboardStats.totalPasswords || 1)) * 100).toFixed(1)}% of total
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Pie
                    data={dashboardStats.passwordCategories.length > 0 ? dashboardStats.passwordCategories : passwordCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={75}
                    innerRadius={25}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                    filter="url(#shadow)"
                    animationBegin={0}
                    animationDuration={800}
                    onMouseEnter={(_, index) => {
                      // Add hover effect by slightly expanding the segment
                    }}
                  >
                    {(dashboardStats.passwordCategories.length > 0 ? dashboardStats.passwordCategories : passwordCategoryData).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    ))}
                  </Pie>
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "11px",
                      paddingTop: "10px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
              <Link href="/dashboard/passwords">Manage Passwords</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Note Categories */}
        <Card className="flex flex-col hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50/30 via-background to-green-50/30 dark:from-purple-950/20 dark:via-background dark:to-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-green-600 rounded-lg shadow-sm">
                <NotebookText className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">Note Categories</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-[220px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <filter id="noteShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-xl p-4 animate-in fade-in-0 zoom-in-95">
                            <div className="flex items-center gap-2 mb-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: payload[0].payload.fill }}
                              />
                              <p className="font-semibold text-foreground">{payload[0].name}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">{payload[0].value}</span> notes
                            </p>
                            <div className="text-xs text-muted-foreground mt-1">
                              {((payload[0].value / (dashboardStats.totalNotes || 1)) * 100).toFixed(1)}% of total
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Pie
                    data={dashboardStats.noteCategories.length > 0 ? dashboardStats.noteCategories : notesCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={75}
                    innerRadius={25}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                    filter="url(#noteShadow)"
                    animationBegin={200}
                    animationDuration={800}
                    onMouseEnter={(_, index) => {
                      // Add hover effect for note categories
                    }}
                  >
                    {(dashboardStats.noteCategories.length > 0 ? dashboardStats.noteCategories : notesCategoryData).map((entry, index) => (
                      <Cell 
                        key={`cell-note-${index}`} 
                        fill={entry.fill}
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    ))}
                  </Pie>
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "11px",
                      paddingTop: "10px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild size="sm" className="w-full bg-gradient-to-r from-purple-500 to-green-600 hover:from-purple-600 hover:to-green-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
              <Link href="/dashboard/notes">Manage Notes</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Completion Rate */}
        <Card className="flex flex-col hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50/30 via-background to-orange-50/30 dark:from-green-950/20 dark:via-background dark:to-orange-950/20">
          <CardHeader className="flex flex-col items-center space-y-0 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-green-500 to-orange-500 rounded-lg shadow-sm">
                <Target className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">Shopping Completion</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center flex-1">
            <div className="h-[180px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="60%" 
                  outerRadius="90%" 
                  barSize={12}
                  data={[{
                    name: 'Completion',
                    value: loading ? 0 : dashboardStats.completionRate,
                    fill: 'url(#completionGradient)'
                  }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-xl p-4 animate-in fade-in-0 zoom-in-95">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-orange-500" />
                              <p className="font-semibold text-foreground">Shopping Progress</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">{payload[0].value}%</span> completed
                            </p>
                            <div className="text-xs text-muted-foreground mt-1">
                              {dashboardStats.completedItems} of {dashboardStats.totalItems} items done
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <defs>
                    <linearGradient id="completionGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <filter id="completionShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="2" stdDeviation="4" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  <RadialBar 
                    dataKey="value" 
                    cornerRadius={6}
                    fill="url(#completionGradient)"
                    filter="url(#completionShadow)"
                    animationBegin={400}
                    animationDuration={1000}
                  />
                  <text 
                    x="50%" 
                    y="50%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    className="fill-foreground font-bold text-3xl"
                  >
                    {loading ? "..." : `${dashboardStats.completionRate}%`}
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-muted-foreground">
                {loading ? "Loading..." : `${dashboardStats.completedItems} of ${dashboardStats.totalItems} items completed`}
              </p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-muted-foreground">Completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <span className="text-xs text-muted-foreground">Remaining</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild size="sm" className="w-full bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
              <Link href="/dashboard/shopping-lists">View Shopping Lists</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Recent Activity
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardStats.recentActivity.length > 0 ? (
                dashboardStats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'password' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      activity.type === 'note' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      activity.type === 'list' ? 'bg-green-100 dark:bg-green-900/30' :
                      'bg-orange-100 dark:bg-orange-900/30'
                    }`}>
                      {activity.type === 'password' && <KeyRound className="h-3 w-3 text-blue-600 dark:text-blue-400" />}
                      {activity.type === 'note' && <NotebookText className="h-3 w-3 text-purple-600 dark:text-purple-400" />}
                      {activity.type === 'list' && <ListPlus className="h-3 w-3 text-green-600 dark:text-green-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        <span className="text-primary">{activity.action}</span> {activity.target}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start h-11 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 group">
              <Link href="/dashboard/passwords">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                  <KeyRound className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Add Password</div>
                  <div className="text-xs text-muted-foreground">Store a new login</div>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start h-11 hover:bg-purple-50 hover:border-purple-200 dark:hover:bg-purple-950/20 group">
              <Link href="/dashboard/notes">
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-md mr-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
                  <NotebookText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Create Note</div>
                  <div className="text-xs text-muted-foreground">Write something down</div>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start h-11 hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-950/20 group">
              <Link href="/dashboard/shopping-lists">
                <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md mr-3 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors">
                  <ListPlus className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Shopping List</div>
                  <div className="text-xs text-muted-foreground">Plan your shopping</div>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start h-11 hover:bg-orange-50 hover:border-orange-200 dark:hover:bg-orange-950/20 group">
              <Link href="/dashboard/profile">
                <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-md mr-3 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/40 transition-colors">
                  <User className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Profile</div>
                  <div className="text-xs text-muted-foreground">View your account</div>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
