import React, { useEffect, useState } from "react";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const FilterFull = () => {
  // Local state for each location level
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCell, setSelectedCell] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [address, setAddress] = useState("Kigali");

  // Options for each level
  const [provinces, setProvinces] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [cells, setCells] = useState<string[]>([]);
  const [villages, setVillages] = useState<string[]>([]);

  // Load provinces once when component mounts
  useEffect(() => {
    setProvinces(Provinces());
  }, []);

  // Update districts when province changes; reset lower levels
  useEffect(() => {
    if (selectedProvince) {
      const dists = Districts(selectedProvince) || [];
      setDistricts(dists);
    } else {
      setDistricts([]);
    }
    setSelectedDistrict("");
    setSectors([]);
    setSelectedSector("");
    setCells([]);
    setSelectedCell("");
    setVillages([]);
    setSelectedVillage("");
  }, [selectedProvince]);

  // Update sectors when district changes; reset lower levels
  useEffect(() => {
    if (selectedProvince && selectedDistrict) {
      const secs = Sectors(selectedProvince, selectedDistrict) || [];
      setSectors(secs);
    } else {
      setSectors([]);
    }
    setSelectedSector("");
    setCells([]);
    setSelectedCell("");
    setVillages([]);
    setSelectedVillage("");
  }, [selectedDistrict, selectedProvince]);

  // Update cells when sector changes; reset lower levels
  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedSector) {
      try {
        const clls = Cells(selectedProvince, selectedDistrict, selectedSector);
        setCells(clls || []);
      } catch (error) {
        console.error("Error fetching cells:", error);
        setCells([]);
      }
    } else {
      setCells([]);
    }
    setSelectedCell("");
    setVillages([]);
    setSelectedVillage("");
  }, [selectedSector, selectedDistrict, selectedProvince]);

  // Update villages when cell changes
  useEffect(() => {
    if (
      selectedProvince &&
      selectedDistrict &&
      selectedSector &&
      selectedCell
    ) {
      try {
        const vills = Villages(
          selectedProvince,
          selectedDistrict,
          selectedSector,
          selectedCell
        );
        setVillages(vills || []);
      } catch (error) {
        console.error("Error fetching villages:", error);
        setVillages([]);
      }
    } else {
      setVillages([]);
    }
    setSelectedVillage("");
  }, [selectedCell, selectedSector, selectedDistrict, selectedProvince]);

  // Dummy handlers for applying and resetting filters
  const handleApply = () => {
    const appliedFilters = {
      address,
      province: selectedProvince,
      district: selectedDistrict,
      sector: selectedSector,
      cell: selectedCell,
      village: selectedVillage,
    };
    console.log("Applied Filters:", appliedFilters);
  };

  const handleReset = () => {
    setAddress("Kigali");
    setSelectedProvince("");
    setDistricts([]);
    setSelectedDistrict("");
    setSectors([]);
    setSelectedSector("");
    setCells([]);
    setSelectedCell("");
    setVillages([]);
    setSelectedVillage("");
  };

  return (
    <div className="bg-white rounded-lg px-4 h-full overflow-auto pb-10">
      <div className="flex flex-col space-y-6">
        {/* Address Input */}
        <div>
          <h4 className="font-bold mb-2">Address</h4>
          <Input
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="rounded-xl border-primary-400"
          />
        </div>

        {/* Province Selector */}
        <div>
          <h4 className="font-bold mb-2">Province</h4>
          <Select
            value={selectedProvince}
            onValueChange={(value) => setSelectedProvince(value)}
          >
            <SelectTrigger className="w-full rounded-xl border-primary-400">
              <SelectValue placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((prov) => (
                <SelectItem key={prov} value={prov}>
                  {prov}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District Selector */}
        <div>
          <h4 className="font-bold mb-2">District</h4>
          <Select
            value={selectedDistrict}
            onValueChange={(value) => setSelectedDistrict(value)}
          >
            <SelectTrigger className="w-full rounded-xl border-primary-400">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((dist) => (
                <SelectItem key={dist} value={dist}>
                  {dist}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sector Selector */}
        <div>
          <h4 className="font-bold mb-2">Sector</h4>
          <Select
            value={selectedSector}
            onValueChange={(value) => setSelectedSector(value)}
          >
            <SelectTrigger className="w-full rounded-xl border-primary-400">
              <SelectValue placeholder="Select Sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sec) => (
                <SelectItem key={sec} value={sec}>
                  {sec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cell Selector */}
        <div>
          <h4 className="font-bold mb-2">Cell</h4>
          <Select
            value={selectedCell}
            onValueChange={(value) => setSelectedCell(value)}
          >
            <SelectTrigger className="w-full rounded-xl border-primary-400">
              <SelectValue placeholder="Select Cell" />
            </SelectTrigger>
            <SelectContent>
              {cells.map((cll) => (
                <SelectItem key={cll} value={cll}>
                  {cll}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Village Selector */}
        <div>
          <h4 className="font-bold mb-2">Village</h4>
          <Select
            value={selectedVillage}
            onValueChange={(value) => setSelectedVillage(value)}
          >
            <SelectTrigger className="w-full rounded-xl border-primary-400">
              <SelectValue placeholder="Select Village" />
            </SelectTrigger>
            <SelectContent>
              {villages.map((vill) => (
                <SelectItem key={vill} value={vill}>
                  {vill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Apply and Reset Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            onClick={handleApply}
            className="flex-1 bg-primary-700 text-white rounded-xl"
          >
            APPLY
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 rounded-xl"
          >
            RESET
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterFull;
