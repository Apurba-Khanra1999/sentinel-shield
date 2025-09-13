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

// GET - Fetch all passwords for a user
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
    
    const passwords = await sql`
      SELECT id, title, website, username, password, category, notes, created_at, updated_at
      FROM passwords 
      WHERE user_id = ${user.userId}
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json({ success: true, data: passwords });
  } catch (error) {
    console.error('Error fetching passwords:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch passwords' },
      { status: 500 }
    );
  }
}

// POST - Create a new password
export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const body = await request.json();
    const { title, website, username, password, category, notes } = body;
    
    if (!title || !password) {
      return NextResponse.json(
        { success: false, error: 'Title and password are required' },
        { status: 400 }
      );
    }
    
    const result = await sql`
      INSERT INTO passwords (user_id, title, website, username, password, category, notes)
      VALUES (${user.userId}, ${title}, ${website || ''}, ${username || ''}, ${password}, ${category || 'other'}, ${notes || ''})
      RETURNING id, title, website, username, password, category, notes, created_at, updated_at
    `;
    
    return NextResponse.json({ success: true, data: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating password:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create password' },
      { status: 500 }
    );
  }
}

// PUT - Update a password
export async function PUT(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const body = await request.json();
    const { id, title, website, username, password, category, notes } = body;
    
    if (!id || !title || !password) {
      return NextResponse.json(
        { success: false, error: 'ID, title and password are required' },
        { status: 400 }
      );
    }
    
    const result = await sql`
      UPDATE passwords 
      SET title = ${title}, website = ${website || ''}, username = ${username || ''}, 
          password = ${password}, category = ${category || 'other'}, notes = ${notes || ''}, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND user_id = ${user.userId}
      RETURNING id, title, website, username, password, category, notes, created_at, updated_at
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Password not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error updating password:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to update password' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a password
export async function DELETE(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Password ID is required' },
        { status: 400 }
      );
    }
    
    const result = await sql`
      DELETE FROM passwords WHERE id = ${id} AND user_id = ${user.userId}
      RETURNING id
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Password not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Password deleted successfully' });
  } catch (error) {
    console.error('Error deleting password:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to delete password' },
      { status: 500 }
    );
  }
}