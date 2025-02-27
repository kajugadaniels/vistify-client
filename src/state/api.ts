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
        // Fetch Rwanda locations and return the entire response
        getRwandaLocations: builder.query<any, void>({
            query: () => '/rwanda-locations/',
            transformResponse: (response: any) => response,
        }),

        // Fetch all categories (with associated places) and return full response
        getCategories: builder.query<any, void>({
            query: () => '/web/categories/',
            transformResponse: (response: any) => response,
        }),

        // Fetch all tags (with associated places) and return full response
        getTags: builder.query<any, void>({
            query: () => '/web/tags/',
            transformResponse: (response: any) => response,
        }),
    }),
});

export const {
    getRwandaLocations,
    getCategories,
    getTags,
} = api;
