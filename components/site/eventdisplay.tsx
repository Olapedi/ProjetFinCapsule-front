"use client";

import Image from "next/image";
import { Modal } from "antd";

import { useState, useId } from "react";
import countries from "../../neoney_datas/countries.json";
import Select from "react-select";

import { UserGroupIcon } from "@heroicons/react/24/outline";
import { count } from "console";

export default function EventDisplay(props: any) {
    const [modalVisible, setModalVisible] = useState(false);

    const statsPaysVille = [
        { label: "Pays", value: props.country },
        { label: "Ville", value: props.city },
    ];
    const statsDateDebutFin = [
        { label: "Début", value: "26 Oct 2023" },
        { label: "Fin", value: "01 Nov 2023" },
    ];
    const statsHeureDebutFin = [
        { label: "", value: "10:30" },
        { label: "", value: "19:00" },
    ];

    const handleCancelModal = () => {
        setModalVisible(false);
    };

    const handleParticipate = () => {
        setModalVisible(true)
        setTimeout(() => setModalVisible(false), 1500);

    }

    let img= props.bannerPicture? props.bannerPicture : "https://images.unsplash.com/photo-1697809462690-57bc1601f665?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    return (
        <>
            <Modal
                onCancel={() => handleCancelModal()}
                open={modalVisible}
                footer={null}
                centered = {true}
            >
                <p>Votre inscription a bien été prise en compte</p>
            </Modal>

            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-4">
                            <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-96 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                                <Image
                                    className="absolute inset-0 h-full w-full object-cover hover:scale-105 transition duration-500"
                                    src={
                                        "https://images.unsplash.com/photo-1697809462690-57bc1601f665?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    }
                                    width={500}
                                    height={500}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div>
                            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-indigo-600">
                                    Event ref : {props.evtUid}
                                </p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    {props.title}
                                </h1>
                                <div className="max-w-xl">
                                    <p className="mt-6">
                                        {props.longDescription}
                                    </p>
                                </div>
                            </div>
                            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-2">
                                {statsPaysVille.map((stat, statIdx) => (
                                    <div key={statIdx}>
                                        <dt className="text-sm font-semibold leading-6 text-gray-600">
                                            {stat.label}
                                        </dt>
                                        <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                                            {stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-2">
                                {statsDateDebutFin.map((stat, statIdx) => (
                                    <div key={statIdx}>
                                        <dt className="text-sm font-semibold leading-6 text-gray-600">
                                            {stat.label}
                                        </dt>
                                        <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                                            {stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            <dl className="grid grid-cols-2 gap-8 sm:grid-cols-2">
                                {statsHeureDebutFin.map((stat, statIdx) => (
                                    <div key={statIdx}>
                                        <dt className="text-sm font-semibold leading-6 text-gray-600">
                                            {stat.label}
                                        </dt>
                                        <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                                            {stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>

                            <button
                                type="button"
                                className="mt-10 flex items-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleParticipate}
                                >
                                <UserGroupIcon className="h-6 w-6 mr-2" />{" "}
                                Participer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
