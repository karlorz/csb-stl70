"use client"
import React from "react";
import { QueryClient, QueryClientProvider, Hydrate, dehydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydrate(queryClient)}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
