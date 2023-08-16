"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import Navigation from "./Navigation";

export const categories = [
  { title: "Funny", description: "funny looking posts", linkTo: "/cat/funny" },
  {
    title: "Sarcasm",
    description: "posts that inspire sarcasm",
    linkTo: "/cat/sarcasm",
  },
  { title: "Horror", description: "horrific Posts", linkTo: "/cat/horror" },
  {
    title: "Gaming",
    description: "Posts that are about games",
    linkTo: "/cat/gaming",
  },
  {
    title: "Tech",
    description: "Posts that are about tech ",
    linkTo: "/cat/tech",
  },
  {
    title: "Memes",
    description: "Average internet memes",
    linkTo: "/cat/memes",
  },
];

const Navbar = () => {
  let [showNav, setShowNav] = useState(false);
  const { data: session, status } = useSession();
  return (
    <nav className=" flex flex-col items-center justify-center p-2 md:flex-row md:justify-between overflow-hidden">
      <div className="logo left-0">
        <div className="text-2xl font-extrabold">9 JOKES</div>
      </div>

      <button
        className="absolute right-2 top-4 "
        onClick={() => setShowNav(!showNav)}
      >
        <BiMenu className="text-3xl md:text-3xl" />
      </button>
      <Navigation
        isOpen={showNav}
        isLoggedIn={status === "authenticated"}
        session={session}
      />
    </nav>
  );
};

export default Navbar;
