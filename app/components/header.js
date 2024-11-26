"use client"

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth"
import { ThemeContext } from "../context/theme"

export default function Header() {

    const { theme, toggleTheme } = useContext(ThemeContext)
    const { logoutUser, getUserInfos } = useContext(AuthContext)
    const [ userInfos, setUserInfos ] = useState({})
    useEffect(() => setUserInfos(getUserInfos()), [])

	return (
		<div className="w-full flex items-center justify-between mb-6">
			<div className="inline-flex items-center user">
				<div className="w-[44px] h-[44px] mr-2 bg-slate-100 flex items-center justify-center text-xl text-slate-500 rounded-full avatar">
					<i className="ri-user-line"></i>
				</div>
				<div className="leading-[1.3]">
					<small className="block">Hoşgeldiniz</small>
					<span>{ `${userInfos.firstname} ${userInfos.surname}` }</span>
				</div>
			</div>
			<div className="inline-flex items-center">
                <div className="inline-flex text-xl mr-2">
                    <button onClick={toggleTheme}>
                        { theme === 'light'? (<i className="ri-sun-line"></i>) : (<i className="ri-moon-line"></i>) }
                    </button>
                </div>
                <button className="inline-flex items-center bg-red-400 duration-200 hover:bg-red-500 text-white p-1 px-3 rounded-full logout" onClick={() => logoutUser()}>
                    <i className="ri-shut-down-line text-lg"></i>
                    <small className="ml-1">Çıkış yap</small>
                </button>
            </div>
		</div>
	)
}