"use client";
import React, { useState } from "react";
import HotelCreatePage from "./HotelCreatePage";
import { Button } from "@/components/ui/button";
import RoomCreatePage from "./RoomCreatePage";

const MainCreatePage = () => {
  const [page, setPage] = useState(0);
  const [previous, setPrevious] = useState(false);

  const handleNext = () => {
    setPage(page + 1);
    console.log(page);

    if (page === pages.length - 2) {
      setPrevious(true);
    }
  };

  const handlePrevious = () => {
    setPage(page - 1);
    setPrevious(false);
  };

  const pages = [HotelCreatePage, RoomCreatePage];

  const PageComponent = pages[page];

  return (
    <>
      <PageComponent />
      <div
        className={`max-w-3xl flex  ${
          !previous ? "justify-start" : ""
        } mx-auto pt-10 pb-5`}
      >
        {!previous ? (
          <Button
            onClick={() => handleNext()}
            className="px-6  cursor-pointer py-5"
          >
            Next
          </Button>
        ) : (
          <div className="flex justify-between w-full">
            <Button
              onClick={() => handlePrevious()}
              className="px-6  cursor-pointer py-5"
            >
              Previous
            </Button>

            <Button
              variant={"outline"}
              onClick={() => handleNext()}
              className="px-6  cursor-pointer py-5"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MainCreatePage;
