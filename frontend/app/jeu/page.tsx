"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { CityBuilder } from "@/components/city-builder/city-builder"
import { Button } from "@/components/ui/button"

export default function GamePage() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-gray-700 hover:text-green-500 transition-colors">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Link>
          <h1 className="text-2xl font-bold">
            Green<span className="text-green-500">City</span> - Le Jeu
          </h1>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Construis ta ville verte</h2>
            <p className="text-gray-600 mb-6">
              Transforme cette ville polluée en un espace écologique en ajoutant des éléments verts. Atteins le score
              cible avant la fin du temps imparti de 2 minutes !
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-green-700">Arbres</div>
                <div className="text-sm text-gray-600">+5% O₂</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-green-700">Panneaux solaires</div>
                <div className="text-sm text-gray-600">+7% énergie</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-green-700">Retirer cheminées</div>
                <div className="text-sm text-gray-600">-12% CO₂</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-green-700">Éteindre lumières</div>
                <div className="text-sm text-gray-600">+4% économie</div>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-4">
              <strong>Instructions :</strong> Sélectionnez un élément puis cliquez sur la grille pour le placer. Les
              panneaux solaires ne peuvent être placés que sur les toits des bâtiments. Vous pouvez retirer les
              cheminées des usines pour réduire les émissions de CO₂.
            </div>
            <div className="text-sm text-gray-500 mb-4">
              <strong>Mode jour/nuit :</strong> Utilisez le bouton en haut à gauche pour basculer entre le jour et la
              nuit. En mode nuit, vous pouvez éteindre les lumières des bâtiments pour économiser de l'énergie et gagner
              des points supplémentaires.
            </div>
          </div>

          {isClient && <CityBuilder />}

          <div className="mt-8 text-center">
            <Link href="/" passHref>
              <Button variant="outline" className="mr-4">
                Retour à l'accueil
              </Button>
            </Link>
            <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => window.location.reload()}>
              Recommencer le jeu
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 Green City. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
