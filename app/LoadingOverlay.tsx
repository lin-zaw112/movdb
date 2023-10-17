import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import React from "react";

const Loading = (): React.JSX.Element => {
  return (
    <div className="fixed left-0 top-0 z-50 grid h-full w-screen cursor-wait place-items-center bg-neutral-50/50   dark:bg-neutral-500/50">
      <h1 className=" flex flex-row items-center">
        <Cog6ToothIcon className="inline-block h-8 w-8 animate-spin" />
        <div className=" loader" />
      </h1>
    </div>
  );
};

export default Loading;
