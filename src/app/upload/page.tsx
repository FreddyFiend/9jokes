"use client";

import { categories } from "@/components/navbar/Navbar";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import Select from "react-select";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  title: string;
  category: string;
};

export default function Home() {
  let [imageKey, setImageKey] = useState("");
  let [imageUrl, setImageUrl] = useState("");

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    const res = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        category: data.category,
        imageUrl,
        imageKey,
      }),
    });
    console.log(await res.json());
  };

  const createPost = async () => {};

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <form
        // onSubmit={createPost}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-4 ut-button:bg-red-500 "
      >
        <input
          className="px-4 py-2 border rounded border-neutral-500 "
          placeholder="Title"
          {...(register("title"), { required: true, maxLength: 20 })}
          // value={title}
          // onChange={(evt) => setTitle(evt.target.value)}
        />
        <select
          className="px-4 py-2 border rounded border-neutral-500 "
          {...(register("category"), { required: true })}
        >
          {categories.map((cat) => (
            <option value={cat.value}>{cat.label}</option>
          ))}
        </select>
        {/* <Select
          {...register("")}
          value={category}
          name={"category"}
          defaultValue={categories[0]}
          className="px-4 py-2 border rounded border-neutral-500"
          options={categories}
          onChange={(value) => setCategory(value)}
        /> */}
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
              setImageUrl(res[0].url);
              setImageKey(res[0].key);
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
        {imageUrl && (
          <button className="btn" type="submit">
            Submit post
          </button>
        )}
      </form>
    </main>
  );
}
