"use client";

import useNavbar from "@/app/hooks/useNavbar";
import React from "react";
import { BiMenu } from "react-icons/bi";

export const categories = [
  {
    label: "Any",
    value: "",
    description: "Posts from all categories",
  },
  {
    label: "Funny",
    value: "funny",
    description: "funny looking posts",
  },
  {
    label: "Sarcasm",
    value: "sarcasm",
    description: "posts that inspire sarcasm",
  },
  {
    label: "Horror",
    value: "horror",
    description: "horrific Posts",
  },
  {
    label: "Gaming",
    value: "gaming",
    description: "Posts that are about games",
  },
  {
    label: "Tech",
    value: "tech",
    description: "Posts that are about tech ",
  },
  {
    label: "Memes",
    value: "memes",
    description: "Average internet memes",
  },
];

const Navbar = () => {
  const navbarStore = useNavbar();
  return (
    <nav className="fixed flex flex-col items-center justify-center w-full p-2 overflow-hidden shadow md:flex-row md:justify-between">
      <div className="left-0 logo">
        <div className="text-2xl font-extrabold">9 JOKES</div>
      </div>

      <button
        className="absolute right-2 top-2 "
        onClick={() => navbarStore.toggle()}
      >
        <BiMenu className="text-3xl md:text-3xl" />
      </button>
    </nav>
  );
};

export default Navbar;
