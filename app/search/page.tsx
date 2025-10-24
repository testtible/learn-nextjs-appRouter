import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const params = await searchParams;
  return <div>{params.q} search</div>;
};

export default Page;
