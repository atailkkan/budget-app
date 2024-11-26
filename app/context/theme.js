"use client"

import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {

    const [ theme, setTheme ] = useState("light")

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light")
        theme === 'light' ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light')
    }

    useEffect(() => setTheme(localStorage.getItem('theme')), [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}