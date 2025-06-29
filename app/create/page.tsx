import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MainCreatePage from "./MainCreatePage";

const DisplayPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return <MainCreatePage />;
};

export default DisplayPage;
