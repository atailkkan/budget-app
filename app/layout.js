'use client'

import { Inter } from "next/font/google"
import 'remixicon/fonts/remixicon.css'
import "@/app/assets/css/globals.css"
import AuthProvider from "./context/auth"
import CategoryProvider from "./context/category"
import ThemeProvider from "./context/theme"

const inter = Inter({ subsets: ['latin-ext'] })

export default function RootLayout({ children }) {
	return (
        <ThemeProvider>
            <AuthProvider>
                <CategoryProvider>
                    <html lang="tr">
                        <head>
                            <title>Harcama ve Bütçe Uygulaması</title>
                        </head>
                        <body className={`${inter.className} w-full h-screen`}>
                            {children}
                        </body>
                    </html>
                </CategoryProvider>
            </AuthProvider>
        </ThemeProvider>
	)
}