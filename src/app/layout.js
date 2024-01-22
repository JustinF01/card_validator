import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Card Validator",
  description: "Validate credit cards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main 
          className={`
              flex
              justify-start
              items-start
          `}
        >
          <Nav />
          <div 
            className={'flex justify-center items-center w-full h-screen bg-[#f2dedd]'} 
           >
              { children }
          </div>
        </main>
      </body>
    </html>
  );
}
