import React, { Fragment } from "react";

export default async function Page({
  params,
}: {
  params: { id: string };
}): Promise<
  React.ReactElement<any, string | React.JSXElementConstructor<any>>
> {
  return <Fragment></Fragment>;
}
