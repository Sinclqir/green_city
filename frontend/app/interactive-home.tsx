"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Modal } from "@/components/ui/modal"
import ScrollToForm from "@/components/ScrollToForm"
import { FlipCard } from "@/components/flip-card"

// Déclare la constante API_URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Déclare le type Person localement
interface Person {
  id?: number
  name: string
  email: string
  idea: string
}

// Déclare le type Idea
interface Idea {
  id?: number
  idea: string
  user_id?: number
  created_at?: string
  user?: Person
}

interface CurrentUser {
  email: string;
  name: string | null;
  id: number;
  is_admin: boolean;
}

export default function InteractiveHome() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [people, setPeople] = useState<Person[]>([])
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${API_URL}/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const userData = await res.json();
                    setCurrentUser(userData);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };
        fetchUser();
    }
  }, []);

  // Charger la liste des utilisateurs depuis l'API
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await fetch(`${API_URL}/users/`)
        if (res.ok) {
          const data = await res.json()
          setPeople(data)
        }
      } catch (err) {
        // Optionnel : gestion d'erreur
      }
    }
    fetchPeople()
  }, [])

  // Charger la liste des idées depuis l'API
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch(`${API_URL}/ideas/`)
        if (res.ok) {
          const data = await res.json()
          setIdeas(data)
        }
      } catch (err) {
        // Optionnel : gestion d'erreur
      }
    }
    fetchIdeas()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  // Soumission du formulaire
  const handleSubmit = async (idea: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté pour soumettre une idée.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/ideas/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ idea: idea }),
      })
      
      if (!res.ok) {
        throw new Error('Erreur lors de la soumission de l\'idée');
      }

      const newIdea = await res.json();
      setIdeas([newIdea, ...ideas]); // Ajoute la nouvelle idée en haut de la liste
      setIsModalOpen(false);

    } catch (err) {
      alert('Erreur: ' + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Suspense fallback={null}>
        <ScrollToForm />
      </Suspense>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les témoignages de citoyens qui ont transformé leur ville
              grâce à GreenCity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <FlipCard
              frontIcon={<span className="text-2xl">🌱</span>}
              frontTitle="Marie Dubois"
              frontDescription="Citoyenne engagée"
              backDescription="GreenCity m'a permis de proposer des idées concrètes pour verdir mon quartier. L'équipe a été très réactive !"
            />

            <FlipCard
              frontIcon={<span className="text-2xl">🏢</span>}
              frontTitle="Éric Martin"
              frontDescription="Urbaniste"
              backDescription="En tant qu'urbaniste, j'apprécie la qualité des propositions citoyennes sur cette plateforme."
            />

            <FlipCard
              frontIcon={<span className="text-2xl">🌍</span>}
              frontTitle="Charles Bernard"
              frontDescription="Écologiste"
              backDescription="Une excellente initiative pour mobiliser les citoyens autour de l'écologie urbaine."
            />
          </div>

          {/* Ideas Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Idées de la communauté
              </h3>
              <p className="text-gray-600 mb-6">
                Découvrez les dernières idées proposées par nos utilisateurs
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Proposer une idée
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.slice(0, 6).map((idea, index) => (
                <div
                  key={idea.id || index}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                >
                  <p className="text-gray-700 mb-4 line-clamp-3">{idea.idea}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      Par: {idea.user?.name || idea.user?.email || "Anonyme"}
                    </span>
                    <span>
                      {idea.created_at
                        ? new Date(idea.created_at).toLocaleDateString("fr-FR")
                        : "Récemment"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal pour soumettre une idée */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  )
} 