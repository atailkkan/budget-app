'use client'

import { AuthContext } from "@/app/context/auth"
import Link from "next/link"
import { useContext, useState } from "react"
import { uid } from "uid"

export default function Register() {

	const { registerUser } = useContext(AuthContext)
	const [ user, setUser ] = useState({ firstname: '', surname: '', username: '', password: '', categories: [] })

	function handleSubmit(e) {
		e.preventDefault()
		user.id = uid(16)
		registerUser(user)
	}

	return (
		<div className="max-w-[500px] w-full bg-slate-100 rounded-xl p-6 form">
			<div className="text-center mb-4 title">
				<h1 className="text-xl font-medium text-slate-600">Kullanıcı Kayıt</h1>
			</div>
			<form id="registerForm" onSubmit={(e) => handleSubmit(e)} className="grid gap-4 form-group">
				<div className="relative form-item">
					<input type="text" name="firstname" onChange={(e) => setUser(prev => ({ ...prev, firstname: e.target.value }))} placeholder="Adınız" className="w-full outline-none p-3 rounded-md border border-white duration-200 focus:border-slate-400 hover:border-slate-400 text-center" required />
				</div>
				<div className="relative form-item">
					<input type="text" name="surname" onChange={(e) => setUser(prev => ({ ...prev, surname: e.target.value }))} placeholder="Soyadınız" className="w-full outline-none p-3 rounded-md border border-white duration-200 focus:border-slate-400 hover:border-slate-400 text-center" required />
				</div>
				<div className="relative form-item">
					<input type="text" name="username" onChange={(e) => setUser(prev => ({ ...prev, username: e.target.value }))} placeholder="Kullanıcı Adınız" className="w-full outline-none p-3 rounded-md border border-white duration-200 focus:border-slate-400 hover:border-slate-400 text-center" required />
				</div>
				<div className="relative form-item">
					<input type="text" name="password" onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))} placeholder="Kullanıcı Şifreniz" className="w-full outline-none p-3 rounded-md border border-white duration-200 focus:border-slate-400 hover:border-slate-400 text-center" required />
				</div>
				<div className="relative grid gap-4 form-item">
					<button className="w-full p-3 bg-violet-400 duration-200 hover:bg-violet-500 rounded-md text-white">Kayıt Olun</button>
				</div>
			</form>
			<div className="text-center mt-4 note">
				<small className="text-slate-600">Zaten bir hesabınız var mı? • <Link href="/auth/login" className="font-semibold hover:underline">Giriş yapın</Link></small>
			</div>
		</div>
	)
}