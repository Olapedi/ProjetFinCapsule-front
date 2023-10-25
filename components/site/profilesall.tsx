"use client";

import ProfileCard from "./profilecard";
import { useState, useEffect } from "react";

export default function ProfilesAll() {
    // Etat pour contenir les profils
    let [profiles, setProfiles] = useState<string[]>([]);

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
            }
        }
        let mainPicture: String =
            "https://ieminc.org/wp-content/uploads/2016/11/Generic_Image_Missing-Profile.jpg";
        if (i < 4) {
            mainPicture = people[i].imageUrl;
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
                mainPicture={mainPicture} // dans l'attente d'avoir les vraies photos
            />
        );
    });

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Les membres Neoney
                    </h2>
                </div>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Retrouvez les entrepreneurs avec lesquels vous connecter
                </p>
                <div>
                    <ul
                        role="list"
                        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                    >
                        {profilesJSX}
                    </ul>
                </div>
            </div>
        </div>
    );
}
