"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { BiHome, BiLogIn, BiMenu, BiUser } from "react-icons/bi";

const Navbar = () => {
  let [showNav, setShowNav] = useState(false);
  const { data: session, status } = useSession();
  return (
    <nav className="flex flex-col items-center justify-center p-2 md:flex-row md:justify-between">
      <div className="logo">
        <div className="text-2xl font-extrabold">9 JOKES</div>
      </div>
      <ul
        className={` ${
          showNav ? "flex flex-col" : "hidden"
        }  gap-1 md:flex md:flex-row links pt-2 justify-center items-center`}
      >
        <li className="px-2">
          <Link href={"/"}>
            <BiHome className="text-2xl" />
          </Link>
        </li>
        {status === "authenticated" ? (
          <li className="px-2">
            {" "}
            <Link href={"/profile"}>
              {" "}
              <BiUser className="text-2xl" />{" "}
            </Link>
          </li>
        ) : (
          <li className="px-2">
            <Link href="/api/auth/signin">
              <BiLogIn className="text-2xl" />
            </Link>
          </li>
        )}
      </ul>
      <button
        className="absolute md:hidden right-2 top-4 "
        onClick={() => setShowNav(!showNav)}
      >
        <BiMenu className="text-2xl" />
      </button>
    </nav>
  );
};

export default Navbar;
