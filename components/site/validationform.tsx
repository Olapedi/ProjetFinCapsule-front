'use client'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { activate } from '../../redux/features/auth-slice'
import Link from 'next/link'
import Image from 'next/image'
import { useAppSelector } from '@/redux/store'

export default function Validation() {
    const [displayName, setDisplayName] = useState<string>('')
    const [validationCode, setValidationCode] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [avatar, setAvatar] = useState()
    const [organisation, setOrganisation] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [jobCategory, setJobCategory] = useState<string>('')
    const [jobSubCategories, setJobSubCategories] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [imageURI, setImageURI] = useState('');

    const dispatch = useDispatch()
    const user = useAppSelector((state) => state.authReducer.value)

    const handleImageSelect = (event) => {
      const selectedFile = event.target.files?.[0];
  
      if (selectedFile) {
        const uri = URL.createObjectURL(selectedFile);
        setImageURI(uri);
        setAvatar(selectedFile)
      }
    };
      

    // form submit to modify the profile in DB
    const handleSubmit = async () =>{
      const req = await fetch(`${process.env.backendserver}/users/${user.usrUid}`)
      const tempRes = await req.json()

        if(displayName && validationCode && description && organisation && jobCategory && jobSubCategories){
          
          const formData = new FormData();
            formData.append('displayName', displayName);
            formData.append('validationCode', validationCode);
            formData.append('description', description);
            // formData.append('avatar', {name : avatar.name})
            formData.append('organisation', organisation);
            formData.append('title', title);
            formData.append('jobCategory', jobCategory);
            formData.append('jobSubCategories', JSON.stringify(jobSubCategories));
            formData.append('usrUid', user.usrUid);
            formData.append('phone', tempRes.phone);
            formData.append('email', tempRes.email);  

          const data = {
                displayName,
                validationCode,
                description,
                avatar,
                organisation,
                title,
                jobCategory,
                jobSubCategories,
                usrUid : user.usrUid,
                phone: tempRes.phone,
                email: tempRes.email,
            }
            console.log('data',data)

            const request = await fetch(`${process.env.backendserver}/users/activate`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            })
    
            const results = await request.json()
            console.log(results)
            if(!results[0].result){
                setError(results[0].error)
            }
            else{
                dispatch(activate())
                console.log('has been dispatched')
            }
        }
        
    }
console.log('avatar',avatar)
console.log('uri',imageURI)
  return (
    <div className="items-center" style={{display : "flex", flexDirection : 'column'}}>
        <Link href = "/" > 
            <span className="sr-only">Neoney</span>
            <Image src = '/neoney.png' width={200} height={50} alt='Logo Neoney'></Image>
        </Link>
      <div className="space-y-8">
        <div className="border-b border-gray-900/10 pb-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Renseignez votre profil</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
          Vous avez reçu un mail avec le code de validation à l'adresse email que vous avez renseigné précédemment.
            <br/>
            Veuillez remplir les informations nécessaire à la finalisation de votre inscription.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Nom d'utilisateur
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
                Code d'activation
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Code d'activation"
                    required
                    onChange={(e)=>setValidationCode(e.target.value)}
                    value={validationCode}
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
                   id="fileInput"
                   className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                   accept="image/*"
                   onChange={(e) => {handleImageSelect(e)}}
                   />
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
                  onChange={(e)=>setOrganisation(e.target.value)}
                  value={organisation}
                />
              </div>
            </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pb-2">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Domaine d'activité
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  onChange={(e)=>setJobCategory(e.target.value)}
                  value={jobCategory}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Profession
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

      <div className="mt-6 flex items-center justify-end gap-x-6">

        <button
          className="rounded-md bg-indigo-600 px-5 tracking-wider py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={()=>handleSubmit()}
        >
          Confirmer
        </button>
        <p className="text-red-600 text-sm"> {error} </p>

      </div>
    </div>
  )
}
