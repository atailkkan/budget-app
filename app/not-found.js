'use client'

import { useRouter } from "next/navigation"

export default function NotFound() {

    const router = useRouter()

	return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <h1 className="text-8xl font-semibold text-slate-300">404</h1>
            <h2 className="text-xl">Aradığınız sayfa bulunamadı</h2>
            <div className="mt-6">
                <button onClick={() => router.back()} className="bg-slate-700 duration-200 hover:bg-slate-600 text-white p-3 px-6 rounded-full inline-block">Geri dön</button>
            </div>
        </div>
    )
}