import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import React from "react";

const Loading = (): React.JSX.Element => {
  return (
    <div className=" grid h-screen w-screen place-items-center">
      <h1 className=" flex flex-row items-center">
        <Cog6ToothIcon className="inline-block h-8 w-8 animate-spin" />
        <div className=" loader" />
      </h1>
    </div>
  );
};

export default Loading;
