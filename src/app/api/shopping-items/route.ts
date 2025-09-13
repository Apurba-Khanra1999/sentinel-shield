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

// GET - Fetch all items for a shopping list
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
    
    const { searchParams } = new URL(request.url);
    const listId = searchParams.get('listId');
    
    if (!listId) {
      return NextResponse.json(
        { success: false, error: 'List ID is required' },
        { status: 400 }
      );
    }
    
    // Verify the list belongs to the authenticated user
    const listCheck = await sql`
      SELECT id FROM shopping_lists 
      WHERE id = ${listId} AND user_id = ${user.userId}
    `;
    
    if (listCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Shopping list not found or access denied' },
        { status: 404 }
      );
    }
    
    const items = await sql`
      SELECT id, name, quantity, price, category, is_completed, created_at, updated_at
      FROM shopping_items 
      WHERE list_id = ${listId}
      ORDER BY is_completed ASC, created_at DESC
    `;
    
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching shopping items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shopping items' },
      { status: 500 }
    );
  }
}

// POST - Create a new shopping item
export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const body = await request.json();
    const { listId, name, quantity, price, category } = body;
    
    if (!listId || !name) {
      return NextResponse.json(
        { success: false, error: 'List ID and name are required' },
        { status: 400 }
      );
    }
    
    // Verify the list belongs to the authenticated user
    const listCheck = await sql`
      SELECT id FROM shopping_lists 
      WHERE id = ${listId} AND user_id = ${user.userId}
    `;
    
    if (listCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Shopping list not found or access denied' },
        { status: 404 }
      );
    }
    
    const result = await sql`
      INSERT INTO shopping_items (list_id, name, quantity, price, category)
      VALUES (${listId}, ${name}, ${quantity || 1}, ${price || null}, ${category || ''})
      RETURNING id, name, quantity, price, category, is_completed, created_at, updated_at
    `;
    
    return NextResponse.json({ success: true, data: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating shopping item:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create shopping item' },
      { status: 500 }
    );
  }
}

// PUT - Update a shopping item
export async function PUT(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const body = await request.json();
    const { id, name, quantity, price, category, is_completed } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      );
    }

    // Verify the item belongs to a list owned by the authenticated user
    const itemCheck = await sql`
      SELECT si.id FROM shopping_items si
      JOIN shopping_lists sl ON si.list_id = sl.id
      WHERE si.id = ${id} AND sl.user_id = ${user.userId}
    `;
    
    if (itemCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Shopping item not found or access denied' },
        { status: 404 }
      );
    }

    const result = await sql`
      UPDATE shopping_items 
      SET name = ${name || ''}, quantity = ${quantity || 1}, price = ${price || null}, 
          category = ${category || 'other'}, is_completed = ${is_completed || false}, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, name, quantity, price, category, is_completed, created_at, updated_at
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Shopping item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error updating shopping item:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to update shopping item' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a shopping item
export async function DELETE(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const user = await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      );
    }

    // Verify the item belongs to a list owned by the authenticated user
    const itemCheck = await sql`
      SELECT si.id FROM shopping_items si
      JOIN shopping_lists sl ON si.list_id = sl.id
      WHERE si.id = ${id} AND sl.user_id = ${user.userId}
    `;
    
    if (itemCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Shopping item not found or access denied' },
        { status: 404 }
      );
    }

    const result = await sql`
      DELETE FROM shopping_items 
      WHERE id = ${id}
      RETURNING id
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Shopping item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Shopping item deleted successfully' });
  } catch (error) {
    console.error('Error deleting shopping item:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to delete shopping item' },
      { status: 500 }
    );
  }
}