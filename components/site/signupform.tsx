'use client'

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect, useId } from "react";
import countries from '../../neoney_datas/countries.json'
import Select from 'react-select';

import { logIn, logOut } from '@/redux/features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";


export default function SignupForm() {

const [firstname, setFirstname] = useState('');
const [lastname, setLastname] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [country, setCountry] = useState({value: '', label: ''});
const [city, setCity] = useState({value: '', label: ''});
const [phone, setPhone] = useState('');
const [sponsor, setSponsor] = useState('');
const [error, setError] = useState('');

const dispatch = useDispatch<AppDispatch>();

// Country selector

let countriesoptions: any = [] 
let [citiesoptions, setCityoptions] = useState([]);

countries.map((item) => {

  countriesoptions.push({

      value: item.iso3, 
      label : item.name
    
    })
 
} )

const handelCountryChange = async (countrySelected : any) => {

setCountry(countrySelected);
setCity({value: '', label: ''})

let cityArray: any = [];

await countries.map((item) => {

  if (item.iso3 == countrySelected.value) {

    item.cities.map((item2) => {

      cityArray.push({

        value: item2, 
        label : item2

    })
    
    })

    setCityoptions(cityArray);

  }  
 
} )


} 

const handelCityChange = (citySelected : any) => {

setCity(citySelected);

} 

// handle submit form

const handleSignUp = async () => {

  if ( (firstname !== '') 
      && (lastname !== '') 
      && (password !== '') 
      && (email !== '')
      && (phone !== '')
      && (sponsor !== '')
      ){

    const user = {

        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        country: country.value,
        city: city.value,
        phone: phone,
        sponsor: sponsor

    }

    console.log(user);

    const result = await fetch(`${process.env.backendserver}/users/signup`, {
        method : 'POST', 
        headers : {

            'Content-Type':'application/json',

        }, 
        
        body : JSON.stringify(user)
    })

    const datareceived = await result.json();

    if (datareceived[0].result == true) {

            const userSignedIn = datareceived[1];
            
            if (userSignedIn.token !== '') {

              dispatch(logIn(userSignedIn.email));

            }

    } else {
        
        setError(datareceived[0].message);

    }
    
  }

}


    return (
  
    <main>

        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href = "/" className="flex justify-center"> 
   
          <span className="sr-only">Neoney</span>
          <Image src = '/neoney.png' width={200} height={50} alt='Logo Neoney'></Image>
   
          </Link>

            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Bienvenue
            </h2>
            <p className="text-center"> Inscription avec : NEO202310221403 </p>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">

              
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                    Prénom
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      autoComplete="firstname"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}

                    />
                  </div>
                </div>
  

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Nom
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      autoComplete="lastname"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>

                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Mot de passe
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>

                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                      Pays
                      </label>

                      <div className="block w-full mt-2 rounded-md py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"> 

                      <Select options={countriesoptions} onChange={handelCountryChange} value={country} instanceId={useId()}/>

                      </div>

                      <label htmlFor="country" className="block mt-2 text-sm font-medium leading-6 text-gray-900">
                      Ville
                      </label>

                      <div className="block w-full mt-2 rounded-md py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"> 

                      <Select options={citiesoptions} onChange={handelCityChange} value={city} instanceId={useId()}/>

                      </div>


                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    Téléphone
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      autoComplete="phone"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    
                  </div>
                </div>


                <div>
                  <label htmlFor="sponsor" className="block text-sm font-medium leading-6 text-gray-900">
                    Code Neo de votre sponsor
                  </label>
                  <div className="mt-2">
                    <input
                      id="sponsor"
                      name="sponsor"
                      type="text"
                      autoComplete="sponsor"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={sponsor}
                      onChange={(e) => setSponsor(e.target.value)}
                    />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      required
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-xs leading-6 text-gray-900 ">
                    Le respect de votre vie privée est notre priorité. Vos informations ne seront jamais communiquées. En continuant, vous acceptez notre Politique de Confidentialité et nos Conditions générales d&apos;utilisation.

                    </label>
                  </div>
  
                  
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSignUp}
                  >
                    S&apos;inscrire
                  </button>
                </div>

                <p className='error'> {error} </p>

              </form>
  
              <div>
                
              </div>
            </div>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Déjà membre ?{' '}

              <Link href = '/members' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Connectez-vous ! </Link>

            </p>
          </div>
        </div>
      </main>
    )
  }
  