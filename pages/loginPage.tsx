import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router"
import {getAuth} from "firebase/auth";
import { initFirebase } from "../firebase/firebaseApp";
import {useState} from 'react'
import { Listbox } from '@headlessui/react'
import Head from 'next/head';
import TopBar from '../components/topbar';
import Footer from '../components/footer';
import clientPromise from "../lib/mongodb";
import { ClerkProvider, SignedIn , useUser, useClerk, SignIn, SignedOut} from '@clerk/clerk-react';
import AuthContext from "../stores/authContext";

const people = [
  { id: 1, name: 'Farmer', unavailable: false },
  { id: 2, name: 'Gleaner', unavailable: false },
  { id: 3, name: 'NPO', unavailable: false },
]


export default function Login(props: {gleaners: string[], farmers: string[], orgs: string[]}) {
    const { isSignedIn, user } = useUser()
    const EMAIL = user ? user.primaryEmailAddressId : ""
    let type = "None"
    if (props.gleaners.includes(EMAIL || "")) {
        type = "Gleaners"
    } else if (props.farmers.includes(EMAIL || "")) {
        type = "Farmers"
    } else if (props.orgs.includes(EMAIL || "")) {
        type = "Orgs"
    }


    //Utile pour le sélectionneur de type de compte
    const [selectedPerson, setSelectedPerson] = useState(people[0])
    const [name, setname] = useState("")
    const [address, setaddress] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [fullName, setfullName] = useState("")
    const [maxRange, setmaxRange] = useState("")

    
    //CETTE FONCTION EST CELLE QUI EST APPELÉE LORSQUE L'ON SUBMIT LE FORM
    //TODO : PRENDRE LES INFOS QUI SONT SUBMIT ET LES STORE DANS UN JSON POUR LA DATABASE
    //TUTORIEL : https://daily-dev-tips.com/posts/using-forms-in-nextjs/
    
    const submitContact = async (event:any) => {
      let type = "None"
      if (selectedPerson.name === "Farmer") {
        let post = {
            email: EMAIL, name, address, phoneNumber
        }

        console.log(post)

        let response = await fetch('/api/farmer', {
            method: 'POST',
            body: JSON.stringify(post),
        });
      } else if (selectedPerson.name === "Gleaner") {
        let post = {
            email: EMAIL, fullName, address, phoneNumber, maxRange
        }

        console.log(post)

        let response = await fetch('/api/gleaner', {
            method: 'POST',
            body: JSON.stringify(post),
        });
      } else if (selectedPerson.name === "NPO") {
        let post = {
            email: EMAIL, name, address, phoneNumber, maxRange
        }

        console.log(post)

        let response = await fetch('/api/org', {
            method: 'POST',
            body: JSON.stringify(post),
        });
      }
    };

    if (type === "None") {

      return (
    <>
    
    <div>
        <Head>
            <title>Gleanathon</title>
        </Head>
        <TopBar {...{type}}></TopBar>
      </div>
    <SignedIn>
      <div>
        <div style={{display:'flex', flexDirection:'column'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          </div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <h2>Please answer the following questions to start using this service.</h2>
          </div>
        </div>
        
        {/*Code du sélectionneur de type de compte*/}
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin:15, fontSize:20}}>Please select what type of account you&quot;d like to create:</div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin:15}}>
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            <Listbox.Button>{selectedPerson.name}</Listbox.Button>
            <Listbox.Options>
              {people.map((person) => (
                <Listbox.Option
                  key={person.id}
                  value={person}
                  disabled={person.unavailable}
                >
                  {person.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        {/*Code qui affiche le form dépendamment du type de compte que l'on crée*/}
        {selectedPerson.name == 'Farmer' &&
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <form style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} onSubmit={submitContact}>
              <div style={{fontSize:20}} >Location & Contact Information</div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:15}}>
                <label>Farm Name :</label>
                <input onChange={(e) => setname(e.target.value)}
                className="mb-4 border-b-2"
                id="farmName"
                name="name"
                type="text"
                required
                />
                <label>Farm Address :</label>
                <input onChange={(e) => setaddress(e.target.value)}
                className="mb-4 border-b-2"
                id="farmAddress"
                name="name"
                type="text"
                required
                />
                {/* <label>Email :</label>
                <input
                className="mb-4 border-b-2"
                id="email"
                name="name"
                type="email"
                required
                /> */}
                <label>Phone Number :</label>
                <input onChange={(e) => setphoneNumber(e.target.value)}
                className="mb-4 border-b-2"
                id="phoneNumber"
                name="name"
                type="tel"
                required
                />
              </div>

              <div style={{fontSize:20}} >Legal Disclaimer</div>
              <div style={{margin:15}}>By clicking the &quot;Register&quot; button, you accept the end-user agreement</div>

              <button type="submit" style={{margin:15, fontSize:15}}>
              Submit Form & Complete Registration
              </button>
            </form>
          </div>
        }

        {selectedPerson.name == 'Gleaner' &&
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <form style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} onSubmit={submitContact}>
              <div style={{fontSize:20}} >Location & Contact Information</div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:15}}>
                <label>First & Last Name :</label>
                <input onChange={(e) => setfullName(e.target.value)}
                className="mb-4 border-b-2"
                id="fullName"
                name="name"
                type="text"
                required
                />
                <label>Full Address :</label>
                <input onChange={(e) => setaddress(e.target.value)}
                className="mb-4 border-b-2"
                id="Address"
                name="name"
                type="text"
                required
                />
                <label>Phone Number :</label>
                <input onChange={(e) => setphoneNumber(e.target.value)}
                className="mb-4 border-b-2"
                id="phoneNumber"
                name="name"
                type="tel"
                required
                />
              </div>

              <div style={{fontSize:20}} >Work Groups & Range</div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:15}}>
                {/* <label>Number of people in your group :</label>
                <input
                className="mb-4 border-b-2"
                id="groupSize"
                name="name"
                type="number"
                required
                /> */}
                <label>Maximum range for a job (in KM) :</label>
                <input onChange={(e) => setmaxRange(e.target.value)}
                className="mb-4 border-b-2"
                id="maxRange"
                name="name"
                min="0"
                max="9999"
                type="number"
                required
                />
              </div>

              <div style={{fontSize:20}} >Legal Disclaimer</div>
              <div style={{margin:15}}>By clicking the &quot;Register&quot; button, you accept the end-user agreement</div>

              <button type="submit" style={{margin:15, fontSize:15}}>
              Submit Form & Complete Registration
              </button>
            </form>
          </div>
        }

        {selectedPerson.name == 'NPO' &&
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <form style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} onSubmit={submitContact}>
            <div style={{fontSize:20}} >Location & Contact Information</div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:15}}>
              <label>Food Bank Name :</label>
              <input onChange={(e) => setname(e.target.value)}
              className="mb-4 border-b-2"
              id="foodBankName"
              name="name"
              type="text"
              required
              />
              <label>Full Address :</label>
              <input onChange={(e) => setaddress(e.target.value)}
              className="mb-4 border-b-2"
              id="Address"
              name="name"
              type="text"
              required
              />
              <label>Phone Number :</label>
              <input onChange={(e) => setphoneNumber(e.target.value)}
              className="mb-4 border-b-2"
              id="phoneNumber"
              name="name"
              type="tel"
              required
              />
            </div>

            <div style={{fontSize:20}} >Job Range</div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:15}}>
              <label>Maximum range for a job (KM) :</label>
              <input onChange={(e) => setmaxRange(e.target.value)}
              className="mb-4 border-b-2"
              id="maxRange"
              name="name"
              min="0"
              max="9999"
              type="number"
              required
              />
            </div>

            <div style={{fontSize:20}} >Legal Disclaimer</div>
            <div style={{margin:15}}>By clicking the &quot;Register&quot; button, you accept the end-user agreement</div>

            <button type="submit" style={{margin:15, fontSize:15}}>
            Submit Form & Complete Registration
            </button>
          </form>
        </div>
        }

        {/*Code du bouton pour se déconnecter*/}
        <div style={{display:'flex', flexDirection:'column', margin:15}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <button  style={{alignItems:'center', justifyContent:'center'}} type="button"> Disconnect </button>
          </div>
        </div>

      </div>
    </SignedIn>

    <SignedOut>
        <SignIn></SignIn>
    </SignedOut>
    </>
      )
    } else return (
        <>
            <Head>Gleanathon</Head>
            <TopBar {...{type}}></TopBar>
            <div id="done_container">
                <h1>Your account has been created</h1>
                <h1>Now, enjoy gleaning</h1>
            </div>
            
        </>

    )
}

export async function getServerSideProps() {
    
    const EMAIL = ""
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const farmers = await db
            .collection("farmers")
            .find({})
            .toArray()

        const gleaners = await db
            .collection("gleaners")
            .find({})
            .toArray()

        const orgs = await db
            .collection("orgs")
            .find({})
            .toArray()

        return {
            props: { gleaners: JSON.parse(JSON.stringify(gleaners)).map((x: any) => x.email), farmers: JSON.parse(JSON.stringify(farmers)).map((x: any) => x.email), orgs: JSON.parse(JSON.stringify(orgs)).map((x: any) => x.email) },
        };
    } catch (e) {
        console.error(e);
    }
}
