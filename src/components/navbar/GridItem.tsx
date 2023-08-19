"use client";

import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib";
type GridItemProps = {
  link: string;
  label: string;
  icon: IconType;
};
const GridItem: React.FC<GridItemProps> = ({ link, label, icon: Icon }) => {
  return (
    <Link
      href={link}
      className=" flex flex-col justify-center items-center  rounded hover:bg-neutral-100"
    >
      <Icon className="text-3xl md:text-4xl" />
      <div className="pt-1 font-semibold"> {label} </div>
    </Link>
  );
};

export default GridItem;
