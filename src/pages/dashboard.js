import { useQuery } from '@tanstack/react-query'
import { getProyectos } from '@/services/proyectos'
import { getTareas } from '@/services/tareas'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import Loading from '@/components/ui/Loading'

export default function Dashboard() {
  const { user } = useAuth()

  const { data: proyectos, isLoading: loadingProyectos } = useQuery({
    queryKey: ['proyectos'],
    queryFn: getProyectos
  })

  const { data: tareas, isLoading: loadingTareas } = useQuery({
    queryKey: ['tareas'],
    queryFn: getTareas
  })

  const tareasAsignadas = tareas?.filter(
    t => t.asignado_a === user?.id
  )

  console.log("as", tareasAsignadas)

  if (loadingProyectos || loadingTareas) return <Loading />

  const totalTareas = tareasAsignadas.filter(t => t.estado === 'pendiente').length
  const tareasEnProgreso = tareasAsignadas.filter(t => t.estado === 'en progreso').length
  const tareasCompletadas = tareasAsignadas.filter(t => t.estado === 'completada').length

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <h2 className="text-xl font-semibold mb-4">Mis Proyectos</h2>
      {(user?.rol === 'Administrador' || user?.rol === 'Gerente') && (
        <div className="flex justify-end mb-4">
          <Link href="/proyectos/crear">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              + Crear Nuevo Proyecto
            </button>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {proyectos
          .filter(proyecto =>
            user?.rol === 'Administrador' ||
            user?.rol === 'Gerente' ||
            proyecto.Usuarios?.some(u => u.id === user?.id)
          )
          .map(proyecto => (
            <Link key={proyecto.id} href={`/proyectos/${proyecto.id}`}>
              <div className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100">
                <h3 className="font-semibold text-lg">{proyecto.nombre}</h3>
                <p className="text-gray-600 text-sm">{proyecto.descripcion}</p>
              </div>
            </Link>
          ))}
      </div>

      {/* Sección Estadísticas */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Estadísticas de Tareas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href={`/tareas`}>
            <div className="bg-red-500 text-white p-4 rounded shadow text-center">
              <h3 className="text-3xl font-bold">{totalTareas}</h3>
              <p className="text-sm font-semibold">Tareas Pendientes</p>
            </div>
          </Link>
          <Link href={`/tareas`}>
            <div className="bg-yellow-500 text-white p-4 rounded shadow text-center">
              <h3 className="text-3xl font-bold">{tareasEnProgreso}</h3>
              <p className="text-sm font-semibold">Tareas en Progreso</p>
            </div>
          </Link>
          <Link href={`/tareas`}>
            <div className="bg-green-500 text-white p-4 rounded shadow text-center">
              <h3 className="text-3xl font-bold">{tareasCompletadas}</h3>
              <p className="text-sm font-semibold">Tareas Completadas</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
