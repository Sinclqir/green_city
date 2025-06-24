"use client"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function ScrollToForm() {
  const searchParams = useSearchParams()
  useEffect(() => {
    if (searchParams.get("scrollTo") === "form") {
      const el = document.getElementById("form-idea-section")
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [searchParams])
  return null
} 