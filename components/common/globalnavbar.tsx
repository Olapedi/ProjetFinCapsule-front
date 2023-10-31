'use client'

import { Fragment } from 'react'
import { Disclosure, Popover, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { Modal } from "antd";
import { useState, useEffect, useRef } from 'react'
import EventForm from '../site/eventform'

const add = [
    { name: 'Événements', description: 'Ajoutez des événements', href: '#', icon: CalendarDaysIcon },
];


// Import du redux

import { useAppSelector } from '@/redux/store'
import { logIn, logOut } from '@/redux/features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function GlobalNavbar() {

    // Récupération des états du Redux 

    const auth = useAppSelector((state) => state.authReducer.value)
    const userState = useAppSelector((state) => state.authReducer.value)
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    console.log(userState);

    // # Déclaration des états pour l'affichage des contenus

    let [dataNewEvent, setDataNewEvent] = useState<any>();
    let [evtUid, setEvtUid] = useState()
    const [eventModalVisible, setEventModalVisible] = useState(false);


    // Fonction passée aux props de EventForm pour récupérer l'evtUid une fois celui-ci créé
    // (pour pouvoir l'afficher dans le dashboard)

    async function dashboardDisplayCreatedEvent(evtUid: any) {

        setEvtUid = evtUid;
        console.log("From composant MemberDashboard - evtUid =>", evtUid);
        let full_url = `https://neoneydev1-backend.vercel.app/events/${evtUid}`;
        const resp = await fetch(full_url);
        const reqData = await resp.json();
        console.log("From composant MemberDashboard - reqData =>", reqData);
        setDataNewEvent(reqData[1]);
        console.log("From composant MemberDashboard - dataNewEvent =>", dataNewEvent);


    }


    const handleCancelEvent = () => {
        setEventModalVisible(false);
    };



 const handelUserMenu = (href: any) => {

         console.log(userState);

         const userProUid = userState.proUid;
        
        
         switch (href) {

            case '1':
            
            dispatch(logOut());
            router.push('/');

            break;

            default:

                console.log(userProUid);

                router.push(`/people?search=${userProUid}`)

          }
        
        }
    

  return (

    <>


        {(userState.token !== '') && <main>

        <Disclosure as="nav" className="bg-indigo-600 shadow">

        {({ open }) => (
            <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="flex h-16 justify-between">
                <div className="flex px-2 lg:px-0">
                    <div className="flex flex-shrink-0 items-center">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    </div>
                    <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <Link
                        href="/feed?search=all"
                        className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-white  hover:border-gray-300 hover:text-indigo-400"
                    >
                        Feed
                    </Link>
                    <Link
                        href="/people?search=all"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium  text-white hover:border-gray-300 hover:text-indigo-400"
                    >
                        Membres
                    </Link>

                    <Link
                        href="/meet?search=all"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-300 hover:text-indigo-400"
                    >
                        Rencontres
                    </Link>
                    </div>
                </div>

                {/*
                <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                    <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                        Rechercher
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Rechercher"
                        type="search"
                        />
                    </div>
                    </div>
                </div>

                 */}
                

                <div className="flex items-center lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                    </Disclosure.Button>
                </div>



                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                    
                    {/* 

                    <button
                    type="button"
                    className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Voir les notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>


                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Ouvrir le menu</span>
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                            <button
                                onClick = {() => handelUserMenu ('0')}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Mon Profile
                            </button>
                            )}
                        </Menu.Item>
                        
                        <Menu.Item>
                            {({ active }) => (
                            <button
                            onClick = {() => handelUserMenu ('1')}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Se déconnecter
                            </button>
                            )}

                        </Menu.Item>
                        </Menu.Items>
                    </Transition>
                    </Menu>
                </div>
                </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
                <div className="space-y-1 pb-3 pt-2">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                <Disclosure.Button
                    as="a"
                    href="/feed"
                    className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
                >
                    Feed
                </Disclosure.Button>
                <Disclosure.Button
                    as="a"
                    href="/people"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                >
                    Membres
                </Disclosure.Button>
                <Disclosure.Button
                    as="a"
                    href="/events"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                >
                    Rencontres
                </Disclosure.Button>
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                    <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    </div>
                    <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">Tom Cook</div>
                    <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                    </div>
                    <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Voir les notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-3 space-y-1">
                    <Disclosure.Button
                    onClick = {() => handelUserMenu ('0')}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                    Mon Profile
                    </Disclosure.Button>
                    <Disclosure.Button
                    
                    onClick = {() => handelUserMenu ('1')}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                    Se déconnecter
                    </Disclosure.Button>
                </div>
                </div>
            </Disclosure.Panel>
            </>
        )}
        </Disclosure>


    {/* Ajout de la modale en dessois de la page*/}

        
    {(userState.isActivated) && <main>

        <Popover.Group>
            <Popover className="fixed bottom-12 right-12">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                    <p
                    className="rounded-full bg-indigo-600 p-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:animate-pulse"
                    >
                        <PlusIcon className="h-8 w-8" aria-hidden="true" />
                    </p>
                </Popover.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Popover.Panel className="absolute right-1 bottom-full z-10 mb-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-4">
                        {add.map((item) => (
                            <div
                            key={item.name}
                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                            onClick={() => setEventModalVisible(true)}
                            >
                                <div className="flex-auto text-right">
                                    <Link href = {item.href} 
                                    className='block font-semibold text-gray-900'>

                                    {item.name} 
                                    <span className='absolute inset-0'> </span>

                                    </Link>

                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                </div>
                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                </div>
                            </div>
                        ))}
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </Popover.Group>

        <Modal

            onCancel={() => handleCancelEvent()}
            open={eventModalVisible}
            footer={null}
            >

            <EventForm />

        </Modal>


        </main> }


    </main> }

    </>

  )
}
