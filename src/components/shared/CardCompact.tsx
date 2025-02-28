import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Heart } from "lucide-react";

interface CardCompactProps {
    place: any; // Replace with a proper type if available
    isFavorite?: boolean;
    onFavoriteToggle?: () => void;
    showFavoriteButton?: boolean;
    placeLink?: string;
}

const CardCompact = ({
    place,
    isFavorite,
    onFavoriteToggle,
    showFavoriteButton = true,
    placeLink,
}: CardCompactProps) => {
    const [imgSrc, setImgSrc] = useState(
        place.images && place.images.length > 0 ? place.images[0].image : "/placeholder.jpg"
    );

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full flex h-40 mb-5">
            <div className="relative w-1/3">
                <Image
                    src={imgSrc}
                    alt={place.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => setImgSrc("/placeholder.jpg")}
                />
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold mb-1">
                            {placeLink ? (
                                <Link
                                    href={placeLink}
                                    className="hover:underline hover:text-blue-600"
                                    scroll={false}
                                >
                                    {place.name}
                                </Link>
                            ) : (
                                place.name
                            )}
                        </h2>
                        {showFavoriteButton && onFavoriteToggle && (
                            <button
                                className="bg-white rounded-full p-1"
                                onClick={onFavoriteToggle}
                            >
                                <Heart
                                    className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
                                        }`}
                                />
                            </button>
                        )}
                    </div>
                    <p className="text-gray-600 mb-1 text-sm">
                        {place.address ? place.address : "No address provided"}
                        {place.province && `, ${place.province}`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardCompact;
