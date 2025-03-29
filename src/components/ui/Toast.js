import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg z-50 text-white
      ${type === 'success' && 'bg-green-600'}
      ${type === 'error' && 'bg-red-600'}
      ${type === 'info' && 'bg-blue-600'}
    `}>
      {message}
    </div>
  )
}
