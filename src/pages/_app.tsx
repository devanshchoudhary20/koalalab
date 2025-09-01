import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito_Sans, Noto_Sans } from "next/font/google";

// Configure Nunito Sans for headings
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Configure Noto Sans for content
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${nunitoSans.variable} ${notoSans.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
