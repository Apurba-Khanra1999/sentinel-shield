
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Copy,
  MoreVertical,
  PlusCircle,
  Search,
  Trash2,
  Edit,
  KeyRound,
  Eye,
  EyeOff,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Filter,
  Globe,
  Building,
  CreditCard,
  Users,
  Folder,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Helper functions
const getPasswordStrength = (password: string) => {
  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  let score = 0;
  if (length >= 8) score++;
  if (length >= 12) score++;
  if (hasUpper) score++;
  if (hasLower) score++;
  if (hasNumbers) score++;
  if (hasSpecial) score++;
  
  if (score >= 5) return { level: 'Strong', color: 'bg-green-500', icon: ShieldCheck };
  if (score >= 3) return { level: 'Medium', color: 'bg-yellow-500', icon: Shield };
  return { level: 'Weak', color: 'bg-red-500', icon: ShieldAlert };
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Personal': return Globe;
    case 'Work': return Building;
    case 'Banking': return CreditCard;
    case 'Social': return Users;
    default: return Folder;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Personal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'Work': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'Banking': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Social': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

interface Password {
  id: string;
  title: string;
  website?: string;
  username: string;
  password: string;
  category: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

const categories = ["Personal", "Work", "Banking", "Social", "Other"];

export default function PasswordsPage() {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingPassword, setEditingPassword] = useState<any>(null);
  const { toast } = useToast();
  const [visiblePasswords, setVisiblePasswords] = useState(new Set<string>());
  const [isEditingPasswordVisible, setIsEditingPasswordVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; passwordId: string | null; passwordService: string }>({ isOpen: false, passwordId: null, passwordService: "" });

  // Fetch passwords from API
  const fetchPasswords = async () => {
    try {
      const response = await fetch('/api/passwords');
      if (response.ok) {
        const result = await response.json();
        setPasswords(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching passwords:', error);
      setPasswords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredPasswords = passwords
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p) =>
      categoryFilter === "All" ? true : p.category === categoryFilter
    );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Password has been copied.",
    });
  };

  const handleSavePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPassword) return;

    try {
      if (editingPassword.id) {
        // Update existing password
        const response = await fetch('/api/passwords', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingPassword)
        });
        if (response.ok) {
          await fetchPasswords();
          toast({
            title: "Password updated!",
            description: "Your password has been successfully updated.",
          });
        }
      } else {
        // Add new password
        const response = await fetch('/api/passwords', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: editingPassword.title,
            website: editingPassword.website,
            username: editingPassword.username,
            password: editingPassword.password,
            category: editingPassword.category,
            notes: editingPassword.notes
          })
        });
        if (response.ok) {
          await fetchPasswords();
          toast({
            title: "Password added!",
            description: "Your new password has been saved securely.",
          });
        }
      }
    } catch (error) {
      console.error('Error saving password:', error);
    }
    setEditingPassword(null);
    setIsEditingPasswordVisible(false);
  };
  
  const handleDelete = (id: string) => {
    const password = passwords.find(p => p.id === id);
    if (password) {
      setDeleteConfirmation({ isOpen: true, passwordId: id, passwordService: password.title });
    }
  };

  const confirmDelete = async () => {
    if (deleteConfirmation.passwordId) {
      try {
        const response = await fetch('/api/passwords', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: deleteConfirmation.passwordId })
        });
        if (response.ok) {
          await fetchPasswords();
          toast({
            title: "Password deleted!",
            description: `Password for ${deleteConfirmation.passwordService} has been removed.`,
          });
        }
      } catch (error) {
        console.error('Error deleting password:', error);
      }
    }
    setDeleteConfirmation({ isOpen: false, passwordId: null, passwordService: "" });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, passwordId: null, passwordService: "" });
  }

  const openAddDialog = () => {
    setEditingPassword({
      id: "",
      title: "",
      website: "",
      username: "",
      password: "",
      category: "Personal",
      notes: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setIsEditingPasswordVisible(false);
  };
  
  const openEditDialog = (password: Password) => {
    setEditingPassword(password);
    setIsEditingPasswordVisible(false);
  }

  // Calculate statistics
  const totalPasswords = passwords.length;
  const strongPasswords = passwords.filter(p => getPasswordStrength(p.password).level === 'Strong').length;
  const weakPasswords = passwords.filter(p => getPasswordStrength(p.password).level === 'Weak').length;
  const categoryCounts = passwords.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex-1 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-headline text-3xl font-bold tracking-tight">Password Vault</h1>
          <p className="text-muted-foreground">
            Secure and encrypted password management for all your accounts.
          </p>
        </div>
        <Dialog
          open={!!editingPassword}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setEditingPassword(null);
              setIsEditingPasswordVisible(false);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-sm" onClick={openAddDialog}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPassword?.id ? "Edit" : "Add"} Password
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSavePassword}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={editingPassword?.title || ""}
                    onChange={(e) =>
                      setEditingPassword({
                        ...editingPassword!,
                        title: e.target.value,
                      })
                    }
                    className="col-span-3"
                    placeholder="e.g. Google Account"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="website" className="text-right">
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={editingPassword?.website || ""}
                    onChange={(e) =>
                      setEditingPassword({
                        ...editingPassword!,
                        website: e.target.value,
                      })
                    }
                    className="col-span-3"
                    placeholder="e.g. https://google.com"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={editingPassword?.username || ""}
                    onChange={(e) =>
                      setEditingPassword({
                        ...editingPassword!,
                        username: e.target.value,
                      })
                    }
                    className="col-span-3"
                    placeholder="e.g. user@gmail.com"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <div className="relative col-span-3">
                    <Input
                      id="password"
                      type={isEditingPasswordVisible ? "text" : "password"}
                      value={editingPassword?.password || ""}
                      onChange={(e) =>
                        setEditingPassword({
                          ...editingPassword!,
                          password: e.target.value,
                        })
                      }
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setIsEditingPasswordVisible(prev => !prev)}
                    >
                      {isEditingPasswordVisible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={editingPassword?.category || ""}
                    onValueChange={(value) =>
                      setEditingPassword({
                        ...editingPassword!,
                        category: value,
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passwords</CardTitle>
            <KeyRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPasswords}</div>
            <p className="text-xs text-muted-foreground">
              Across {Object.keys(categoryCounts).length} categories
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Strong Passwords</CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{strongPasswords}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((strongPasswords / totalPasswords) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weak Passwords</CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{weakPasswords}</div>
            <p className="text-xs text-muted-foreground">
              {weakPasswords > 0 ? 'Need attention' : 'All secure!'}
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used Category</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.entries(categoryCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'None'}
            </div>
            <p className="text-xs text-muted-foreground">
              {Object.entries(categoryCounts).sort(([,a], [,b]) => b - a)[0]?.[1] || 0} passwords
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Saved Logins</CardTitle>
          <CardDescription>
            {loading ? 'Loading...' : `You have ${passwords.length} saved logins.`}
          </CardDescription>
          <div className="flex gap-4 pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or username..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Username</TableHead>
                <TableHead className="font-semibold">Password & Security</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Last Used</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <div className="text-lg font-semibold">Loading passwords...</div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredPasswords.length > 0 ? (
                filteredPasswords.map((p) => {
                  const strength = getPasswordStrength(p.password);
                  const CategoryIcon = getCategoryIcon(p.category);
                  const StrengthIcon = strength.icon;
                  
                  return (
                    <TableRow key={p.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <KeyRound className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-sm text-muted-foreground">Created {new Date(p.created_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        <div className="font-mono text-sm">{p.username}</div>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm w-32 truncate">
                              {visiblePasswords.has(p.id) ? p.password : '••••••••••••'}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePasswordVisibility(p.id)}
                              className="h-7 w-7 p-0"
                            >
                              {visiblePasswords.has(p.id) ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopy(p.password)}
                              className="h-7 w-7 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <StrengthIcon className="h-3 w-3" />
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${strength.color} text-white`}>
                              {strength.level}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        <Badge variant="secondary" className={getCategoryColor(p.category)}>
                          <CategoryIcon className="mr-1 h-3 w-3" />
                          {p.category}
                        </Badge>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        <div className="text-sm text-muted-foreground">{new Date(p.updated_at).toLocaleDateString()}</div>
                      </TableCell>
                      
                      <TableCell className="text-right py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => openEditDialog(p)}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Password</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopy(p.password)}>
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Copy Password</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopy(p.username)}>
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Copy Username</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(p.id)} 
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <KeyRound className="h-8 w-8 text-muted-foreground" />
                      <div className="text-lg font-semibold">No passwords found</div>
                      <div className="text-sm text-muted-foreground">
                        {searchTerm || categoryFilter !== 'All' 
                          ? 'Try adjusting your search or filter criteria'
                          : 'Add your first password to get started'
                        }
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && cancelDelete()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the password for <strong>{deleteConfirmation.passwordService}</strong>?</p>
            <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
