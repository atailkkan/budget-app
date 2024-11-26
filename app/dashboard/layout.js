"use client"

import "@/app/assets/css/dashboard.css"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth"
import { useRouter } from "next/navigation"
import Sidebar from "../components/sidebar"
import Header from "../components/header"
import { ThemeContext } from "../context/theme"

export default function DashboardLayout({ children }) {

	const router = useRouter()
    const { theme } = useContext(ThemeContext)
	const { isLoggedIn } = useContext(AuthContext)
	const [ loggedIn, setLoggedIn ] = useState()
	useEffect(() => setLoggedIn(isLoggedIn()), [])

	loggedIn === false && router.push('/auth/login')

	return (
		<div className={`w-full h-full p-6 dashboard ${theme}`}>
            <div className="max-w-[1300px] m-auto w-full h-full">
                <Header />
                <div className="w-full flex flex-wrap lg:flex-nowrap pb-8">
                    <Sidebar />
                    <div className="w-full">
                        { children }
                    </div>
                </div>
            </div>
		</div>
	)
}