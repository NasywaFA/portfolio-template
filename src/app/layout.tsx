import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { WaterCursor } from "@/components/WaterCursor"
import { Toaster } from "sonner"

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
        
        <Toaster position="bottom-right" richColors />
        
        <WaterCursor />
      </body>
    </html>
  )
}