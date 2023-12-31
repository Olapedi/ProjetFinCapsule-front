"use client";

import Link from 'next/link'
import { Modal } from "antd";
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, PlusIcon} from "@heroicons/react/20/solid";
import ProfilesAll from "../site/profilesall";
import UserCard from "./usercard";
import Newpost from "./newpost";
import EventCard from "./eventcard";
import AnnonceCard from "./annoncecard";
import PostCard from "./postcard";
import PostCardSimple from "./postcardsimple";
import EventDisplay from "../site/eventdisplay";

import { useState, useEffect, useRef } from 'react'
import EventsAll from '../site/eventsall'
import EventForm from '../site/eventform'
import Eventsdirectory from './eventsdirectory'
import { useAppSelector } from '@/redux/store'

import { logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from 'next/image';



const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
    { name: "Home", href: "1", current: true },
    { name: "Membres", href: "2", current: false },
    { name: "Événements", href: "3", current: false },
];
const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];

const add = [
    { name: 'Événements', description: 'Ajoutez des événements', href: '#', icon: CalendarDaysIcon },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function MemberDashboard() {

    const auth = useAppSelector((state) => state.authReducer.value)
    const userNavigation = [
        { name: "Mon profil", href: `/members/profile?search=${user.proUid}` },
        { name: "Déconnexion", href: "#" },
    ];
    // # Déclaration des états pour l'affichage des contenus

    const [showFeed, setShowfeed] = useState(true);
    const [showMembers, setShowmembers] = useState(false);  
    const [showEvents, setShowevents] = useState(false);
    const [showOneEvent, setShowOneevent] = useState(false);
    let [dataNewEvent, setDataNewEvent] = useState<any>();
    // let [eventDisplay, setEventDisplay] = useState(null);
    let [evtUid, setEvtUid] = useState()
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogOut = () => {
        dispatch(logOut());
        router.push('/')
      }
    const [eventModalVisible, setEventModalVisible] = useState(false);

    const handleshowMenu = (href: any) => {
        switch (href) {
            case "2":
                setShowfeed(false);
                setShowevents(false);
                setShowmembers(true);
                setShowOneevent(false);

                break;

            case "3":
                setShowfeed(false);
                setShowevents(true);
                setShowmembers(false);
                setShowOneevent(false);

                break;

            case "4":
                setShowfeed(false);
                setShowevents(false);
                setShowmembers(false);
                setShowOneevent(true);

                break;

            default:
                setShowfeed(true);
                setShowevents(false);
                setShowmembers(false);
                setShowOneevent(false);
        }
    };

    console.log("Feed => " + showFeed);
    console.log("Members => " + showMembers);
    console.log("Events => " + showEvents);
    console.log("OneEvent => " + showOneEvent);

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
        handleshowMenu("4");
        // let eventDisplayTmp: any = (
            // <EventDisplay
            //     evtUid={evtUid}
            //     title={dataNewEvent.title}
            //     longDescription={dataNewEvent.longDescription}
            //     country={dataNewEvent.countries}
            //     city={dataNewEvent.cities}
            //     />
            //     );
        // setEventDisplay(eventDisplayTmp);
    }

    // Fin de la déclaration des états


    const handleCancelEvent = () => {
        setEventModalVisible(false);
    };

    return (
        <>
            <div className="min-h-full">
                <Popover as="header" className="bg-indigo-600 pb-24">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                <div className="relative flex items-center justify-center py-5 lg:justify-between">
                                    {/* Logo */}
                                    <div className="absolute left-0 flex-shrink-0 lg:static">
                                        <a href="#">
                                            <span className="sr-only">
                                                Your Company
                                            </span>
                                            <Image
                                                className="h-20 w-auto"
                                                src="/neoneyW.png"
                                                alt="Neoney Logo"
                                                width={200}
                                                height={200}
                                            />
                                        </a>
                                    </div>

                                    {/* Right section on desktop */}
                                    <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                                        <button
                                            type="button"
                                            className="relative flex-shrink-0 rounded-full p-1 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">
                                                View notifications
                                            </span>
                                            <BellIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>

                                        {/* Profile dropdown */}
                                        <Menu
                                            as="div"
                                            className="relative ml-4 flex-shrink-0"
                                        >
                                            <div>
                                                <Menu.Button className="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>
                                                    <Image
                                                        className="h-8 w-8 rounded-full"
                                                        src={user.imageUrl}
                                                        alt=""
                                                        width={200}
                                                        height={200}
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map(
                                                        (item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({active,}) => (
                                                                    <button
                                                                        onClick={() => {
                                                                            if (item.name === "Déconnexion") {
                                                                                handleLogOut();
                                                                            }
                                                                            if(item.name === 'Mon profil')
                                                                            {
                                                                                handleShowUserProfil();
                                                                            }
                                                                        }}
                                                                        className={classNames(active? "bg-gray-100": "","block px-4 py-2 text-sm text-gray-700"
                                                                        )}
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        )
                                                    )}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>

                                    {/* Search */}
                                    <div className="min-w-0 flex-1 px-12 lg:hidden">
                                        <div className="mx-auto w-full max-w-xs">
                                            <label
                                                htmlFor="desktop-search"
                                                className="sr-only"
                                            >
                                                Search
                                            </label>
                                            <div className="relative text-white focus-within:text-gray-600">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <MagnifyingGlassIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <input
                                                    id="desktop-search"
                                                    className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                                    placeholder="Search"
                                                    type="search"
                                                    name="search"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu button */}
                                    <div className="absolute right-0 flex-shrink-0 lg:hidden">
                                        {/* Mobile menu button */}
                                        <Popover.Button className="relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">
                                                Open main menu
                                            </span>
                                            {open ? (
                                                <XMarkIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Bars3Icon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                                    <div className="grid grid-cols-3 items-center gap-8">
                                        <div className="col-span-2">
                                            <nav className="flex space-x-4">
                                                {navigation.map((item) => (
                                                    <button
                                                        key={item.name}
                                                        onClick={() => {
                                                            handleshowMenu(
                                                                item.href
                                                            );
                                                        }}
                                                        className={classNames(
                                                            item.current
                                                                ? "text-white"
                                                                : "text-indigo-100",
                                                            "rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                                                        )}
                                                        aria-current={
                                                            item.current
                                                                ? "page"
                                                                : undefined
                                                        }
                                                    >
                                                        {item.name}
                                                    </button>
                                                ))}
                                            </nav>
                                        </div>
                                        <div>
                                            <div className="mx-auto w-full max-w-md">
                                                <label
                                                    htmlFor="mobile-search"
                                                    className="sr-only"
                                                >
                                                    Search
                                                </label>
                                                <div className="relative text-white focus-within:text-gray-600">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <MagnifyingGlassIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <input
                                                        id="mobile-search"
                                                        className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                                        placeholder="Search"
                                                        type="search"
                                                        name="search"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Transition.Root as={Fragment}>
                                <div className="lg:hidden">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="duration-150 ease-out"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="duration-150 ease-in"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                                    </Transition.Child>

                                    <Transition.Child
                                        as={Fragment}
                                        enter="duration-150 ease-out"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="duration-150 ease-in"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Popover.Panel
                                            focus
                                            className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                                        >
                                            <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="pb-2 pt-3">
                                                    <div className="flex items-center justify-between px-4">
                                                        <div>
                                                            <Image
                                                                className="h-8 w-auto"
                                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                                                alt="Your Company"
                                                                width={200}
                                                                height={200}
                                                            />
                                                        </div>
                                                        <div className="-mr-2">
                                                            <Popover.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                                <span className="absolute -inset-0.5" />
                                                                <span className="sr-only">
                                                                    Close menu
                                                                </span>
                                                                <XMarkIcon
                                                                    className="h-6 w-6"
                                                                    aria-hidden="true"
                                                                />
                                                            </Popover.Button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 space-y-1 px-2">
                                                        <a
                                                            href="#"
                                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                        >
                                                            Home
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                        >
                                                            Profile
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                        >
                                                            Resources
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                        >
                                                            Company Directory
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                        >
                                                            Openings
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="pb-2 pt-4">
                                                    <div className="flex items-center px-5">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                className="h-10 w-10 rounded-full"
                                                                src={
                                                                    user.imageUrl
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="ml-3 min-w-0 flex-1">
                                                            <div className="truncate text-base font-medium text-gray-800">
                                                                {user.name}
                                                            </div>
                                                            <div className="truncate text-sm font-medium text-gray-500">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        >
                                                            <span className="absolute -inset-1.5" />
                                                            <span className="sr-only">
                                                                View
                                                                notifications
                                                            </span>
                                                            <BellIcon
                                                                className="h-6 w-6"
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </div>
                                                    <div className="mt-3 space-y-1 px-2">
                                                        {userNavigation.map(
                                                            (item) => (
                                                                <p
                                                                onClick={() => {
                                                                    handleshowMenu(
                                                                        item.href
                                                                    );
                                                                }}
                                                                    key={
                                                                        item.name
                                                                    }
                                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                                >
                                                                    {item.name}
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition.Child>
                                </div>
                            </Transition.Root>
                        </>
                    )}
                </Popover>
                <main className="-mt-24 pb-8">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="sr-only">Page title</h1>
                        {/* Main 3 column grid */}
                        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                            {/* Left column */}

                            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                                <section aria-labelledby="section-1-title">
                                    <h2
                                        className="sr-only"
                                        id="section-1-title"
                                    >
                                        Section title
                                    </h2>
                                    <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                        <div className="p-6">
                                            {/* Your content */}

                                            <div className="mb-5">
                                                <h1>
                                                    {" "}
                                                    Ajoutez une contribution à
                                                    la communauté{" "}
                                                </h1>
                                            </div>

                                            <div className="mb-10">
                                                <Newpost />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/*  Ajout de la carte des posts pour le feed */}

                                {showFeed &&
                                    !showEvents &&
                                    !showMembers &&
                                    !showOneEvent && (
                                        <div>
                                            <section aria-labelledby="section-1-title">
                                                <h2
                                                    className="sr-only"
                                                    id="section-1-title"
                                                >
                                                    Header
                                                </h2>

                                                <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                                    <div className="p-6">
                                                        {/* Header de la carte des posts */}

                                                        <PostCardSimple />
                                                    </div>
                                                </div>
                                            </section>

                                            <section aria-labelledby="section-1-title">
                                                <h2
                                                    className="sr-only"
                                                    id="section-1-title"
                                                >
                                                    Contenu du post
                                                </h2>

                                                <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                                    <div className="p-6">
                                                        {/* Contenu du post pour test*/}

                                                        <PostCard />
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    )}

                                {/* Affichage de l'annuaire des membres */}

                                {!showFeed &&
                                    !showEvents &&
                                    showMembers &&
                                    !showOneEvent && (
                                        <div>
                                            <section aria-labelledby="section-1-title">
                                                <h2
                                                    className="sr-only"
                                                    id="section-1-title"
                                                >
                                                    Header
                                                </h2>

                                                <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                                    <div className="p-6">
                                                        {/* <ProfilesAll /> */}
                                                        {/* {eventDisplay || (
                                                          )} */}
                                                          <ProfilesAll />
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    )}

                                {/* Affichage de l'annuaire des événements */}

                                {!showFeed &&
                                    showEvents &&
                                    !showMembers &&
                                    !showOneEvent && (
                                        <div>
                                            <section aria-labelledby="section-1-title">
                                                <h2
                                                    className="sr-only"
                                                    id="section-1-title"
                                                >
                                                    Header
                                                </h2>

                                                <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                                    <div className="p-6">
                                                        <EventsAll
                                                            dashboardDisplayCreatedEvent={
                                                                dashboardDisplayCreatedEvent
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    )}

                                {/* Affichage d'un événement donné' */}

                                {!showFeed &&
                                    !showEvents &&
                                    !showMembers &&
                                    showOneEvent && (
                                        <div>
                                            <section aria-labelledby="section-1-title">
                                                <h2
                                                    className="sr-only"
                                                    id="section-1-title"
                                                >
                                                    Header
                                                </h2>

                                                <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                                    <div className="p-6">
                                                      {/* {eventDisplay} */}
                                                    <EventDisplay
                                                        evtUid={evtUid}
                                                        title={dataNewEvent.title}
                                                        longDescription={dataNewEvent.longDescription}
                                                        country={dataNewEvent.countries}
                                                        city={dataNewEvent.cities}
                                                        bannerPicture={dataNewEvent.bannerPicture}
                                                        />
                                                        );
                                                        {/* <div>Je suis un Seul Evénement</div> */}
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    )}
                            </div>

                            {/* Right column */}
                            <div className="grid grid-cols-1 gap-4">
                                <section aria-labelledby="section-2-title">
                                    <h2
                                        className="sr-only"
                                        id="section-2-title"
                                    >
                                        Annonces
                                    </h2>

                                    <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                        <div className="p-6">
                                            {/* Your content */}

                                            <AnnonceCard />
                                        </div>
                                    </div>
                                </section>

                                <section aria-labelledby="section-2-title">
                                    <h2
                                        className="sr-only"
                                        id="section-2-title"
                                    >
                                        Section title
                                    </h2>

                                    <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                        <div className="p-6">
                                            {/* Your content */}

                                            <UserCard />
                                        </div>
                                    </div>
                                </section>

                                <section aria-labelledby="section-2-title">
                                    <h2
                                        className="sr-only"
                                        id="section-2-title"
                                    >
                                        Section title
                                    </h2>

                                    <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                        <div className="p-6">
                                            {/* Your content */}

                                            <EventCard />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>


                    <Popover.Group>
                        <Popover className="fixed bottom-12 right-12">
                            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                <button
                                type="button"
                                className="rounded-full bg-indigo-600 p-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:animate-pulse"
                                >
                                    <PlusIcon className="h-8 w-8" aria-hidden="true" />
                                </button>
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
                </main>
                <footer>
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
                            <span className="block sm:inline">
                                &copy; 2021 Your Company, Inc.
                            </span>{" "}
                            <span className="block sm:inline">
                                All rights reserved.
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
