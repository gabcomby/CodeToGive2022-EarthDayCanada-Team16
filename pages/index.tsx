import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import TopBar from '../components/topbar';


export default function HomePage() {

  return (
     <div>
      <Head>
          <title>Gleanathon</title>
      </Head>
      <TopBar></TopBar>
    </div>

  );
}
