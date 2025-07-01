"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetHotelById } from "@/hooks/useCreateHotel";
import SpinnerGlobal from "@/components/SpinnerGlobal";

const HotelDescription = () => {
  const { hotelId } = useParams();
  const { data: hotel, isPending } = useGetHotelById(hotelId as string);

  if (isPending) return <SpinnerGlobal />;

  return (
    <div>
      <h1>{hotel?.name}</h1>
    </div>
  );
};

export default HotelDescription;
