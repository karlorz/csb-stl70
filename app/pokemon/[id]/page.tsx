import axios from "axios";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ClientPage from "./ClientPage";
import { ALL_POKEMON_SPECIES } from "@/constants/pokemonSpecies";

export async function generateStaticParams() {
  const pokemonIDs = ALL_POKEMON_SPECIES.map(({ name }) => ({ id: name }));
  const paths = pokemonIDs.map((pokemon) => ({
    id: pokemon.id,
  }));
  return paths;
}

type PokemonID = {
  params: {
    id: string;
  };
};

const fetchPokemon = (id: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(({ data }) => data);

export default async function PokemonPage({ params }: PokemonID) {
  const pokemonID = params.id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getPokemon", pokemonID],
    queryFn: () => fetchPokemon(pokemonID),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage pokemonID={pokemonID} />
    </HydrationBoundary>
  );
}
