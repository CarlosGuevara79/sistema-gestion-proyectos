import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import axios from 'axios'
import BackButton from '@/components/ui/BackButton'

export default function Registro() {
  const { user } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) router.push('/dashboard')
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/registro', form)
      router.push('/')
    } catch (err) {
      setError('Error al registrar usuario')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <BackButton className="mb-4" />
        <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 border rounded mb-2"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-2 border rounded mb-2"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded mb-4"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700">
          Registrarse
        </button>
      </form>
    </div>
  )
}
