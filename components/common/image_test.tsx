"use client";

import { useState } from "react";
import Image from "next/image";

export default function FileInputComponent() {
    const [fileUri, setFileUri] = useState<string | null>(null);
    const [image,setImage]= useState()
    const [text,setText] = useState('')

    async function handleFileChange(e: any) {
        const selectedFile = await e.target.files[0];
        console.log(selectedFile);
        if (selectedFile) {
            const formData = new FormData();
            formData.append('photoFromFront', selectedFile, selectedFile.name);
            setImage(selectedFile)
            console.log(formData)

            // const response = await fetch(`${process.env.backendserver}/upload`, {
            // // const response = await fetch(`http://localhost:3000/upload`, {
            //     method: "POST",
            //     body: formData,
            // });
            // const response = await fetch(`http://localhost:3000/upload`, {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'}, 
            //     body: JSON.stringify({toto: 1}),
            // });
            // const photoUri = await response.json() 
            // console.log(photoUri);
        }
    }
    const newForm = new FormData()

    console.log('img',image)
    const  handlePost = async () =>{
        newForm.append('picture',image , image.name)
        newForm.append('text', text)
        // const response = await fetch(`${process.env.backendserver}/upload`, {
            const response = await fetch(`http://localhost:3000/upload`, {
                method: "POST",
                body: newForm,
            });
            const photoUri = await response.json() 
            console.log(photoUri); 
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <input type="text" onChange={(e)=>setText(e.target.value)} value={text}/>
            {fileUri && (
                <Image
                    className="w-full rounded-2xl object-fill"
                    src={fileUri}
                    width={30}
                    height={30}
                    alt="Uploaded File"
                ></Image>
                
            )}
            <button
            onClick={()=>handlePost()}
            >POST</button>
        </div>
    );
}
