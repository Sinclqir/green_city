"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

type FlipCardProps = {
  frontIcon: React.ReactNode
  frontTitle: string
  frontDescription: string
  backDescription: string
}

export function FlipCard({ frontIcon, frontTitle, frontDescription, backDescription }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      className="relative w-full h-80 cursor-pointer perspective-1000"
      onClick={handleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleFlip()
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute w-full h-full bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
          animate={{ opacity: isFlipped ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            {frontIcon}
          </div>
          <h3 className="text-xl font-semibold mb-3">{frontTitle}</h3>
          <p className="text-gray-600">{frontDescription}</p>
          <div className="absolute bottom-4 left-0 right-0 text-center text-green-500 text-sm">
            Cliquez pour plus d'informations
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute w-full h-full bg-green-500 text-white p-6 rounded-lg shadow-md"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
          animate={{ opacity: isFlipped ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">{frontTitle}</h3>
          <p className="mb-4">{backDescription}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
