"use client";
import React, { useState } from "react";
import { categories } from "./Navbar";
import ListItem from "./ListItem";
import GridItems from "./GridItems";
import { useSession } from "next-auth/react";

const Navigation = () => {
  let [isOpen, setIsOpen] = useState(true);
  const { data: session, status } = useSession();
  return (
    <div
      className={`
    flex 
    flex-col
    pt-8
    px-4
    rounded-md
    bg-white 
    transition
    border
    overflow-y-scroll
    shadow
`}
    >
      <GridItems
        isOpen={isOpen}
        isLoggedIn={status === "authenticated"}
        session={session}
      />
      <div className="py-4">
        <hr />
      </div>
      {/* Categories */}
      <div className="text-xl font-bold ">Categories</div>
      <div className="pt-2">
        {categories.map((item) => (
          <ListItem
            label={item.label}
            value={item.value}
            description={item.description}
            linkTo={item.linkTo}
            key={item.value}
          />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
