import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from './src/config/database';
import dotenv from 'dotenv';

dotenv.config();

async function testLogin() {
  try {
    console.log('🔍 Testing admin login...\n');

    const email = 'wealthyelephant@gmail.com';
    const password = 'admin@elephant';

    // 1. Check if admin exists
    console.log('1. Checking if admin exists...');
    const { data: admin, error } = await db
      .from('AdminUsers')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('❌ Error fetching admin:', error);
      console.log('\n💡 Run: npm run create-admin');
      process.exit(1);
    }

    if (!admin) {
      console.error('❌ Admin user not found');
      console.log('\n💡 Run: npm run create-admin');
      process.exit(1);
    }

    console.log('✅ Admin found:', {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    // 2. Test password
    console.log('\n2. Testing password...');
    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);

    if (!isValidPassword) {
      console.error('❌ Password does not match');
      console.log('\n💡 Run: npm run create-admin (to reset password)');
      process.exit(1);
    }

    console.log('✅ Password is valid');

    // 3. Test JWT generation
    console.log('\n3. Testing JWT generation...');
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET not set in environment variables');
      process.exit(1);
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ JWT token generated successfully');
    console.log('Token:', token.substring(0, 50) + '...');

    // 4. Test token verification
    console.log('\n4. Testing token verification...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
    console.log('✅ Token verified successfully');
    console.log('Decoded:', {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });

    console.log('\n✅ All tests passed! Login should work.');
    console.log('\nLogin credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('\nAPI Endpoint: POST /api/auth/login');
    console.log('Request body:', JSON.stringify({ email, password }, null, 2));

  } catch (error: any) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testLogin();
