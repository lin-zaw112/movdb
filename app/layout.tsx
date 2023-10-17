import React, { type ReactElement } from "react";

import "./globals.css";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import MainNavagation from "./MainNavagation";
const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MOVDB",
  description: "MOVIE DATABASE",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <meta
        name="format-detection"
        content="telephone=no, date=no, email=no, address=no"
      />

      <body className={`${openSans.className}`}>
        <MainNavagation />
        <div className="h-screen w-screen pt-16">{children}</div>
        <div id="LoadingPotal" />
      </body>
    </html>
  );
}
