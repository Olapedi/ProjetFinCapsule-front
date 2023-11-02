"use client";

import Image from "next/image";

import { useState, useId, useEffect, useRef } from "react";
import countries from "../../neoney_datas/countries.json";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";


export default function EventForm(props:any) {

    console.log("From eventform - appel composant => Le composant est bien appelé")


    //Date de maintenant
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    let formattedDate = `${year}-${month}-${day}`;

    const [title, setTitle] = useState("");
    const [preview, setPreview] = useState("");
    const [description, setDescription] = useState("");
    const [dateBegin, setDateBegin] = useState(formattedDate);
    const [dateEnd, setDateEnd] = useState("");
    const [country, setCountry] = useState({ value: "", label: "" });
    const [city, setCity] = useState({ value: "", label: "" });
    const [error, setError] = useState("");
    const [eventId, setEventId] = useState("");
    const [picture, setPicture] = useState<any>()
    const router = useRouter();

    const messageDateEnd = "Date de fin incompatible avec celle de début";
    const messageDateEndVisible = useRef(false);
    const userState = useAppSelector((state) => state.authReducer.value);

    useEffect(() => {
        console.log("eventId =>", eventId)
        if (eventId !== "") {
            router.push(`/meet/?search=${eventId}`);
            props.close()
            // console.log("From composant EventsForm - eventId =>", eventId)
            // props.displayCreatedEvent(eventId)
        } else if (error === "Token non valide") {
            // console.log(error)
            router.push(`/members`);
        } else {
            console.log("error dans le useEffect =>", error);
        }
    }, [router, eventId, error]);

    // Country selector
    let countriesoptions: any = [];
    let [citiesoptions, setCityoptions] = useState([]);

    function classNames(...classes: any) {
        let filteredClasses = classes.filter(Boolean).join(' ')
        // console.log("filteredClasses => ", filteredClasses)
        return filteredClasses
      }
      

    countries.map((item) => {
        countriesoptions.push({
            value: item.iso3,
            label: item.name,
        });
    });

    const handleCountryChange = async (countrySelected: any) => {
        setCountry(countrySelected);
        setCity({ value: "", label: "" });

        let cityArray: any = [];

        await countries.map((item) => {
            if (item.iso3 == countrySelected.value) {
                item.cities.map((item2) => {
                    cityArray.push({
                        value: item2,
                        label: item2,
                    });
                });
            }
        });

        setCityoptions(cityArray);
    };

    const handleCityChange = (citySelected: any) => {
        setCity(citySelected);
    };

    // Fonction englobant pour le setDateEnd afin de vérifier
    // que le date de fin n'est pas avant la date de début
    function checkAndSetDateEnd(value:String): any {
        let newDateEnd:any = value;
        // console.log("date End =>", value)
        let dE:any = new Date(newDateEnd);
        let dB:any = new Date(dateBegin);
        // console.log("dateEnd - dateBegin =>", dE-dB)
        if ((dE - dB) <= 0) {
            setDateEnd(newDateEnd);
            messageDateEndVisible.current = true;
            // console.log("messageDateEndVisible.current (true) =>", messageDateEndVisible.current)
        } else {
            setDateEnd(newDateEnd);
            messageDateEndVisible.current = false;
            // console.log("messageDateEndVisible.current (false) =>", messageDateEndVisible.current)
        }
    }
    const formData = new FormData()
    //handle Image selection

    async function handleImageSelect(e: any) {
        const selectedFile = await e.target.files[0];  
        if (selectedFile) {
              setPicture(selectedFile)
        }
    }

    //handle submit form

    const handleEvent = async () => {
        console.log("From eventform - handleEvent - dateEnd => ", dateEnd)

        if (
            title !== "" &&
            preview !== "" &&
            description !== "" &&
            dateBegin !== "" &&
            picture
        ) {
            formData.append('token', userState.token);
            formData.append('title', title);
            formData.append('shortDescription', preview);
            formData.append('longDescription', description);
            formData.append('startDate', dateBegin);
            formData.append('endDate', dateEnd);
            formData.append('country', country.value);
            formData.append('city', city.value);
            formData.append('picture', picture, picture.name)

            // const event = {
            //     token: "tT0nqgfZNInZV7bAcwFuF9-A7tTaIsln",
            //     title: title,
            //     shortDescription: preview,
            //     longDescription: description,
            //     startDate: dateBegin,
            //     endDate: dateEnd,
            //     country: country.value,
            //     city: city.value,
            // };

            console.log('formData : ',formData)
            const result = await fetch(
                `${process.env.backendserver}/events/new`,
                {
                    method: "POST",
                    // headers: {
                    //     "Content-Type": "application/json",
                    // },
                    // body: JSON.stringify(event),
                    body: formData,
                }
            );
            const datareceived = await result.json();
            console.log(datareceived)

            if (datareceived[0].result == true) {
                const eventCreate = datareceived[1];

                setEventId(eventCreate.evtUid);
            } else {
                setError(datareceived[0].message);
            }
        }
    };

    // console.log("messageDateEndVisible.current (onMount) =>", messageDateEndVisible.current)

    return (
        <div className="mx-auto max-w-2xl">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Événement
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Création événement
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label
                                htmlFor="title-event"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Titre
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="title-event"
                                    id="title-event"
                                    autoComplete="title-event"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="preview"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Aperçu
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="preview"
                                    name="preview"
                                    rows={2}
                                    maxLength={100}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={preview}
                                    onChange={(e) => setPreview(e.target.value)}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Écrivez une petite description sur votre
                                événement..
                            </p>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    maxLength={200}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Écrivez quelques phrases sur votre événement..
                            </p>
                        </div>

                        <div className="col-span-full">
                            <label
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Bannière
                            </label>
                            <div className="mt-2">
                                <input 
                                type="file"
                                onChange={handleImageSelect}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Écrivez quelques phrases sur votre événement..
                            </p>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="event-begin"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Début
                            </label>
                            <div className="mt-2">
                                <input
                                    // type="datetime-local"
                                    type="date"
                                    name="event-begin"
                                    id="event-begin"
                                    autoComplete="given-begin"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={dateBegin}
                                    onChange={(e) =>
                                        setDateBegin(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="event-end"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Fin
                            </label>
                            <div className="mt-2">
                                <input
                                    // type="datetime-local"
                                    type="date"
                                    name="event-end"
                                    id="event-end"
                                    autoComplete="given-end"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={dateEnd}
                                    // onChange={(e) => setDateEnd(e.target.value)}
                                    onChange={(e) => checkAndSetDateEnd(e.target.value)}
                                />
                                <p className={classNames(
                                    messageDateEndVisible.current ? 'bg-gray-100' : 'hidden', "mt-3 text-sm leading-6 text-gray-600")}>
                                    {messageDateEnd}
                                </p>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Pays
                            </label>

                            <div className="mt-2">
                                <Select
                                    options={countriesoptions}
                                    onChange={handleCountryChange}
                                    value={country}
                                    instanceId={useId()}
                                    className="block w-full mt-2 rounded-md py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Ville
                            </label>

                            <div className="mt-2">
                                <Select
                                    options={citiesoptions}
                                    onChange={handleCityChange}
                                    value={city}
                                    instanceId={useId()}
                                    className="block w-full mt-2 rounded-md py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                {/* <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                >
                    Annuler
                </button> */}
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={()=>handleEvent()}
                >
                    Enregistrer
                </button>
            </div>

            <p className="text-red-600 text-sm"> {error} </p>
        </div>
    );
}
