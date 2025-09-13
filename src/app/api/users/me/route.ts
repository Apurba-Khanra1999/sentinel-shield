import { NextRequest, NextResponse } from 'next/server';
import { sql, initializeDatabase, seedDatabase } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// Initialize database on first API call
let dbInitialized = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    await initializeDatabase();
    await seedDatabase();
    dbInitialized = true;
  }
}

// GET - Fetch current authenticated user's profile
export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    // Get current user from JWT token
    const currentUser = await getCurrentUser(request);
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Fetch user details from database
    const user = await sql`
      SELECT id, email, name, created_at, updated_at
      FROM users 
      WHERE id = ${currentUser.userId}
    `;
    
    if (user.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: user[0] });
  } catch (error) {
    console.error('Error fetching current user profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

// PUT - Update current authenticated user's profile
export async function PUT(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    // Get current user from JWT token
    const currentUser = await getCurrentUser(request);
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { name } = body;
    
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Update user profile (only name can be updated, email is immutable)
    const result = await sql`
      UPDATE users 
      SET name = ${name}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${currentUser.userId}
      RETURNING id, email, name, created_at, updated_at
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}