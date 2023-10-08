"use client";
import React, { useState } from 'react'
import axios from "axios";
import s from "./Upload.module.scss";
import { useAccessToken } from '@/hooks/GlobalContext';
import { useRouter } from "next/navigation";

export default function Upload({onUploadComplete}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const {accessToken} = useAccessToken();

  const Router = useRouter();
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "https://farmart-be.onrender.com/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: accessToken,
          },
        }
      );

      if (response.status === 401) {
        Router.push("/login");
      }
      if (response.status===200) {
        setSelectedFile(null);
        await onUploadComplete()
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className={s.root}>
      <div className={s.Container}>
        <h1>File Uploader</h1>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleUpload}>Upload File</button>
      </div>
    </div>
    </>
  );
}

