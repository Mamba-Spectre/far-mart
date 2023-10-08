"use client";

import { useState, useEffect } from "react";
import { useAccessToken } from "../../hooks/GlobalContext";
import { useRouter } from "next/navigation";
import Upload from "@/components/Upload/Upload";
import "./home.css";

const Home = () => {
  const [files, setFiles] = useState([]);
  const { accessToken } = useAccessToken();
  const Router = useRouter();

  useEffect(() => {
    fetchFiles();
  }, [accessToken]);

  const fetchFiles = async () => {
    if (!accessToken) {
      Router.push("/login");
      return;
    }
    const response = await fetch("https://farmart-be.onrender.com/api/files", {
      headers: {
        Authorization: accessToken,
      },
    });
    if (response.status === 401) {
      Router.push("/login");
    }
    if (response.ok) {
      const data = await response.json();
      setFiles(data?.data);
    }
  };

  const handleDownload = async (fileId) => {
    if (!fileId) return;
    await Router.push(`https://farmart-be.onrender.com/api/files/${fileId}`);
  };

  const shareLink = async (fileId) => {
    if (!fileId) return;
    const link = `https://farmart-be.onrender.com/api/files/${fileId}`;
    await navigator.clipboard.writeText(link);
  };

  const handleDelete = async (fileId) => {
    if (!fileId) return;
    const response = await fetch(
      `https://farmart-be.onrender.com/api/files/${fileId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: accessToken,
        },
      }
    );
    if (response.status === 401) {
      Router.push("/login");
    }
    if (response.ok) {
      const data = await response.json();
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
    }
  };

  return (
    <div className="App">
      <div>
        <Upload onUploadComplete={fetchFiles} />
      </div>
      <div className="data">
        {files.map((file) => (
          <div key={file._id}>
            <span title={file?.Key.slice(8)}>{file?.Key.slice(45)}</span>
            <button
              className="button"
              onClick={() => handleDownload(file?._id)}
            >
              Download
            </button>
            <button className="button" onClick={() => shareLink(file?._id)}>
              Share
            </button>
            <button className="button" onClick={() => handleDelete(file?._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
