import { useQuery } from '@tanstack/react-query'
import { getProyectos } from '@/services/proyectos'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Dashboard() {
  const { user,logout } = useAuth()

  const { data: proyectos, isLoading } = useQuery({
    queryKey: ['proyectos'],
    queryFn: getProyectos
  })

  if (isLoading) return <p className="p-10">Cargando proyectos...</p>

  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Mis Proyectos</h1>
        <Link
          href="/proyectos/crear"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          + Nuevo Proyecto
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {proyectos?.map(proyecto => (
          <Link
            href={`/proyectos/${proyecto.id}`}
            key={proyecto.id}
            className="block p-5 bg-white rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-blue-700 mb-1">{proyecto.nombre}</h2>
            <p className="text-gray-600 text-sm line-clamp-2">{proyecto.descripcion}</p>
            <div className="text-xs text-gray-400 mt-3">
              Inicia: {proyecto.fecha_inicio || 'No definida'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


// import Link from 'next/link'
// import { useAuth } from '@/context/AuthContext'
// import { useEffect } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { getProyectos } from '@/services/proyectos'

// export default function Dashboard() {
//   const { user, logout, loading } = useAuth()
//   const { data: proyectos, isLoading } = useQuery({ queryKey: ['proyectos'], queryFn: getProyectos })

//   useEffect(() => {
//     if (!user && !loading) {
//       window.location.href = '/'
//     }
//   }, [user, loading])

//   if (loading || !user || isLoading) return <p className="p-10">Cargando...</p>

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Bienvenido, {user.email}</h1>
//         <button className="bg-red-500 text-black py-2 px-4 rounded" onClick={logout}>
//           Cerrar sesión
//         </button>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <Link href="/proyectos">
//           <div className="cursor-pointer bg-white shadow rounded p-6 hover:bg-gray-200">
//             <h2 className="text-xl font-semibold">Proyectos</h2>
//             <p className="text-black-600 mt-2">Gestiona todos los proyectos</p>
//             <span className="font-bold text-3xl">{proyectos.length}</span>
//           </div>
//         </Link>

//         <Link href="/tareas">
//           <div className="cursor-pointer bg-white shadow rounded p-6 hover:bg-gray-200">
//             <h2 className="text-xl font-semibold">Tareas</h2>
//             <p className="text-black-600 mt-2">Administra tareas fácilmente</p>
//             <span className="font-bold text-3xl">-</span>
//           </div>
//         </Link>
//       </div>
//     </div>
//   )
// }
