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

const people = [
  { id: 1, name: 'Farmer', unavailable: false },
  { id: 2, name: 'Gleaner', unavailable: false },
  { id: 3, name: 'NPO', unavailable: false },
]

const EMAIL = "maxgaudreau9@gmail.com"

export default function Login(props: {unregistered: boolean}) {
    //Utile pour le sélectionneur de type de compte
    const [selectedPerson, setSelectedPerson] = useState(people[0])
    const [name, setname] = useState("")
    const [farmAddress, setAddress] = useState("")
    const [address, setaddress] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [fullName, setfullName] = useState("")
    const [maxRange, setmaxRange] = useState("")

    
    //CETTE FONCTION EST CELLE QUI EST APPELÉE LORSQUE L'ON SUBMIT LE FORM
    //TODO : PRENDRE LES INFOS QUI SONT SUBMIT ET LES STORE DANS UN JSON POUR LA DATABASE
    //TUTORIEL : https://daily-dev-tips.com/posts/using-forms-in-nextjs/
    
    const submitContact = async (event:any) => {
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

    if (props.unregistered) {

      return (
    <>
      <div>
        <Head>
            <title>Gleanathon</title>
        </Head>
        <TopBar></TopBar>
      </div>
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
                <input onChange={(e) => setAddress(e.target.value)}
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
              <label>Full Adress :</label>
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
            <button  style={{alignItems:'center', justifyContent:'center'}} type="button" onClick={() => auth.signOut()}> Disconnect </button>
          </div>
        </div>

      </div>
    </>
      )
    } else return (
        <>
            <Head>Gleanathon</Head>
            <TopBar></TopBar>
            <div id="done_container">
                <h1>Your account has been created</h1>
                <h1>Now, enjoy gleaning</h1>
            </div>
            
        </>

    )
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const farmers = await db
            .collection("farmers")
            .find({email: EMAIL})
            .toArray()

        const gleaners = await db
            .collection("gleaners")
            .find({email: EMAIL})
            .toArray()

        const orgs = await db
            .collection("orgs")
            .find({email: EMAIL})
            .toArray()

        return {props: {unregistered: farmers.length === 0 && gleaners.length === 0 && orgs.length === 0}};
    } catch (e) {
        console.error(e);
    }
}
