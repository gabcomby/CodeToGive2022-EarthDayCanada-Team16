import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router"
import {getAuth} from "firebase/auth";
import { initFirebase } from "../firebase/firebaseApp";
import {useState} from 'react'
import { Listbox } from '@headlessui/react'
import Head from 'next/head';
import TopBar from '../components/topbar';
import clientPromise from "../lib/mongodb";
import { ClerkProvider, SignedIn , useUser, useClerk, SignIn, SignedOut} from '@clerk/clerk-react';

const people = [
  { id: 1, name: 'Farmer', unavailable: false },
  { id: 2, name: 'Gleaner', unavailable: false },
  { id: 3, name: 'NPO', unavailable: false },
]

const EMAIL = "maxgaudreau9@gmail.com"
export default function Login(props: {unregistered: boolean}) {
  let type = "None"
      return (
    <>
      <div>
        <Head>
            <title>Gleanathon</title>
        </Head>
        <TopBar {...{type}}></TopBar>
        <SignIn></SignIn>
      </div>
    </>)
}
