import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home() {
  const { login, user, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) router.push('/dashboard')
  }, [user, loading,router])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
    } catch (err) {
      alert('Credenciales incorrectas')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
        <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" className="w-full p-2 border rounded mb-4"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Ingresar
        </button>
        <p className="mt-4 text-sm text-center">
          ¿No tienes una cuenta? <Link href="/registro" className="text-blue-600 underline">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  )
}
