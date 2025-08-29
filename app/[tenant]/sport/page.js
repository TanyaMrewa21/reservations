// app/[tenant]/[sport]/page.js
import { supabase } from '../../../lib/supabase'

export default async function SportPage({ params }) {
  const { tenant, sport } = params
  
  // Fetch tenant data
  const { data: tenantData, error: tenantError } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', tenant)
    .single()

  // Fetch sport data
  const { data: sportData, error: sportError } = await supabase
    .from('sports')
    .select('*')
    .eq('slug', sport)
    .single()

  if (tenantError || sportError || !tenantData || !sportData) {
    return <div>Stranica nije pronađena</div>
  }

  // Fetch available resources for this sport and tenant
  const { data: resourcesData, error: resourcesError } = await supabase
    .from('resources')
    .select('*')
    .eq('tenant_id', tenantData.id)
    .eq('sport_id', sportData.id)
    .eq('is_active', true)

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{sportData.name} - {tenantData.name}</h1>
      <p>{sportData.description}</p>
      
      <h2>Dostupni tereni:</h2>
      {resourcesError && <p>Greška pri učitavanju terena</p>}
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {resourcesData && resourcesData.map((resource) => (
          <div key={resource.id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            borderRadius: '8px',
            width: '300px'
          }}>
            <h3>{resource.name}</h3>
            <p>{resource.description}</p>
            <p>Kapacitet: {resource.capacity} osobe</p>
            <p>Cijena: {resource.price_per_hour} kn/sat</p>
            <button style={{
              padding: '10px 15px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Rezerviraj
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}