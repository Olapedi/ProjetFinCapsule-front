"use client";

import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import ProfilesAll from "../site/profilesall";
import UserCard from "../members/usercard";
import Newpost from "../members/newpost";
import EventCard from "../members/eventcard";
import AnnonceCard from "../members/annoncecard";
import PostCard from "../members/postcard";
import PostCardSimple from "../members/postcardsimple";


import { useState, useEffect, useRef } from 'react'



const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
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

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function FeedContainer() {
    // # Déclaration des états pour l'affichage des contenus

    const [showFeed, setShowfeed] = useState(true);
    const [showMembers, setShowmembers] = useState(false);
    const [showEvents, setShowevents] = useState(false);
    const [showOneEvent, setShowOneevent] = useState(false);
    let [dataNewEvent, setDataNewEvent] = useState<any>();
    // let [eventDisplay, setEventDisplay] = useState(null);
    let [evtUid, setEvtUid] = useState()

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


    return (
        <>
            <div className="min-h-full bg-gray-100">

                <main className="py-10">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="sr-only">Page title</h1>
                        {/* Main 3 column grid */}
                        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                            {/* Left column */}

                            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
 

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

                                                <div className="overflow-hidden rounded-lg bg-white shadow">
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

                                                <div className="overflow-hidden rounded-lg bg-white shadow">
                                                    <div className="p-6">
                                                        {/* Contenu du post pour test*/}

                                                        <PostCard />
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

                                    <div className="overflow-hidden rounded-lg bg-white shadow">
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

                                    <div className="overflow-hidden rounded-lg bg-white shadow">
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

                                    <div className="overflow-hidden rounded-lg bg-white shadow">
                                        <div className="p-6">
                                            {/* Your content */}

                                            <EventCard />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </main>
                <footer>
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
                            <span className="block sm:inline">
                                &copy; 2021 Neoney by @Kovalys Connect.
                            </span>{" "}
                            <span className="block sm:inline">
                                Tous droits réservés.
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
