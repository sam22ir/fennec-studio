import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fennec | Useful digital products from Algeria",
  description: "Fennec is an independent Algerian product studio building clearer digital experiences for care, local services, beauty, personal finance, and developer tools.",
  verification: {
    google: "mHrpWHfL2NNe0M-w7p-_pZ7Ms9v6t_lPIryZCXKQbcQ",
  },
  other: {
    "color-scheme": "light only",
  },
};

export const viewport = {
  colorScheme: "light",
  themeColor: "#f9f9f6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" style={{ colorScheme: "light only" }} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#f9f9f6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#f9f9f6" media="(prefers-color-scheme: dark)" />
      </head>
      <body style={{ colorScheme: "light only", backgroundColor: "#f9f9f6", color: "#141b15" }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
