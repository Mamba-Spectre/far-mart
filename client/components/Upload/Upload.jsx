"use client";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAccessToken } from "@/hooks/GlobalContext";
import { useRouter } from "next/navigation";
import "./upload.scss";

export default function Upload({ onUploadComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const { accessToken } = useAccessToken();

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
      if (response.status === 200) {
        setSelectedFile(null);
        await onUploadComplete();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="file-card">
        <p className="header">Upload File</p>
        <div className="file-inputs">
          <input className="input" type="file" onChange={handleFileUpload} />
          <button className="button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
}
