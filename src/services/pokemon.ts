import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    // builder.query(ResponseType = any, queryArg = string): thus (name: inferred string )
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// https://redux-toolkit.js.org/rtk-query/usage/queries
// "use" + getPokemonByName => GetPokemonByName + "Query"
export const { useGetPokemonByNameQuery } = pokemonApi;

// https://codesandbox.io/s/github/reduxjs/redux-toolkit/tree/master/examples/query/react/kitchen-sink?from-embed=&file=/src/mocks/setupTests.tsx
// https://codesandbox.io/s/github/reduxjs/redux-toolkit/tree/master/examples/query/react/optimistic-update?from-embed

// # usage with the TypeScript:  https://redux-toolkit.js.org/rtk-query/usage-with-typescript
// # using queries: https://redux-toolkit.js.org/rtk-query/usage/queries
// # using mutation: https://redux-toolkit.js.org/rtk-query/usage/mutations
// # openApi: https://redux-toolkit.js.org/rtk-query/usage/code-generation