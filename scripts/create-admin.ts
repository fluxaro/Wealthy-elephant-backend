import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const db = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  try {
    const email = 'wealthyelephant@gmail.com';
    const password = 'admin@elephant';
    const name = 'Admin';

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Check if admin already exists
    const { data: existing } = await db
      .from('AdminUsers')
      .select('*')
      .eq('email', email)
      .single();

    if (existing) {
      console.log('Admin user already exists. Updating password...');
      
      // Update existing admin
      const { error: updateError } = await db
        .from('AdminUsers')
        .update({ passwordHash })
        .eq('email', email);

      if (updateError) {
        throw updateError;
      }

      console.log('✅ Admin password updated successfully!');
    } else {
      console.log('Creating new admin user...');
      
      // Create new admin
      const { error: insertError } = await db
        .from('AdminUsers')
        .insert({
          email,
          passwordHash,
          name,
          role: 'admin',
        });

      if (insertError) {
        throw insertError;
      }

      console.log('✅ Admin user created successfully!');
    }

    console.log('\nAdmin Credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('\n⚠️  Please change this password after first login!');

  } catch (error: any) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
