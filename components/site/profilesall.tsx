"use client";

import ProfileCard from "./profilecard";
import { useState, useEffect } from "react";

export default function ProfilesAll() {
    // Etat pour contenir les profils
    let [profiles, setProfiles] = useState<string[]>([]);
    let [messageVisible, setMessageVisible] = useState<Boolean>(false);
    let [search, setSearch] = useState<String>("");
    const message = "Aucun profil trouvé pour cette recherche";

    // Récupération des données au mount du composant
    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(`${process.env.backendserver}/profiles`);
            let data = await resp.json();
            data = data.splice(1);
            setProfiles(data);
        }
        fetchData();
    }, []);

    // Fonction gérant la recherche (onClick)
    async function handleClick() {
        if (search) {
            const resp = await fetch(
                `${process.env.backendserver}/profiles/displayname/${search}`
            );
            let data = await resp.json();
            if (!data[0].result) {
                setMessageVisible(true);
                setProfiles([]);
            } else {
                data = data[1];
                console.log(data);
                setProfiles(data);
            }
            setSearch("");
        } else {
            const resp = await fetch(`${process.env.backendserver}/profiles`);
            let data = await resp.json();
            data = data.splice(1);
            setProfiles(data);
        }
    }

    // Tableau de test - uniquement conservé pour l'instant pour récupérer les adresses des photos
    const people = [
        {
            name: "Kodzo",
            role: "Full-Stack Developer",
            imageUrl:
                // 'Generic_Image_Missing-Profile.jpg',
                "https://static.lacapsule.academy/avatar/64e5dae107f71b001adb6c77.jpg",
            // 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=600',
            // 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            twitterUrl: "#",
            linkedinUrl: "#",
        },
        {
            name: "Loïc",
            role: "Full-Stack Developer",
            imageUrl:
                "https://static.lacapsule.academy/avatar/64e5daa307f71b001adb6b8c.jpg",
            //   'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            twitterUrl: "#",
            linkedinUrl: "#",
        },
        {
            name: "Rubbben",
            role: "Full-Stack Developer",
            imageUrl:
                "https://static.lacapsule.academy/avatar/64e5dab807f71b001adb6bec.jpg",
            //   'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            twitterUrl: "#",
            linkedinUrl: "#",
        },
        {
            name: "Lindsay Walton",
            role: "Full-Stack Developer",
            imageUrl:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            twitterUrl: "#",
            linkedinUrl: "#",
        },

        // More people...
    ];

    // Map des datas récupérées du back pour les transformer en balises JSX
    let profilesJSX = profiles.map((prof: any, i) => {
        let mainCard: any = "";
        for (let card of prof.cards) {
            if (card.isMain) {
                mainCard = card;
                mainCard.proUid = prof.proUid;

                // gestion des images... - dans l'attente d'avoir les vraies photos
                if (prof.mainPicture) {
                    mainCard.mainPicture = prof.mainPicture;
                } else if (i < 4) {
                    mainCard.mainPicture = people[i].imageUrl;
                } else {
                    mainCard.mainPicture =
                        "https://ieminc.org/wp-content/uploads/2016/11/Generic_Image_Missing-Profile.jpg";
                }
            }
        }

        return (
            <ProfileCard
                key={i}
                displayName={mainCard.displayName}
                description={mainCard.description}
                email={mainCard.email}
                organization={mainCard.organization}
                phone={mainCard.phone}
                title={mainCard.title}
                website={mainCard.website}
                twitterUrl="#"
                linkedinUrl="#"
                // mainPicture="Generic_Image_Missing-Profile.jpg"
                mainPicture={mainCard.mainPicture}
                proUid={mainCard.proUid}
            />
        );
    });

    return (
        // <div className="bg-white py-24 sm:py-32">
        <div className="bg-white py-6">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Les membres Neoney
                    </h2>
                </div>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Retrouvez les entrepreneurs avec lesquels vous connecter
                </p>
                <div className="flex items-center">
                    <input
                        type="text"
                        className="w-10/12 rounded-2xl mt-5"
                        placeholder="rechercher un membre"
                        onChange={(e) => {
                            setMessageVisible(false);
                            setSearch(e.target.value);
                        }}
                        onKeyUp={(e) => e.key === "Enter" && handleClick()}
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        className="ml-10 mt-5 h-10 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        // className="mr-5 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Rechercher
                    </button>
                </div>
                <div className="h-12">
                    {/* {search} */}
                    {messageVisible && (
                        <div className="mt-3 text-red-500">{message}</div>
                    )}
                </div>
                <div>
                    <ul
                        role="list"
                        className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
                    >
                        {profilesJSX}
                    </ul>
                </div>
            </div>
        </div>
    );
}
