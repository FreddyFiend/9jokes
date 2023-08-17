"use client";

import Link from "next/link";
import React from "react";
type ListItemProps = {
  title: string;
  description: string;
  linkTo: string;
};
const ListItem: React.FC<ListItemProps> = ({ title, description, linkTo }) => {
  return (
    <Link href={linkTo}>
      <div className="p-2 hover:bg-neutral-100 rounded">
        {" "}
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-neutral-700"> {description} </div>
      </div>
    </Link>
  );
};

export default ListItem;
