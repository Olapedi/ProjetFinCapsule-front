'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect} from "react"
import { logIn, logOut } from '@/redux/features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";

export default function SigninForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch<AppDispatch>();

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
                    />
                  </div>
                </div>
                
                <p className='error'> {error} </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                      Sauvegarder
                    </label>
                  </div>
  
                  <div className="text-sm leading-6">
                    
                    <Link href = '/join/password' className="font-semibold text-indigo-600 hover:text-indigo-500"> Mot de passe oublié ? </Link>
                    
                  </div>
                </div>
  
                <div>

                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handlelogin}
                  >
                    Se connecter
                  </button>

                  <p className="mt-10 text-center text-sm text-gray-500">
                  Vous n&apos;êtes pas membre ?{' '}
            
                  <Link href = '/members' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Inscrivez-vous ! </Link>
            
                  </p>

                </div>
              </form>
  
            </div>
  
          </div>
        </div>
      </>
    )
  }
  