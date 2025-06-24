"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")
  const router = useRouter()
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    const res = await fetch(`${API_URL}/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: form.email,
        password: form.password,
      }),
    })
    if (res.ok) {
      const data = await res.json()
      localStorage.setItem("token", data.access_token)
      setMessage("Connexion réussie !")
      router.push("/")
    } else {
      setMessage("Email ou mot de passe incorrect")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>
      {!isLogged && (
        <div className="flex justify-end space-x-2 mb-4">
          <button onClick={() => router.push("/login")} className="bg-white text-green-500 border border-green-500 px-4 py-2 rounded hover:bg-green-50">Se connecter</button>
          <button onClick={() => router.push("/register")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">S'inscrire</button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Mot de passe" className="w-full border px-3 py-2 rounded" value={form.password} onChange={handleChange} required />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Se connecter</button>
      </form>
      {message && <div className="mt-4 text-center text-sm text-green-700">{message}</div>}
    </div>
  )
}