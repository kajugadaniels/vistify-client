import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { getMediaUrl } from "@/lib/apiConfig";

interface CardProps {
  place: any; // Replace with a proper type if available
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  showFavoriteButton?: boolean;
  placeLink?: string;
}

const Card = ({
  place,
  isFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
  placeLink,
}: CardProps) => {
  const mediaUrl = getMediaUrl();
  // Determine initial image source: if place.images exists, prepend mediaUrl; otherwise, use the placeholder.
  const initialImgSrc =
    place.images && place.images.length > 0 && place.images[0].image
      ? `${mediaUrl}${place.images[0].image}`
      : `${mediaUrl}placeholder.jpg`;
  const [imgSrc, setImgSrc] = useState(initialImgSrc);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full mb-5">
      <div className="relative">
        <div className="w-full h-48 relative">
          <Image
            src={imgSrc}
            alt={place.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgSrc(`${mediaUrl}placeholder.jpg`)}
          />
        </div>
        {showFavoriteButton && onFavoriteToggle && (
          <button
            className="absolute bottom-4 right-4 bg-white hover:bg-white/90 rounded-full p-2 cursor-pointer"
            onClick={onFavoriteToggle}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
              }`}
            />
          </button>
        )}
      </div>
      <div className="p-4">
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
        <p className="text-gray-600 mb-2">
          {place.address ? place.address : "Address not provided"}
          {place.province && `, ${place.province}`}
        </p>
      </div>
    </div>
  );
};

export default Card;
