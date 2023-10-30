"use client";

import Image from "next/image";
import { Modal } from "antd";
import EventForm from "./eventform";

import { useState, useEffect } from 'react';

  
export default function EventsAll() {

    const [events, setEvents] = useState<any[]>([]);
    const [eventFormModalVisible, setEventFormModalVisible] = useState(false)

    // useEffect(() => {
    //     fetch(`${process.env.backendserver}/events`)
    //         .then(response => response.json())
    //         .then(data => {
    //             data.shift()
    //             const bannerPicture = data.bannerPicture
    //             data = data.map((e : any) => e.occurences)
    //             console.log('data : ',data)
    //             let ndata: Array<any> = []

    //             for(const tab of data) {
    //                 ndata.push(...tab, bannerPicture)
    //                 ndata.push(bannerPicture)
    //             }
    //             console.log(ndata)
    //             setEvents(ndata)
    //         })
    //     }, [])

    useEffect(() => {
        fetch(`${process.env.backendserver}/events`)
            .then(response => response.json())
            .then(data => {
                data.shift()
                setEvents(data)
            })
        }, [])
        console.log('events', events)
    return (
        
        <div className="bg-white py-24 sm:py-32">
        
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Événements</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Développer votre entreprenariat grâce aux rencontres.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">

                    {events.map((event : any) => (
                        <a href="http://localhost:3000/members/events?eventid=evt2023102530533" key={event.evtUid} className='hover:scale-105 transition duration-500'>
                            <article className="flex flex-col items-start justify-between">
                            <div className="relative w-full">

                                <Image className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                    // src={'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                                    src={event.bannerPicture}
                                    width={500} height={500} 
                                    alt='Image de l évenement' />


                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>

                            <div className="max-w-xl">
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                    <time dateTime={event.occurences[0].startDate} className="text-gray-500">
                                        {event.occurences[0].startDate}
                                    </time>
                                    <a
                                        href="#"
                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                    >
                                    {event.occurences[0].title}
                                    </a>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a href="#">
                                        <span className="absolute inset-0" />
                                            {event.occurences[0].title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{event.occurences[0].shortDescription}</p>
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
                        </a>
                    ))}

                </div>

            </div>

            {/* Affichage d'un événement */}

        </div>

    );
}
