import { NextRequest, NextResponse } from 'next/server';
import { sql, initializeDatabase, seedDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Initialize database on first API call
let dbInitialized = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    await initializeDatabase();
    await seedDatabase();
    dbInitialized = true;
  }
}

// GET - Fetch user by ID or email
export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    
    if (!id && !email) {
      return NextResponse.json(
        { success: false, error: 'User ID or email is required' },
        { status: 400 }
      );
    }
    
    let user;
    if (id) {
      user = await sql`
        SELECT id, email, name, created_at, updated_at
        FROM users 
        WHERE id = ${id}
      `;
    } else {
      user = await sql`
        SELECT id, email, name, created_at, updated_at
        FROM users 
        WHERE email = ${email}
      `;
    }
    
    if (user.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: user[0] });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// POST - Create a new user (registration)
export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const body = await request.json();
    const { email, name, password } = body;
    
    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, error: 'Email, name, and password are required' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    const result = await sql`
      INSERT INTO users (email, name, password_hash)
      VALUES (${email}, ${name}, ${passwordHash})
      RETURNING id, email, name, created_at, updated_at
    `;
    
    return NextResponse.json({ success: true, data: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// PUT - Update user information
export async function PUT(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const body = await request.json();
    const { id, email, name, password } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    let updateQuery;
    let updateParams;
    
    if (password) {
      // Update with new password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      
      updateQuery = sql`
        UPDATE users 
        SET email = ${email}, name = ${name}, password_hash = ${passwordHash}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING id, email, name, created_at, updated_at
      `;
    } else {
      // Update without password change
      updateQuery = sql`
        UPDATE users 
        SET email = ${email}, name = ${name}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING id, email, name, created_at, updated_at
      `;
    }
    
    const result = await updateQuery;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a user
export async function DELETE(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const result = await sql`
      DELETE FROM users WHERE id = ${id}
      RETURNING id
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}