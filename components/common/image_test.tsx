"use client";

import { useState } from "react";
import Image from "next/image";

export default function FileInputComponent() {
    const [fileUri, setFileUri] = useState<string | null>(null);

    async function handleFileChange(e: any) {
        const selectedFile = await e.target.files[0];
        console.log(selectedFile);
        if (selectedFile) {
            const formData = new FormData();
            formData.append('photoFromFront', selectedFile, selectedFile.name);
            console.log(formData)

            const response = await fetch(`${process.env.backendserver}/upload`, {
            // const response = await fetch(`http://localhost:3000/upload`, {
                method: "POST",
                body: formData,
            });
            // const response = await fetch(`http://localhost:3000/upload`, {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'}, 
            //     body: JSON.stringify({toto: 1}),
            // });
            const photoUri = await response.json() 
            console.log(photoUri);
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {fileUri && (
                <Image
                    className="w-full rounded-2xl object-fill"
                    src={fileUri}
                    width={30}
                    height={30}
                    alt="Uploaded File"
                ></Image>
            )}
        </div>
    );
}
