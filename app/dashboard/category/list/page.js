"use client"

import { CategoryContext } from "@/app/context/category"
import { useContext, useEffect, useState } from "react"

export default function ListCategory() {

    const { getAllCategories, deleteCategoryById } = useContext(CategoryContext)
    const [ categoryList, setCategoryList ] = useState([])
    useEffect(() => setCategoryList(getAllCategories()), [])
    const formatter = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    function handleDelete(id) {
        deleteCategoryById(id)
        setCategoryList(getAllCategories())
    }

	return (
		<div className="w-full">
            <h1 className="text-xl font-medium mb-6">Gelir & Gider Kategori Listesi</h1>
            <div className="w-full table">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="w-[15%] font-semibold text-sm border-b border-slate-300 py-2">Tip</th>
                            <th className="w-[15%] font-semibold text-sm border-b border-slate-300 py-2">Başlık</th>
                            <th className="w-[15%] font-semibold text-sm border-b border-slate-300 py-2">Limit</th>
                            <th className="w-[15%] font-semibold text-sm border-b border-slate-300 py-2">İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categoryList.map((category, i) => (
                                <tr key={i}>
                                    <td className="py-2 border-b text-sm border-slate-300">{ category.type === 'income' ? <small className="bg-green-500 text-white p-1 px-2 rounded-full">gelir</small> : <small className="bg-red-500 text-white p-1 px-2 rounded-full">gider</small> }</td>
                                    <td className="py-2 border-b text-sm border-slate-300">{ category.title }</td>
                                    <td className="py-2 border-b text-sm border-slate-300">{ category.type === 'expense' ? '₺' + formatter.format(category.limit) : '-' }</td>
                                    <td className="py-2 border-b text-sm border-slate-300">
                                        <button onClick={() => handleDelete(category.id)} className="w-[32px] h-[32px] rounded-full border-2 border-red-400 flex items-center justify-center text-red-400"><i className="ri-delete-bin-line"></i></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
	)
}