import { useRouter } from "next/navigation"
import { createContext } from "react"

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

	const router = useRouter()

    function getUserInfos() {
        const auth = JSON.parse(localStorage.getItem('auth'))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
        const hasUser = data.find(u => u.username === auth?.username && u.id === auth?.id)
        if(auth && hasUser) {
            return hasUser
        } else {
            return null
        }
    }

	function registerUser(user) {
		if(localStorage.getItem('localDB') === null) localStorage.setItem('localDB', JSON.stringify([]))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
		data.push(user)
		localStorage.setItem('localDB', JSON.stringify(data))
		alert('Kullanıcı kaydı başarılı')
		router.push('/auth/login')
	}

	function loginUser(user) {
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
		const hasUser = data.find(u => u.username === user?.username && u.password === user?.password)
		if(hasUser) {
			localStorage.setItem('auth', JSON.stringify({ id: hasUser?.id, username: hasUser?.username }))
			router.push('/dashboard')
		} else {
			alert('Kullanıcı girişi başarısız')
		}
	}

	function logoutUser() {
		localStorage.removeItem('auth')
        router.push('/auth/login')
	}

	function isLoggedIn() {
		const auth = JSON.parse(localStorage.getItem('auth'))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
		const hasUser = data.find(u => u.username === auth?.username && u.id === auth?.id)
		if(auth && hasUser) {
			return true
		} else {
			return false
		}
	}

	return (
		<AuthContext.Provider value={{ getUserInfos, registerUser, loginUser, logoutUser, isLoggedIn }}>
			{ children }
		</AuthContext.Provider>
	)
}