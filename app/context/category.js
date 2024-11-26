import { useRouter } from "next/navigation"
import { createContext } from "react"

export const CategoryContext = createContext()

export default function CategoryProvider({ children }) {

	const router = useRouter()

	function getAllCategories() {
        const auth = JSON.parse(localStorage.getItem('auth'))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
        const hasUser = data.find(u => u.username === auth?.username && u.id === auth?.id)
        if(auth && hasUser) {
            return hasUser.categories
        } else {
            return null
        }
    }

	function createNewCategory(category) {
        const auth = JSON.parse(localStorage.getItem('auth'))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
        const hasUser = data.find(u => u.username === auth?.username && u.id === auth?.id)
        if(auth && hasUser) {
            data.find(u => u.username === auth?.username).categories.push(category)
            localStorage.setItem('localDB', JSON.stringify(data))
            router.push('/dashboard/category/list')
        }
    }

    function deleteCategoryById(categoryId) {
        const auth = JSON.parse(localStorage.getItem('auth'))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
        const hasUser = data.find(u => u.username === auth?.username && u.id === auth?.id)
        if(auth && hasUser) {
            if(((data.find(u => u.username === auth?.username).categories).find(c => c.id === categoryId)).items.length > 0) {
                alert('Bu kategoriye ait bir öğe bulunduğu için silemezsiniz.')
            } else {
                data.find(u => u.username === auth?.username).categories = data.find(u => u.username === auth?.username).categories.filter(c => c.id !== categoryId)
                localStorage.setItem('localDB', JSON.stringify(data))
                router.push('/dashboard/category/list')
            }
        }
    }

    function getAllCategoryItems() {
        const auth = JSON.parse(localStorage.getItem('auth'))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
        const hasUser = data.find(u => u.username === auth?.username && u.id === auth?.id)
        const arr = []
        if(auth && hasUser) {
            (hasUser.categories).map(category => {
                (category.items).map(item => {
                    arr.push(item)
                })
            })
            return arr
        } else {
            return null
        }
    }

    function createNewCategoryItem(categoryItem) {
        const auth = JSON.parse(localStorage.getItem('auth'))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
        const hasUser = data.find(u => u.username === auth?.username && u.id === auth?.id)
        if(auth && hasUser) {
            (data.find(u => u.username === auth?.username).categories).find(c => c.id === categoryItem.category).items.push(categoryItem)
            localStorage.setItem('localDB', JSON.stringify(data))
            router.push('/dashboard/item/list')
        }
    }

    function deleteCategoryItemById(categoryId, itemId) {
        const auth = JSON.parse(localStorage.getItem('auth'))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
        const hasUser = data.find(u => u.username === auth?.username && u.id === auth?.id)
        if(auth && hasUser) {
            (data.find(u => u.username === auth?.username).categories).find(c => c.id === categoryId).items = (data.find(u => u.username === auth?.username).categories).find(c => c.id === categoryId).items.filter(i => i.id !== itemId)
            localStorage.setItem('localDB', JSON.stringify(data))
            router.push('/dashboard/item/list')
        }
    }

    function selectType(categoryId) {
        const auth = JSON.parse(localStorage.getItem('auth'))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
        const hasUser = data.find(u => u.username === auth?.username && u.id === auth?.id)
        if(auth && hasUser) {
            return (hasUser.categories).find(c => c.id === categoryId).type
        }
    }

    function selectCategory(categoryId) {
        const auth = JSON.parse(localStorage.getItem('auth'))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
        const hasUser = data.find(u => u.username === auth?.username && u.id === auth?.id)
        if(auth && hasUser) {
            return (hasUser.categories).find(c => c.id === categoryId).title
        }
    }

    function listAllCategoriesByDate() {
        const auth = JSON.parse(localStorage.getItem('auth'))
		const data = JSON.parse(localStorage.getItem('localDB')) ?? []
        const hasUser = data.find(u => u.username === auth?.username && u.id === auth?.id)
        const arr = []
        if(auth && hasUser) {
            (hasUser.categories).map(category => {
                (category.items).map(item => {
                    arr.push(item)
                })
            })
            return arr.sort((a, b) => new Date(a.date) - new Date(b.date))
        } else {
            return null
        }
    }

	return (
		<CategoryContext.Provider value={{ getAllCategories, createNewCategory, deleteCategoryById, getAllCategoryItems, createNewCategoryItem, deleteCategoryItemById, selectType, selectCategory, listAllCategoriesByDate }}>
			{ children }
		</CategoryContext.Provider>
	)
}