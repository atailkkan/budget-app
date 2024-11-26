'use client'

import { AuthContext } from "@/app/context/auth"
import Link from "next/link"
import { useContext, useState } from "react"

export default function Login() {

	const { loginUser } = useContext(AuthContext)
	const [ user, setUser ] = useState({ username: '', password: '' })

	function handleSubmit(e) {
		e.preventDefault()
		loginUser(user)
	}

	return (
		<div className="max-w-[500px] w-full bg-slate-100 rounded-xl p-6 form">
			<div className="text-center mb-4 title">
				<h1 className="text-xl font-medium text-slate-600">Kullanıcı Girişi</h1>
			</div>
			<form id="loginForm" onSubmit={(e) => handleSubmit(e)} className="grid gap-4 form-group">
				<div className="relative form-item">
					<input type="text" name="username" onChange={(e) => setUser(prev => ({ ...prev, username: e.target.value }))} placeholder="Kullanıcı Adınız" className="w-full outline-none p-3 rounded-md border border-white duration-200 focus:border-slate-400 hover:border-slate-400 text-center" required />
				</div>
				<div className="relative form-item">
					<input type="text" name="password" onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))} placeholder="Kullanıcı Şifreniz" className="w-full outline-none p-3 rounded-md border border-white duration-200 focus:border-slate-400 hover:border-slate-400 text-center" required />
				</div>
				<div className="relative grid gap-4 form-item">
					<button className="w-full p-3 bg-blue-400 duration-200 hover:bg-blue-500 rounded-md text-white">Giriş Yapın</button>
				</div>
			</form>
			<div className="text-center mt-4 note">
				<small className="text-slate-600">Henüz bir hesabınız yok mu? • <Link href="/auth/register" className="font-semibold hover:underline">Kayıt olun</Link></small>
			</div>
		</div>
	)
}