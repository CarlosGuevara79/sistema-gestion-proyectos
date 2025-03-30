import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { getTareas } from '@/services/tareas'
import Link from 'next/link'
import { useState } from 'react'
import BackButton from '@/components/ui/BackButton'
import Loading from '@/components/ui/Loading'

export default function MisTareas() {
  const { user } = useAuth()
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  const { data: tareas, isLoading } = useQuery({
    queryKey: ['tareas-todas'],
    queryFn: getTareas
  })

  if (isLoading) return <Loading/>

  const tareasAsignadas = tareas?.filter(
    t => t.asignado_a === user?.id
  )

  const tareasFiltradas = tareasAsignadas?.filter(t =>
    t.titulo.toLowerCase().includes(busqueda.toLowerCase()) &&
    (filtroEstado === '' || t.estado === filtroEstado)
  )
  

  return (
    <div className="p-6 max-w-4xl mx-auto">
            <BackButton className="mb-4" />
      
      <h1 className="text-2xl font-bold mb-6">Mis Tareas Asignadas</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por título..."
          className="border rounded p-2 w-full md:w-1/2"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="border rounded p-2 mt-2 md:mt-0 w-full md:w-auto"
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      {/* Lista de tareas */}
      {tareasFiltradas?.length === 0 ? (
        <p className="text-gray-500 italic">No se encontraron tareas.</p>
      ) : (
        tareasFiltradas.map(tarea => (
          <Link href={`/tareas/${tarea.id}`} key={tarea.id}>
            <div className="mb-4 p-4 bg-white shadow rounded cursor-pointer hover:shadow-md transition">
              <h2 className="font-bold">{tarea.titulo}</h2>
              <p className="text-sm text-gray-600">
                Estado:{' '}
                <span
                  className={`font-semibold ${tarea.estado === 'completada'
                    ? 'text-green-600'
                    : tarea.estado === 'en progreso'
                      ? 'text-blue-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {tarea.estado}
                </span>
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}
