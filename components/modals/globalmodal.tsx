"use client";

import Link from 'next/link'
import { Modal } from "antd";
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, PlusIcon} from "@heroicons/react/20/solid";

import { useState, useEffect, useRef } from 'react'
import EventForm from '../site/eventform'
import { useAppSelector } from '@/redux/store'

import { logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const add = [
    { name: 'Événements', description: 'Ajoutez des événements', href: '#', icon: CalendarDaysIcon },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function GlobalModal() {

    const auth = useAppSelector((state) => state.authReducer.value)

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

    }


    const handleCancelEvent = () => {
        setEventModalVisible(false);
    };

    return (


            <main>


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

    )

}