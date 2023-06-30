import React from "react";
import Counter from "./features/counter";
import { useGetPokemonByNameQuery } from "./services/pokemon";
import "./App.css";

function App() {
  // Using a query hook automatically fetches data and returns query values
  // const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");

  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName

  // return (
  //   <div className="App">
  //     {error ? (
  //       <>Oh no, there was an error</>
  //     ) : isLoading ? (
  //       <>Loading...</>
  //     ) : data ? (
  //       <>
  //         <h3>{data.species.name}</h3>
  //         <img src={data.sprites.front_shiny} alt={data.species.name} />
  //       </>
  //     ) : null}
  //   </div>
  // );

  return (
    <div>
      <h2>Redux Toolkit with RTK Query</h2>
    </div>
  );
}

export default App;
