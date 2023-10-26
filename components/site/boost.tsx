import { useState } from "react";
import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from '../reducers/user';
// import Image from 'next/image';
// import styles from '../styles/SignUp.module.css';


type propsStyle = {
  name: String,
  profileOwner : String,
  sender : String,
  receiver : String,
}


function Boost(props: propsStyle) {
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.value);

    // // Redirect to /home if logged in
    // const router = useRouter();
    // if (user.token) {
    //   router.push('/home');
    // }

    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [testimonial, setTestimonial] = useState("");



    // Soumission du Boost au back
    const handleSubmit = () => {
        fetch(`${process.env.backendserver}/new`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                category,
                subCategory,
                owner: props.profileOwner,
                sender: props.sender,
                receiver: props.receiver,
                testimonial,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                data[0].result && console.log(data);
            });
    };

    return (
        <div className="flex flex-col space-y-3">
            {/* <Image src="/logo.png" alt="Logo" width={50} height={50} /> */}
            <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                Ajoutez un Boost à{" "}
                <span className="text-blue-700">{props.name}</span>
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
            <textarea
                className="h-40 align-top"
                onChange={(e) => setTestimonial(e.target.value)}
                value={testimonial}
                onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Informations sur votre Boost"
            />
            <div className="flex justify-center">
                <button
                    className="mr-5 h-8 w-32 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
}

export default Boost;
