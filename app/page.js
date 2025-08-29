'use client'  // make this a client component

import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  useEffect(() => {
    async function testSupabase() {
      try {
        const { data, error } = await supabase.from('tenants').select('*').limit(1)
        if (error) {
          console.log('Supabase error:', error.message)
        } else {
          console.log('Supabase data:', data)
        }
      } catch (err) {
        console.log('Unexpected error:', err)
      }
    }

    testSupabase()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Testing Supabase Connection</h1>
      <p>Open the browser console to see results.</p>
    </div>
  )
}

