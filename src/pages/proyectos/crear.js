import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { crearProyecto } from '@/services/proyectos'
import { useAuth } from '@/context/AuthContext'
import BackButton from '@/components/ui/BackButton'

export default function CrearProyecto() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const [form, setForm] = useState({ nombre: '', descripcion: '', fecha_inicio: '', fecha_fin: '' })
  const [error, setError] = useState(null)

  const crearProyectoMutation = useMutation({
    mutationFn: crearProyecto,
    onSuccess: () => {
      queryClient.invalidateQueries(['proyectos'])
      router.push('/dashboard')
    },
    onError: () => {
      setError('Error al crear el proyecto. Intenta nuevamente.')
    }
  })

  const handleSubmit = () => {
    const hoy = new Date().setHours(0,0,0,0)
    const fechaInicio = new Date(form.fecha_inicio).setHours(0,0,0,0)
    const fechaFin = new Date(form.fecha_fin).setHours(0,0,0,0)

    if (!form.nombre || !form.descripcion || !form.fecha_inicio || !form.fecha_fin) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (fechaInicio < hoy) {
      setError('La fecha de inicio no puede ser anterior al día de hoy')
      return
    }

    if (fechaInicio > fechaFin) {
      setError('La fecha de inicio no puede ser posterior a la fecha fin')
      return
    }

    setError(null)
    crearProyectoMutation.mutate({
      ...form,
      creado_por: user.id
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <BackButton className="mb-4" />
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

      <label className="block text-sm font-medium mb-1">Fecha de Inicio</label>
      <input
        type="date"
        className="w-full border p-2 rounded mb-4"
        value={form.fecha_inicio}
        onChange={(e) => setForm({ ...form, fecha_inicio: e.target.value })}
      />

      <label className="block text-sm font-medium mb-1">Fecha Fin</label>
      <input
        type="date"
        className="w-full border p-2 rounded mb-4"
        value={form.fecha_fin}
        onChange={(e) => setForm({ ...form, fecha_fin: e.target.value })}
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