// app/[tenant]/[sport]/page.js
import { supabase } from '@/lib/supabase'

export default async function SportPage({ params }) {
  const { tenant, sport } = params
  
  // Fetch sport data from Supabase
  const { data: sportData, error } = await supabase
    .from('sports')
    .select('*')
    .eq('slug', sport)
    .single()

  if (error) {
    return <div>Sport nije pronađen</div>
  }

  return (
    <div>
      <h1>Rezervacija {sportData.name} u {tenant}</h1>
      <p>Ovo je stranica za rezervaciju {sportData.name} terena.</p>
      {/* Add your reservation interface here */}
    </div>
  )
}