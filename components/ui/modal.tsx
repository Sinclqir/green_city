"use client"

import { useState } from "react"
import { X } from "lucide-react"

export interface Person {
  name: string
  email: string
  idea: string
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (person: Person) => void
}

export function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [formData, setFormData] = useState<Person>({
    name: "",
    email: "",
    idea: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ name: "", email: "", idea: "" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full relative border border-green-200 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-green-600"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="mb-6 text-left pl-3">
          <p className="text-gray-700 text-base font-medium mb-1 text-left">Une idée à partager ?</p>
          <h2 className="text-2xl font-extrabold mb-2 text-left" style={{ color: '#22C55E', lineHeight: 1.1 }}>Partagez avec nous</h2>
          <p className="text-gray-600 mb-2 text-sm text-left">Nous sommes à l'écoute de vos idées pour améliorer notre ville. Chaque suggestion compte !</p>
          <p className="text-gray-500 text-xs text-left">Nous reviendrons vers vous dès que possible.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 text-left pl-3">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1 text-left pl-1">
              Nom
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-green-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-400 text-sm"
              placeholder="Entrez votre nom"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1 text-left pl-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-green-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-400 text-sm"
              placeholder="Entrez votre adresse email"
              required
            />
          </div>
          <div>
            <label htmlFor="idea" className="block text-xs font-semibold text-gray-700 mb-1 text-left pl-1">
              Votre idée
            </label>
            <textarea
              id="idea"
              value={formData.idea}
              onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
              className="w-full px-4 py-2 border border-green-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-400 min-h-[110px] resize-none text-sm"
              placeholder="Partagez votre idée"
              required
            />
          </div>
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="bg-[#22C55E] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold text-base shadow-md"
              style={{ width: 'fit-content', minWidth: '160px' }}
            >
              Envoyer mon idée
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 