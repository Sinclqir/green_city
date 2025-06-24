"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  useEffect(() => {
    // Redirige vers la home après un court délai
    router.replace("/?scrollTo=form")
  }, [router])
  return null
} 