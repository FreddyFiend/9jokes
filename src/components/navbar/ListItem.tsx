"use client";

import Link from "next/link";
import React from "react";
type ListItemProps = {
  label: string;
  value: string;
  description: string;
  linkTo: string;
  onSelect: (value: string) => void;
};
const ListItem: React.FC<ListItemProps> = ({
  label,
  value,
  description,
  linkTo,
  onSelect,
}) => {
  return (
    <div onClick={() => onSelect(value)}>
      <div className="p-2 hover:bg-neutral-100 rounded">
        {" "}
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-neutral-700"> {description} </div>
      </div>
    </div>
  );
};

export default ListItem;
