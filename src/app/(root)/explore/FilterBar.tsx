import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import FilterFull from "./FilterFull";

const FilterBar = () => {
  const [searchInput, setSearchInput] = useState("Kigali");
  const [isFiltersFullOpen, setIsFiltersFullOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Toggle the full filters panel
  const toggleFilters = () => {
    setIsFiltersFullOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex justify-between items-center w-full py-5">
        <div className="flex justify-between items-center gap-4 p-2">
          {/* "All Filters" Button toggles the full filter panel */}
          <Button
            variant="outline"
            className={cn(
              "gap-2 rounded-xl border-primary-400 hover:bg-primary-500 hover:text-primary-100",
              isFiltersFullOpen && "bg-primary-700 text-primary-100"
            )}
            onClick={toggleFilters}
          >
            <Filter className="w-4 h-4" />
            <span>All Filters</span>
          </Button>
          {/* Search Location Input */}
          <div className="flex items-center">
            <Input
              placeholder="Search location"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-40 rounded-l-xl rounded-r-none border-primary-400 border-r-0"
            />
            <Button
              className="rounded-r-xl rounded-l-none border-l-none border-primary-400 shadow-none hover:bg-primary-700 hover:text-primary-50"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {/* View Mode Toggle */}
        <div className="flex justify-between items-center gap-4 p-2">
          <div className="flex border rounded-xl">
            <Button
              variant="ghost"
              className={cn(
                "px-3 py-1 rounded-none rounded-l-xl hover:bg-primary-600 hover:text-primary-50",
                viewMode === "list" && "bg-primary-700 text-primary-50"
              )}
              onClick={() => setViewMode("list")}
            >
              <List className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "px-3 py-1 rounded-none rounded-r-xl hover:bg-primary-600 hover:text-primary-50",
                viewMode === "grid" && "bg-primary-700 text-primary-50"
              )}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      {/* Render the full filters panel if toggled open */}
      {isFiltersFullOpen && <FilterFull />}
    </>
  );
};

export default FilterBar;
