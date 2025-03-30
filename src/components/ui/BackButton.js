import { useRouter } from 'next/router'

export default function BackButton({ href, children = '← Regresar', className }) {
  const router = useRouter()
/// creacion de backbutton 
  const handleClick = () => {
    if (href) router.push(href)
    else router.back()
  }

  return (
    <button
      onClick={handleClick}
      className={`text-indigo-600 hover:text-indigo-800 font-semibold ${className}`}
    >
      {children}
    </button>
  )
}
