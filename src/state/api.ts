import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // Login user: sends email and password, and returns JWT tokens with detailed messages
        loginUser: builder.mutation<any, { email: string; password: string }>({
            query: (credentials) => ({
                url: '/auth/login/',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response: any) => response,
        }),

        // Logout user: sends refresh token and returns a detailed response on logout success/failure
        logoutUser: builder.mutation<any, string>({
            query: (refreshToken) => ({
                url: '/auth/logout/',
                method: 'POST',
                body: { refresh: refreshToken },
            }),
            transformResponse: (response: any) => response,
        }),

        // Fetch Rwanda locations and return the entire response
        getRwandaLocations: builder.query<any, void>({
            query: () => '/rwanda-locations/',
            transformResponse: (response: any) => response,
        }),

        // Fetch all categories (with associated places) and return full response
        getCategories: builder.query<any, void>({
            query: () => '/categories/',
            transformResponse: (response: any) => response,
        }),

        // Fetch all tags (with associated places) and return full response
        getTags: builder.query<any, void>({
            query: () => '/tags/',
            transformResponse: (response: any) => response,
        }),

        // Fetch all places with detailed info and return full response
        getPlaces: builder.query<any, void>({
            query: () => '/places/',
            transformResponse: (response: any) => response,
        }),

        // Fetch details for a specific place and return full response
        placeDetails: builder.query<any, number>({
            query: (id) => `/place/${id}/`,
            transformResponse: (response: any) => response,
        }),
    }),
});

export const {
    useGetRwandaLocationsQuery,
    useGetCategoriesQuery,
    useGetTagsQuery,
    useGetPlacesQuery,
    usePlaceDetailsQuery,
} = api;
