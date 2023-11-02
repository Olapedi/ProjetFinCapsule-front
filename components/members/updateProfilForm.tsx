import { useAppSelector } from '@/redux/store'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect, useId } from "react";
import countries from '../../neoney_datas/countries.json'
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logOut } from '@/redux/features/auth-slice';

export default function UpdateProfilForm(props : any) {
const router :any = useRouter()
const user : any = useAppSelector((state) => state.authReducer.value)
const dispatch : any = useDispatch()

const [displayName, setDisplayName] = useState<string>(props.data.profilData.cards[0].displayName)
const [title, setTitle] = useState<string>(props.data.profilData.cards[0].title)
const [jobCategories, setJobCategories] = useState<string>(props.data.profilData.jobCategories)
const [jobSubCategories, setJobSubCategories] = useState<string>(props.data.profilData.jobSubCategories)
const [organisation, setOrganisation] = useState<string>(props.data.profilData.cards[0].organization)
const [country, setCountry] = useState<any>({value: props.data.profilData.countries[0], label: ''});
const [city, setCity] = useState<any>({value: props.data.profilData.cities[0], label: ''});
const [phone, setPhone] = useState<string>(props.data.profilData.cards[0].phone)
const [email, setEmail] = useState<string>(props.data.profilData.cards[0].email)
const [description, setDescription] = useState<string>(props.data.profilData.cards[0].description)
const [socialLinkedIn, setSocialLinkedIn] = useState<string>(props.data.profilData.socialLinkedIn)
const [socialFacebook, setSocialFacebook] = useState<string>(props.data.profilData.socialFacebook)
const [socialYoutube, setSocialYoutube] = useState<string>(props.data.profilData.socialYoutube)
const [socialInstagram, setSocialInstagram] = useState<string>(props.data.profilData.socialInstagram)
const [socialTweeter, setSocialTweeter] = useState<string>(props.data.profilData.socialTweeter)
const [website, setWebsite] = useState<string>(props.data.profilData.cards[0].website)
const [about, setAbout] = useState<string>(props.data.profilData.updates[0])

const [error, setError] = useState('')

let countriesoptions: any = [] 
let [citiesoptions, setCityoptions] = useState([]);

countries.map((item) => {

  countriesoptions.push({

      value: item.name, 
      label : item.name
    
    })
 
} )

const handelCountryChange = async (countrySelected : any) => {

  setCountry(countrySelected);
  setCity({value: '', label: ''})

  let cityArray: any = [];

  await countries.map((item) => {

    if (item.name == countrySelected.value) {

      item.cities.map((item2) => {
        cityArray.push({
          value: item2, 
          label : item2
        })
      })
      setCityoptions(cityArray);
    }  
  
  })
} 

const handelCityChange = (citySelected : any) => {
  setCity(citySelected);
} 

const handleDeleteAccount = async () => {
  const req = await fetch(`${process.env.backendserver}/profiles/`,{
    method:'DELETE',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({proUid : user.proUid, usrUid: user.usrUid}),
  })
  const response = await req.json()
  console.log('reponse suppression : ',response)
  if(!response.result){
    setError(response.message)
  }
  else{
    dispatch(logOut())
    router.push(`/`)
  }
}

const handleUpdate = async () => {
  console.log('appel func')
  const data = {
    proUid: user.proUid,
    displayName: displayName,
    title: title,
    jobCategories: jobCategories,
    jobSubCategories: jobSubCategories,
    organisation: organisation,
    country: country,
    city: city,
    phone: phone,
    email: email,
    description: description,
    socialLinkedIn: socialLinkedIn,
    socialFacebook: socialFacebook,
    socialYoutube: socialYoutube,
    socialInstagram: socialInstagram,
    socialTweeter: socialTweeter,
    website: website,
    updates: about,
    tags: tags
  };
  console.log('data before fetch', data)

  const req = await fetch(`${process.env.backendserver}/profiles/`,{
    method : 'PUT',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(data),
  })
  const response:any = await req.json()
  console.log('response from back:' , response);
  
  if(response.result){
    props.closeEditModal()
    props.refresh()    
  }
}


const [inputValue, setInputValue] = useState('');
const [tags, setTags] = useState<any>([]);
//tags = strengths  

const handleInput = (event : any) => {
  if (event.key === 'Enter' || event.key === ',' || event.key === ' ') {
    event.preventDefault();
    const newTag = inputValue.trim();
    if (newTag) {
      setTags([...tags, newTag]);
      setInputValue('');
    }
  }
};

const removeTag = (tagToRemove : any) => {
  const updatedTags = tags.filter((tag : any) => tag !== tagToRemove);
  setTags(updatedTags);
};
console.log('props profilForm',props)

  return (
    <div>
      <div className="space-y-12 mt-8 px-4">
        
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Information du profil</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Renseignez les informations visible de votre profil</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Nom du profil
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setDisplayName(e.target.value)}
                  value={displayName}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Profession
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Catégorie
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setJobCategories(e.target.value)}
                  value={jobCategories}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Sous-Catégorie
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setJobSubCategories(e.target.value)}
                  value={jobSubCategories}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Organisation
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setOrganisation(e.target.value)}
                  value={organisation}
                />
              </div>
            </div>

            <div className="sm:col-span-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Pays
                </label>
                <div className="block w-full mt-2 rounded-md py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"> 
                  <Select options={countriesoptions} onChange={handelCountryChange} value={country} instanceId={useId()}/>
                </div>
              </div> 

              <div>
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Ville
                </label>
                <div className="block w-full mt-2 rounded-md py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"> 
                  <Select options={citiesoptions} onChange={handelCityChange} value={city} instanceId={useId()}/>
                </div>

              </div>
            </div>

            <div className='col-span-full'>

              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Vos points forts
              </label>
              <input
                className="pl-4 block w-full mt-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                value={inputValue}
                placeholder="Entrez vos points forts"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleInput}
              />
              <div>
                {tags.map((tag : any, index : number) => (
                  <div key={index} 
                  className="mt-4 mx-2 rounded-md bg-gray-500 inline-block px-3 py-2 text-sm font-semibold text-white shadow-sm hover:cursor-pointer hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                  onClick={() => removeTag(tag)}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className='col-span-full'>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Contact</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Vos informations de contact</p>            
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Adresse mail
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Numéro de téléphone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setPhone(e.target.value)}
                  value={phone}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Adresse LinkedIn
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setSocialLinkedIn(e.target.value)}
                  value={socialLinkedIn}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                Adresse Youtube
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setSocialYoutube(e.target.value)}
                  value={socialYoutube}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                Adresse Tweeter
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setSocialTweeter(e.target.value)}
                  value={socialTweeter}
                />
              </div>  
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
              Adresse Instagram
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setSocialInstagram(e.target.value)}
                  value={socialInstagram}
                />
              </div>  
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
              Adresse Facebook
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setSocialFacebook(e.target.value)}
                  value={socialFacebook}
                />
              </div>  
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                Site Internet
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setWebsite(e.target.value)}
                  value={website}
                />
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
              <p className="mt-3 text-sm leading-6 text-gray-600"></p>
            </div>

            <div className="col-span-full">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                À propos
              </label>
              <div className="mt-2">
                <textarea                 
                  rows={2}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  onChange={(e)=>setAbout(e.target.value)}
                  value={about}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Présentez en détail vos objectifs, services que vous souhaitez proposer sur la plateforme.</p>
            </div>
          </div>
        </div>

      </div>
      <p className='text-red-600 text-sm'>{error}</p>
      <div className="mt-6 flex items-center justify-around gap-x-6">
        <button type="button"           
        className="rounded-md bg-red-600 px-3  py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
        onClick={()=>handleDeleteAccount()}
        >
          Supprimer mon compte
        </button>
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={()=>handleUpdate()}
        >
          Sauvegarder
        </button>
      </div>
    </div>
  )
}
