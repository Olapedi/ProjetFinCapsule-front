'use client'

import { useState } from "react";

import Image from 'next/image'

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { count } from "console";

export default function EventForm() {
    

    //Date de maintenant
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;


    const [title, setTitle] = useState('');
    const [preview, setPreview] = useState('');
    const [description, setDescription] = useState('');
    const [dateBegin, setDateBegin] = useState(formattedDate);
    const [dateEnd, setDateEnd] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    console.log(country)

    


    return (
        <form className="mx-auto max-w-2xl">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Événement</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Création événement
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="title-event" className="block text-sm font-medium leading-6 text-gray-900">
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
                            <label htmlFor="preview" className="block text-sm font-medium leading-6 text-gray-900">
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
                            <p className="mt-3 text-sm leading-6 text-gray-600">Écrivez une petite description sur votre événement..</p>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
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
                                onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Écrivez quelques phrases sur votre événement..</p>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="event-begin" className="block text-sm font-medium leading-6 text-gray-900">
                                Début
                            </label>
                            <div className="mt-2">
                                <input
                                type="datetime-local"
                                name="event-begin"
                                id="event-begin"
                                autoComplete="given-begin"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={dateBegin}
                                onChange={(e) => setDateBegin(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="event-end" className="block text-sm font-medium leading-6 text-gray-900">
                                Fin
                            </label>
                            <div className="mt-2">
                                <input
                                type="datetime-local"
                                name="event-end"
                                id="event-end"
                                autoComplete="given-end"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={dateEnd}
                                onChange={(e) => setDateEnd(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="country-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Ville
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="country-name"
                                id="country-name"
                                autoComplete="given-country"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="country-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Pays
                            </label>
                            <div className="mt-2">
                                <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                >
                                    <option>France</option>
                                    <option>États-Unis</option>
                                    <option>Canada</option>
                                    <option>Mexique</option>
                                </select>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Annuler
                </button>
                <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Enregistrer
                </button>
            </div>
        </form>
    )
}