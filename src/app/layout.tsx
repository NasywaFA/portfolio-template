import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { WaterCursor } from "@/components/WaterCursor"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}
        
        <WaterCursor />
      </body>
    </html>
  )
}