'use client'

import { useState } from 'react';
import Image from 'next/image';




export default function FileInputComponent() {
    const [fileUri, setFileUri] = useState<string | null>(null);
  
    const handleFileChange = (e:any) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const fileUri = URL.createObjectURL(selectedFile);
        setFileUri(fileUri);
      }
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        {fileUri && <Image src={fileUri} width={30} height={30} alt='Uploaded File'></Image>}
      </div>
    );
  }
  
