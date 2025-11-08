import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expo Tour - Répertoire des Conventions et Salons",
  description: "Découvrez et suivez toutes les conventions et salons par catégorie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

