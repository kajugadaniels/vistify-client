import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
    address: string;
    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;
    coordinates: [number, number];
}

export interface LocationDataState {
    provinces: string[];
    districts: string[];
    sectors: string[];
    cells: string[];
    villages: string[];
}

interface InitialStateTypes {
    filters: FiltersState;
    locationData: LocationDataState;
    isFiltersFullOpen: boolean;
    viewMode: "grid" | "list";
}

export const initialState: InitialStateTypes = {
    filters: {
        address: "Kigali",
        province: "",
        district: "",
        sector: "",
        cell: "",
        village: "",
        coordinates: [30.04, -1.95],
    },
    locationData: {
        provinces: [],
        districts: [],
        sectors: [],
        cells: [],
        villages: [],
    },
    isFiltersFullOpen: false,
    viewMode: "grid",
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        toggleFiltersFullOpen: (state) => {
            state.isFiltersFullOpen = !state.isFiltersFullOpen;
        },
        setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
            state.viewMode = action.payload;
        },
        setLocationData: (state, action: PayloadAction<LocationDataState>) => {
            state.locationData = action.payload;
        },
        setProvince: (state, action: PayloadAction<string>) => {
            state.filters.province = action.payload;
            state.filters.district = "";
            state.filters.sector = "";
            state.filters.cell = "";
            state.filters.village = "";
        },
        setDistrict: (state, action: PayloadAction<string>) => {
            state.filters.district = action.payload;
            state.filters.sector = "";
            state.filters.cell = "";
            state.filters.village = "";
        },
        setSector: (state, action: PayloadAction<string>) => {
            state.filters.sector = action.payload;
            state.filters.cell = "";
            state.filters.village = "";
        },
        setCell: (state, action: PayloadAction<string>) => {
            state.filters.cell = action.payload;
            state.filters.village = "";
        },
        setVillage: (state, action: PayloadAction<string>) => {
            state.filters.village = action.payload;
        },
    },
});

export const {
    setFilters,
    toggleFiltersFullOpen,
    setViewMode,
    setLocationData,
    setProvince,
    setDistrict,
    setSector,
    setCell,
    setVillage,
} = globalSlice.actions;

export default globalSlice.reducer;
