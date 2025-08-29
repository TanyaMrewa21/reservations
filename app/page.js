// app/page.js
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Dobrodošli u SOM Sports Rezervacije</h1>
      <p>Ovo je glavna stranica za rezervacije sportskih terena.</p>
      <p>Primjer linka za Sportski centar Graničar: 
        <Link href="/sportskicentargranicar">
          /sportskicentargranicar
        </Link>
      </p>
    </div>
  )
}