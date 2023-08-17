"use client";

import React from "react";
import { categories } from "./Navbar";
import ListItem from "./ListItem";
import { Session } from "next-auth";
import GridItems from "./GridItems";

type NavigationProps = {
  isOpen: boolean;
  isLoggedIn: boolean;
  session: Session | null;
};
const Navigation: React.FC<NavigationProps> = ({
  isOpen,
  isLoggedIn,
  session,
}) => {
  return (
    <div className={`absolute right-0 top-16 transform `}>
      <div
        className={`
            flex 
            flex-col
            p-4
            rounded-md
            bg-white 
            transition
            border
            700
            shadow
            ${isOpen ? "" : "translate-x-full"}
        `}
      >
        <GridItems isOpen={isOpen} isLoggedIn={isLoggedIn} session={session} />

        <div className="py-4">
          <hr />
        </div>

        <div className="text-xl font-bold">Categories</div>
        <div className="pt-2">
          {categories.map((item) => (
            <ListItem
              title={item.title}
              description={item.description}
              linkTo={item.linkTo}
              key={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
