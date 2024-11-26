"use client"

import { CategoryContext } from "@/app/context/category"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { usePDF } from 'react-to-pdf'

export default function ListItem() {

    const router = useRouter()
    const { getAllCategories, getAllCategoryItems, deleteCategoryItemById, selectCategory } = useContext(CategoryContext)
    const [ categoryList, setCategoryList ] = useState([])
    const [ itemList, setItemList ] = useState([])
    useEffect(() => { setCategoryList(getAllCategories()), setItemList(getAllCategoryItems()) }, [])
    const formatter = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    function handleDelete(categoryId, itemId) {
        deleteCategoryItemById(categoryId, itemId)
        setItemList(getAllCategoryItems())
        setCategoryList(getAllCategories())
        router.refresh()
    }

    function totalIncome() {
        let total = 0
        itemList.forEach(item => {
            if(item.type === 'income') total += parseFloat(item.amount)
        })
        return total
    }

    function totalExpense() {
        let total = 0
        itemList.forEach(item => {
            if(item.type === 'expense') total += parseFloat(item.amount)
        })
        return total
    }

    function categoryItemsExpense(items) {
        let total = 0
        items.forEach(item => {
            if(item.type === 'expense') total += parseFloat(item.amount)
        })
        return total
    }

    function showNotification(category) {
        if(categoryItemsExpense(category.items) > ((category.limit) * 0.8) && categoryItemsExpense(category.items) < category.limit) {
            return <small className="text-red-600 font-semibold"><i className="ri-error-warning-line"></i> { category.title } harcamanızda belirttiğiniz limite yaklaştınız. Bundan sonra daha dikkatli harcama yapmanız gerekmektedir.</small>
        } else if (categoryItemsExpense(category.items) > category.limit) {
            return <small className="text-red-600 font-semibold"><i className="ri-error-warning-line"></i> { category.title } harcamanızda belirttiğiniz limiti ₺{ formatter.format(categoryItemsExpense(category.items) - category.limit) } kadar aşmış bulunmaktasınız. Daha sonraki harcamalarınızda dikkatli olmanız ve belirtilen limiti aşmamanız gerekmektedir.</small>
        }
    }

    const { toPDF, targetRef } = usePDF({filename: 'gelir&gider_liste.pdf'})

	return (
        <div className="w-full">
            <h1 className="text-xl font-medium flex flex-wrap items-center mb-6">
                <span>Gelir & Gider Kalem Listesi</span>
                <button className="text-[65%] font-normal ml-4 hover:underline" onClick={() => toPDF()}>PDF formatında indir</button>
            </h1>
            <div ref={targetRef}>
                <div className="w-full table">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="w-[12%] font-semibold text-sm border-b border-slate-300 py-2">Kategori</th>
                                <th className="w-[12%] font-semibold text-sm border-b border-slate-300 py-2">Açıklama</th>
                                <th className="w-[12%] font-semibold text-sm border-b border-slate-300 py-2">Tutar</th>
                                <th className="w-[12%] font-semibold text-sm border-b border-slate-300 py-2">Tarih</th>
                                <th className="w-[12%] font-semibold text-sm border-b border-slate-300 py-2">Tip</th>
                                <th className="w-[12%] font-semibold text-sm border-b border-slate-300 py-2">İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemList.map((item, i) => (
                                    <tr key={i}>
                                        <td className="py-2 border-b text-sm border-slate-300">{ selectCategory(item.category) }</td>
                                        <td className="py-2 border-b text-sm border-slate-300">{ item.description }</td>
                                        <td className="py-2 border-b text-sm border-slate-300">{ '₺' + (item.type === 'income' ? '+' : '-') + formatter.format(item.amount) }</td>
                                        <td className="py-2 border-b text-sm border-slate-300">{ item.date }</td>
                                        <td className="py-2 border-b text-sm border-slate-300">{ item.type === 'income' ? <small className="bg-green-500 text-white p-1 px-2 rounded-full">gelir</small> : <small className="bg-red-500 text-white p-1 px-2 rounded-full">gider</small> }</td>
                                        <td className="py-2 border-b text-sm border-slate-300">
                                            <button onClick={() => handleDelete(item.category, item.id)} className="w-[32px] h-[32px] rounded-full border-2 border-red-400 flex items-center justify-center text-red-400"><i className="ri-delete-bin-line"></i></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="mt-12 grid gap-2 table-results">
                    <div>Toplam öğe: <strong>{ itemList.length }</strong></div>
                    <div>Toplam gelir: <strong className="text-green-600">{ '₺' + formatter.format(totalIncome()) }</strong></div>
                    <div>Toplam gider: <strong className="text-red-500">{ '₺' + formatter.format(totalExpense()) }</strong></div>
                    <div>Elde kalan tutar: <strong>{ '₺' + formatter.format(totalIncome() - totalExpense()) }</strong></div>
                </div>
                <div className="mt-12 notifications">
                    <h2 className="font-semibold mb-2">Uyarılar & Bildirimler</h2>
                    <ul>
                        {
                            categoryList.map((category, i) => {
                                if(category.type === 'expense') {
                                    return (
                                        <li key={i}>
                                            <span>{ showNotification(category) }</span>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
	)
}