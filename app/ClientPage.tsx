"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useDebounce from "../utils/useDebounce";
import searchPokemons from "../utils/searchPokemons";
import PokemonsSearchResult from "../components/PokemonsSearchResult";

export default function ClientPage() {
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const queryClient = useQueryClient();

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["searchPokemons", debouncedSearchValue],
    queryFn: () => searchPokemons(debouncedSearchValue),
    enabled: debouncedSearchValue.length > 0,
  });

  const renderResult = () => {
    if (isLoading) {
      return <div className="search-message"> Loading... </div>;
    }

    if (isError) {
      return <div className="search-message"> Something went wrong </div>;
    }

    if (isSuccess) {
      return <PokemonsSearchResult pokemons={data} />;
    }

    return <></>;
  };

  return (
    <div className="home">
      <h1>Search Your Pokemon</h1>
      <input
        type="text"
        onChange={({ target: { value } }) => setSearchValue(value)}
        value={searchValue}
      />
      {renderResult()}
    </div>
  );
}