"use client"
import React from "react";
import axios from "axios";
import { useQuery, QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";

import PokemonCard from "../../../components/PokemonCard";

const fetchPokemon = (id: string) =>
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(({ data }) => data);

interface ClientPageProps {
  pokemonID: string;
}

export default function ClientPage({ pokemonID }: ClientPageProps) {
  const queryClient = new QueryClient();

  const { isSuccess, data: pokemon, isLoading, isError } = useQuery(
    ["getPokemon", pokemonID],
    () => fetchPokemon(pokemonID)
  );

  React.useEffect(() => {
    return () => {
      queryClient.clear();
      queryClient.removeQueries(["getPokemon", pokemonID]);
    };
  }, [pokemonID, queryClient]);

  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="center">
        We couldn't find your pokemon{" "}
        <span role="img" aria-label="sad">
          😢
        </span>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        {isSuccess && (
          <PokemonCard
            name={pokemon.name}
            image={pokemon.sprites?.other?.["official-artwork"]?.front_default}
            weight={pokemon.weight}
            xp={pokemon.base_experience}
            abilities={pokemon.abilities?.map(
              (item: { ability: { name: string } }) => item.ability.name
            )}
          />
        )}
      </div>
    </QueryClientProvider>
  );
}