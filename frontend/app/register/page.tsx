"use client"
export const dynamic = "force-dynamic";
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Leaf } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    console.log("Soumission du formulaire avec:", form)
    
    try {
      const res = await fetch(`${API_URL}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })
      
      console.log("Réponse API:", res.status, res.statusText)
      
      if (res.ok) {
        console.log("Succès - redirection")
        setMessage("Inscription réussie ! Vous allez être redirigé...")
        setTimeout(() => {
          router.push("/login")
        }, 1000)
      } else {
        const data = await res.json()
        console.log("Erreur API:", data)
        const errorMessage = data.detail || "Erreur lors de l'inscription"
        console.log("Message d'erreur à afficher:", errorMessage)
        setMessage(errorMessage)
      }
    } catch (error) {
      console.log("Erreur réseau:", error)
      setMessage("Impossible de contacter le serveur.")
    }
  }

  console.log("Message actuel:", message)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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
          <h2 className="text-3xl font-bold text-center text-gray-800">Créer un compte</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Adresse email</label>
              <input id="email" name="email" type="email" placeholder="Email" className="mt-1 w-full border px-4 py-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="password">Mot de passe</label>
              <input id="password" name="password" type="password" placeholder="Mot de passe" className="mt-1 w-full border px-4 py-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" value={form.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300">S'inscrire</button>
          </form>
          {message && <p className={`mt-4 text-center text-sm ${message.includes('réussi') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
        </div>
      </div>
    </div>
  )
} 