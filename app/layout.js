import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Reflect",
    default: "Reflections",
  },
  description: "Journal Application",
};

export default function RootLayout({ children }) {
  const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div
            style={{
              backgroundImage: "url('/bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="opacity-60 fixed -z-10 inset-0"
          />
          {/* HEADER */}
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          <footer className="bg-indigo-300 py-12 bg-opacity-20">
            <div className="mx-auto px-4 text-center text-gray-900">
              <p> © {currentYear} CodeNow101. All Rights Reserved</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
