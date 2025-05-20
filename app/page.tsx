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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FlipCard } from "@/components/flip-card"
import DownButton from "@/components/ui/down-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
        </div>
        <div className="flex items-center">
          <a href="#contact" className="hidden md:inline-flex items-center text-gray-700 mr-4">
            Contact <ChevronRight className="h-4 w-4 ml-1" />
          </a>
          <button className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition-colors flex items-center">
            Menu
            <svg
              className="h-5 w-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section - Redesigned based on the image */}
      <section className="relative bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 z-10">
            <h1 className="text-7xl md:text-8xl font-bold text-green-500 tracking-tight leading-none mb-6">
              GREEN<span className="text-black">_</span>
              <span className="text-green-500 font-black">CITY</span>
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mb-8">
              <h2 className="text-2xl font-bold mb-2">UNE VILLE VERTE</h2>
              <p className="text-gray-700 mb-4">
                Et si votre ville vous aidait à sauver la planète, sans même que vous y pensiez ?
              </p>
              <div className="flex justify-center">
                <ArrowDown className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            <div className="text-sm text-gray-500">Hackathon 2025</div>
          </div>
          <div className="w-full md:w-1/2 relative h-[500px] mt-8 md:mt-0">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-green-500">30%</p>
              <p className="text-gray-600">d'espaces verts</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-500">-40%</p>
              <p className="text-gray-600">d'émissions CO2</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-500">+5000</p>
              <p className="text-gray-600">arbres plantés</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-500">+15km</p>
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
                src="/placeholder.svg?height=600&width=800"
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
            backDescription="Les bâtiments écologiques consomment jusqu’à 50 % moins d’énergie. 25 % de toits équipés en solaire peuvent couvrir 40 % des besoins d’une ville. L’éclairage intelligent réduit de 70 % la consommation et apporte une vraie amélioration."
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
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg relative">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
          </div>
          <blockquote className="text-xl md:text-2xl text-gray-700 text-center italic mb-6">
            "Depuis que notre quartier a été transformé avec plus d'espaces verts et de pistes cyclables, ma qualité de
            vie s'est considérablement améliorée. Je respire mieux et je redécouvre ma ville à vélo."
          </blockquote>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Portrait de Marie Dupont"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">Marie Dupont</p>
              <p className="text-gray-500 text-sm">Résidente depuis 15 ans</p>
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors">
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-500 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Rejoignez le mouvement Green City</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Ensemble, nous pouvons transformer notre ville en un espace plus vert, plus sain et plus agréable à vivre
            pour les générations futures.
          </p>
          <button className="bg-white text-green-500 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold">
            Je soutiens la transition écologique dans ma ville
          </button>
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
        </div>
      </section>

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
                <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.358-.2 6.78-2.618 6.98-6.98.014-3.668-.072-4.948-.072-4.948C15.756 0 15.348 0 12 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
