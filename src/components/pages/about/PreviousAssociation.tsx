import React from 'react'
import Image from 'next/image'

const PreviousAssociation = () => {
    const previousAssociations = [
        {
            id: 1,
            name: "Oracle",
            image: "/images/oracle.webp"
        },
        {
            id: 2,
            name: "Khatabook",
            image: "/images/Khatabook.webp"
        },
        {
            id: 3,
            name: "Citi",
            image: "/images/citi.webp"
        },
        {
            id: 4,
            name: "Y Combinator",
            image: "/images/YCombinator.webp"
        },
        {
            id: 5,
            name: "Housing.com",
            image: "/images/Housing.webp"
        },
        {
            id: 6,
            name: "Amber",
            image: "/images/Amber.webp"
        },
        {
            id: 7,
            name: "Holonym",
            image: "/images/Holonym.webp"
        },
        {
            id: 8,
            name: "Kalypso",
            image: "/images/Kalypso.webp"
        }
    ]

    return (
        <section className="py-20 bg-primary-background_purple">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 font-heading text-primary-text_gray">
                    Previous Associations
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {previousAssociations.map((association) => (
                        <div 
                            key={association.id}
                            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center min-h-[120px]"
                        >
                            <div className="relative w-full h-16">
                                <Image 
                                    src={association.image} 
                                    alt={association.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PreviousAssociation