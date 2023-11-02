"use client";

import Image from "next/image";
import { Modal } from "antd";

import { useState, useId } from "react";
import countries from "../../neoney_datas/countries.json";
import Select from "react-select";

import { UserGroupIcon } from "@heroicons/react/24/outline";
import { count } from "console";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EventForm from "./eventform";
import EventFormModify from "./eventformmodify";
import { useAppSelector } from "@/redux/store";

export default function EventDisplay(props: any) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeletedVisible, setModalDeletedVisible] = useState(false);
    const [modalModifyVisible, setModalModifyVisible] = useState<any>(false);
    const router = useRouter();

    const userState = useAppSelector((state) => state.authReducer.value);

    console.log("eventdisplay - props => ", props);

    const statsPaysVille = [
        { label: "Pays", value: props.country },
        { label: "Ville", value: props.city },
    ];
    const statsDateDebutFin = [
        { label: "Début", value: props.startDate },
        { label: "Fin", value: props.endDate },
    ];
    const statsHeureDebutFin = [
        { label: "", value: "" },
        { label: "", value: "" },
    ];

    const handleCancelModal = () => {
        setModalVisible(false);
    };

    const handleCancelModifyModal = () => {
        setModalModifyVisible(false);
    };

    const handleParticipate = () => {
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 1500);
    };

    const handleDelete = async () => {
        const result = await fetch(
            `${process.env.backendserver}/events/${props.evtUid}`,
            {
                method: "DELETE",
                // body: JSON.stringify({evtUid: props.evtUid}),
            }
        );
        const datareceived = await result.json();
        console.log("eventdisplay - handleDelete - datareceived => ", datareceived);

        // let message = datareceived[0]
        // let message = {result: true}
        if (datareceived[1].acknowledged === true) {
            setModalDeletedVisible(true);
            setTimeout(() => {
                setModalDeletedVisible(false);
                // router.push('/meet')
                router.push("/meet?search=all");
                // router.push('/')
            }, 1500);
        }
    };

    let img = props.bannerPicture
        ? props.bannerPicture
        : "https://images.unsplash.com/photo-1697809462690-57bc1601f665?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    // Initialisation des boutons
    let buttons = <button></button>;
    console.log("From eventdisplay - userState.usrUid => ", userState.usrUid)
    console.log("From eventdisplay - props.owner => ", props.owner)

    // Apparition conditionnelle des boutons
    if (userState.usrUid === props.usrUid) {
        buttons = (
            <>
                <button
                    type="button"
                    className="mt-10 flex items-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setModalModifyVisible(true)}
                >
                    Modifier
                </button>
                <button
                    type="button"
                    className="mt-10 flex items-center rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleDelete}
                >
                    {/* <UserGroupIcon className="h-6 w-6 mr-2" />{" "} */}X -
                    Supprimer
                </button>
            </>
        );
    } else {
        buttons = (
            <button
                type="button"
                className="mt-10 flex items-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleParticipate}
            >
                <UserGroupIcon className="h-6 w-6 mr-2" /> Participer
            </button>
        );
    }

    return (
        <>
            <Modal
                onCancel={() => handleCancelModal()}
                open={modalVisible}
                footer={null}
                centered={true}
            >
                <p>Votre inscription a bien été prise en compte</p>
            </Modal>

            <Modal
                onCancel={() => handleCancelModal()}
                open={modalDeletedVisible}
                footer={null}
                centered={true}
            >
                <p>Evénement supprimé</p>
            </Modal>

            <Modal
                onCancel={() => handleCancelModifyModal()}
                open={modalModifyVisible}
                footer={null}
                centered={true}
            >
                <EventFormModify
                    title={props.title}
                    shortDescritpion={props.shortDescription}
                    longDescription={props.longDescription}
                    startDate={props.startDate}
                    endDate={props.endDate}
                    country={props.country}
                    city={props.city}
                    evtUid={props.evtUid}
                    bannerPicture={props.bannerPicture}
                    close={handleCancelModifyModal}
                />
            </Modal>

            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-4">
                            <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-96 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                                <Image
                                    className="absolute inset-0 h-full w-full object-fill bg-white hover:scale-105 transition duration-500"
                                    src={props.bannerPicture}
                                    width={500}
                                    height={500}
                                    alt="Image de l'évenement"
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
                            <div className="flex w-30 justify-between">
                                {buttons}
                                {/* Bouton si on n'est pas le créateur de l'événement (proUid) - participer*/}
                                {/* <button
                                    type="button"
                                    className="mt-10 flex items-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleParticipate}
                                >
                                    <UserGroupIcon className="h-6 w-6 mr-2" />{" "}
                                    Participer
                                </button> */}

                                {/* Bouton si on est le créateur de l'événement (proUid) - modifier, supprimer */}
                                {/* <button
                                    type="button"
                                    className="mt-10 flex items-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => setModalModifyVisible(true)}
                                >
                                    Modifier
                                </button>
                                <button
                                    type="button"
                                    className="mt-10 flex items-center rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleDelete}
                                >
                                    X - Supprimer
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
