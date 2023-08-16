"use client";

import { Session } from "next-auth";
import Link from "next/link";
import React from "react";
import { BiHome, BiLogIn, BiUser } from "react-icons/bi";

type GridItemsProps = {
  isOpen: boolean;
  isLoggedIn: boolean;
  session: Session | null;
};

const GridItems: React.FC<GridItemsProps> = ({
  isOpen,
  isLoggedIn,
  session,
}) => {
  return (
    <ul className={` flex   flex-row links pt-2 justify-around items-center`}>
      <li>
        <Link
          href={"/"}
          className=" flex flex-col justify-center items-center  "
        >
          <BiHome className=" text-3xl md:text-4xl" />
          <div className="pt-1 font-semibold">Home</div>
        </Link>
      </li>
      {isLoggedIn ? (
        <li>
          {" "}
          <Link
            href={`/profile/${session?.user?.id}`}
            className=" flex flex-col justify-center items-center "
          >
            {" "}
            <BiUser className="text-3xl md:text-4xl" />{" "}
            <div className="pt-1 font-semibold">Profile</div>
          </Link>
        </li>
      ) : (
        <li>
          <Link
            href="/api/auth/signin"
            className=" flex flex-col justify-center items-center "
          >
            <BiLogIn className="text-3xl md:text-4xl" />
            <div className="pt-1 font-semibold">Login</div>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default GridItems;
