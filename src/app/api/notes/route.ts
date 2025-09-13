import { NextRequest, NextResponse } from 'next/server';
import { sql, initializeDatabase, seedDatabase } from '@/lib/db';
import { getCurrentUser, requireAuth } from '@/lib/auth';

// Initialize database on first API call
let dbInitialized = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    await initializeDatabase();
    await seedDatabase();
    dbInitialized = true;
  }
}

// GET - Fetch all notes for a user
export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const notes = await sql`
      SELECT id, title, content, category, is_favorite, created_at, updated_at
      FROM notes 
      WHERE user_id = ${user.userId}
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

// POST - Create a new note
export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const body = await request.json();
    const { title, content, category, is_favorite } = body;
    
    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }
    
    const result = await sql`
      INSERT INTO notes (user_id, title, content, category, is_favorite)
      VALUES (${user.userId}, ${title}, ${content || ''}, ${category || 'general'}, ${is_favorite || false})
      RETURNING id, title, content, category, is_favorite, created_at, updated_at
    `;
    
    return NextResponse.json({ success: true, data: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create note' },
      { status: 500 }
    );
  }
}

// PUT - Update a note
export async function PUT(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const body = await request.json();
    const { id, title, content, category, is_favorite } = body;
    
    if (!id || !title) {
      return NextResponse.json(
        { success: false, error: 'ID and title are required' },
        { status: 400 }
      );
    }
    
    const result = await sql`
      UPDATE notes 
      SET title = ${title}, content = ${content || ''}, category = ${category || 'general'}, 
          is_favorite = ${is_favorite || false}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND user_id = ${user.userId}
      RETURNING id, title, content, category, is_favorite, created_at, updated_at
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error updating note:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a note
export async function DELETE(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Note ID is required' },
        { status: 400 }
      );
    }
    
    const result = await sql`
      DELETE FROM notes WHERE id = ${id} AND user_id = ${user.userId}
      RETURNING id
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}