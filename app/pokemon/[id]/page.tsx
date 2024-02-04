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

export default function PokemonPage({ params }: PokemonID) {
  const pokemonID = params.id;

  return <ClientPage pokemonID={pokemonID} />;
}
