"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Leaf } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface User {
  id: number
  email: string
  name: string | null
  is_admin: boolean
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const verifyAdminAndFetchData = async () => {
      try {
        const userRes = await fetch(`${API_URL}/users/me`, {
          headers: { 'Authorization': `Bearer ${token}` },
        })
        if (!userRes.ok) throw new Error("Auth error")
        const user = await userRes.json()
        if (!user.is_admin) {
          router.push('/')
          return
        }

        const usersRes = await fetch(`${API_URL}/users/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        })
        if (!usersRes.ok) throw new Error('Failed to fetch users')
        const usersData = await usersRes.json()
        setUsers(usersData)

      } catch (err) {
        setError((err as Error).message)
        if ((err as Error).message === "Auth error") {
            router.push('/login');
        }
      } finally {
        setLoading(false)
      }
    }

    verifyAdminAndFetchData()
  }, [router])

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur et toutes ses idées ? Cette action est irréversible.")) {
        return;
    }
    const token = localStorage.getItem('token')
    try {
        const res = await fetch(`${API_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.ok) {
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            alert("Utilisateur et ses idées supprimés avec succès.");
        } else {
            const errorData = await res.json();
            throw new Error(errorData.detail || "Échec de la suppression de l'utilisateur.");
        }
    } catch (err) {
        alert("Erreur: " + (err as Error).message);
    }
  };

  if (loading) return <div className="text-center mt-10">Chargement du tableau de bord...</div>
  if (error) return <div className="text-center mt-10 text-red-500">Erreur: {error}</div>

  return (
    <div className="min-h-screen bg-gray-50">
       <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" passHref>
            <div className="flex items-center cursor-pointer">
              <h1 className="text-2xl font-bold">
                Green<span className="text-green-500">City</span>
                <span className="inline-flex ml-1">
                  <Leaf className="h-5 w-5 text-green-500 fill-green-500" />
                </span>
              </h1>
            </div>
          </Link>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord administrateur</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{user.id}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{user.name || 'N/A'}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.is_admin 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.is_admin ? 'Admin' : 'Utilisateur'}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {!user.is_admin && (
                          <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                              Supprimer l'utilisateur
                          </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 