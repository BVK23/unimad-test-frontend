import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Unimad",
  description: "Unimad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" /> */}
      </head>
      <body className={`${inter.className} bg-[#F5F5F5]`}>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
}
