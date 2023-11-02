'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect} from "react"
import { chooseProfil, logIn } from '@/redux/features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function SigninForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleInput = (event : any) => {
    if (event.key === 'Enter') {
      console.log('enter')
      event.preventDefault();
      handlelogin()
      }
    }
  
  const handlelogin = async () => {

    if (password !== '') {

      const user = {
          email: email,
          password: password
      }

      const result = await fetch(`${process.env.backendserver}/users/signin`, {
          method : 'POST', 
          headers : {
              'Content-Type':'application/json',
          },   
          body : JSON.stringify(user)
      })

      const datareceived = await result.json();

      if (datareceived[0].result) {
        
              const userSignedIn = datareceived[1];

              if (userSignedIn.token !== '') {

                if (userSignedIn.profile.result) {

                  const data = {

                    token : userSignedIn.token,
                    usrUid : userSignedIn.usrUid,
                    isActivated: userSignedIn.isActivated,
                    isCertified: userSignedIn.isCertified,
                    proUid : userSignedIn.profile.proUid,
                    displayName : userSignedIn.profile.cards[0].displayName,
                    proPicture : userSignedIn.profile.mainPicture,
                    email : userSignedIn.profile.cards[0].email,
                  }

                  dispatch(logIn(data));
                  console.log(data);

                } else {

                  const data = {

                    token : userSignedIn.token,
                    usrUid : userSignedIn.usrUid,
                    isActivated: userSignedIn.isActivated,
                    isCertified: userSignedIn.isCertified,
                    proUid : '',
                    displayName : '',
                    proPicture: '',
                    email: '',
                  }
                  
                  dispatch(logIn(data));
                  console.log(data);

                }


              router.push(`/feed?search=${userSignedIn.profile.proUid}`)

              }

      } else {
          
          setError(datareceived[0].message);

      }
      
    }

  }

    return (
      <>

        <div className="flex flex-1 flex-col justify-center pt-24 px-6 ">
  
          <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Adresse e-mail
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      onKeyUp={handleInput}
                    />
                  </div>
                </div>
                
                <p className="text-red-600 text-sm"> {error} </p>



  
                <div>

                  <button
                    type="button"
                    className="flex w-full mt-8 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handlelogin}
                  >
                    Se connecter
                  </button>

                </div>
              </form>
  
            </div>
  
          </div>
        </div>
      </>
    )
  }
  