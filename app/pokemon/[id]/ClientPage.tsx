'use client';

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PokemonCard from "@/components/PokemonCard";

const fetchPokemon = (id: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(({ data }) => data);

interface ClientPageProps {
  pokemonID: string;
}

export default function ClientPage({ pokemonID }: ClientPageProps) {

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getPokemon", pokemonID],
    queryFn: () => fetchPokemon(pokemonID),
    staleTime: 10 * 1000,
  });

  // React.useEffect(() => {
  //   return () => {
  //     queryClient.clear();
  //     queryClient.removeQueries({queryKey:["getPokemon", pokemonID]});
  //   };
  // }, [pokemonID, queryClient]);

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
    <div className="container">
      {pokemon && (
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
  );
}
