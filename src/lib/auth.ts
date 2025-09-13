import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Simple JWT decoder for Edge Runtime compatibility
function base64UrlDecode(str: string): string {
  // Add padding if needed
  str += '='.repeat((4 - str.length % 4) % 4);
  // Replace URL-safe characters
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  return atob(str);
}

function decodeJWT(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }
    
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload);
  } catch (error) {
    throw new Error('Failed to decode JWT');
  }
}

// Simple signature verification using Web Crypto API
async function verifyJWTSignature(token: string, secret: string): Promise<boolean> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const header = parts[0];
    const payload = parts[1];
    const signature = parts[2];
    
    // Create the message to verify
    const message = `${header}.${payload}`;
    
    // Import the secret key
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign', 'verify']
    );
    
    // Create expected signature
    const expectedSignature = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(message)
    );
    
    // Convert to base64url
    const expectedSigBase64 = btoa(String.fromCharCode(...new Uint8Array(expectedSignature)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    return expectedSigBase64 === signature;
  } catch (error) {
    return false;
  }
}

export interface User {
  userId: number;
  email: string;
  name: string;
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    console.log('Verifying token:', token.substring(0, 50) + '...');
    console.log('JWT_SECRET:', JWT_SECRET.substring(0, 10) + '...');
    
    // First decode the payload
    const decoded = decodeJWT(token);
    console.log('Token decoded:', decoded);
    
    // Check expiration
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      console.log('Token expired');
      return null;
    }
    
    // Verify signature
    const isValid = await verifyJWTSignature(token, JWT_SECRET);
    console.log('Signature valid:', isValid);
    
    if (!isValid) {
      console.log('Invalid signature');
      return null;
    }
    
    return {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function getCurrentUser(request: NextRequest): Promise<User | null> {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return null;
    }

    return await verifyToken(token);
  } catch (error) {
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<User> {
  const user = await getCurrentUser(request);
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
}