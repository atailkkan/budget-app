"use client"

import { CategoryContext } from "@/app/context/category"
import { Chart as ChartJS, scales } from "chart.js/auto"
import 'chartjs-adapter-date-fns'
import { useContext, useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { usePDF } from 'react-to-pdf'

export default function Reporting() {

    const { listAllCategoriesByDate } = useContext(CategoryContext)

    const [ list, setList ] = useState([])
    useEffect(() => setList(listAllCategoriesByDate()), [])

    const [ listDates, setListDates ] = useState([])
    const [ listIncomes, setListIncomes ] = useState([])
    const [ listExpenses, setListExpenses ] = useState([])
    
    useEffect(() => {
        list.map(item => setListDates(prev => [ ...prev, item.date ]))
        list.map(item => item.type === 'income' && setListIncomes(prev => [ ...prev, item.amount ]))
        list.map(item => item.type === 'expense' && setListExpenses(prev => [ ...prev, item.amount ]))
    }, [list])

    console.log(listIncomes, listExpenses)

    const [ filterMonth, setFilterMonth ] = useState(new Date().getMonth()+1)
    const [ filterYear, setFilterYear ] = useState(new Date().getFullYear())
    const [ startDate, setStartDate ] = useState()
    const [ endDate, setEndDate ] = useState()

    const data = {
        labels: listDates,
        datasets: [
            {
                label: 'Gelir',
                data: listIncomes
            },
            {
                label: 'Gider',
                data: listExpenses
            }
        ]
    }

    function filterChart(e) {
        setFilterMonth(e.target.value.split('-')[1])
        setFilterYear(e.target.value.split('-')[0])
    }

    useEffect(() => {
        let lastDay = (y, m) => { return new Date(y, m, 0).getDate() }
        let startDate = `${filterYear}-${filterMonth}-01`
        let endDate = `${filterYear}-${filterMonth}-${lastDay(filterYear, filterMonth)}`
        setStartDate(startDate)
        setEndDate(endDate)
    }, [filterMonth, filterYear])

    const { toPDF, targetRef } = usePDF({filename: 'raporlama&analiz.pdf'})

	return (
        <div className="w-full">
            <h1 className="text-xl font-medium mb-6">Raporlama & Analiz</h1>
            <div className="text-[80%]">
                <div className="flex items-center mb-4">
                    <input type="month" onChange={(e) => filterChart(e)} className="border border-slate-400 p-2" />
                    <div className="ml-4">
                        <button onClick={() => toPDF()} className="hover:underline">PDF formatında indir</button>
                    </div>
                </div>
                <div ref={targetRef}>
                    <Bar 
                        data={data} 
                        options={{
                            scales: {
                                x: { min: startDate, max: endDate, type: 'time', time: { unit: 'day' } },
                                y: { beginAtZero: true }
                            }
                        }} 
                    />
                </div>
            </div>
        </div>
	)
}