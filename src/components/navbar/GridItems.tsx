"use client";

import { Session } from "next-auth";
import Link from "next/link";
import React from "react";
import { BiHome, BiLogIn, BiLogOut, BiUpload, BiUser } from "react-icons/bi";
import GridItem from "./GridItem";

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
    <div className={` links  `}>
      {isLoggedIn ? (
        <div className="grid grid-cols-2 gap-4 ">
          <GridItem link="/" icon={BiHome} label="Home" />
          <GridItem
            link={`/profile/${session?.user?.id}`}
            icon={BiUser}
            label="Profile"
          />
          <GridItem link="/api/auth/signout" icon={BiLogOut} label="Logout" />
          <GridItem link="/upload" icon={BiUpload} label="Upload" />
        </div>
      ) : (
        <div className="grid grid-cols-2 justify-around items-center">
          <GridItem link="/" icon={BiHome} label="Home" />
          <GridItem
            link="/api/auth/signin"
            icon={BiLogIn}
            label="Login/Signup"
          />
        </div>
      )}
    </div>
  );
};

export default GridItems;
