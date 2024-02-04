import ReactQueryProvider from "@/providers/ReactQueryProvider";

import ClientLayout from "./ClientLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClientLayout>
            <div>{children}</div>
          </ClientLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
