// app/layout.tsx

import "./globals.css";

export const metadata = {
  title: "Ask Your Doc",
  description: "Built with Next.js 15 + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
