'use client'

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

import Link from 'next/link'
import { useRouter } from "next/navigation";

// Import du redux

import { useAppSelector } from '@/redux/store'
import { logIn, logOut } from '@/redux/features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";


const assignees = [

  { name: 'Régionale', value: null },
  { name: 'Nationale', value: 'Nationale'},
  { name: 'Internationale', value: 'Internationale'},
  { name: 'Cercle privé', value: 'Cercle privé'},

  // More items...
]

const labels = [

  { name: 'Générale', value: null },
  { name: 'Lead qualifié', value: 'Lead qualifié' },
  { name: "Offre spéciale", value: 'Offre spéciale' },
  { name: 'Besoin de prestation', value: 'Besoin de prestation' },
  { name: 'Besoin de recommandation', value: 'Besoin de recommandation' },

  // More items...

]
const dueDates = [
  { name: 'Non urgent', value: null },
  { name: "Moins d'une semaine", value: "Moins d'une semaine" },
  { name: 'Moins de 30 jours', value: 'Moins de 30 jours' },
  { name: 'Entre 1 et 3 mois', value: 'Entre 1 et 3 mois' },
  { name: 'Plus de 3 mois', value: 'Plus de 3 mois' },


  // More items...
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Newpost(props : any) {


    // Récupération des états du Redux 

    const userState = useAppSelector((state) => state.authReducer.value)
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const sender = userState.proUid;
    const owner = userState.usrUid;

    // Déclaration des états pour les forms

    const [assigned, setAssigned] = useState(assignees[0])
    const [labelled, setLabelled] = useState(labels[0])
    const [dated, setDated] = useState(dueDates[0])

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
  //  const [privacy, setPrivacy] = useState('');
  //  const [category, setCategory] = useState('');
  // const [deadline, setDeadline] = useState('');
    const [mainPicture, SetMainPicture] = useState('https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
    const [error, setError] = useState('');


  let privacy = assigned.value;
  let category = labelled.value;
  let deadline = dated.value;


    // handle submit form

const handleSubmitPost = async () => {

  if ( (text !== '') 
      && (title !== '') 
      && (privacy !== '') 
      && (category !== '')
      && (deadline !== '')
      && (mainPicture !== '')
      ){

    const post = {

        owner : owner,
        sender : sender,      
        text: text,
        title: title,
        privacy : privacy,
        category : category,
        deadline : deadline,
        mainPicture : mainPicture

    }

    console.log(post);

    const result = await fetch(`${process.env.backendserver}/contributions/new`, {
        method : 'POST', 
        headers : {
            'Content-Type':'application/json',
        }, 
        body : JSON.stringify(post)
    })

    const datareceived = await result.json();
    
    if (datareceived[0].result == true) {

          const post = datareceived[1];

          setAssigned(assignees[0]);
          setLabelled(labels[0]);
          setDated(dueDates[0]);
          setTitle('');
          setText('');
          props.refresh()
        } else {

    } 

    setError(datareceived[0].message);

    setTimeout(() => {

      setError('');

    }, 3000);

    
  }
}


  return (

  
    <form action="#" className="relative">

      {/*  Affichage des messages d'erreur */ }

          {(error !== '') && <div className="rounded-md bg-blue-50 p-4 mb-5">
            <div className="flex">

                <div className="flex-shrink-0">
                  <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>

                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700"> {error} </p>
                  {/*}
                  <p className="mt-3 text-sm md:ml-6 md:mt-0">
                    <p className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                      Details
                      <span aria-hidden="true"> &rarr;</span>
                    </p>
                  </p>
                */}
                </div>
            </div>
         </div> }

      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        
        <label htmlFor="title" className="sr-only">
          Titre
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
          placeholder="Titre du contenu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}

        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Rédigez votre contenu..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0 bg-white">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
        <div className="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
          <Listbox as="div" value={assigned} onChange={setAssigned} className="flex-shrink-0">
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only">Visibilité</Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    {assigned.value === null ? (
                      <UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1" aria-hidden="true" />
                    ) : (
                      <img src={assigned.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                    )}

                    <span
                      className={classNames(
                        assigned.value === null ? '' : 'text-gray-900',
                        'hidden truncate sm:ml-2 sm:block'
                      )}
                    >
                      {assigned.value === null ? 'Visibilité' : assigned.name}
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {assignees.map((assignee) => (
                        <Listbox.Option
                          key={assignee.value}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-gray-100' : 'bg-white',
                              'relative cursor-default select-none px-3 py-2'
                            )
                          }
                          value={assignee}
                        >
                          <div className="flex items-center">
                            {assignee.avatar ? (
                              <img src={assignee.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                            ) : (
                              <UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            )}

                            <span className="ml-3 block truncate font-medium">{assignee.name}</span>
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

          <Listbox as="div" value={labelled} onChange={setLabelled} className="flex-shrink-0">
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only">Add a label</Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    <TagIcon
                      className={classNames(
                        labelled.value === null ? 'text-gray-300' : 'text-gray-500',
                        'h-5 w-5 flex-shrink-0 sm:-ml-1'
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        labelled.value === null ? '' : 'text-gray-900',
                        'hidden truncate sm:ml-2 sm:block'
                      )}
                    >
                      {labelled.value === null ? 'Importance' : labelled.name}
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {labels.map((label) => (
                        <Listbox.Option
                          key={label.value}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-gray-100' : 'bg-white',
                              'relative cursor-default select-none px-3 py-2'
                            )
                          }
                          value={label}
                        >
                          <div className="flex items-center">
                            <span className="block truncate font-medium">{label.name}</span>
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

          <Listbox as="div" value={dated} onChange={setDated} className="flex-shrink-0">
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only">Add a due date</Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    <CalendarIcon
                      className={classNames(
                        dated.value === null ? 'text-gray-300' : 'text-gray-500',
                        'h-5 w-5 flex-shrink-0 sm:-ml-1'
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        dated.value === null ? '' : 'text-gray-900',
                        'hidden truncate sm:ml-2 sm:block'
                      )}
                    >
                      {dated.value === null ? 'Urgence' : dated.name}

                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {dueDates.map((dueDate) => (
                        <Listbox.Option
                          key={dueDate.value}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-gray-100' : 'bg-white',
                              'relative cursor-default select-none px-3 py-2'
                            )
                          }
                          value={dueDate}
                        >
                          <div className="flex items-center">
                            <span className="block truncate font-medium">{dueDate.name}</span>
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            {/* <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" />
              <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Ajouter un fichier pdf</span>
            </button> */}
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            
              onClick={handleSubmitPost}
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
