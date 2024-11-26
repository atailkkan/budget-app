"use client"

import { CategoryContext } from "@/app/context/category"
import { useContext, useEffect, useState } from "react"
import { uid } from "uid"

export default function CreateItem() {

    const { getAllCategories, createNewCategoryItem, selectType } = useContext(CategoryContext)
    const [ categories, setCategories ] = useState([])
    useEffect(() => setCategories(getAllCategories()), [])
    const [ categoryItem, setCategoryItem ] = useState({ category: '', description: '', amount: '', date: '', type: '' })

    function handleSubmit(e) {
        e.preventDefault()
        categoryItem.id = uid(16)
        categoryItem.type = selectType(categoryItem.category)
        createNewCategoryItem(categoryItem)
    }

	return (
        <div className="w-full">
            <h1 className="text-xl font-medium mb-6">Gelir & Gider Kalem Ekle</h1>
            <form id="createForm" onSubmit={(e) => handleSubmit(e)} className="grid gap-2 form-group">
                <div className="relative form-item">
                    <small className="block mb-1">Kategori Seçin</small>
                    <select name="category" onChange={(e) => setCategoryItem(prev => ({ ...prev, category: e.target.value }))} className="w-full bg-slate-100 outline-none p-3 rounded-md border border-slate-300 duration-200 focus:border-slate-400 hover:border-slate-400" required>
                        <option value=""></option>
                        {
                            categories.map((category, i) => (
                                <option key={i} value={category.id}>{category.title}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="relative form-item">
                    <small className="block mb-1">Kalem Açıklaması</small>
					<input type="text" name="description" onChange={(e) => setCategoryItem(prev => ({ ...prev, description: e.target.value }))} className="w-full bg-slate-100 outline-none p-3 px-4 rounded-md border border-slate-300 duration-200 focus:border-slate-400 hover:border-slate-400" required />
				</div>
                <div className="relative form-item">
                    <small className="block mb-1">Kalem Tutarı</small>
					<input type="number" name="amount" onChange={(e) => setCategoryItem(prev => ({ ...prev, amount: e.target.value }))} className="w-full bg-slate-100 outline-none p-3 px-4 rounded-md border border-slate-300 duration-200 focus:border-slate-400 hover:border-slate-400" required />
				</div>
                <div className="relative form-item">
                    <small className="block mb-1">Kalem Tarihi</small>
					<input type="date" name="date" onChange={(e) => setCategoryItem(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-slate-100 outline-none p-3 px-4 rounded-md border border-slate-300 duration-200 focus:border-slate-400 hover:border-slate-400" required />
				</div>
                <div className="relative grid gap-2 mt-4 form-item">
					<button className="w-full p-3 bg-green-400 duration-200 hover:bg-green-500 rounded-md text-white">Kalem Ekle</button>
				</div>
			</form>
        </div>
	)
}