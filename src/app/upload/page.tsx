"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  let [title, setTitle] = useState("");
  let [imageKey, setImageKey] = useState("");
  let [imageUrl, setImageUrl] = useState("");
  const createPost = async () => {
    const res = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, imageUrl, imageKey }),
    });
    console.log(await res.json());
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <form
        onSubmit={createPost}
        className="flex flex-col justify-center items-center gap-4"
      >
        <input
          className="border-2 px-4 py-2 border-black rounded "
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        ></input>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="9 jokes uploaded image"
            width={323}
            height={435}
          />
        ) : (
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              if (!res || res.length === 0) return alert("Error Ocurred");
              setImageUrl(res[0].fileUrl);
              setImageKey(res[0].fileKey);
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
        <button
          className="px-4 py-2  text-lg bg-blue-500 text-white rounded"
          type="submit"
        >
          Submit post
        </button>
      </form>
    </main>
  );
}
