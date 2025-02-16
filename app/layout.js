import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta charSet="UTF-8" />
        <meta name="description" content="My Next.js App" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh min-h-dvh bg-gray-950`}
      >
        {children}
      </body>
    </html>
  );
}
