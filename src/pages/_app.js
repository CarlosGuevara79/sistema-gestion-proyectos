import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { AuthProvider } from '@/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardLayout from '@/layouts/DashboardLayout'


const queryClient = new QueryClient()
//agregar aqui rutas que no necesiten authentication
const noAuthRequired = ['/', '/registro']

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isPublic = noAuthRequired.includes(router.pathname)
  // se a;ade sidebar
  const content = isPublic ? (
    <Component {...pageProps} />
  ) : (
    <DashboardLayout>
      <Component {...pageProps} />
    </DashboardLayout>
  )

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {isPublic ? content : <ProtectedRoute>{content}</ProtectedRoute>}
      </QueryClientProvider>
    </AuthProvider>
  )
}
