import type { AppProps } from "next/app";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import "../styles/global.css";
import { Inter } from "@next/font/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export default function app({ Component, pageProps }: AppProps) {
    return (
        <div className={`${inter.variable} font-sans`}>
            <TopNav />
            <SideNav />
            <div className="mt-12 ml-64 p-4">
                <Component {...pageProps} />
            </div>
        </div>
    );
}
