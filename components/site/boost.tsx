import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import { login } from '../reducers/user';
// import Image from 'next/image';
// import styles from '../styles/SignUp.module.css';

function Boost() {
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.value);

    // // Redirect to /home if logged in
    // const router = useRouter();
    // if (user.token) {
    //   router.push('/home');
    // }

    // const [firstName, setFirstName] = useState('');
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

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
                Vous avez ajouté un Boost
            </h3>
            <h2 className="text-base leading-7 text-gray-600">
                Donnez-nous un peu de contexte
            </h2>
            <input
                type="text"
                className=""
                onChange={(e) => console.log(e)}
                value={""}
                placeholder="Catégorie"
            />
            <input
                type="text"
                className=""
                onChange={(e) => console.log(e)}
                value={""}
                placeholder="Sous-catégorie"
            />
            <input
                type="text"
                className="h-40 align-top"
                onChange={(e) => console.log(e)}
                value={""}
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
