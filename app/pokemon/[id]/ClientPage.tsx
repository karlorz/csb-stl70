"use client";

import React from "react";
import axios from "axios";
import type { GetStaticProps, GetStaticPaths } from "next";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { useRouter } from "next/navigation";
import PokemonCard from "@/components/PokemonCard";

const fetchPokemon = (id: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(({ data }) => data);

export default function Pokemon() {
  const router = useRouter();
  const pokemonID = typeof router.query?.id === "string" ? router.query.id : "";

  const {
    isSuccess,
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(["getPokemon", pokemonID], () => fetchPokemon(pokemonID), {
    enabled: pokemonID.length > 0,
    staleTime: Infinity,
  });

  if (isSuccess) {
    return (
      <div className="container">
        <PokemonCard
          name={pokemon.name}
          image={pokemon.sprites?.other?.["official-artwork"]?.front_default}
          weight={pokemon.weight}
          xp={pokemon.base_experience}
          abilities={pokemon.abilities?.map(
            (item: { ability: { name: string } }) => item.ability.name
          )}
        />
      </div>
    );
  }

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

  return <></>;
}
