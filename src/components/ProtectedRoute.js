import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading,router])

  if (loading || !user) {
    return <div className="p-10">Verificando sesión...</div>
  }

  return children
}
