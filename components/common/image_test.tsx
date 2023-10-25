'use client'

import { useState } from 'react';




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
        {fileUri && <img src={fileUri} alt="Uploaded File" />}
      </div>
    );
  }
  
