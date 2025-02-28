import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn, formatEnumString } from "@/lib/utils";
import { AmenityIcons, PropertyTypeIcons } from "@/lib/constants";

const FilterFull = () => {
  // Local state for design purposes only
  const [location, setLocation] = useState("Kigali");
  const [propertyType, setPropertyType] = useState("any");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [beds, setBeds] = useState("any");
  const [baths, setBaths] = useState("any");
  const [squareFeet, setSquareFeet] = useState<[number, number]>([0, 5000]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [availableFrom, setAvailableFrom] = useState("");

  return (
    <div className="bg-white rounded-lg px-4 h-full overflow-auto pb-10">
      <div className="flex flex-col space-y-6">
        {/* Location */}
        <div>
          <h4 className="font-bold mb-2">Location</h4>
          <div className="flex items-center">
            <Input
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-l-xl rounded-r-none border-r-0"
            />
            <Button
              onClick={() => {}}
              className="rounded-r-xl rounded-l-none border-l-none border-black shadow-none border hover:bg-primary-700 hover:text-primary-50"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <h4 className="font-bold mb-2">Property Type</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
              <div
                key={type}
                className={cn(
                  "flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer",
                  propertyType === type ? "border-black" : "border-gray-200"
                )}
                onClick={() => setPropertyType(type)}
              >
                <Icon className="w-6 h-6 mb-2" />
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-bold mb-2">Price Range (Monthly)</h4>
          <Slider
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={(value: any) =>
              setPriceRange(value as [number, number])
            }
          />
          <div className="flex justify-between mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Beds and Baths */}
        <div className="flex gap-4">
          <div className="flex-1">
            <h4 className="font-bold mb-2">Beds</h4>
            <Select
              value={beds || "any"}
              onValueChange={(value) => setBeds(value)}
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any beds</SelectItem>
                <SelectItem value="1">1+ bed</SelectItem>
                <SelectItem value="2">2+ beds</SelectItem>
                <SelectItem value="3">3+ beds</SelectItem>
                <SelectItem value="4">4+ beds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <h4 className="font-bold mb-2">Baths</h4>
            <Select
              value={baths || "any"}
              onValueChange={(value) => setBaths(value)}
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Baths" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any baths</SelectItem>
                <SelectItem value="1">1+ bath</SelectItem>
                <SelectItem value="2">2+ baths</SelectItem>
                <SelectItem value="3">3+ baths</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Square Feet */}
        <div>
          <h4 className="font-bold mb-2">Square Feet</h4>
          <Slider
            min={0}
            max={5000}
            step={100}
            value={squareFeet}
            onValueChange={(value) =>
              setSquareFeet(value as [number, number])
            }
            className="[&>.bar]:bg-primary-700"
          />
          <div className="flex justify-between mt-2">
            <span>{squareFeet[0]} sq ft</span>
            <span>{squareFeet[1]} sq ft</span>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="font-bold mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(AmenityIcons).map(([amenity, Icon]) => (
              <div
                key={amenity}
                className={cn(
                  "flex items-center space-x-2 p-2 border rounded-lg hover:cursor-pointer",
                  amenities.includes(amenity) ? "border-black" : "border-gray-200"
                )}
                onClick={() => {
                  setAmenities((prev) =>
                    prev.includes(amenity)
                      ? prev.filter((a) => a !== amenity)
                      : [...prev, amenity]
                  );
                }}
              >
                <Icon className="w-5 h-5" />
                <Label>{formatEnumString(amenity)}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Available From */}
        <div>
          <h4 className="font-bold mb-2">Available From</h4>
          <Input
            type="date"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
            className="rounded-xl"
          />
        </div>

        {/* Apply and Reset buttons (dummy actions) */}
        <div className="flex gap-4 mt-6">
          <Button
            onClick={() => console.log("Apply filters")}
            className="flex-1 bg-primary-700 text-white rounded-xl"
          >
            APPLY
          </Button>
          <Button
            onClick={() => {
              setPropertyType("any");
              setPriceRange([0, 10000]);
              setBeds("any");
              setBaths("any");
              setSquareFeet([0, 5000]);
              setAmenities([]);
              setAvailableFrom("");
              setLocation("Kigali");
            }}
            variant="outline"
            className="flex-1 rounded-xl"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterFull;
