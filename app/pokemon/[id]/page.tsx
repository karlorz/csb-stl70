import axios from "axios";
import type { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/navigation";
import { useQuery, QueryClient, dehydrate } from "react-query";

import ClientPage from "./ClientPage";

const fetchPokemon = (id: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(({ data }) => data);

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemonIDs = ["caterpie", "doduo"]; // Add the desired IDs here

  const paths = pokemonIDs.map((id) => ({ params: { id } }));
  return {
    paths,
    fallback: false,
    // fallback: "blocking"
  };
};

export async function generateStaticParams() {
    const pokemonIDs = ["caterpie", "doduo"]; // Add the desired IDs here
    const Paths = pokemonIDs.map((id) => ({ params: { id } }));

  return Paths.map((x) => ({
    id: x.params,
  }));
}

export async function getStaticProps({ params }) {
    const id = params.PokemonID;
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery(["getPokemon", id], () => fetchPokemon(id));
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

export const dynamic = "force-static";

export default function Page() {
    const router = useRouter();
    const { PokemonID } = router.query;
  
    const { data } = useQuery(["getPokemon", PokemonID], () =>
      fetchPokemon(PokemonID)
    );
    return <ClientPage data={data} />;
}
