"use client"

import { CategoryContext } from "@/app/context/category"
import { useContext, useState } from "react"
import { uid } from "uid"

export default function CreateCategory() {

    const { createNewCategory } = useContext(CategoryContext)
    const [ category, setCategory ] = useState({ type: '', title: '', limit: '', items: [] })

    function handleSubmit(e) {
        e.preventDefault()
        category.id = uid(16)
        createNewCategory(category)
    }

	return (
		<div className="w-full">
            <h1 className="text-xl font-medium mb-6">Gelir & Gider Kategorisi Ekle</h1>
            <form id="createForm" onSubmit={(e) => handleSubmit(e)} className="grid gap-2 form-group">
                <div className="relative form-item">
                    <small className="block mb-1">Kategori Tipi Seçin</small>
                    <select name="type" onChange={(e) => { setCategory(prev => ({ ...prev, type: e.target.value })), e.target.value === "income" ? category.limit = "" : "" }} className="w-full bg-slate-100 outline-none p-3 rounded-md border border-slate-300 duration-200 focus:border-slate-400 hover:border-slate-400" required>
                        <option value=""></option>
                        <option value="expense">Gider</option>
                        <option value="income">Gelir</option>
                    </select>
                </div>
                <div className="relative form-item">
                    <small className="block mb-1">Kategori Başlığı</small>
					<input type="text" name="title" onChange={(e) => setCategory(prev => ({ ...prev, title: e.target.value }))} className="w-full bg-slate-100 outline-none p-3 px-4 rounded-md border border-slate-300 duration-200 focus:border-slate-400 hover:border-slate-400" required />
				</div>
                {
                    category.type === "expense" && <div className="relative form-item">
                        <small className="block mb-1">Bütçe Limiti</small>
                        <input type="text" name="limit" onChange={(e) => setCategory(prev => ({ ...prev, limit: e.target.value }))} className="w-full bg-slate-100 outline-none p-3 px-4 rounded-md border border-slate-300 duration-200 focus:border-slate-400 hover:border-slate-400" required />
                    </div>
                }
                <div className="relative grid gap-2 mt-4 form-item">
					<button className="w-full p-3 bg-green-400 duration-200 hover:bg-green-500 rounded-md text-white">Kategori Ekle</button>
				</div>
			</form>
        </div>
	)
}