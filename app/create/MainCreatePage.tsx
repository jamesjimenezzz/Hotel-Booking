"use client";
import React, { useState } from "react";
import HotelCreatePage from "./HotelCreatePage";
import { Button } from "@/components/ui/button";
import RoomCreatePage from "./RoomCreatePage";
import { useFormStore } from "@/store/formStore";
import { useCreateHotel } from "@/hooks/useCreateHotel";
import { Spinner } from "@/components/Spinner";

const MainCreatePage = () => {
  const [page, setPage] = useState(0);
  const [previous, setPrevious] = useState(false);

  const { mutate, isPending } = useCreateHotel();

  const handleNext = () => {
    if (page < pages.length - 1) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const showPrevious = page > 0;

  const pages = [HotelCreatePage, RoomCreatePage];

  const PageComponent = pages[page];

  const handleSubmit = async () => {
    const { hotel, room, reset } = useFormStore.getState();

    mutate(
      { hotel, room },
      {
        onSuccess: () => {
          reset();
          setPage(0);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  return (
    <>
      <PageComponent />
      <div
        className={`max-w-3xl flex  ${
          !showPrevious ? "justify-start" : ""
        } mx-auto pt-10 pb-5`}
      >
        {!showPrevious ? (
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
              onClick={() => handleSubmit()}
              className="px-6  cursor-pointer py-5"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MainCreatePage;
