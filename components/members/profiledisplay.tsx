'use client'

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ProfileHeader from './profileheader'
import EventCard from './eventcard'
import ProfileCard from '../site/profilecard'
import AnnonceCard from './annoncecard'
import UserCard from './usercard'
import PostCardSimple from './postcardsimple'
import PostCard from './postcard'
import Newpost from './newpost'
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'

const tabs = [
    { name: 'My Account', href: '#', current: false },
    { name: 'Company', href: '#', current: false },
    { name: 'Team Members', href: '#', current: true },
    { name: 'Billing', href: '#', current: false },
  ]
  
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}


const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileDisplay() {

    const searchParams = useSearchParams()
    const proUid = searchParams.get('search')
    let [profile, setProfile] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

       // Récupération des données au mount du composant

       useEffect(() => {

        async function fetchData() {
            try {

                const resp = await fetch(`${process.env.backendserver}/profiles/${proUid}`);
                let data = await resp.json();
                data = data.splice(1);

                // Vérifier que les données ne sont pas vides

                if (data && data.length > 0) {
                    setProfile(data);
                    setLoading(false);

                    setProfile(data);

                  }
    
            } catch (error) {
                console.error('Erreur lors de la récupération des données du profil :', error);
              }

        }

        fetchData();

    }, [proUid]);

  // Afficher des valeurs par défaut tant que les données ne sont pas disponibles
  
  if (loading) {

    return (
      <div className="min-h-full">
        <p>Chargement en cours...</p>
      </div>
    );
  }



    console.log(profile);



  return (
    <>

      <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
          <Disclosure as="nav" className="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                    <div className="flex items-center px-2 lg:px-0">
                      <div className="flex-shrink-0">
                        <img
                          className="block h-8 w-8"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden lg:ml-10 lg:block">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-indigo-700 text-white'
                                  : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                'rounded-md py-2 px-3 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                      <div className="w-full max-w-lg lg:max-w-xs">
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-gray-400 focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <input
                            id="search"
                            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search"
                            type="search"
                            name="search"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lg:ml-4 lg:block">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="relative flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3 flex-shrink-0">
                          <div>
                            <Menu.Button className="relative flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
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
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-indigo-700 text-white'
                            : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                          'block rounded-md py-2 px-3 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-indigo-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">{user.name}</div>
                        <div className="text-sm font-medium text-indigo-300">{user.email}</div>
                      </div>
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          
        </div>

        <main className="-mt-32  bg-gray-100">

          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">{/* Your content */}
            
    
            <div>

                <ProfileHeader 
                
                displayName = {profile[0].cards[0].displayName}
                neocode = {profile[0].neocode}
                email = {profile[0].cards[0].email}
                phone = {profile[0].cards[0].phone}
                title = {profile[0].cards[0].title}
                organization = {profile[0].cards[0].organization}
                website = {profile[0].cards[0].website}
                country = {profile[0].countries[0]}
                city = {profile[0].cities[0]}
                proUid = {profile[0].proUid}

                />


            </div>
            
            
                <main className="mt-20 pb-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="sr-only">Page title</h1>
                    {/* Main 3 column grid */}
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                    
                    {/* Left column */}
                    
                    <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                        <section aria-labelledby="section-1-title">
                        <h2 className="sr-only" id="section-1-title">
                            Section title
                        </h2>
                        <div>

                            <div className="sm:hidden">
                                <label htmlFor="tabs" className="sr-only">
                                Select a tab
                                </label>
                                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                                <select
                                id="tabs"
                                name="tabs"
                                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                defaultValue={tabs.find((tab) => tab.current).name}
                                >
                                {tabs.map((tab) => (
                                    <option key={tab.name}>{tab.name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="hidden sm:block">
                                <nav className="flex space-x-4" aria-label="Tabs">
                                {tabs.map((tab) => (
                                    <a
                                    key={tab.name}
                                    href={tab.href}
                                    className={classNames(
                                        tab.current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                                        'rounded-md px-3 py-2 text-sm font-medium'
                                    )}
                                    aria-current={tab.current ? 'page' : undefined}
                                    >
                                    {tab.name}
                                    </a>
                                ))}
                                </nav>
                            </div>
                            </div>


                        </section>

                        {/*  Ajout de la carte des posts pour le feed */}

                    <div>

                                <section aria-labelledby="section-1-title">

                                    <h2 className="sr-only" id="section-1-title">
                                        Header 
                                    </h2>

                                    <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                    
                                        <div className = "p-6">{/* Header de la carte des posts */}
                                    
                                        <PostCardSimple />
                                        
                                        </div>

                                    </div>

                                </section>

                                <section aria-labelledby="section-1-title">

                                    <h2 className="sr-only" id="section-1-title">
                                        Contenu du post
                                    </h2>

                                <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                    
                                    <div className = "p-6">{/* Contenu du post pour test*/}
                                    
                                    <PostCard />
                                    
                                    </div>

                                </div>

                                </section>

                            </div>





                    </div> 


                    {/* Right column */}
                    <div className="grid grid-cols-1 gap-4">

                    <section aria-labelledby="section-2-title">

                        <h2 className="sr-only" id="section-2-title">
                            Annonces
                        </h2>

                        <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                            
                            <div className="p-6">{/* Your content */}
                            
                            <AnnonceCard />
                            
                            </div>


                        </div>
                        
                        </section>


                        <section aria-labelledby="section-2-title">

                        <h2 className="sr-only" id="section-2-title">
                            Section title
                        </h2>

                        <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                            
                            <div className="p-6">{/* Your content */}
                            
                            <UserCard />
                            
                            </div>


                        </div>

                        </section>

                        <section aria-labelledby="section-2-title">

                        <h2 className="sr-only" id="section-2-title">
                            Section title
                        </h2>

                        <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                            
                            <div className="p-6">{/* Your content */}
                            
                            <EventCard />
                            
                            </div>


                        </div>
                        </section>


                    </div>
                    </div>
                </div>
                </main>


        




            
            
            
            
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
