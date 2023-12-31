"use client";

import { Fragment } from "react";
import { Disclosure, Popover, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/20/solid";
import {
    Bars3Icon,
    BellIcon,
    XMarkIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Modal } from "antd";
import { useState, useEffect, useRef } from "react";
import EventForm from "../site/eventform";
import IframeComponent from "@/components/site/chat";

const add = [
    {
        name: "Événements",
        description: "Ajoutez des événements",
        href: "#",
        icon: CalendarDaysIcon,
    },
];

// Import du redux

import { useAppSelector } from "@/redux/store";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function GlobalNavbar() {
    // Récupération des états du Redux

    const auth = useAppSelector((state) => state.authReducer.value);
    const userState = useAppSelector((state) => state.authReducer.value);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    console.log(userState);

    // # Déclaration des états pour l'affichage des contenus

    let [dataNewEvent, setDataNewEvent] = useState<any>();
    let [evtUid, setEvtUid] = useState();
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
        console.log(
            "From composant MemberDashboard - dataNewEvent =>",
            dataNewEvent
        );
    }

    const handleCancelEvent = () => {
        setEventModalVisible(false);
    };

    const handelUserMenu = (href: any) => {
        console.log(userState);

        const userProUid = userState.proUid;

        switch (href) {
            case "1":
                dispatch(logOut());
                router.push("/");

                break;

            default:
                console.log(userProUid);

                router.push(`/people?search=${userProUid}`);
        }
    };

    const [chatModalVisible, setChatModalVisible] = useState(false);
    const [firstTime, setFirstTime] = useState(true);

    const handleCancelChatModal = () => {
        setChatModalVisible(false);
    };

    const handleChatModalVisibility = () => {
        setChatModalVisible(true);
        // setTimeout(() => setModalVisible(false), 1500);
        console.log("firstTime => ", firstTime);
        if (firstTime) {
            setFirstTime(false);
        }
    };

    return (
        <>
            {/* chatModal */}
            <Modal
                onCancel={() => handleCancelChatModal()}
                open={chatModalVisible}
                footer={null}
                centered={true}
                width={600}
                keyboard={true}
                // style={{backgroundColor: "Yellow "}}
            >
                <div className="flex justify-center mt-10">
                    <IframeComponent nickname={userState.displayName} />
                    {/* <IframeComponent nickname="John" /> */}
                </div>
            </Modal>

            {userState.token !== "" && (
                <main>
                    <Disclosure as="nav" className="bg-indigo-600 shadow">
                        {({ open }) => (
                            <>
                                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                                    <div className="flex h-16 justify-between">
                                        <div className="flex px-2 lg:px-0">
                                            <div className="flex flex-shrink-0 items-center">
                                                <Image
                                                    className="h-8 w-auto"
                                                    src="/neoneyW.png"
                                                    alt="Your Company"
                                                    width={200}
                                                    height={200}
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
                                                    href="/meet/all"
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
                                            <button onClick={handleChatModalVisibility}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    color="white"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                                    />
                                                </svg>
                                            </button>

                                            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
                                            </Disclosure.Button>
                                        </div>

                                        <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                        <button onClick={handleChatModalVisibility}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    color="white"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                                    />
                                                </svg>
                                            </button>


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
                    
                                            <Menu
                                                as="div"
                                                className="relative ml-4 flex-shrink-0"
                                            >
                                                <div>
                                                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">
                                                            Ouvrir le menu
                                                        </span>
                                                        <Image
                                                            className="h-8 w-8 rounded-full object-cover "
                                                            src={
                                                                auth.proPicture
                                                                    ? auth.proPicture
                                                                    : "/Generic_Image_Missing-Profile.jpg"
                                                            }
                                                            alt="Image de profil"
                                                            width={200}
                                                            height={200}
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
                                                                    onClick={() =>
                                                                        handelUserMenu(
                                                                            "0"
                                                                        )
                                                                    }
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-gray-100"
                                                                            : "",
                                                                        "w-full text-left block px-4 py-2 text-sm text-gray-700"
                                                                    )}
                                                                >
                                                                    Mon Profil
                                                                </button>
                                                            )}
                                                        </Menu.Item>

                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={() =>
                                                                        handelUserMenu(
                                                                            "1"
                                                                        )
                                                                    }
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-gray-100"
                                                                            : "",
                                                                        "w-full text-left block px-4 py-2 text-sm text-gray-700"
                                                                    )}
                                                                >
                                                                    Se
                                                                    déconnecter
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
                                            href="/feed?search=all"
                                            className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-gray-600"
                                        >
                                            Feed
                                        </Disclosure.Button>
                                        <Disclosure.Button
                                            as="a"
                                            href="/people?search=all"
                                            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-100 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600"
                                        >
                                            Membres
                                        </Disclosure.Button>
                                        <Disclosure.Button
                                            as="a"
                                            href="/meet?search=all"
                                            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-100 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600"
                                        >
                                            Rencontres
                                        </Disclosure.Button>
                                    </div>
                                    <div className="border-t border-gray-200 pb-3 pt-4">
                                        <div className="flex items-center px-4">
                                            <div className="flex-shrink-0 aspect-w-1 aspect-h-1">
                                                <Image
                                                    className="h-10 w-10 rounded-full"
                                                    src={
                                                        auth.proPicture
                                                            ? auth.proPicture
                                                            : "/Generic_Image_Missing-Profile.jpg"
                                                    }
                                                    alt="Image de profil"
                                                    width={200}
                                                    height={200}
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-base font-medium text-gray-300">
                                                    {auth.displayName}
                                                </div>
                                                <div className="text-sm font-medium text-gray-200">
                                                    {auth.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 space-y-1">
                                            <Disclosure.Button
                                                onClick={() =>
                                                    handelUserMenu("0")
                                                }
                                                className="block border-l-4 border-transparent w-full text-left px-4 py-2 text-base font-medium text-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-800"
                                            >
                                                Mon Profil
                                            </Disclosure.Button>
                                            <Disclosure.Button
                                                onClick={() =>
                                                    handelUserMenu("1")
                                                }
                                                className="block w-full border-l-4 border-transparent text-left px-4 py-2 text-base font-medium text-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-800"
                                            >
                                                Se déconnecter
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>

                    {/* Ajout de la modale en dessous de la page*/}

                    {userState.isActivated && (
                        <main>
                            <Popover.Group>
                                <Popover className="fixed bottom-12 right-12">
                                    <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                        <p className="rounded-full bg-indigo-600 p-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:animate-pulse">
                                            <PlusIcon
                                                className="h-8 w-8"
                                                aria-hidden="true"
                                            />
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
                                        <Popover.Panel className="absolute right-1 bottom-full z-10 mb-3 w-screen sm:max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                            <div className="p-4">
                                                {add.map((item) => (
                                                    <div
                                                        key={item.name}
                                                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                                        onClick={() =>
                                                            setEventModalVisible(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <div className="flex-auto text-right">
                                                            <Link
                                                                href={item.href}
                                                                className="block font-semibold text-gray-900"
                                                            >
                                                                {item.name}
                                                                <span className="absolute inset-0">
                                                                    {" "}
                                                                </span>
                                                            </Link>

                                                            <p className="mt-1 text-gray-600">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                            <item.icon
                                                                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                                                aria-hidden="true"
                                                            />
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
                                <EventForm close={handleCancelEvent} />
                            </Modal>
                        </main>
                    )}
                </main>
            )}
        </>
    );
}
