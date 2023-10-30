"use client";


import Image from "next/image";
import EventDisplay from "@/components/site/eventdisplay";
import SiteNavbar from "@/components/site/sitenavbar";
import SiteFooter from "@/components/site/sitefooter";
import { useSearchParams } from "next/navigation";
import {useEffect, useState} from 'react'

export default function EventView() {
    let [data, setData] = useState([])
    const searchParams = useSearchParams();

    const eventid = searchParams.get("eventid");

    useEffect(() => {
        let full_url = `https://neoneydev1-backend.vercel.app/events/${eventid}`
        fetch(full_url).then(resp => resp.json()).then(reqData => {
            console.log(reqData)
            setData(reqData[1])}
        )}, [])

    return (
        <main>
            <div>
                <SiteNavbar />
            </div>

            <div>
                {/* {`le numéro de l'événement est ${eventid}\n`}
                {JSON.stringify(data, null, 2)} */}
                <EventDisplay evtUid={eventid} title={data.title} longDescription={data.longDescription} country={data.countries} city={data.cities} bannerPicture={data.bannerPicture} />
            </div>

            <div>
                <SiteFooter />
            </div>
        </main>
    );
}
