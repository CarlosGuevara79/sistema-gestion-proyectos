import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
