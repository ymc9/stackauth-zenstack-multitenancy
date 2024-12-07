import "~/styles/globals.css";

import { StackProvider, StackTheme, UserButton } from "@stackframe/stack";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import TeamSwitcher from "~/components/TeamSwitcher";
import { stackServerApp } from "../stack";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <header className="p-4">
              <div className="flex justify-between">
                <Link href="/">Home</Link>
                <div className="flex gap-2">
                  <Suspense>
                    <TeamSwitcher />
                    <UserButton />
                  </Suspense>
                </div>
              </div>
            </header>
            <main className="p-4">{children}</main>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
