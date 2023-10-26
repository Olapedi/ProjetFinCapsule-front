import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import { login } from '../reducers/user';
// import Image from 'next/image';
// import styles from '../styles/SignUp.module.css';

function Boost(props : any) {
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.value);

    // // Redirect to /home if logged in
    // const router = useRouter();
    // if (user.token) {
    //   router.push('/home');
    // }

    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [boostDescription, setBoostDescription] = useState('');

    // const handleSubmit = () => {
    //   fetch('http://localhost:3000/users/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ firstName, username, password }),
    //   }).then(response => response.json())
    //     .then(data => {
    //       data.result && dispatch(login({ token: data.token, username, firstName }));
    //     });
    // };

    return (
        <div className="flex flex-col space-y-3">
            {/* <Image src="/logo.png" alt="Logo" width={50} height={50} /> */}
            <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                Ajoutez un Boost à {props.name}
            </h3>
            <h2 className="text-base leading-7 text-gray-600">
                Donnez-nous un peu de contexte
            </h2>
            <input
                type="text"
                className=""
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="Catégorie"
            />
            <input
                type="text"
                className=""
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
                placeholder="Sous-catégorie"
            />
            <input
                type="text"
                className="h-40 align-top "
                onChange={(e) => setBoostDescription(e.target.value)}
                value={boostDescription}
                placeholder="Informations sur votre Boost"
            />
            <div className="flex justify-center">
                <button
                    className="mr-5 h-8 w-32 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={(e) => console.log(e)}
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
}

export default Boost;
