import Link from "next/link";

export default function Sidebar() {
	return (
		<div className="w-full lg:min-w-[300px] lg:w-[300px] p-6 rounded-xl lg:mr-6 mb-6 lg:mb-0 bg-slate-100 self-start text-[80%] sidebar">
			<nav className="navbar-nav flex flex-wrap justify-center gap-4 lg:grid lg:gap-2">
				<div className="nav-item">
					<Link href="/dashboard/reporting" className="py-1 duration-200 hover:opacity-40">
						<span>Raporlama & Analiz</span>
					</Link>
				</div>
				<div className="nav-item">
					<Link href="/dashboard/category/create" className="py-1 duration-200 hover:opacity-40">
						<span>Kategori Ekle</span>
					</Link>
				</div>
				<div className="nav-item">
					<Link href="/dashboard/category/list" className="py-1 duration-200 hover:opacity-40">
						<span>Kategori Listesi</span>
					</Link>
				</div>
				<div className="nav-item">
					<Link href="/dashboard/item/create" className="py-1 duration-200 hover:opacity-40">
						<span>Gelir & Gider Ekle</span>
					</Link>
				</div>
				<div className="nav-item">
					<Link href="/dashboard/item/list" className="py-1 duration-200 hover:opacity-40">
						<span>Gelir & Gider Listesi</span>
					</Link>
				</div>
			</nav>
		</div>
	)
}