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

  // Local state for dropdown options
  const [provinces, setProvinces] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [cells, setCells] = useState<string[]>([]);
  const [villages, setVillages] = useState<string[]>([]);

  // Load provinces on component mount
  useEffect(() => {
    setProvinces(Provinces());
  }, []);

  // When a province is selected, update districts
  useEffect(() => {
    if (selectedProvince) {
      const dists = Districts(selectedProvince) || [];
      setDistricts(dists);
      // Clear lower levels
      setSelectedDistrict("");
      setSectors([]);
      setSelectedSector("");
      setCells([]);
      setSelectedCell("");
      setVillages([]);
      setSelectedVillage("");
    }
  }, [selectedProvince]);

  // When a district is selected, update sectors
  useEffect(() => {
    if (selectedProvince && selectedDistrict) {
      const secs = Sectors(selectedProvince, selectedDistrict) || [];
      setSectors(secs);
      // Clear lower levels
      setSelectedSector("");
      setCells([]);
      setSelectedCell("");
      setVillages([]);
      setSelectedVillage("");
    }
  }, [selectedDistrict, selectedProvince]);

  // When a sector is selected, update cells
  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedSector) {
      const clls = Cells(selectedProvince, selectedDistrict, selectedSector) || [];
      setCells(clls);
      // Clear lower level
      setSelectedCell("");
      setVillages([]);
      setSelectedVillage("");
    }
  }, [selectedSector, selectedDistrict, selectedProvince]);

  // When a cell is selected, update villages
  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedSector && selectedCell) {
      const vills = Villages(
        selectedProvince,
        selectedDistrict,
        selectedSector,
        selectedCell
      ) || [];
      setVillages(vills);
      setSelectedVillage("");
    }
  }, [selectedCell, selectedSector, selectedDistrict, selectedProvince]);

  // Dummy handler to apply filters
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

  // Dummy handler to reset filters to default values
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
        {/* Address Search */}
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
            value={selectedProvince || "default"}
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
            value={selectedDistrict || "default"}
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
            value={selectedSector || "default"}
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
            value={selectedCell || "default"}
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
            value={selectedVillage || "default"}
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
