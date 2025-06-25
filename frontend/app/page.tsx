"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Leaf,
  Wind,
  Droplets,
  Sun,
  ArrowRight,
  ArrowLeft,
  GamepadIcon as GameController,
  ArrowDown,
  Bike,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FlipCard } from "@/components/flip-card"
import DownButton from "@/components/ui/down-button"
import { Modal } from "@/components/ui/modal"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import ScrollToForm from "@/components/ScrollToForm"
import dynamic from "next/dynamic"

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

// Chargement dynamique des composants interactifs
const InteractiveHome = dynamic(() => import('./interactive-home'), {
  ssr: false,
  loading: () => <div>Chargement...</div>
})

export default function Home() {
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
    <div className="min-h-screen bg-white">
      <Suspense fallback={null}>
        <ScrollToForm />
      </Suspense>
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            Green<span className="text-green-500">City</span>
            <span className="inline-flex ml-1">
              <Leaf className="h-5 w-5 text-green-500 fill-green-500" />
            </span>
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-green-500 transition-colors">
            Accueil
          </a>
          <a href="#benefits" className="text-gray-700 hover:text-green-500 transition-colors">
            Bénéfices
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-green-500 transition-colors">
            Témoignages
          </a>
          <Link href="/jeu" className="text-gray-700 hover:text-green-500 transition-colors">
            Jeu
          </Link>
          {currentUser?.is_admin && (
            <Link href="/dashboard" className="text-gray-700 hover:text-green-500 transition-colors font-bold">
              Dashboard
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <p className="text-[#00CA51] font-semibold">{currentUser.email}</p>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link href="/register" passHref>
                <Button className="bg-green-500 hover:bg-green-600 text-white">Inscription</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section - Redesigned based on the image */}
      <section className="relative bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-start">
          <div className="w-full md:w-2/3 z-10">
            <h1 className="text-7xl md:text-[180px] font-bold text-[#00CA51] tracking-tight leading-none mb-16 mt-60">
              GREEN<span className="text-[#00CA51] ">_</span>
              <span className="text-[#00CA51] font-black">CITY</span>
            </h1>
            <div className="border-black p-6 rounded-lg shadow-md max-w-md mt-52 border-2">
              <h2 className="text-4xl font-bold mb-2">UNE VILLE VERTE</h2>
              <p className="text-gray-700 mb-4">
                Et si votre ville vous aidait à sauver la planète, sans même que vous y pensiez ?
              </p>
              <div className="flex justify-center">
                <ArrowDown className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 relative h-[792px] mt-8 md:mt-0 absolute right-0">
            <div className="h-1/3 absolute left-[-10px] bottom-28 w-[1px] bg-black"></div>
            <Image
                src="/images/background.png"
                alt="Immeuble avec arbres verts"
                fill
                className="object-cover rounded-lg"
                priority
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Objectif pour  les futures Green City de 2050</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <p className="text-4xl font-bold text-green-500">30%</p>
              <p className="text-gray-600">d'espaces verts</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <p className="text-4xl font-bold text-green-500">-40%</p>
              <p className="text-gray-600">d'émissions CO2</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Leaf className="h-12 w-12 text-green-500" />
              </div>
              <p className="text-4xl font-bold text-green-500">5000+</p>
              <p className="text-gray-600">arbres plantés</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Bike className="h-12 w-12 text-green-500" />
              </div>
              <p className="text-4xl font-bold text-green-500">15km+</p>
              <p className="text-gray-600">de pistes cyclables</p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Promo Section */}
      <section id="game-promo" className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <Image
                src="/images/game.png"
                alt="Jeu de construction de ville verte"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/70 to-transparent flex items-center justify-center">
                <GameController className="h-20 w-20 text-white" />
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Construis ta ville verte</h2>
              <p className="text-gray-600 mb-6">
                Transforme une ville polluée en un espace écologique en ajoutant des arbres, des panneaux solaires et en
                retirant les cheminées des usines pour réduire les émissions de CO2 !
              </p>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Plante des arbres pour augmenter l'oxygène</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Installe des panneaux solaires sur les toits</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Retire les cheminées polluantes des bâtiments</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Éteins les lumières la nuit pour économiser l'énergie</span>
                </li>
              </ul>
              <Link href="/jeu" passHref>
                <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full self-start">
                  Jouer maintenant
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Flip Cards */}
      <section id="benefits" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Les bénéfices d'une ville éco-consciente</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <FlipCard
            frontIcon={<Wind className="h-8 w-8 text-green-500" />}
            frontTitle="Air pur"
            frontDescription="Réduction de la pollution atmosphérique grâce à la diminution du trafic et l'augmentation des espaces verts."
            backDescription="Les villes vertes peuvent réduire jusqu'à 40% les particules fines dans l'air. Un arbre mature peut absorber jusqu'à 22kg de CO2 par an et produire suffisamment d'oxygène pour 2 personnes. Les espaces verts agissent comme des filtres naturels, améliorant considérablement la qualité de l'air urbain."
          />
          <FlipCard
            frontIcon={
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
            frontTitle="Transport doux"
            frontDescription="Développement des infrastructures pour les vélos et les piétons, réduisant la dépendance aux véhicules."
            backDescription="Les pistes cyclables et zones piétonnes réduisent les embouteillages de 30 %. Un kilomètre à vélo évite 250 g de CO2. Les villes avec un bon réseau doux voient 25 % d'accidents en moins et une nette amélioration."
          />
          <FlipCard
            frontIcon={<Sun className="h-8 w-8 text-green-500" />}
            frontTitle="Économies d'énergie"
            frontDescription="Utilisation de sources d'énergie renouvelables et optimisation de la consommation énergétique des bâtiments."
            backDescription="Les bâtiments écologiques consomment jusqu'à 50 % moins d'énergie. 25 % de toits équipés en solaire peuvent couvrir 40 % des besoins d'une ville. L'éclairage intelligent réduit de 70 % la consommation et apporte une vraie amélioration."
          />
          <FlipCard
            frontIcon={<Droplets className="h-8 w-8 text-green-500" />}
            frontTitle="Bien-être"
            frontDescription="Amélioration de la qualité de vie grâce à des espaces publics plus verts et une meilleure cohésion sociale."
            backDescription="La proximité d'espaces verts réduit le stress de 30% et améliore la santé mentale. Les quartiers avec plus de végétation connaissent une baisse de 15% des crimes violents."
          />
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Témoignages</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
            </div>
            <blockquote className="text-lg text-gray-700 text-center italic mb-6">
              "Depuis que notre quartier a été transformé avec plus d'espaces verts et de pistes cyclables, ma qualité de
              vie s'est considérablement améliorée. Je respire mieux et je redécouvre ma ville à vélo."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/marie.PNG"
                  alt="Marie Dupont"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-semibold">Marie Dupont</p>
                <p className="text-gray-500 text-sm">Résidente depuis 15 ans</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
            </div>
            <blockquote className="text-lg text-gray-700 text-center italic mb-6">
              "Les panneaux solaires installés sur les toits de notre immeuble ont permis de réduire notre facture d'électricité de 40%. C'est un investissement qui porte ses fruits et qui contribue à la transition écologique."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/charles.PNG"
                  alt="Charles Martin"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-semibold">Charles Martin</p>
                <p className="text-gray-500 text-sm">Propriétaire d'un immeuble</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
            </div>
            <blockquote className="text-lg text-gray-700 text-center italic mb-6">
              "Le nouveau système de tri sélectif et les composteurs collectifs ont créé une vraie dynamique dans notre quartier. On se sent tous plus impliqués dans la protection de l'environnement."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/eric.PNG"
                  alt="Éric Dubois"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-semibold">Éric Dubois</p>
                <p className="text-gray-500 text-sm">Membre du conseil de quartier</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="form-idea-section" className="bg-green-500 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Rejoignez le mouvement Green City</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Ensemble, nous pouvons transformer notre ville en un espace plus vert, plus sain et plus agréable à vivre
            pour les générations futures.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-green-500 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold"
          >
            Proposer une idée
          </button>
          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {people.map((person, idx) => (
              <div key={idx} className="flex items-center bg-white border border-green-200 rounded-lg p-4 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-4">
                  {person.name[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{person.name}</div>
                  <div className="text-gray-500 text-xs">{person.idea}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-green-600 bg-opacity-30 p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-3">Faire un don</h3>
              <p className="mb-4">Soutenez financièrement les projets écologiques de notre ville.</p>
              <a href="#" className="text-white underline">
                En savoir plus
              </a>
            </div>
            <div className="bg-green-600 bg-opacity-30 p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-3">Devenir bénévole</h3>
              <p className="mb-4">Participez activement aux initiatives vertes de votre quartier.</p>
              <a href="#" className="text-white underline">
                En savoir plus
              </a>
            </div>
            <div className="bg-green-600 bg-opacity-30 p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-3">Partager</h3>
              <p className="mb-4">Diffusez le message et sensibilisez votre entourage.</p>
              <a href="#" className="text-white underline">
                En savoir plus
              </a>
            </div>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ideas.map((item, idx) => (
              <div key={idx} className="flex items-center bg-white border border-green-200 rounded-lg p-4 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-4">
                  {item.user?.name ? item.user.name[0].toUpperCase() : item.user?.email[0].toUpperCase()}
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-gray-500 text-xs mb-1">{item.user?.name || item.user?.email}</div>
                  <div className="font-semibold text-gray-800">{item.idea}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Section - Chargé dynamiquement */}
      <InteractiveHome />

      {/* Footer */}
      <footer id="contact" className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Green<span className="text-green-500">City</span>
              </h3>
              <p className="text-gray-600 mb-4">Construisons ensemble la ville verte de demain.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors">Ressources</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors">Partenaires</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors">FAQ</a></li>
                <li><a href="#contact" className="text-gray-600 hover:text-green-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600">123 Rue Écologique, 75000 Paris</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contact@greencity.fr" className="text-gray-600 hover:text-green-500 transition-colors">contact@greencity.fr</a>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:0123456789" className="text-gray-600 hover:text-green-500 transition-colors">01 23 45 67 89</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-600 mb-4">Restez informé de nos dernières actualités et initiatives.</p>
              <form className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  S'abonner
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Green City. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
