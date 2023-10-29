"use client";

import Image from "next/image";
import { Modal } from "antd";
import EventForm from "./eventform";

import { useState, useEffect } from 'react';

<<<<<<< HEAD
export default function EventsAll(props:any) {
=======
  
export default function EventsAll() {

>>>>>>> 63a1c186ae19b90c8eae7f5dda67c079648ca7f4
    const [events, setEvents] = useState<any[]>([]);
    const [eventFormModalVisible, setEventFormModalVisible] = useState(false)

    useEffect(() => {
        fetch(`${process.env.backendserver}/events`)
<<<<<<< HEAD
            .then((response) => response.json())
            .then((data) => {
                data.shift();
                data = data.map((e: any) => e.occurences);
                let ndata: Array<any> = [];
                for (const tab of data) {
                    ndata.push(...tab);
                }

                setEvents(ndata);
            });
    }, []);

    function handleEventFormClick() {
        setEventFormModalVisible(true)
    }

    function handleCancelEvent() {
        setEventFormModalVisible(false)
    }

    function displayCreatedEvent(evtUid:any) {
        console.log("From composant EventsAll - evtUid=>", evtUid)
        props.dashboardDisplayCreatedEvent(evtUid)
    }

=======
            .then(response => response.json())
            .then(data => {
                data.shift()
                data = data.map((e : any) => e.occurences)

                let ndata: Array<any> = []

                for(const tab of data) {
                    ndata.push(...tab)
                }
                
                setEvents(ndata)
            })
        }, [])
        
        
>>>>>>> 63a1c186ae19b90c8eae7f5dda67c079648ca7f4
    return (
        
        <div className="bg-white py-24 sm:py-32">
        
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Événements</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Développer votre entreprenariat grâce aux rencontres.
                    </p>
<<<<<<< HEAD
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="w-10/12 rounded-2xl mt-5"
                            placeholder="rechercher un événement"
                            // onChange={(e) => {
                            //     setMessageVisible(false);
                            //     setSearch(e.target.value);
                            // }}
                            // onKeyUp={(e) => e.key === "Enter" && handleClick()}
                        />
                        <button
                            type="button"
                            // onClick={handleClick}
                            className="ml-10 mt-5 h-10 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            // className="mr-5 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Rechercher
                        </button>
                    </div>
=======
>>>>>>> 63a1c186ae19b90c8eae7f5dda67c079648ca7f4
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
<<<<<<< HEAD
                    {events.map((event: any, i) => (
                        <div
                            // href="http://localhost:3000/members/events?eventid=evt2023102530533"
                            href={`http://localhost:3000/members/events?eventid=${event.evtUid}`}
                            // key={event.uid}
                            // key={event.evtUid}
                            key={i}
                            className="hover:scale-105 transition duration-500"
                        >
=======

                    {events.map((event : any) => (
                        
                        <a href="http://localhost:3000/members/events?eventid=evt2023102530533" key={event.uid} className='hover:scale-105 transition duration-500'>
>>>>>>> 63a1c186ae19b90c8eae7f5dda67c079648ca7f4
                            <article className="flex flex-col items-start justify-between">
                            <div className="relative w-full">

                                <Image className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                        src={"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"}
                                        width={500} height={500} 
                                        alt='' />


                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>

                            <div className="max-w-xl">
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                <time dateTime={event.startDate} className="text-gray-500">
                                    {event.startDate}
                                </time>
                                <a
                                    href="#"
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    {event.title}
                                </a>
                                </div>
                                <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <a href="#">
                                    <span className="absolute inset-0" />
                                        {event.title}
                                    </a>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{event.shortDescription}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">

                                <Image className="h-10 w-10 rounded-full bg-gray-100"
                                        src={'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                                        width={100} height={100} alt='' />
                                        
                            
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900">
                                    <a href='#'>
                                        <span className="absolute inset-0" />
                                        Michael Foster
                                    </a>
                                    </p>
                                    <p className="text-gray-600">Co-Founder / CTO</p>
                                </div>
                                </div>
                            </div>
                            </article>
                        </div>
                    ))}

                </div>

            </div>

            {/* Affichage d'un événement */}

            </div>
            
    );
}
