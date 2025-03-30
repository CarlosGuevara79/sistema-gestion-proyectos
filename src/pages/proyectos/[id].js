import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProyecto, actualizarProyecto, getUsuariosDelProyecto, asignarUsuarioAProyecto, desasignarUsuarioDeProyecto } from '@/services/proyectos'
import { getTareasByProyecto, crearTarea, eliminarTarea, editarTarea } from '@/services/tareas'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import axios from 'axios'
import Modal from '@/components/ui/Modal'
import InputField from '@/components/ui/InputField'
import BackButton from '@/components/ui/BackButton'

export default function ProyectoDetalle() {
  const router = useRouter()
  const proyectoId = router.query.id
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const esAdminOGerente = user?.rol === 'Administrador' || user?.rol === 'Gerente'

  const [editandoId, setEditandoId] = useState(null)
  // const [tareaEditada, setTareaEditada] = useState('')
  const [mostrarModal, setMostrarModal] = useState(false)
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', asignado_a: '' })
  const [form, setForm] = useState({ nombre: '', descripcion: '' })
  const [nuevoMiembroId, setNuevoMiembroId] = useState('')
  const [mostrarEditarModal, setMostrarEditarModal] = useState(false)

  const { data: usuariosProyecto } = useQuery({
    queryKey: ['usuarios_proyecto', proyectoId],
    queryFn: () => getUsuariosDelProyecto(proyectoId),
    enabled: !!proyectoId
  })
  console.log("proyecto id", proyectoId)
  console.log("usuarios proyecto", usuariosProyecto)

  const { data: todosLosUsuarios } = useQuery({
    queryKey: ['usuarios'],
    queryFn: async () => (await axios.get('/api/usuarios')).data
  })

  const usuariosAsignables = todosLosUsuarios?.filter(
    u => !usuariosProyecto?.some(up => up.id === u.id)
  )

  const desasignarMutation = useMutation({
    mutationFn: usuario_id => desasignarUsuarioDeProyecto(proyectoId, usuario_id),
    onSuccess: () => {
      queryClient.invalidateQueries(['usuarios_proyecto', proyectoId])
    }
  })


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

  const proyectoMutation = useMutation({
    mutationFn: data => actualizarProyecto(proyectoId, data),
    onSuccess: () => queryClient.invalidateQueries(['proyecto', proyectoId])
  })

  const tareaMutation = useMutation({
    mutationFn: crearTarea,
    onSuccess: () => {
      queryClient.invalidateQueries(['tareas', proyectoId])
      setMostrarModal(false)
      setNuevaTarea({ titulo: '', descripcion: '', asignado_a: '' })
    }
  })

  const editarTareaMutation = useMutation({
    mutationFn: ({ id, data }) => editarTarea(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tareas', proyectoId])
      setEditandoId(null)
    }
  })

  const eliminarTareaMutation = useMutation({
    mutationFn: eliminarTarea,
    onSuccess: () => queryClient.invalidateQueries(['tareas', proyectoId])
  })

  const asignarMutation = useMutation({
    mutationFn: (usuario_id) => asignarUsuarioAProyecto(proyectoId, usuario_id),
    onSuccess: () => {
      setNuevoMiembroId('')
      queryClient.invalidateQueries(['usuarios_proyecto', proyectoId])
    }
  })

  useEffect(() => {
    if (proyecto) setForm({ nombre: proyecto.nombre, descripcion: proyecto.descripcion })
  }, [proyecto])

  if (isLoading || !proyecto) return <p className="p-10">Cargando proyecto...</p>

  return (
    <div className="p-10">
      <BackButton className="mb-4" />

      <Link href="/dashboard">
        <h1 className="text-3xl font-bold mb-6">{proyecto.nombre}</h1>
        <p className="text-gray-600 mt-1">{form.descripcion}</p>
      </Link>
      {esAdminOGerente && (
        <>
          <Modal isOpen={mostrarEditarModal} onClose={() => setMostrarEditarModal(false)} title="Editar Proyecto">
            <InputField
              label="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />

            <InputField
              label="Descripción"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />

            {/* Lista de miembros actuales con opción para desasignar */}
            <h2 className="font-bold mb-2">Miembros del Proyecto</h2>
            <ul className="flex gap-2 flex-wrap mb-4">
              {usuariosProyecto?.map((miembro) => (
                <li key={miembro.id} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2">
                  {miembro.nombre}
                  {esAdminOGerente && (
                    <button
                      onClick={() => desasignarMutation.mutate(miembro.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                      title="Desasignar usuario"
                    >
                      &times;
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Seleccionar usuario para asignar al proyecto */}
            <h2 className="font-bold mb-2">Agregar Usuario a Proyecto</h2>
            <div className="flex gap-2 mb-4">
              <select
                className="flex-1 border p-2 rounded"
                value={nuevoMiembroId}
                onChange={(e) => setNuevoMiembroId(e.target.value)}
              >
                <option value="">Selecciona un usuario...</option>
                {usuariosAsignables?.map(u => (
                  <option key={u.id} value={u.id}>{u.nombre}</option>
                ))}
              </select>

              <button
                onClick={() => asignarMutation.mutate(nuevoMiembroId)}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Asignar
              </button>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setMostrarEditarModal(false)}
                className="px-4 py-2 border rounded text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  proyectoMutation.mutate(form)
                  setMostrarEditarModal(false)
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Guardar Cambios
              </button>
            </div>
          </Modal>
        </>
      )}

      {/* Botón para abrir modal de nueva tarea */}
      {esAdminOGerente && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Nueva Tarea
          </button>
          <button
            onClick={() => setMostrarEditarModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ✏️ Editar Proyecto
          </button>
        </div>
      )}

      {/* Modal para nueva tarea */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Crear Nueva Tarea</h2>

            <label className="block text-sm font-medium">Título</label>
            <input
              className="w-full border rounded p-2 mb-2"
              value={nuevaTarea.titulo}
              onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
            />

            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              className="w-full border rounded p-2 mb-2"
              value={nuevaTarea.descripcion}
              onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
            />

            <label className="block text-sm font-medium">Asignar a</label>
            <select
              className="w-full border p-2 rounded mb-2"
              value={nuevaTarea.asignado_a}
              onChange={(e) => setNuevaTarea({ ...nuevaTarea, asignado_a: e.target.value })}
            >
              <option value="">Selecciona un usuario</option>
              {usuariosProyecto?.map((u) => (
                <option key={u.id} value={u.id}>{u.nombre}</option>
              ))}
            </select>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setMostrarModal(false)} className="px-4 py-2 border rounded">
                Cancelar
              </button>
              <button
                onClick={() => tareaMutation.mutate({ ...nuevaTarea, proyecto_id: proyectoId })}
                disabled={!nuevaTarea.titulo || !nuevaTarea.asignado_a}
                className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sección de tareas */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Tareas del Proyecto</h2>
        {tareas?.map((tarea) => {
          const puedeEditar = esAdminOGerente || tarea.asignado_a === user?.id
          const estaAsignadaAlUsuario = tarea.asignado_a === user?.id

          return (
            <div key={tarea.id} className="bg-white p-4 rounded shadow mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <Link href={`/tareas/${tarea.id}`}>
                    <h3 className="text-lg font-bold cursor-pointer hover:underline">{tarea.titulo}</h3>
                    <p className="text-sm text-gray-600">
                      Estado: <span className={`font-semibold ${tarea.estado === 'completada' ? 'text-green-600' : 'text-yellow-600'}`}>{tarea.estado}</span>
                      {estaAsignadaAlUsuario && (
                        <span className="ml-2 text-green-700 font-semibold">(Asignada a ti)</span>
                      )}
                    </p>
                  </Link>
                </div>

                {puedeEditar && (
                  <div className="flex items-center gap-2">
                    <select
                      className="text-sm border p-1 rounded"
                      value={tarea.estado}
                      onChange={(e) => editarTareaMutation.mutate({ id: tarea.id, data: { estado: e.target.value } })}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en progreso">En progreso</option>
                      <option value="completada">Completada</option>
                    </select>

                    {esAdminOGerente && (
                      <button
                        onClick={() => eliminarTareaMutation.mutate(tarea.id)}
                        className="text-red-500 text-sm"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
