import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProyecto, actualizarProyecto } from '@/services/proyectos'
import { getTareasByProyecto, crearTarea, eliminarTarea } from '@/services/tareas'

export default function ProyectoDetalle() {
  const router = useRouter()
  const proyectoId = router.query.id
  const queryClient = useQueryClient()

  const { data: proyecto, isLoading } = useQuery({
    queryKey: ['proyecto', proyectoId],
    queryFn: () => getProyecto(proyectoId),
    enabled: !!proyectoId
  })

  const { data: tareas } = useQuery({
    queryKey: ['tareas', proyectoId],
    queryFn: () => getTareasByProyecto(proyectoId),
    enabled: !!proyectoId
  })

  const [form, setForm] = useState({ nombre: '', descripcion: '' })
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '' })

  const proyectoMutation = useMutation({
    mutationFn: data => actualizarProyecto(proyectoId, data),
    onSuccess: () => queryClient.invalidateQueries(['proyecto', proyectoId])
  })

  const tareaMutation = useMutation({
    mutationFn: crearTarea,
    onSuccess: () => {
      setNuevaTarea({ titulo: '' })
      queryClient.invalidateQueries(['tareas', proyectoId])
    }
  })

  const eliminarTareaMutation = useMutation({
    mutationFn: eliminarTarea,
    onSuccess: () => queryClient.invalidateQueries(['tareas', proyectoId])
  })

  useEffect(() => {
    if (proyecto) setForm({ nombre: proyecto.nombre, descripcion: proyecto.descripcion })
  }, [proyecto])

  if (isLoading) return "Cargando..."

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">{proyecto.nombre}</h1>

      <div className="mb-6 bg-white shadow p-6 rounded">
        <h2 className="font-bold mb-2">Editar Proyecto</h2>
        <input
          className="border rounded p-2 w-full mb-2"
          value={form.nombre}
          onChange={e => setForm({...form, nombre: e.target.value})}
        />
        <textarea
          className="border rounded p-2 w-full mb-2"
          value={form.descripcion}
          onChange={e => setForm({...form, descripcion: e.target.value})}
        />
        <button
          onClick={() => proyectoMutation.mutate(form)}
          className="bg-blue-500 text-white py-2 px-4 rounded">
          Guardar Cambios
        </button>
      </div>

      <div className="bg-white shadow p-6 rounded">
        <h2 className="font-bold mb-2">Tareas</h2>
        <input
          className="border rounded p-2 w-full mb-2"
          placeholder="Título de la tarea"
          value={nuevaTarea.titulo}
          onChange={e => setNuevaTarea({ titulo: e.target.value })}
        />
        <button
          onClick={() => tareaMutation.mutate({ ...nuevaTarea, proyecto_id: proyectoId })}
          className="bg-green-500 text-white py-2 px-4 rounded">
          Crear Tarea
        </button>

        {tareas?.map(tarea => (
          <div key={tarea.id} className="mt-2 flex justify-between items-center border-b py-2">
            <p>{tarea.titulo}</p>
            <button onClick={() => eliminarTareaMutation.mutate(tarea.id)} className="text-red-500">Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  )
}
