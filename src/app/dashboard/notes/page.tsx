
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  Trash2,
  Search,
  Star,
  FileText,
  Folder,
  Edit,
  BookOpen,
  Clock,
  Pin,
  Hash,
  TrendingUp,
  Calendar,
  Archive,
  Bookmark,
  Tag,
  Users,
  Lightbulb,
  Briefcase,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Helper functions for category styling
const getCategoryIcon = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case 'work':
      return Briefcase;
    case 'personal':
      return Users;
    case 'ideas':
      return Lightbulb;
    default:
      return Folder;
  }
};

const getCategoryColor = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case 'work':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'personal':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'ideas':
      return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

const getWordCount = (content: string) => {
  return content.trim().split(/\s+/).filter(word => word.length > 0).length;
};

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  is_pinned: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['Work', 'Personal', 'Ideas']);
  
  // Fetch notes from API
  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (response.ok) {
        const result = await response.json();
        const data = result.data || [];
        setNotes(data);
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((note: Note) => note.category))];
        setCategories(uniqueCategories.length > 0 ? uniqueCategories : ['Work', 'Personal', 'Ideas']);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Calculate statistics
  const totalNotes = notes.length;
  const pinnedNotes = notes.filter(note => note.is_pinned).length;
  const totalWords = notes.reduce((acc, note) => acc + getWordCount(note.content), 0);
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = notes.filter(note => note.category === cat).length;
    return acc;
  }, {} as Record<string, number>);
  const mostActiveCategory = Object.entries(categoryCounts).reduce((max, [cat, count]) => 
    count > (categoryCounts[max[0]] || 0) ? [cat, count] : max, 
    ['', 0]
  )[0] || 'Work';
  const [selectedCategory, setSelectedCategory] = useState('Work');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [editingCategory, setEditingCategory] = useState<{ id: string, name: string } | null>(null);
  const { toast } = useToast();
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; noteId: string | null; noteTitle: string }>({ isOpen: false, noteId: null, noteTitle: "" });

  // Get notes for selected category
  const categoryNotes = notes.filter(note => note.category === selectedCategory);

  const filteredNotes = useMemo(() => {
    if (!searchTerm) {
      return categoryNotes;
    }
    return categoryNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categoryNotes]);

  const selectedNote = useMemo(() => {
    return notes.find((note) => note.id === selectedNoteId);
  }, [notes, selectedNoteId]);

  useEffect(() => {
    if (selectedNote) {
      setEditingTitle(selectedNote.title);
      setEditingContent(selectedNote.content);
    } else {
      setEditingTitle("");
      setEditingContent("");
    }
  }, [selectedNote]);

  const handleCreateCategory = () => {
    if (newCategoryName.trim() === "") return;
    if (!categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
      setSelectedCategory(newCategoryName);
    }
    setNewCategoryName("");
  };

  const handleRenameCategory = async () => {
    if (editingCategory && editingCategory.name.trim() !== "") {
      // Update all notes in the old category to the new category name
      const notesToUpdate = notes.filter(note => note.category === editingCategory.id);
      for (const note of notesToUpdate) {
        try {
          await fetch('/api/notes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...note, category: editingCategory.name })
          });
        } catch (error) {
          console.error('Error updating note category:', error);
        }
      }
      // Update categories list
      const updatedCategories = categories.map(cat => 
        cat === editingCategory.id ? editingCategory.name : cat
      );
      setCategories(updatedCategories);
      if (selectedCategory === editingCategory.id) {
        setSelectedCategory(editingCategory.name);
      }
      await fetchNotes();
    }
    setEditingCategory(null);
  };

  const handleCreateNote = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'New Note',
          content: '',
          category: selectedCategory,
          is_pinned: false,
          tags: []
        })
      });
      if (response.ok) {
        const result = await response.json();
        await fetchNotes();
        setSelectedNoteId(result.data.id);
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleNoteUpdate = async (field: "title" | "content", value: string) => {
    if (!selectedNote) return;
    
    const updatedNote = { ...selectedNote };
    if (field === "title") {
      updatedNote.title = value;
      setEditingTitle(value);
    } else {
      updatedNote.content = value;
      setEditingContent(value);
    }
    
    try {
      const response = await fetch('/api/notes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNote)
      });
      if (response.ok) {
        await fetchNotes();
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const togglePin = async () => {
    if (!selectedNote) return;
    
    try {
      const response = await fetch('/api/notes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...selectedNote, is_pinned: !selectedNote.is_pinned })
      });
      if (response.ok) {
        await fetchNotes();
      }
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const deleteNote = () => {
    if (!selectedNote) return;
    setDeleteConfirmation({ isOpen: true, noteId: selectedNote.id, noteTitle: selectedNote.title });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation.noteId) return;
    
    try {
      const response = await fetch('/api/notes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteConfirmation.noteId })
      });
      if (response.ok) {
        await fetchNotes();
        const remainingNotes = notes.filter(n => n.id !== deleteConfirmation.noteId);
        const categoryRemainingNotes = remainingNotes.filter(n => n.category === selectedCategory);
        setSelectedNoteId(categoryRemainingNotes[0]?.id || null);
        toast({
          title: "Note deleted!",
          description: `"${deleteConfirmation.noteTitle}" has been removed.`,
        });
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
    setDeleteConfirmation({ isOpen: false, noteId: null, noteTitle: "" });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, noteId: null, noteTitle: "" });
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          Note Organizer
        </h1>
        <p className="text-muted-foreground">
          Organize your thoughts, ideas, and information with beautiful categories and powerful search.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{totalNotes}</div>
            <p className="text-xs text-muted-foreground">
              Across {categories.length} categories
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pinned Notes</CardTitle>
            <Pin className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{pinnedNotes}</div>
            <p className="text-xs text-muted-foreground">
              {((pinnedNotes / totalNotes) * 100).toFixed(0)}% of total notes
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Words</CardTitle>
            <Hash className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{totalWords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Avg {Math.round(totalWords / totalNotes)} words per note
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Active</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">{mostActiveCategory}</div>
            <p className="text-xs text-muted-foreground">
              {categoryCounts[mostActiveCategory] || 0} notes
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid flex-1 gap-4 md:grid-cols-[250px_1fr]">
        <Card className="flex flex-col border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Archive className="h-5 w-5 text-primary" />
                </div>
                Categories
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="category-name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="col-span-3"
                        placeholder="e.g., Recipes"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button onClick={handleCreateCategory}>Create</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-3">
            <ScrollArea className="h-full">
              <ul className="space-y-2">
                {categories.map((cat) => {
                  const CategoryIcon = getCategoryIcon(cat);
                  const noteCount = categoryCounts[cat] || 0;
                  return (
                    <li key={cat} className="group flex items-center">
                      <Button
                        variant={selectedCategory === cat ? "secondary" : "ghost"}
                        className={`w-full justify-start h-auto py-3 px-3 ${selectedCategory === cat ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'}`}
                        onClick={() => {
                          setSelectedCategory(cat);
                          const categoryNotes = notes.filter(n => n.category === cat);
                          setSelectedNoteId(categoryNotes[0]?.id || null);
                        }}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`p-1.5 rounded-md ${getCategoryColor(cat)}`}>
                            <CategoryIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium">{cat}</div>
                            <div className="text-xs text-muted-foreground">{noteCount} notes</div>
                          </div>
                        </div>
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10" 
                            onClick={() => setEditingCategory({id: cat, name: cat})}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Edit className="h-5 w-5 text-primary" />
                              Rename Category
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="category-rename" className="text-sm font-medium">
                                Category Name
                              </Label>
                              <Input
                                id="category-rename"
                                value={editingCategory?.name || ""}
                                onChange={(e) => editingCategory && setEditingCategory({...editingCategory, name: e.target.value})}
                                className="w-full"
                                placeholder="Enter category name"
                                autoFocus
                              />
                            </div>
                          </div>
                          <DialogFooter className="gap-2">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button onClick={handleRenameCategory} className="bg-primary hover:bg-primary/90">
                                Save Changes
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="grid flex-1 gap-4 md:grid-cols-[320px_1fr]">
          <Card className="flex flex-col border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <FileText className="h-5 w-5 text-blue-500" />
                  </div>
                  {selectedCategory || "Notes"}
                  <Badge variant="secondary" className="ml-2">
                    {filteredNotes.length}
                  </Badge>
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={handleCreateNote} className="hover:bg-primary/10">
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  className="pl-10 h-10 border-muted-foreground/20 focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-3">
              <ScrollArea className="h-full">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {filteredNotes
                      .sort((a, b) => (a.is_pinned === b.is_pinned ? 0 : a.is_pinned ? -1 : 1))
                      .map((note) => (
                      <li key={note.id}>
                        <Button
                          variant={selectedNoteId === note.id ? "secondary" : "ghost"}
                          className={`h-auto w-full justify-start py-3 px-3 text-left transition-all duration-200 ${
                            selectedNoteId === note.id 
                              ? 'bg-primary/10 border border-primary/20 shadow-sm' 
                              : 'hover:bg-muted/50 hover:shadow-sm'
                          }`}
                          onClick={() => setSelectedNoteId(note.id)}
                        >
                          <div className="flex w-full flex-col gap-2">
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-medium truncate">{note.title}</span>
                                {note.is_pinned && (
                                  <div className="flex-shrink-0">
                                    <Pin className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(note.updated_at).toLocaleDateString()}</span>
                              </div>
                              <div className="text-right">
                                {getWordCount(note.content)} words
                              </div>
                            </div>
                            {note.tags && note.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {note.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5 h-auto">
                                    {tag}
                                  </Badge>
                                ))}
                                {note.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-auto">
                                    +{note.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </Button>
                      </li>
                      ))}
                  </ul>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {selectedNote ? (
            <Card className="flex flex-col border-0 shadow-lg">
              <CardHeader className="flex flex-row items-start justify-between pb-4">
                <div className="flex-1">
                  <Input
                    value={editingTitle}
                    onChange={(e) => handleNoteUpdate("title", e.target.value)}
                    className="border-none px-0 text-2xl font-bold leading-none tracking-tight h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    placeholder="Untitled Note"
                  />
                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>Last edited: {new Date(selectedNote.updated_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Hash className="h-4 w-4" />
                      <span>{getWordCount(selectedNote.content)} words</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>Created: {new Date(selectedNote.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {selectedNote.tags && selectedNote.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedNote.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={togglePin}
                    className={`hover:bg-yellow-500/10 ${selectedNote.is_pinned ? 'bg-yellow-500/10' : ''}`}
                  >
                    <Pin className={`h-4 w-4 ${selectedNote.is_pinned ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={deleteNote} className="hover:bg-red-500/10">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4 pt-0">
                <div className="flex-1 relative">
                  <Textarea
                    value={editingContent}
                    onChange={(e) => handleNoteUpdate("content", e.target.value)}
                    className="flex-1 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base leading-relaxed p-4 bg-muted/20 rounded-lg min-h-[400px]"
                    placeholder="Start writing your note here... ✨"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Auto-saving...</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>Characters: {editingContent.length}</span>
                    <span>Words: {getWordCount(editingContent)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center border-0 shadow-lg">
              <CardContent className="text-center py-16">
                <div className="text-center text-muted-foreground space-y-4">
                  <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">No Note Selected</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Choose a note from the list to start reading and editing, or create a new one to capture your thoughts.
                    </p>
                  </div>
                  <Button onClick={handleCreateNote} className="mt-6">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && cancelDelete()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the note <strong>"{deleteConfirmation.noteTitle}"</strong>?</p>
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
    