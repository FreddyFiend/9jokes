import React from "react";

type PostTabProp = {
  tab: string;
  onSetTab: () => void;
  onSetQuery: () => void;
  isActive: boolean;
};
const PostTab: React.FC<PostTabProp> = ({
  tab,
  onSetQuery,
  onSetTab,
  isActive,
}) => {
  return (
    <button
      className={`px-8 py-2 font-medium text-xl rounded-xl ${
        isActive ? "bg-neutral-300" : "bg-neutral-100"
      }`}
      onClick={() => {
        onSetQuery();
        onSetTab();
      }}
    >
      {tab.toUpperCase()}
    </button>
  );
};

export default PostTab;
