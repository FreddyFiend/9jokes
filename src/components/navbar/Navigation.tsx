"use client";
import React, { useState } from "react";
import { categories } from "./Navbar";
import ListItem from "./ListItem";
import GridItems from "./GridItems";
import { useSession } from "next-auth/react";
import useNavbar from "@/app/hooks/useNavbar";

const Navigation = () => {
  const { data: session, status } = useSession();
  const navbarStore = useNavbar();

  return (
    <div
      className={`
    flex 
    flex-col
    
    rounded-md
    bg-white 
    transition
    border
    shadow
    ${
      navbarStore.isOpen
        ? "md:relative md:pt-8 md:px-4 md:top-0 md:overflow-y-scroll"
        : "w-0 p-0 overflow-hidden"
    }
    ${
      navbarStore.isOpen
        ? " fixed left-0  pt-8 px-4  top-12 z-20 overflow-y-scroll "
        : "w-0 p-0 overflow-hidden"
    }

`}
    >
      <GridItems
        isOpen={true}
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
