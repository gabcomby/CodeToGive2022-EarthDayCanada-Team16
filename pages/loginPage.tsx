import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router"
import {getAuth} from "firebase/auth";
import { initFirebase } from "../firebase/firebaseApp";
import {useState} from 'react'
import { Listbox } from '@headlessui/react'
import Head from 'next/head';
import TopBar from '../components/topbar';
import { getDatabase, ref, set } from "firebase/database"

const people = [
  { id: 1, name: 'Farmer', unavailable: false },
  { id: 2, name: 'Gleaner', unavailable: false },
  { id: 3, name: 'NPO', unavailable: false },
]

export default function Home() {
    //Obligatoire pour l'authentication
    initFirebase();
    const auth = getAuth();
    const[user, loading] = useAuthState(auth);
    const currentUser = auth.currentUser;

    //Utilisé pour se déplacer de page en page
    const router = useRouter();

    //Utile pour le sélectionneur de type de compte
    const [selectedPerson, setSelectedPerson] = useState(people[0])

    if (loading) {
        return <div>Loading...</div>;
    }

    //Si le user n'est pas connecté, on le ramène automatiquement à la page de connexion
    if(!user) {
        router.push('./');
    }

    //CETTE FONCTION EST CELLE QUI EST APPELÉE LORSQUE L'ON SUBMIT LE FORM
    //TODO : PRENDRE LES INFOS QUI SONT SUBMIT ET LES STORE DANS UN JSON POUR LA DATABASE
    //TUTORIEL : https://daily-dev-tips.com/posts/using-forms-in-nextjs/
    const submitContact = async (event:any) => {
      event.preventDefault();
      const db = getDatabase();
      ref(db, "users/gleaners").child().push()

      if (selectedPerson.name == 'Farmer') {

      }
      // alert(`So your name is ${event.target.farmName.value}?`);
    };

    if (currentUser !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = currentUser.displayName;
      const email = currentUser.email;
      const photoURL = currentUser.photoURL;
      const emailVerified = currentUser.emailVerified;

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
            <h1>Hello {displayName}, it's good to see you!</h1>
          </div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <h2>Please answer the following questions to start using this service.</h2>
          </div>
        </div>
        
        //Code du sélectionneur de type de compte
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin:15, fontSize:20}}>Please select what type of account you'd like to create:</div>
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

        //Code qui affiche le form dépendamment du type de compte que l'on crée
        {selectedPerson.name == 'Farmer' &&
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <form style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} onSubmit={submitContact}>
              <div style={{fontSize:20}} >Location & Contact Information</div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:15}}>
                <label>Farm Name :</label>
                <input
                className="mb-4 border-b-2"
                id="farmName"
                name="name"
                type="text"
                required
                />
                <label>Farm Adress :</label>
                <input
                className="mb-4 border-b-2"
                id="farmAdress"
                name="name"
                type="text"
                required
                />
                <label>Email :</label>
                <input
                className="mb-4 border-b-2"
                id="email"
                name="name"
                type="email"
                required
                />
                <label>Phone Number :</label>
                <input
                className="mb-4 border-b-2"
                id="phoneNumber"
                name="name"
                type="tel"
                required
                />
              </div>

              <div style={{fontSize:20}} >Legal Disclaimer</div>
              <div style={{margin:15}}>By clicking the "Register" button, you accept the end-user agreement</div>

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
                <input
                className="mb-4 border-b-2"
                id="fullName"
                name="name"
                type="text"
                required
                />
                <label>Full Adress :</label>
                <input
                className="mb-4 border-b-2"
                id="fullAdress"
                name="name"
                type="text"
                required
                />
                <label>Email :</label>
                <input
                className="mb-4 border-b-2"
                id="email"
                name="name"
                type="email"
                required
                />
                <label>Phone Number :</label>
                <input
                className="mb-4 border-b-2"
                id="phoneNumber"
                name="name"
                type="tel"
                required
                />
              </div>

              <div style={{fontSize:20}} >Work Groups & Range</div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:15}}>
                <label>Number of people in your group :</label>
                <input
                className="mb-4 border-b-2"
                id="groupSize"
                name="name"
                type="number"
                required
                />
                <label>Maximum range for a job (in KM) :</label>
                <input
                className="mb-4 border-b-2"
                id="maxRange"
                name="name"
                type="number "
                required
                />
              </div>

              <div style={{fontSize:20}} >Legal Disclaimer</div>
              <div style={{margin:15}}>By clicking the "Register" button, you accept the end-user agreement</div>

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
              <input
              className="mb-4 border-b-2"
              id="foodBankName"
              name="name"
              type="text"
              required
              />
              <label>Full Adress :</label>
              <input
              className="mb-4 border-b-2"
              id="farmAdress"
              name="name"
              type="text"
              required
              />
              <label>Email :</label>
              <input
              className="mb-4 border-b-2"
              id="email"
              name="name"
              type="email"
              required
              />
              <label>Phone Number :</label>
              <input
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
              <input
              className="mb-4 border-b-2"
              id="maxRange"
              name="name"
              type="number "
              required
              />
            </div>

            <div style={{fontSize:20}} >Legal Disclaimer</div>
            <div style={{margin:15}}>By clicking the "Register" button, you accept the end-user agreement</div>

            <button type="submit" style={{margin:15, fontSize:15}}>
            Submit Form & Complete Registration
            </button>
          </form>
        </div>
        }

        //Code du bouton pour se déconnecter
        <div style={{display:'flex', flexDirection:'column', margin:15}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <button  style={{alignItems:'center', justifyContent:'center'}} type="button" onClick={() => auth.signOut()}> Disconnect </button>
          </div>
        </div>

      </div>
    </>
      )
    }
}
