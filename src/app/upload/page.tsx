"use client";

import { categories } from "@/components/navbar/Navbar";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import Select from "react-select";

export default function Home() {
  let [title, setTitle] = useState("");
  let [category, setCategory] = useState("");
  let [selectedCategory, setSelectedCategory] = useState(null);
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
        className="flex flex-col items-center justify-center gap-4 ut-button:bg-red-500 "
      >
        <input
          className="px-4 py-2 border rounded border-neutral-500 "
          placeholder="Title"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <Select
          className="px-4 py-2 border rounded border-neutral-500"
          defaultValue={selectedCategory}
          onChange={setSelectedCategory}
          options={categories}
        />
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="9 jokes uploaded image"
            width={323}
            height={435}
          />
        ) : (
          <UploadButton
            className="mt-4 ut-button:border ut-button:border-neutral-500 ut-button:bg-transparent ut-button:text-black ut-button:ut-readying:bg-red-500/50"
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
        <button className="btn" type="submit">
          Submit post
        </button>
      </form>
    </main>
  );
}
