import Head from 'next/head';
import TopBar from '../components/topbar';

export default function AuthPage() {
  return (
    <div>
         <Head>
             <title>Gleanathon</title>
         </Head>
         <TopBar></TopBar>
       </div>
  );
}