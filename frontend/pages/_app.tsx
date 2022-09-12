import type { AppProps } from "next/app";
import "../styles/global.css";

export default function app({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
