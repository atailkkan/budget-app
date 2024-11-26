"use client"

import "@/app/assets/css/auth.css"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth"
import { useRouter } from "next/navigation"
import { ThemeContext } from "../context/theme"

export default function AuthLayout({ children }) {

	const router = useRouter()
    const { theme } = useContext(ThemeContext)
	const { isLoggedIn } = useContext(AuthContext)
	const [ loggedIn, setLoggedIn ] = useState()
	useEffect(() => setLoggedIn(isLoggedIn()), [])

	loggedIn === true && router.push('/dashboard')

	return (
		<div className={`w-full min-h-screen flex flex-col items-center justify-center p-6 auth ${theme}`}>
			{ children }
		</div>
	)
}