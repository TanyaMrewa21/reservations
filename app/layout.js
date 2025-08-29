// app/layout.js
import './globals.css'

export const metadata = {
  title: 'SOM Sports Rezervacije',
  description: 'Rezervacija sportskih terena',
}

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <body>{children}</body>
    </html>
  )
}