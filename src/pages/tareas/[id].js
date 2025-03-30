import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { getTarea, editarTarea } from '@/services/tareas'
import { getComentariosByTarea, crearComentario } from '@/services/comentarios'
import { getUsuariosDelProyecto } from '@/services/proyectos'
import BackButton from '@/components/ui/BackButton'
import Loading from '@/components/ui/Loading'

export default function TareaDetalle() {
  const router = useRouter()
  const tareaId = router.query.id
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const [nuevoComentario, setNuevoComentario] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [formEdit, setFormEdit] = useState({ titulo: '', descripcion: '', estado: '', asignado_a: '' })
  const [puedeComentar, setPuedeComentar] = useState(false)
  //variable para saber si el usuario puede editar o no 

  const { data: tarea, isLoading: cargandoTarea } = useQuery({
    queryKey: ['tarea', tareaId],
    queryFn: () => getTarea(tareaId),
    enabled: !!tareaId
  })

  const { data: usuariosProyecto } = useQuery({
    queryKey: ['usuarios_proyecto', tarea?.proyecto_id],
    queryFn: () => getUsuariosDelProyecto(tarea.proyecto_id),
    enabled: !!tarea?.proyecto_id
  })

  const { data: comentarios } = useQuery({
    queryKey: ['comentarios', tareaId],
    queryFn: () => getComentariosByTarea(tareaId),
    enabled: !!tareaId
  })

  const actualizarTareaMutation = useMutation({
    mutationFn: ({ id, data }) => editarTarea(id, data),
    onSuccess: () => {
      setModalAbierto(false)
      queryClient.invalidateQueries(['tarea', tareaId])
    }
  })

  const comentarioMutation = useMutation({
    mutationFn: crearComentario,
    onSuccess: () => {
      setNuevoComentario('')
      queryClient.invalidateQueries(['comentarios', tareaId])
    }
  })

  useEffect(() => {
    if (tarea) {
      setFormEdit({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion || '',
        estado: tarea.estado,
        asignado_a: tarea.asignado_a || ''
      })
    }

    if (tarea && usuariosProyecto) {
      const esAsignado = tarea.asignado_a === user?.id
      const esMiembroDelProyecto = usuariosProyecto.some(u => u.id === user?.id)
      setPuedeComentar(esAsignado || esAdminOGerente || esMiembroDelProyecto)
    }
  }, [tarea, usuariosProyecto, user])

  if (cargandoTarea || !tarea) return <Loading/>

  // console.log(puedeEditar)
  const puedeEditar = tarea.asignado_a === user?.id || esAdminOGerente
  const esAdminOGerente = user?.rol === 'Administrador' || user?.rol === 'Gerente'
  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded shadow">
            <BackButton className="mb-4" />

      <h1 className="text-2xl font-bold mb-4">Detalle de Tarea</h1>

      <h2 className="text-xl font-bold">{tarea.titulo}</h2>
      <p className="text-gray-700 mt-2"><strong>Descripción:</strong> {tarea.descripcion || 'Sin descripción'}</p>
      <p className="mt-2"><strong>Estado:</strong> {tarea.estado}</p>
      <p className="mt-2"><strong>Asignado a:</strong> {usuariosProyecto?.find(u => u.id === tarea.asignado_a)?.nombre || 'Sin asignar'}</p>

      {puedeEditar && (
        <button
          onClick={() => setModalAbierto(true)}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          Editar Tarea
        </button>
      )}

      <hr className="my-6" />

      <h3 className="text-lg font-bold mb-2">Comentarios</h3>
      {comentarios?.length === 0 && <p className="text-gray-500">No hay comentarios aún.</p>}
      {comentarios?.map(c => (
        <div key={c.id} className="mb-3 border-b pb-2">
          <p className="text-sm text-gray-600 font-semibold">{c.Usuario?.nombre || 'Usuario'}</p>
          <p>{c.comentario}</p>
        </div>
      ))}
      {puedeComentar && (
        <div className="mt-4">
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            className="w-full border p-2 rounded mb-2"
            rows="3"
            placeholder="Escribe un comentario..."
          />
          <button
            onClick={() =>
              comentarioMutation.mutate({
                tarea_id: tareaId,
                usuario_id: user.id,
                comentario: nuevoComentario
              })
            }
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Comentar
          </button>
        </div>
      )}

      {/* MODAL PARA EDITAR LA TAREA */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded shadow p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Editar Tarea</h2>

            {esAdminOGerente && (
              <>
                <input
                  value={formEdit.titulo}
                  onChange={(e) => setFormEdit({ ...formEdit, titulo: e.target.value })}
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Título"
                />
                <textarea
                  value={formEdit.descripcion}
                  onChange={(e) => setFormEdit({ ...formEdit, descripcion: e.target.value })}
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Descripción"
                  rows="3"
                />
              </>
            )}

            <label className="text-sm font-medium text-gray-700 mb-1 block">Estado:</label>
            <select
              value={formEdit.estado}
              onChange={(e) => setFormEdit({ ...formEdit, estado: e.target.value })}
              className="w-full border p-2 mb-4 rounded"
            >
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>

            {esAdminOGerente && (
              <>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Asignar a:</label>
                <select
                  value={formEdit.asignado_a}
                  onChange={(e) => setFormEdit({ ...formEdit, asignado_a: e.target.value })}
                  className="w-full border p-2 mb-4 rounded"
                >
                  <option value="">Seleccionar usuario...</option>
                  {usuariosProyecto?.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                  ))}
                </select>
              </>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  actualizarTareaMutation.mutate({ id: tarea.id, data: formEdit })
                }
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Guardar </button>
              <button onClick={() => setModalAbierto(false)} className="text-gray-600"> Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
