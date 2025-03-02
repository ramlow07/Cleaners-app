// import '../index.css' - activate it if outside css is in use

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaners App",
  description: "Web site created with Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
