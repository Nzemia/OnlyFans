import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "next-cloudinary/dist/cld-video-player.css"
import { ThemeProvider } from "@/providers/ThemeProvider"
import Footer from "@/components/Footer"
import TanStackProvider from "@/providers/TanStackProvider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "OnlyCats",
    description: "Selling OnlyCats content!"
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="h-screen flex flex-col">
                        <div className="flex-1">
                            <TanStackProvider>{children}</TanStackProvider>
                            <Toaster />
                        </div>

                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
