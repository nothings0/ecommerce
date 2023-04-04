import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/Provider";
import { Suspense } from "react";
import Loading from "./loading";
import "./globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ThemeProvider>
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
