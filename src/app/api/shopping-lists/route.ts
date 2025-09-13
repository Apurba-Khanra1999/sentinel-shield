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

// GET - Fetch all shopping lists for a user
export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const lists = await sql`
      SELECT sl.id, sl.name, sl.description, sl.created_at, sl.updated_at,
             COUNT(si.id) as item_count,
             COUNT(CASE WHEN si.is_completed = true THEN 1 END) as completed_count
      FROM shopping_lists sl
      LEFT JOIN shopping_items si ON sl.id = si.list_id
      WHERE sl.user_id = ${user.userId}
      GROUP BY sl.id, sl.name, sl.description, sl.created_at, sl.updated_at
      ORDER BY sl.created_at DESC
    `;
    
    return NextResponse.json({ success: true, data: lists });
  } catch (error) {
    console.error('Error fetching shopping lists:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shopping lists' },
      { status: 500 }
    );
  }
}

// POST - Create a new shopping list
export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const body = await request.json();
    const { name, description } = body;
    
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }
    
    const result = await sql`
      INSERT INTO shopping_lists (user_id, name, description)
      VALUES (${user.userId}, ${name}, ${description || ''})
      RETURNING id, name, description, created_at, updated_at
    `;
    
    return NextResponse.json({ success: true, data: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating shopping list:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create shopping list' },
      { status: 500 }
    );
  }
}

// PUT - Update a shopping list
export async function PUT(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const body = await request.json();
    const { id, name, description } = body;

    if (!id || !name) {
      return NextResponse.json(
        { success: false, error: 'ID and name are required' },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE shopping_lists 
      SET name = ${name}, description = ${description || ''}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND user_id = ${user.userId}
      RETURNING id, name, description, created_at, updated_at
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Shopping list not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error updating shopping list:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to update shopping list' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a shopping list
export async function DELETE(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Shopping list ID is required' },
        { status: 400 }
      );
    }

    // Delete shopping list (items will be deleted automatically due to CASCADE)
    const result = await sql`
      DELETE FROM shopping_lists WHERE id = ${id} AND user_id = ${user.userId}
      RETURNING id
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Shopping list not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Shopping list deleted successfully' });
  } catch (error) {
    console.error('Error deleting shopping list:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to delete shopping list' },
      { status: 500 }
    );
  }
}