import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { AuthContextProvider } from '../stores/authContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps}/>
    </AuthContextProvider>);
}
