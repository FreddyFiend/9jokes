import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

type LoadingProps = {
  type: LoadingType;
  color: string;
};

const Loading: React.FC<LoadingProps> = ({ type, color }) => {
  return (
    <div>
      <ReactLoading type={type} color={color} height={"20%"} width={"20%"} />
    </div>
  );
};

export default Loading;
