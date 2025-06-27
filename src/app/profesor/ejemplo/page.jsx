'use client'
import { useSearchParams } from 'next/navigation'

export default function Pagina() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const persona = searchParams.get('persona')

  return (
    <div>
      <p>ID: {id}</p>
      <p>Persona: {persona}</p>
    </div>
  )
}