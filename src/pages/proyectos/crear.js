import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { crearProyecto } from '@/services/proyectos'
import { useAuth } from '@/context/AuthContext'

export default function CrearProyecto() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const [form, setForm] = useState({ nombre: '', descripcion: '' })
  const [error, setError] = useState(null)

  const crearProyectoMutation = useMutation({
    mutationFn: crearProyecto,
    onSuccess: () => {
      queryClient.invalidateQueries(['proyectos'])
      router.push('/proyectos')
    },
    onError: () => {
      setError('Error al crear el proyecto. Intenta nuevamente.')
    }
  })

  const handleSubmit = () => {
    if (!form.nombre || !form.descripcion) {
      setError('Todos los campos son obligatorios')
      return
    }

    setError(null)
    crearProyectoMutation.mutate({
      ...form,
      creado_por: user.id
    })
  }
  // console.log(form.nombre);
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Proyecto</h1>

      <label className="block text-sm font-medium mb-1">Nombre del Proyecto</label>
      <input
        className="w-full border p-2 rounded mb-4"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        placeholder="Nombre"
      />

      <label className="block text-sm font-medium mb-1">Descripción</label>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={4}
        value={form.descripcion}
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        placeholder="Descripción del proyecto"
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Crear Proyecto
      </button>
    </div>
  )
}
