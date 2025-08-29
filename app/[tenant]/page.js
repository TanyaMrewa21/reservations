// app/[tenant]/page.js
import { supabase } from '../../lib/supabase'

export default async function TenantPage({ params }) {
  const { tenant } = params
  
  // Fetch tenant data from Supabase
  const { data: tenantData, error: tenantError } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', tenant)
    .single()

  if (tenantError || !tenantData) {
    return <div>Sportski centar nije pronađen</div>
  }

  // Fetch available sports for this tenant
  const { data: sportsData, error: sportsError } = await supabase
    .from('tenant_sports')
    .select(`
      sports (*)
    `)
    .eq('tenant_id', tenantData.id)

  if (sportsError) {
    return <div>Greška pri učitavanju sportova</div>
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{tenantData.name}</h1>
      <p>{tenantData.description}</p>
      
      <h2>Dostupni sportovi:</h2>
      <ul>
        {sportsData.map((item) => (
          <li key={item.sports.id}>
            <a href={`/${tenant}/${item.sports.slug}`}>
              {item.sports.name}
            </a>
          </li>
        ))}
      </ul>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h3>Kontakt informacije:</h3>
        <p>Email: {tenantData.contact_email}</p>
        <p>Telefon: {tenantData.phone}</p>
        <p>Adresa: {tenantData.address}</p>
      </div>
    </div>
  )
}