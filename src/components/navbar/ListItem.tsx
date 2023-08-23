"use client";

import Link from "next/link";
import React from "react";
type ListItemProps = {
  label: string;
  value: string;
  description: string;
  onSelect: (value: string) => void;
};
const ListItem: React.FC<ListItemProps> = ({
  label,
  value,
  description,
  onSelect,
}) => {
  return (
    <div onClick={() => onSelect(value)}>
      <div className="p-2 rounded hover:bg-neutral-100">
        {" "}
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-neutral-700"> {description} </div>
      </div>
    </div>
  );
};

export default ListItem;
