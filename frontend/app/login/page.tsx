"use client"
export const dynamic = "force-dynamic";
import React, { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Leaf } from "lucide-react"
import ScrollToForm from "@/components/ScrollToForm"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    const params = new URLSearchParams()
    params.append("username", email)
    params.append("password", password)

    try {
      const res = await fetch(`${API_URL}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      })

      if (res.ok) {
        const data = await res.json()
        // On stocke le token dans le localStorage du navigateur
        localStorage.setItem('token', data.access_token);
        setMessage("Connexion réussie ! Redirection...")
        // Rediriger vers la page d'accueil après un court délai
        setTimeout(() => {
          router.push("/")
        }, 1000)
      } else {
        setMessage("Email ou mot de passe incorrect.")
      }
    } catch (error) {
      setMessage("Impossible de contacter le serveur.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Suspense fallback={null}>
        <ScrollToForm />
      </Suspense>
      {/* Header GreenCity sticky en haut */}
      <header className="w-full px-4 py-6 flex items-center sticky top-0 bg-gray-100 z-10">
        <Link href="/" className="flex items-center space-x-2 group">
          <h1 className="text-2xl font-bold text-gray-800 group-hover:text-green-500 transition-colors">
            Green<span className="text-green-500">City</span>
          </h1>
          <Leaf className="h-6 w-6 text-green-500 ml-1" />
        </Link>
      </header>
      {/* Formulaire centré */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-800">Connexion</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Adresse email</label>
              <input id="email" name="email" type="email" placeholder="Email" className="mt-1 w-full border px-4 py-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="password">Mot de passe</label>
              <input id="password" name="password" type="password" placeholder="Mot de passe" className="mt-1 w-full border px-4 py-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300">Se connecter</button>
          </form>
          {message && <p className={`mt-4 text-center text-sm ${message.includes('incorrect') || message.includes('Impossible') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
        </div>
      </div>
    </div>
  )
} 