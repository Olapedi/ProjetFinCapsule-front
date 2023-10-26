"use client";

import { useState } from "react";
import { Modal } from "antd";
import Boost from "./boost";
import { useAppSelector } from '@/redux/store'



import Image from "next/image";
import Link from "next/link";

type propsStyle = {
    key: any;
    displayName: String;
    description: String;
    email: String;
    organization: String;
    phone: String;
    title: String;
    website: String;
    mainPicture: any;
    twitterUrl: any;
    linkedinUrl: any;
    proUid: any;
};

export default function ProfileCard(props: propsStyle) {
    let [nbBoost, setNbBoost] = useState(150);
    const [boostModalVisible, setBoostModalVisible] = useState(false);
    const currentUserId = useAppSelector(state => state.authReducer.value.usrUid)


    const showBoostModal = () => {
        setBoostModalVisible(true);
    };

    const handleCancelBoost = () => {
        setBoostModalVisible(false);
    };

    // Relier le handleBoost avec la gestion des boosts
    function handleBoost() {
        showBoostModal();
    }

    function confirmOk(boostInDB:Boolean) {
        if (boostInDB) {
            setNbBoost(nbBoost+1)
        }
    }


    return (
        <li key={props.key}>
            <Modal
                onCancel={() => handleCancelBoost()}
                open={boostModalVisible}
                footer={null}
            >
                <Boost name={props.displayName} profileOwner={currentUserId} sender={currentUserId} receiver={props.proUid} confirmOk={confirmOk}/>
            </Modal>
            
            <Image className="w-full rounded-2xl object-fill" 
                    // className="aspect-[3/2] w-full rounded-2xl object-cover"
                     src={props.mainPicture} width={1000} height={1000} alt="Profile's Image"/>

            <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                {props.displayName}
            </h3>
            <p className="text-base leading-7 text-gray-600">{props.title}</p>
            <div className="flex justify-between border-black items-end">
                <div>
                    <ul role="list" className="mt-6 flex gap-x-6">
                        <li>
                            <a
                                href={props.twitterUrl}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Twitter</span>
                                <svg
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                href={props.linkedinUrl}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <svg
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex w-100 space-x-3 mr-3 items-center">
                    <div className="flex">
                        <div
                            className="hover:bg-gray-200 p-1 space-x-2 rounded-lg cursor-pointer"
                            onClick={handleBoost}
                        >
                            <svg
                                // className="cursor-auto"
                                fill="#382efa"
                                // width="28px"
                                // height="28px"
                                className="h-8 w-8"
                                viewBox="-3.2 -3.2 38.40 38.40"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#382efa"
                                strokeWidth="0.10032"
                            >
                                {/* <g id="SVGRepo_bgCarrier" stroke-width="0"></g> */}
                                {/* <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke="#CCCCCC"
                                    stroke-width="0.128"
                                ></g> */}
                                <g>
                                    <path d="M6.553 27.602c-0.628 1.306-1.025 2.177-4.522 2.304 0.1-3.374 0.744-3.736 2.031-4.378 0.54-0.27 1.213-0.605 1.941-1.164l-1.218-1.555c-0.575 0.442-1.104 0.674-1.615 0.928-2.145 1.070-3.156 2.123-3.156 7.145l0.017 1.022 0.983-0.022c5.301 0 6.292-1.198 7.285-3.26 0.217-0.452 0.338-0.758 0.705-1.367l-1.483-1.347c-0.444 0.607-0.722 1.183-0.968 1.692zM22.030 5.896c-2.212 0-4.011 1.799-4.011 4.010s1.8 4.011 4.011 4.011 4.011-1.8 4.011-4.011c0-2.211-1.8-4.011-4.011-4.011zM22.030 11.909c-1.104 0-2.003-0.899-2.003-2.002s0.898-2.002 2.003-2.002 2.003 0.899 2.003 2.002c-0 1.104-0.898 2.002-2.003 2.002zM31.993 0.916c-0.030-0.499-0.426-0.899-0.925-0.936 0 0-5.596-0.408-10.98 1.603-1.967 0.735-3.586 1.898-5.097 3.661-1.26 1.47-2.512 4.126-3.617 6.332-0.427 0.851-0.835 1.666-1.181 2.288h-5.563c-0.286 0-0.558 0.123-0.748 0.336l-3.666 3.973c-0.234 0.265-0.312 0.633-0.204 0.969s0.385 0.592 0.729 0.67l5.967 1.364c0.407 0.502 1.084 1.253 2.168 2.456l2.261 2.506 1.217 5.148c0.080 0.339 0.331 0.613 0.663 0.72 0.101 0.032 0.206 0.049 0.309 0.049 0.236 0 0.467-0.083 0.651-0.241l3.705-3.686c0.221-0.189 0.349-0.467 0.349-0.759v-5.16c0.498-0.309 1.381-0.786 2.212-1.251 2.264-1.265 5.645-2.841 7.046-4.087 1.974-1.754 2.692-3.040 3.398-4.941 1.678-4.521 1.322-10.751 1.305-11.014zM28.813 11.233c-0.616 1.659-1.174 2.651-2.852 4.142-1.239 1.101-4.629 2.682-6.694 3.837-1.541 0.861-2.464 1.364-2.869 1.695-0.233 0.189-0.368 0.474-0.368 0.774v5.227l-2.11 2.319-0.899-3.8c-0.039-0.163-0.118-0.314-0.231-0.439-1.839-2.038-4.617-5.119-4.83-5.364-0.139-0.169-0.332-0.289-0.549-0.339l-4.581-1.048 2.247-2.375h5.689c0.348 0 0.671-0.181 0.852-0.476 0.44-0.716 0.95-1.736 1.542-2.915 1.002-1.998 2.248-4.642 3.348-5.926 1.3-1.516 2.619-2.469 4.278-3.089 3.691-1.379 7.499-1.524 9.24-1.511 0.032 1.844-0.037 6.119-1.214 9.289z"></path>{" "}
                                </g>
                            </svg>
                        </div>
                        <div className="flex items-center">
                            <div className="text-blue-800">+</div>
                            <div className="text-blue-800">{nbBoost}</div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="mr-5 h-8 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        // className="mr-5 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        consulter
                    </button>
                </div>
            </div>
        </li>
    );
}
