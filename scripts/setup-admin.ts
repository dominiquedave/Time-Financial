import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY! // Note: Use service role key, not anon key
)

async function setupAdmin(userId: string) {
  try {
    const { data, error } = await supabase.auth.admin.updateUserById(
      userId,
      {
        user_metadata: { role: 'admin' }
      }
    )

    if (error) {
      console.error('Error setting up admin:', error)
      return
    }

    console.log('Admin setup complete:', data)

    // Update profiles table if needed
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('user_id', userId)

    if (profileError) {
      console.error('Error updating profile:', profileError)
      return
    }

  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

// Get userId from command line argument
const userId = process.argv[2]
if (!userId) {
  console.error('Please provide a user ID as an argument')
  process.exit(1)
}

setupAdmin(userId)