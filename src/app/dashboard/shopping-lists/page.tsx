
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  Trash2,
  Share2,
  CalendarClock,
  QrCode,
  Pencil,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ShoppingList {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface ShoppingItem {
  id: number;
  list_id: number;
  name: string;
  quantity: string;
  notes: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

// Dummy function to generate QR code data URL
const generateQrCode = (text: string) => {
  // In a real app, you would use a library like 'qrcode'
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
};

// API functions
const fetchShoppingLists = async (): Promise<ShoppingList[]> => {
  try {
    const response = await fetch('/api/shopping-lists');
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch shopping lists`);
    }
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};

const fetchShoppingItems = async (listId: number): Promise<ShoppingItem[]> => {
    try {
      const response = await fetch(`/api/shopping-items?listId=${listId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch shopping items`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please check your internet connection');
      }
      throw error;
    }
  };



const createShoppingList = async (name: string): Promise<ShoppingList> => {
  try {
    const response = await fetch('/api/shopping-lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to create shopping list`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};

const deleteShoppingList = async (id: number): Promise<void> => {
  try {
    const response = await fetch('/api/shopping-lists', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to delete shopping list`);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};

const createShoppingItem = async (item: Omit<ShoppingItem, 'id' | 'created_at' | 'updated_at'>): Promise<ShoppingItem> => {
  try {
    const response = await fetch('/api/shopping-items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to create shopping item`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};

const updateShoppingItem = async (item: ShoppingItem): Promise<ShoppingItem> => {
  try {
    const response = await fetch('/api/shopping-items', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to update shopping item`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};

const deleteShoppingItem = async (id: number): Promise<void> => {
  try {
    const response = await fetch('/api/shopping-items', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to delete shopping item`);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};

export default function ShoppingListsPage() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [listItemCounts, setListItemCounts] = useState<{[key: number]: {total: number, completed: number}}>({});
  const [loading, setLoading] = useState(true);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [newListName, setNewListName] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    notes: "",
  });
  const { toast } = useToast();
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; type: 'list' | 'item'; listId?: number; itemId?: number; listName?: string; itemName?: string }>({ isOpen: false, type: 'list' });
  const [editingItem, setEditingItem] = useState<{ isOpen: boolean; item?: ShoppingItem }>({ isOpen: false });
  const [editItemForm, setEditItemForm] = useState({ name: "", quantity: "", notes: "" });
  const [loadingStates, setLoadingStates] = useState({
    creatingList: false,
    addingItem: false,
    updatingItem: false,
    deletingList: false,
    deletingItem: false,
    togglingItem: false
  });

  const fetchAllListItemCounts = useCallback(async () => {
    const counts: {[key: number]: {total: number, completed: number}} = {};
    
    for (const list of lists) {
      try {
        const listItems = await fetchShoppingItems(list.id);
        counts[list.id] = {
          total: listItems.length,
          completed: listItems.filter(item => item.is_completed).length
        };
      } catch (error) {
        console.error(`Error fetching items for list ${list.id}:`, error);
        counts[list.id] = { total: 0, completed: 0 };
      }
    }
    
    setListItemCounts(counts);
  }, [lists]);

  useEffect(() => {
    const loadLists = async () => {
      try {
        const listsData = await fetchShoppingLists();
        setLists(listsData);
        if (listsData.length > 0 && !selectedListId) {
          setSelectedListId(listsData[0].id);
        }
      } catch (error) {
        console.error('Error loading lists:', error);
        toast({
          title: "Error",
          description: "Failed to load shopping lists",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    loadLists();
  }, []);

  useEffect(() => {
    if (lists.length > 0) {
      fetchAllListItemCounts();
    }
  }, [lists, fetchAllListItemCounts]);

  useEffect(() => {
    const loadItems = async () => {
      if (!selectedListId) {
        setItems([]);
        return;
      }
      
      try {
        const itemsData = await fetchShoppingItems(selectedListId);
        setItems(itemsData);
      } catch (error) {
        console.error('Error loading items:', error);
        toast({
          title: "Error",
          description: "Failed to load shopping items",
          variant: "destructive"
        });
      }
    };
    loadItems();
   }, [selectedListId]);

  const selectedList = Array.isArray(lists) ? lists.find((l) => l.id === selectedListId) : null;
  const selectedListItems = Array.isArray(items) ? items : [];
  const shareableLink = selectedList
    ? `${typeof window !== 'undefined' ? window.location.href : ''}?list=${selectedList.id}`
    : "";
  const qrCodeDataUrl = generateQrCode(shareableLink);

  const handleCheck = async (listId: number, itemId: number) => {
    try {
      setLoadingStates(prev => ({ ...prev, togglingItem: true }));
      const item = items.find(i => i.id === itemId);
      if (!item) return;
      
      const updatedItem = { ...item, is_completed: !item.is_completed };
      await updateShoppingItem(updatedItem);
      
      setItems(prevItems => 
        prevItems.map(i => i.id === itemId ? updatedItem : i)
      );

      // Update the item counts for this list
      setListItemCounts(prev => ({
        ...prev,
        [listId]: {
          total: prev[listId]?.total || 0,
          completed: (prev[listId]?.completed || 0) + (updatedItem.is_completed ? 1 : -1)
        }
      }));
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive"
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, togglingItem: false }));
    }
  };

  const handleCreateList = async () => {
    const trimmedName = newListName.trim();
    if (trimmedName === "") {
      toast({
        title: "Validation Error",
        description: "Please enter a list name",
        variant: "destructive"
      });
      return;
    }
    
    if (trimmedName.length > 100) {
      toast({
        title: "Validation Error",
        description: "List name must be 100 characters or less",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoadingStates(prev => ({ ...prev, creatingList: true }));
      const newList = await createShoppingList(trimmedName);
      setLists([...lists, newList]);
      setSelectedListId(newList.id);
      setNewListName("");
      toast({
        title: "List created!",
        description: `"${newList.name}" has been added to your shopping lists.`,
      });
    } catch (error) {
      console.error('Error creating list:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create shopping list";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, creatingList: false }));
    }
  };

  const handleAddItem = async () => {
    const trimmedName = newItem.name.trim();
    if (trimmedName === "") {
      toast({
        title: "Validation Error",
        description: "Please enter an item name",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedListId) {
      toast({
        title: "Validation Error",
        description: "Please select a list first",
        variant: "destructive"
      });
      return;
    }
    
    if (trimmedName.length > 100) {
      toast({
        title: "Validation Error",
        description: "Item name must be 100 characters or less",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoadingStates(prev => ({ ...prev, addingItem: true }));
      const itemToCreate = {
          listId: selectedListId,
          name: trimmedName,
          quantity: newItem.quantity,
          notes: newItem.notes.trim(),
          is_completed: false
        };
      
      const createdItem = await createShoppingItem(itemToCreate);
      setItems([...items, createdItem]);
      
      // Update the item counts for this list
      setListItemCounts(prev => ({
        ...prev,
        [selectedListId]: {
          total: (prev[selectedListId]?.total || 0) + 1,
          completed: prev[selectedListId]?.completed || 0
        }
      }));
      setNewItem({ name: "", quantity: "", notes: "" });
      
      toast({
        title: "Item added!",
        description: `"${createdItem.name}" has been added to your list.`,
      });
    } catch (error) {
      console.error('Error adding item:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to add item";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, addingItem: false }));
    }
  };

  const handleDeleteList = (listId: number) => {
    const list = Array.isArray(lists) ? lists.find(l => l.id === listId) : null;
    if (list) {
      setDeleteConfirmation({ isOpen: true, type: 'list', listId, listName: list.name });
    }
  };

  const handleDeleteItem = (listId: number, itemId: number) => {
    const list = Array.isArray(lists) ? lists.find(l => l.id === listId) : null;
    const item = Array.isArray(items) ? items.find(i => i.id === itemId) : null;
    if (list && item) {
      setDeleteConfirmation({ isOpen: true, type: 'item', listId, itemId, listName: list.name, itemName: item.name });
    }
  };

  const handleEditItem = (item: ShoppingItem) => {
    setEditingItem({ isOpen: true, item });
    setEditItemForm({ name: item.name, quantity: item.quantity, notes: item.notes || "" });
  };

  const handleUpdateItem = async () => {
    if (!editingItem.item) return;
    
    const trimmedName = editItemForm.name.trim();
    if (trimmedName === "") {
      toast({
        title: "Validation Error",
        description: "Please enter an item name",
        variant: "destructive"
      });
      return;
    }
    
    if (trimmedName.length > 100) {
      toast({
        title: "Validation Error",
        description: "Item name must be 100 characters or less",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoadingStates(prev => ({ ...prev, updatingItem: true }));
      const updatedItem = {
        ...editingItem.item,
        name: trimmedName,
        quantity: editItemForm.quantity,
        notes: editItemForm.notes.trim()
      };
      
      await updateShoppingItem(updatedItem);
      setItems(prevItems => 
        prevItems.map(i => i.id === updatedItem.id ? updatedItem : i)
      );
      
      setEditingItem({ isOpen: false });
      setEditItemForm({ name: "", quantity: "", notes: "" });
      
      toast({
        title: "Item updated!",
        description: `"${updatedItem.name}" has been updated.`,
      });
    } catch (error) {
      console.error('Error updating item:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update item";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, updatingItem: false }));
    }
  };

  const cancelEditItem = () => {
    setEditingItem({ isOpen: false });
    setEditItemForm({ name: "", quantity: "", notes: "" });
  };

  const confirmDelete = async () => {
    try {
      if (deleteConfirmation.type === 'list' && deleteConfirmation.listId) {
        setLoadingStates(prev => ({ ...prev, deletingList: true }));
        await deleteShoppingList(deleteConfirmation.listId);
        setLists(lists.filter(l => l.id !== deleteConfirmation.listId));
        setItems(items.filter(i => i.list_id !== deleteConfirmation.listId));
          
          // Remove the item counts for this list
          setListItemCounts(prev => {
            const newCounts = { ...prev };
            delete newCounts[deleteConfirmation.listId!];
            return newCounts;
          });
        
        if (selectedListId === deleteConfirmation.listId) {
          const remainingLists = lists.filter(l => l.id !== deleteConfirmation.listId);
          setSelectedListId(remainingLists.length > 0 ? remainingLists[0].id : null);
        }
        toast({
          title: "List deleted!",
          description: `"${deleteConfirmation.listName}" has been removed.`,
        });
      } else if (deleteConfirmation.type === 'item' && deleteConfirmation.itemId) {
        setLoadingStates(prev => ({ ...prev, deletingItem: true }));
        await deleteShoppingItem(deleteConfirmation.itemId);
        const itemToDelete = items.find(item => item.id === deleteConfirmation.itemId);
        setItems(items.filter(item => item.id !== deleteConfirmation.itemId));
        
        // Update the item counts for this list
        if (itemToDelete) {
          setListItemCounts(prev => ({
            ...prev,
            [itemToDelete.list_id]: {
              total: Math.max((prev[itemToDelete.list_id]?.total || 1) - 1, 0),
              completed: Math.max((prev[itemToDelete.list_id]?.completed || 0) - (itemToDelete.is_completed ? 1 : 0), 0)
            }
          }));
        }
        toast({
          title: "Item deleted!",
          description: `"${deleteConfirmation.itemName}" has been removed from "${deleteConfirmation.listName}".`,
        });
      }
    } catch (error) {
      console.error('Error deleting:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive"
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, deletingList: false, deletingItem: false }));
    }
    setDeleteConfirmation({ isOpen: false, type: 'list' });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, type: 'list' });
  }

  return (
    <div className="flex-1 space-y-6">
      <Card className="bg-gradient-to-br from-primary/10 to-background">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold tracking-tight">
            Shopping Lists
          </CardTitle>
          <CardDescription className="text-lg">
            Create and manage your interactive shopping lists with ease
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lists</CardTitle>
            <PlusCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lists.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Active</span> shopping lists
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all lists
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Array.isArray(items) ? items.filter(i => i.is_completed).length : 0}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{Array.isArray(items) ? Math.round((items.filter(i => i.is_completed).length / Math.max(items.length, 1)) * 100) : 0}%</span> completion rate
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid flex-1 gap-8 md:grid-cols-[300px_1fr]">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/50 dark:from-background dark:to-muted/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <PlusCircle className="h-5 w-5 text-primary" />
              </div>
              My Lists
              <span className="ml-auto text-sm font-normal bg-primary/10 text-primary px-2 py-1 rounded-full">
                {lists.length}
              </span>
            </CardTitle>
            <CardDescription className="text-base">
              Select a list to view and edit items
            </CardDescription>
            <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New List
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Create New Shopping List</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Give your shopping list a name to get started.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="list-name" className="text-sm font-medium">List Name</Label>
                      <Input
                        id="list-name"
                        placeholder="e.g., Weekly Groceries"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        className="h-11 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <DialogFooter className="gap-2">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="hover:bg-muted"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={handleCreateList}
                      disabled={!newListName.trim() || loadingStates.creatingList}
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      {loadingStates.creatingList ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating...
                        </>
                      ) : (
                        "Create List"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
          </CardHeader>
          <CardContent className="pt-2">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : (
              <ul className="space-y-3">
                {Array.isArray(lists) && lists.map((list) => (
                <li key={list.id}>
                  <Button
                    variant={selectedListId === list.id ? "secondary" : "ghost"}
                    className={`w-full justify-start h-12 px-4 transition-all duration-200 ${
                      selectedListId === list.id
                        ? "bg-primary/10 border-primary/20 text-primary shadow-sm dark:bg-primary/20 dark:text-primary-foreground"
                        : "hover:bg-muted hover:shadow-sm dark:hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedListId(list.id)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{list.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          {listItemCounts[list.id]?.total || 0} items
                        </span>
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          {listItemCounts[list.id]?.completed || 0}/{listItemCounts[list.id]?.total || 0}
                        </span>
                      </div>
                    </div>
                  </Button>
                </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {selectedList && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-primary/5 dark:from-background dark:to-primary/10">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Share2 className="h-5 w-5 text-primary" />
                    </div>
                    {selectedList.name}
                  </CardTitle>
                  <CardDescription className="text-base mt-2 flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {Array.isArray(selectedListItems) ? selectedListItems.filter((i) => i.is_completed).length : 0} completed
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {Array.isArray(selectedListItems) ? selectedListItems.filter((i) => !i.is_completed).length : 0} remaining
                    </span>
                    <span className="text-muted-foreground">of {selectedListItems.length} total</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="h-10 w-10 border-primary/20 hover:bg-primary/10 hover:border-primary/30">
                      <Share2 className="h-4 w-4 text-primary" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold">Share Shopping List</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Share this QR code with others to let them view your shopping list.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center py-6">
                      <div className="p-4 bg-background rounded-lg shadow-inner border-2 border-muted">
                        <img src={qrCodeDataUrl} alt="QR Code" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Input
                          readOnly
                          value={shareableLink}
                          className="flex-1 text-sm bg-muted/50 focus:bg-background"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-primary/10"
                          onClick={() => navigator.clipboard.writeText(shareableLink)}
                        >
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Anyone with this link can view your shopping list
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDeleteList(selectedListId)}>
                  <Trash2 className="h-4 w-4 text-destructive/70" />
                </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 rounded-xl border-2 border-dashed border-muted bg-muted/30 p-6 md:grid-cols-3 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 dark:bg-muted/10 dark:hover:bg-primary/10">
                  <div className="space-y-2">
                    <Label htmlFor="item-name" className="text-sm font-medium">Item Name</Label>
                    <Input
                      id="item-name"
                      placeholder="e.g., Milk"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      className="h-11 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item-quantity" className="text-sm font-medium">Quantity</Label>
                    <Input
                      id="item-quantity"
                      placeholder="e.g., 1 Gallon"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({ ...newItem, quantity: e.target.value })
                      }
                      className="h-11 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item-notes" className="text-sm font-medium">Notes (Optional)</Label>
                    <Input
                      id="item-notes"
                      placeholder="e.g., Organic, Brand preference"
                      value={newItem.notes}
                      onChange={(e) =>
                        setNewItem({ ...newItem, notes: e.target.value })
                      }
                      className="h-11 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <Button 
                    onClick={handleAddItem} 
                    disabled={loadingStates.addingItem}
                    className="md:col-span-3 h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md"
                  >
                    {loadingStates.addingItem ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Item to List
                      </>
                    )}
                  </Button>
                </div>
                <Separator className="my-6" />
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Shopping Items
                  </h3>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : selectedListItems.length === 0 ? (
                     <div className="flex flex-col items-center justify-center py-12 text-center">
                       <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                         <PlusCircle className="h-8 w-8 text-primary" />
                       </div>
                       <h3 className="text-lg font-semibold mb-2">No items yet</h3>
                       <p className="text-muted-foreground mb-4 max-w-sm">
                         Start building your shopping list by adding items above. You can include quantities and notes for each item.
                       </p>
                     </div>
                   ) : (
                     <ul className="space-y-3">
                       {Array.isArray(selectedListItems) && selectedListItems.map((item) => (
                         <li
                           key={item.id}
                           className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                             item.is_completed
                               ? "bg-green-50 border-green-200 shadow-sm dark:bg-green-950/20 dark:border-green-800/30"
                               : "bg-card border-border hover:border-primary/30 hover:shadow-md dark:hover:border-primary/50"
                           }`}
                         >
                           <div className="flex items-center gap-4">
                             <div className="relative">
                               <Checkbox
                                 id={`item-${item.id}`}
                                 checked={item.is_completed}
                                 onCheckedChange={() =>
                                   handleCheck(item.list_id, item.id)
                                 }
                                 className="w-5 h-5"
                                 disabled={loadingStates.togglingItem}
                               />
                               {loadingStates.togglingItem && (
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                                 </div>
                               )}
                             </div>
                             <div className="flex-1 space-y-1">
                               <label
                                 htmlFor={`item-${item.id}`}
                                 className={`cursor-pointer text-base font-medium leading-none transition-all duration-200 ${
                                   item.is_completed
                                     ? "text-green-700 line-through dark:text-green-400"
                                     : "text-foreground"
                                 }`}
                               >
                                 {item.name}
                               </label>
                               <div className="flex items-center gap-3 text-sm">
                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                   item.is_completed
                                     ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                                     : "bg-primary/10 text-primary"
                                 }`}>
                                   {item.quantity}
                                 </span>
                                 {item.notes && (
                                   <span className="text-muted-foreground italic">
                                     {item.notes}
                                   </span>
                                 )}
                               </div>
                             </div>
                           </div>
                           <div className="flex items-center gap-1">
                             <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                               <CalendarClock className="h-4 w-4 text-primary" />
                             </Button>
                             <Button 
                               variant="ghost" 
                               size="icon" 
                               className="h-8 w-8 hover:bg-blue/10" 
                               onClick={() => handleEditItem(item)}
                               disabled={loadingStates.updatingItem}
                             >
                               {loadingStates.updatingItem ? (
                                 <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                               ) : (
                                 <Pencil className="h-4 w-4 text-blue-600" />
                               )}
                             </Button>
                             <Button 
                               variant="ghost" 
                               size="icon" 
                               className="h-8 w-8 hover:bg-destructive/10" 
                               onClick={() => handleDeleteItem(item.list_id, item.id)}
                               disabled={loadingStates.deletingItem}
                             >
                               {loadingStates.deletingItem ? (
                                 <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-destructive"></div>
                               ) : (
                                 <Trash2 className="h-4 w-4 text-destructive/70" />
                               )}
                             </Button>
                           </div>
                         </li>
                       ))}
                     </ul>
                   )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Item Dialog */}
      <Dialog open={editingItem.isOpen} onOpenChange={(open) => !open && cancelEditItem()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Update the details of your shopping item.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-item-name">Item Name</Label>
              <Input
                id="edit-item-name"
                value={editItemForm.name}
                onChange={(e) => setEditItemForm({ ...editItemForm, name: e.target.value })}
                placeholder="Enter item name"
              />
            </div>
            <div>
              <Label htmlFor="edit-item-quantity">Quantity</Label>
              <Input
                id="edit-item-quantity"
                value={editItemForm.quantity}
                onChange={(e) => setEditItemForm({ ...editItemForm, quantity: e.target.value })}
                placeholder="e.g., 2 lbs, 1 dozen"
              />
            </div>
            <div>
              <Label htmlFor="edit-item-notes">Notes (Optional)</Label>
              <Input
                id="edit-item-notes"
                value={editItemForm.notes}
                onChange={(e) => setEditItemForm({ ...editItemForm, notes: e.target.value })}
                placeholder="Any additional notes"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={cancelEditItem}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateItem} 
              disabled={editItemForm.name.trim() === "" || loadingStates.updatingItem}
            >
              {loadingStates.updatingItem ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                "Update Item"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && cancelDelete()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {deleteConfirmation.type === 'list' ? (
              <>
                <p>Are you sure you want to delete the list <strong>"{deleteConfirmation.listName}"</strong>?</p>
                <p className="text-sm text-muted-foreground mt-2">This will permanently remove the list and all its items. This action cannot be undone.</p>
              </>
            ) : (
              <>
                <p>Are you sure you want to delete <strong>"{deleteConfirmation.itemName}"</strong> from <strong>"{deleteConfirmation.listName}"</strong>?</p>
                <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={loadingStates.deletingList || loadingStates.deletingItem}
            >
              {(loadingStates.deletingList || loadingStates.deletingItem) ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}


    