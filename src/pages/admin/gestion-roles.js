import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsuarios, cambiarRolUsuario } from '@/services/usuarios'
import { getRoles } from '@/services/roles'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import BackButton from '@/components/ui/BackButton'
import { editarUsuario } from '@/services/usuarios'
import Loading from '@/components/ui/Loading'

export default function GestionRoles() {
  const { user } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [modalAbierto, setModalAbierto] = useState(false)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const [nuevoRol, setNuevoRol] = useState('')
  const [nuevoEmail, setNuevoEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState(null)

  const esEmailValido = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  
  useEffect(() => {
    if (user?.rol !== 'Administrador') {
      router.push('/dashboard')
    }
  }, [user, router])

  const { data: usuarios, isLoading: loadingUsuarios } = useQuery({
    queryKey: ['usuarios'],
    queryFn: getUsuarios
  })

  const { data: roles, isLoading: loadingRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles
  })

  const editarUsuarioMutation = useMutation({
    mutationFn: ({ id, rol, email }) => editarUsuario(id, { rol, email }),
    onSuccess: () => {
      queryClient.invalidateQueries(['usuarios'])
      setModalAbierto(false)
    }
  })

  const abrirModal = (usuario) => {
    const rolActual = roles.find(r => r.id === usuario.rol_id)?.nombre || ''
    setUsuarioSeleccionado(usuario)
    setNuevoRol(rolActual)
    setNuevoEmail(usuario.email)
    setModalAbierto(true)
  }

  if (loadingUsuarios || loadingRoles) return <Loading/>

  return (
    <div className="p-10">
      <BackButton className="mb-4" />

      <h1 className="text-3xl font-bold mb-4">Gestión de Usuarios</h1>

      <table className="w-full border-collapse bg-white rounded shadow">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rol</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios
            .filter(usuario => usuario.id !== user.id)
            .map(usuario => (
              <tr key={usuario.id}>
                <td className="border p-2">{usuario.nombre}</td>
                <td className="border p-2">{usuario.email}</td>
                <td className="border p-2 font-semibold">
                  {roles.find(r => r.id === usuario.rol_id)?.nombre || 'Sin Rol'}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => abrirModal(usuario)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal edición rol y email */}
      <Modal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        title={`Editar Usuario: ${usuarioSeleccionado?.nombre}`}
      >
        <div className="p-4">
          <label className="block mb-2 font-medium">Nuevo Correo Electrónico:</label>
          <input
            type="email"
            value={nuevoEmail}
            onChange={(e) => setNuevoEmail(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          <label className="block mb-2 font-medium">Seleccionar nuevo rol:</label>
          <select
            value={nuevoRol}
            onChange={(e) => setNuevoRol(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          >
            {roles.map((rol) => (
              <option key={rol.id} value={rol.nombre}>{rol.nombre}</option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setModalAbierto(false)}
              className="px-4 py-2 border rounded text-gray-700"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (!esEmailValido(nuevoEmail)) {
                  setErrorEmail('Por favor ingresa un correo electrónico válido.');
                  return;
                }
                setErrorEmail(null);
                editarUsuarioMutation.mutate({
                  id: usuarioSeleccionado.id,
                  rol: nuevoRol,
                  email: nuevoEmail
                });
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Actualizar Usuario
            </button>
          </div>
        </div>
        {errorEmail && <p className="text-red-500 mt-2">{errorEmail}</p>}

      </Modal>
    </div>
  )
}
