"use client";

import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

type LoadingProps = {
  type: LoadingType;
  color: string;
};

const Loading: React.FC<LoadingProps> = ({ type, color }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ReactLoading type={type} color={color} height={"200px"} width={"200px"} />
    </div>
  );
};

export default Loading;
