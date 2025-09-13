import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const sql = neon(process.env.DATABASE_URL);

export { sql };

// Database helper functions
export async function initializeDatabase() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create passwords table
    await sql`
      CREATE TABLE IF NOT EXISTS passwords (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        website VARCHAR(255),
        username VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        category VARCHAR(50) DEFAULT 'other',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create notes table
    await sql`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        category VARCHAR(50) DEFAULT 'general',
        is_favorite BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create shopping_lists table
    await sql`
      CREATE TABLE IF NOT EXISTS shopping_lists (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create shopping_items table
    await sql`
      CREATE TABLE IF NOT EXISTS shopping_items (
        id SERIAL PRIMARY KEY,
        list_id INTEGER REFERENCES shopping_lists(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        quantity INTEGER DEFAULT 1,
        price DECIMAL(10,2),
        category VARCHAR(50),
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Test database connection
export async function testConnection() {
  try {
    const result = await sql`SELECT version()`;
    console.log('Database connected successfully:', result[0].version);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Seed database with sample data
export async function seedDatabase() {
  try {
    // Check if user already exists
    const existingUser = await sql`SELECT id FROM users WHERE email = 'demo@example.com' LIMIT 1`;
    
    let userId;
    if (existingUser.length === 0) {
      // Create demo user with proper password hash
      const passwordHash = await bcrypt.hash('password123', 10);
      const users = await sql`
        INSERT INTO users (email, name, password_hash)
        VALUES ('demo@example.com', 'Demo User', ${passwordHash})
        RETURNING id
      `;
      userId = users[0].id;
      console.log('Demo user created with ID:', userId);
    } else {
      userId = existingUser[0].id;
      console.log('Using existing demo user with ID:', userId);
      
      // Update existing demo user with proper password hash if it's still the dummy hash
      const userDetails = await sql`SELECT password_hash FROM users WHERE id = ${userId}`;
      if (userDetails[0].password_hash === '$2a$10$dummy.hash.for.demo.purposes') {
        const passwordHash = await bcrypt.hash('password123', 10);
        await sql`UPDATE users SET password_hash = ${passwordHash} WHERE id = ${userId}`;
        console.log('Updated demo user password hash');
      }
    }

    // Check if sample data already exists
    const existingPasswords = await sql`SELECT COUNT(*) as count FROM passwords WHERE user_id = ${userId}`;
    
    if (existingPasswords[0].count === '0') {
      // Insert sample passwords
      await sql`
        INSERT INTO passwords (user_id, title, website, username, password, category, notes)
        VALUES 
          (${userId}, 'Gmail Account', 'gmail.com', 'demo@gmail.com', 'SecurePass123!', 'email', 'Primary email account'),
          (${userId}, 'Facebook', 'facebook.com', 'demo.user', 'MyFbPass456#', 'social', 'Social media account'),
          (${userId}, 'Bank Account', 'mybank.com', 'demo_user', 'BankSecure789$', 'finance', 'Online banking login'),
          (${userId}, 'Netflix', 'netflix.com', 'demo@gmail.com', 'NetflixPass321@', 'entertainment', 'Streaming service'),
          (${userId}, 'Work Portal', 'company.com', 'demo.employee', 'WorkPass654%', 'work', 'Company intranet access')
      `;
      console.log('Sample passwords inserted');
    }

    const existingNotes = await sql`SELECT COUNT(*) as count FROM notes WHERE user_id = ${userId}`;
    
    if (existingNotes[0].count === '0') {
      // Insert sample notes
      await sql`
        INSERT INTO notes (user_id, title, content, category, is_favorite)
        VALUES 
          (${userId}, 'Meeting Notes', 'Discussed project timeline and deliverables. Next meeting scheduled for Friday.', 'work', true),
          (${userId}, 'Recipe Ideas', 'Try the new pasta recipe with garlic and herbs. Remember to buy fresh basil.', 'personal', false),
          (${userId}, 'Book Recommendations', 'The Midnight Library - Matt Haig\nAtomic Habits - James Clear\nProject Hail Mary - Andy Weir', 'personal', true),
          (${userId}, 'Travel Plans', 'Summer vacation to Italy. Check flights, book hotels in Rome and Florence.', 'travel', false),
          (${userId}, 'Important Reminders', 'Renew car insurance by end of month. Schedule dentist appointment.', 'general', true)
      `;
      console.log('Sample notes inserted');
    }

    const existingLists = await sql`SELECT COUNT(*) as count FROM shopping_lists WHERE user_id = ${userId}`;
    
    if (existingLists[0].count === '0') {
      // Insert sample shopping lists
      const lists = await sql`
        INSERT INTO shopping_lists (user_id, name, description)
        VALUES 
          (${userId}, 'Weekly Groceries', 'Regular weekly grocery shopping'),
          (${userId}, 'Party Supplies', 'Items needed for birthday party'),
          (${userId}, 'Home Improvement', 'Hardware store shopping list')
        RETURNING id, name
      `;
      
      // Insert sample shopping items
      await sql`
        INSERT INTO shopping_items (list_id, name, quantity, category, is_completed)
        VALUES 
          (${lists[0].id}, 'Milk', 1, 'dairy', false),
          (${lists[0].id}, 'Bread', 2, 'bakery', false),
          (${lists[0].id}, 'Apples', 6, 'produce', true),
          (${lists[0].id}, 'Chicken Breast', 2, 'meat', false),
          (${lists[1].id}, 'Balloons', 20, 'decorations', false),
          (${lists[1].id}, 'Birthday Cake', 1, 'bakery', false),
          (${lists[1].id}, 'Paper Plates', 2, 'party supplies', true),
          (${lists[2].id}, 'Screws', 1, 'hardware', false),
          (${lists[2].id}, 'Paint Brush', 3, 'tools', false)
      `;
      console.log('Sample shopping lists and items inserted');
    }

    console.log('Database seeded successfully with sample data');
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}