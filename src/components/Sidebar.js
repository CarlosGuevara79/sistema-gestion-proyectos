import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { getProyectos } from '@/services/proyectos'
import { getTareas } from '@/services/tareas'
import { Bars3Icon, ArrowLeftOnRectangleIcon, ArrowDownCircleIcon, ArrowLeftCircleIcon } from '@heroicons/react/24/solid'

export default function Sidebar() {
  const [open, setOpen] = useState(true)
  const { user, logout } = useAuth()

  const { data: proyectos } = useQuery({
    queryKey: ['proyectos'],
    queryFn: getProyectos
  })

  const { data: tareas } = useQuery({
    queryKey: ['tareas'],
    queryFn: getTareas
  })

  const proyectosUsuario = proyectos?.filter(p =>
    p.usuarios?.some(u => u.id === user?.id)
  )

  const tareasUsuario = tareas?.filter(t => t.asignado_a === user?.id)

  return (
    <aside
      className={`bg-gray-800 text-white h-screen flex flex-col transition-all duration-300
      ${open ? 'w-64' : 'w-16'} overflow-hidden`}
    >
      {/* Toggle Button */}
      <div className="p-4 flex justify-between items-center">
        <button onClick={() => setOpen(!open)} className="text-white">
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-4">
        <Link href="/dashboard" className="block py-2 hover:underline">
          {open ? <span className="font-semibold">📁 Mis Proyectos</span> : '📁'}
        </Link>

        <Link href="/tareas" className="block py-2 hover:underline">
          {open ? <span className="font-semibold">✅ Mis Tareas</span> : '✅'}
        </Link>
      </nav>

      {/* Cerrar sesión al fondo */}
      <div className="p-4 mt-auto">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
        >
          <ArrowLeftCircleIcon className="w-5 h-5" />
          {open && 'Cerrar sesión'}
        </button>
      </div>
    </aside>
  )
}
