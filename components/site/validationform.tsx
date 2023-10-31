'use client'

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { activate, chooseProfil } from '../../redux/features/auth-slice'
import Link from 'next/link'
import Image from 'next/image'
import { useAppSelector } from '@/redux/store'
import SiteNavbar from './sitenavbar'

export default function Validation() {

    const [displayName, setDisplayName] = useState<string>('')
    const [activationCode, setActivationCode] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [organization, setOrganization] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [jobCategories, setJobCategories] = useState<string>('')
    const [jobSubCategories, setJobSubCategories] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [website, setWebsite] =useState<string>('http://')
    const [picture, setPicture] = useState<any>();

    const dispatch = useDispatch()
    const user = useAppSelector((state) => state.authReducer.value)
    const formData = new FormData();

    //selector for the image

    async function handleImageSelect(e: any) {
      const selectedFile = await e.target.files[0];
      if (selectedFile) {
          setPicture(selectedFile)
      }
  }
      
    //button action form submit to modify the profile in DB

    const handleSubmit = async () =>{

      const req = await fetch(`${process.env.backendserver}/users/${user.usrUid}`)
      const tempRes = await req.json()

      if(displayName && activationCode && description && organization && jobCategories && jobSubCategories && picture){

          // formData to handle sending file to the backend
            formData.append('displayName', displayName);
            formData.append('activationCode', activationCode);
            formData.append('description', description);
            formData.append('picture', picture, picture.name)
            formData.append('organization', organization);
            formData.append('title', title);
            formData.append('jobCategories', jobCategories);
            formData.append('jobSubCategories', JSON.stringify(jobSubCategories));
            formData.append('website', website)
            formData.append('usrUid', user.usrUid);
            formData.append('phone', tempRes[1].phone);
            formData.append('email', tempRes[1].email);  

          console.log('formData : ',formData)
          
          // const data = {
          //       displayName,
          //       activationCode,
          //       description,
          //       organization,
          //       title,
          //       jobCategories,
          //       jobSubCategories,
          //       usrUid : user.usrUid,
          //       website: website,
          //       phone: tempRes[1].phone,
          //       email: tempRes[1].email,
          //   }

            console.log('data',formData)

            const request = await fetch(`${process.env.backendserver}/users/activate`, {
                method: 'POST',
                body: formData,
                // headers: {'Content-Type' : 'application/json'},
                // body: JSON.stringify(data),
            })
            
            console.log('request : ', request)
            const results = await request.json()
            console.log('results : ', results)
            console.log('result error',results[0].message)
            if(!results[0].result){
                setError(results[0].message)
            }
            
            else{
                dispatch(activate())
                // dispatch(chooseProfil())
                console.log('has been dispatched')
            }
        }
    }
// console.log('avatarName',avatarName)
// console.log('avatarType',avatarType)
// console.log('uri',avatarURI)
  return (
    <div className="items-center" style={{display : "flex", flexDirection : 'column'}}>

        <h1 className="space-y-8 mt-20"> <b> Activez votre compte </b> </h1>

      <div className="space-y-8 mt-20">
        <div className="border-b border-gray-900/10 pb-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900 mb-10">Renseignez votre profil</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
          Vous avez reçu un mail avec le code de validation à l&apos;adresse email que vous avez renseigné précédemment.
            <br/>
            Veuillez remplir les informations nécessaire à la finalisation de votre inscription.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Nom d&apos;utilisateur
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Nom d'utilisateur"
                    required
                    onChange={(e)=>setDisplayName(e.target.value)}
                    value={displayName}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Code d&apos;activation
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Code d'activation"
                    required
                    onChange={(e)=>setActivationCode(e.target.value)}
                    value={activationCode}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Site web
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Code d'activation"
                    required
                    onChange={(e)=>setWebsite(e.target.value)}
                    value={website}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea                 
                  rows={2}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  onChange={(e)=>setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Présentez vous à la communauté</p>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <input 
                type="file"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onChange={handleImageSelect} />
              </div>
            </div>

          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Informations de votre profil</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Renseignez les informations de votre profil ci-dessous</p>
          
          <div className="sm:col-span-4 pt-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Profession
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>

            <div className="sm:col-span-4 pt-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Organisation
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setOrganization(e.target.value)}
                  value={organization}
                />
              </div>
            </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pb-2">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Catégorie d&apos;emploi
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  onChange={(e)=>setJobCategories(e.target.value)}
                  value={jobCategories}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Sous-Catégorie d&apos;emploi
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setJobSubCategories(e.target.value)}
                  value={jobSubCategories}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <p className="text-red-600 text-sm mt-6"> {error} </p>
      <div className="mt-4 flex items-center justify-end gap-x-6">
        <button
          className="rounded-md bg-indigo-600 px-5 tracking-wider py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={()=>handleSubmit()}
        >
          Confirmer
        </button>
      </div>

    </div>
  )
}
