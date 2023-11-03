import { useState, useId } from "react";
import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from '../reducers/user';
// import Image from 'next/image';
// import styles from '../styles/SignUp.module.css';
import Select from "react-select";
import { useAppSelector } from "@/redux/store";


type propsStyle = {
    name: String;
    profileOwner: String;
    sender: String;
    receiver: String;
    confirmOk: any;
};

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
    let [boostDelivered, setBoostDelivered] = useState("");
    const userState = useAppSelector((state) => state.authReducer.value)

    const categoryOptions = [
        { label: "collaborateur", value: "collaborateur" },
        { label: "fournisseur", value: "fournisseur" },
        { label: "client", value: "client" },
        { label: "autre", value: "autre" },
    ];

    const subCategoryOptions = [
      { label: "neoney Cat 1", value: "neoney Cat 1" },
      { label: "neoney Cat 2", value: "neoney Cat 2" },
      { label: "neoney Cat 3", value: "neoney Cat 3" },
  ]

    const handleCategoryChange = (selection: any) => {
        setCategory(selection.value);
    };

    const handleSubCategoryChange = (selection: any) => {
        setSubCategory(selection.value);
    };

    // Soumission du Boost au back
    const handleSubmit = () => {
        // console.log("=============================")
        // console.log("category =>", category)
        // console.log("subCategory =>", subCategory)
        // console.log("props.profileOwner =>", props.profileOwner)
        // console.log("props.sender =>", props.sender)
        // console.log("props.receiver =>", props.receiver.proUid)
        // console.log("testimonial =>", testimonial)
        // console.log("=============================")
        // setBoostDelivered(category)

        // const userState = useAppSelector(state => state.authReducer.value)

        // const usrUidMock = "usr2023102552112";
        const usrUid = userState.usrUid;
        // console.log("From boost.tsx - usrUid => ", usrUidMock)
        // const proUidMock = "pro2023102527605";
        const proUid = userState.proUid;

        // Remplacer les usrUidMock et proUidMock quand l'identificaiton sera active sur le site
        fetch(`${process.env.backendserver}/boosts/new`, {
            // fetch(`http://localhost:3000/boosts/new`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                category,
                subCategory,
                // owner: props.profileOwner,
                owner: usrUid,
                // sender: props.sender,
                sender: proUid,
                receiver: props.receiver,
                testimonial,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                if (data[0].result) {
                    setBoostDelivered("Votre boost a bien été attribué");
                    props.confirmOk(true);
                    setCategory("")
                    setSubCategory("")
                    setTestimonial("")
                } else {
                    setBoostDelivered(
                        "Votre boost n'a pas pu être attribué - Vérifiez que tous les champs sont remplis ou contactez le support"
                    );
                }
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
            <Select
                options={categoryOptions}
                placeholder={`Catégorie`}
                autoFocus={true}
                onChange={handleCategoryChange}
                instanceId={useId()}
                // value={category}
            />
            {/* <input
                type="text"
                className=""
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="Catégorie"
            /> */}
            <Select
                options={subCategoryOptions}
                placeholder={`Sous-catégorie`}
                autoFocus={false}
                onChange={handleSubCategoryChange}
                instanceId={useId()}
                // value={subCategory}
            />
            {/* <input
                type="text"
                className=""
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
                placeholder="Sous-catégorie"
            /> */}
            <textarea
                className="h-40 align-top"
                onChange={(e) => setTestimonial(e.target.value)}
                value={testimonial}
                onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Informations sur votre Boost"
            />
            {boostDelivered}
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
