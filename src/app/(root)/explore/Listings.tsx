import React from 'react';
import { useGetPlacesQuery } from '@/state/api';
import { useAppSelector } from '@/state/redux';
import Card from '@/components/shared/Card';
import CardCompact from '@/components/shared/CardCompact';

const Listings = () => {
    // Retrieve global filter settings (including address, which defaults to "Kigali")
    const filters = useAppSelector((state) => state.global.filters);
    // Get view mode ("grid" or "list")
    const viewMode = useAppSelector((state) => state.global.viewMode);

    // Fetch all places from the backend; the response is expected to have a "detail" message and "data" array.
    const { data: placesResponse, isLoading, isError } = useGetPlacesQuery();

    // Extract the places array from the response; if no data, use an empty array.
    const places = placesResponse?.data || [];

    // Show a loading message while the request is in progress.
    if (isLoading) return <div>Loading places...</div>;
    // Display an error message if the request fails.
    if (isError) return <div>Error fetching places.</div>;

    return (
        <div className="w-full">
            <h3 className="text-sm px-4 font-bold">
                {places.length}{" "}
                <span className="text-gray-700 font-normal">
                    Places in {filters.address}
                </span>
            </h3>
            <div className="flex flex-wrap">
                {places.map((place: any) =>
                    viewMode === "grid" ? (
                        <Card
                            key={place.id}
                            place={place}
                            placeLink={`/explore/${place.id}`}
                        />
                    ) : (
                        <CardCompact
                            key={place.id}
                            place={place}
                            placeLink={`/explore/${place.id}`}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Listings;
