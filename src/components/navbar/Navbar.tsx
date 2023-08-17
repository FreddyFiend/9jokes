"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import Navigation from "./Navigation";

export const categories = [
  {
    label: "Funny",
    value: "funny",
    description: "funny looking posts",
    linkTo: "/cat/funny",
  },
  {
    label: "Sarcasm",
    value: "sarcasm",
    description: "posts that inspire sarcasm",
    linkTo: "/cat/sarcasm",
  },
  {
    label: "Horror",
    value: "horror",
    description: "horrific Posts",
    linkTo: "/cat/horror",
  },
  {
    label: "Gaming",
    value: "gaming",
    description: "Posts that are about games",
    linkTo: "/cat/gaming",
  },
  {
    label: "Tech",
    value: "tech",
    description: "Posts that are about tech ",
    linkTo: "/cat/tech",
  },
  {
    label: "Memes",
    value: "memes",
    description: "Average internet memes",
    linkTo: "/cat/memes",
  },
];

const Navbar = () => {
  let [showNav, setShowNav] = useState(false);
  const { data: session, status } = useSession();
  return (
    <nav className="flex flex-col items-center justify-center p-2 overflow-hidden shadow md:flex-row md:justify-between">
      <div className="left-0 logo">
        <div className="text-2xl font-extrabold">9 JOKES</div>
      </div>

      <button
        className="absolute right-2 top-2 "
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
