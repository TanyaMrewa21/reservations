// app/[tenant]/page.js
import { supabase } from '@/lib/supabase'

export default async function TenantPage({ params }) {
  const { tenant } = params
  
  // Fetch tenant data from Supabase
  const { data: tenantData, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', tenant)
    .single()

  if (error) {
    return <div>Korisnik nije pronađen</div>
  }

  return (
    <div>
      <h1>Dobrodošli u {tenantData.name}</h1>
      <p>Ovo je stranica za {tenantData.name}</p>
      <h2>Dostupni sportovi:</h2>
      <ul>
        {/* You would fetch available sports from your database */}
        <li><a href={`/${tenant}/squash`}>Squash</a></li>
        <li><a href={`/${tenant}/tenis`}>Tenis</a></li>
        <li><a href={`/${tenant}/nogomet`}>Nogomet</a></li>
      </ul>
    </div>
  )
}