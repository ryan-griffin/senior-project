import type { AppProps } from "next/app";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import "../styles/global.css";

export default function app({ Component, pageProps }: AppProps) {
    return (
        <>
            <TopNav />
            <SideNav />
            <div className="mt-12 ml-64 p-4">
                <Component {...pageProps} />
            </div>
        </>
    );
}
