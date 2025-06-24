'use client'

import Image from "next/image"

export default function DownButton() {
    return (
        <div className="w-full md:w-1/2 border rounded-lg overflow-hidden bg-[#4F4F76] p-4 md:p-8">
            <h3 className="font-main text-3xl md:text-4xl text-white mb-2 md:mb-4 font-bold">
                CONTACTEZ MOI !
            </h3>
            <p className="font-main text-gray-300 text-base md:text-xl">
                Vous avez un projet en tête ou une idée à développer ? Faisons équipe pour concevoir
                quelque chose d’unique, sur-mesure et à votre image.
            </p>

            <div className="flex flex-col space-y-4 mt-6">
                <a
                    href="tel:0782410906"
                    className="flex items-center gap-4 text-white hover:opacity-80"
                >
                    <Image
                        src="/phone.svg"
                        alt="Contactez-moi par téléphone"
                        width={24}
                        height={24}
                    />
                    <span className="font-secondary text-base md:text-xl">
                        07 82 41 09 06
                    </span>
                </a>
                <a
                    href="mailto:andreas.castello06@gmail.com"
                    className="flex items-center gap-4 text-white hover:opacity-80"
                >
                    <Image
                        src="/mail.svg"
                        alt="Contactez-moi par mail"
                        width={24}
                        height={24}
                    />
                    <span className="font-secondary text-base md:text-xl">
                        andreas.castello06@gmail.com
                    </span>
                </a>
            </div>
        </div>
    )
}