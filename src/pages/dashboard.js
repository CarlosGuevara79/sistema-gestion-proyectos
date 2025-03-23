import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProyectos } from '@/services/proyectos'

export default function Dashboard() {
  const { user, logout, loading } = useAuth()
  const { data: proyectos, isLoading } = useQuery({ queryKey: ['proyectos'], queryFn: getProyectos })

  useEffect(() => {
    if (!user && !loading) {
      window.location.href = '/'
    }
  }, [user, loading])

  if (loading || !user || isLoading) return <p className="p-10">Cargando...</p>

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bienvenido, {user.email}</h1>
        <button className="bg-red-500 text-black py-2 px-4 rounded" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link href="/proyectos">
          <div className="cursor-pointer bg-white shadow rounded p-6 hover:bg-gray-200">
            <h2 className="text-xl font-semibold">📁 Proyectos</h2>
            <p className="text-black-600 mt-2">Gestiona todos los proyectos</p>
            <span className="font-bold text-3xl">{proyectos.length}</span>
          </div>
        </Link>

        <Link href="/tareas">
          <div className="cursor-pointer bg-white shadow rounded p-6 hover:bg-gray-200">
            <h2 className="text-xl font-semibold">✅ Tareas</h2>
            <p className="text-black-600 mt-2">Administra tareas fácilmente</p>
            <span className="font-bold text-3xl">-</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
