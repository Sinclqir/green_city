"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (idea: string) => void
  isSubmitting: boolean
}

export function Modal({ isOpen, onClose, onSubmit, isSubmitting }: ModalProps) {
  const [idea, setIdea] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!idea.trim()) return
    onSubmit(idea)
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
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 text-left pl-3">
          <div>
            <label htmlFor="idea" className="block text-xs font-semibold text-gray-700 mb-1 text-left pl-1">
              Votre idée
            </label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="w-full px-4 py-2 border border-green-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-400 min-h-[110px] resize-none text-sm"
              placeholder="Décrivez votre idée pour rendre la ville plus verte..."
              required
            />
          </div>
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#22C55E] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold text-base shadow-md disabled:bg-gray-400"
              style={{ width: 'fit-content', minWidth: '160px' }}
            >
              {isSubmitting ? 'Envoi...' : 'Envoyer mon idée'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 