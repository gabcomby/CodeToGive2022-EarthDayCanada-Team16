import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { AuthContextProvider } from '../stores/authContext';
import {ClerkProvider} from "@clerk/nextjs"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider 
    // appearance={{
    //     variables: {
    //         colorPrimary: "#298273"
    //     }
    // }}
    >
        <Component {...pageProps} />
    </ClerkProvider>)
}
