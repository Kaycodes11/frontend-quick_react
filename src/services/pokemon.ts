import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// https://redux-toolkit.js.org/rtk-query/usage/queries
// Export hooks for usage in functional components, i.e. auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;
