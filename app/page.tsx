"use client";
import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { WavesLadder } from "lucide-react";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    fetch("/api/sync-user");
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-4">
      <h1 className="text-4xl font-semibold text-center">BOOK YOUR HOTEL</h1>

      <section className="mx-auto flex flex-col gap-4 mt-10 items-center ">
        <div className="flex  ">
          <Image
            className="object-cover display-block z-999 w-93 h-82 rounded-lg "
            src="/hotel-image.jpg"
            alt="hotel"
            width={400}
            height={400}
          />
          <div className="bg-[#02233a80] py-6 px-8 rounded-lg max-w-lg  flex flex-col gap-4">
            <div className="flex flex-col  gap-2">
              <h2 className="text-2xl font-semibold">Hotel Name</h2>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <p className="text-sm ">Pattaya, Thailand</p>
              </div>
            </div>

            <p className="text-sm text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quos.
            </p>
            <div className="flex-1">
              <p className="text-sm mb-1 font-semibold"> Amenities </p>
              <div className="flex items-center text-gray-400 gap-2">
                <WavesLadder className="w-4 h-4" />
                <p className="text-xs">Swimming Pool</p>
              </div>
              <div className="flex items-center text-gray-400 gap-2">
                <WavesLadder className="w-4 h-4" />
                <p className="text-xs">Swimming Pool</p>
              </div>
              <div className="flex items-center text-gray-400 gap-2">
                <WavesLadder className="w-4 h-4" />
                <p className="text-xs">Swimming Pool</p>
              </div>
              <p className="text-xs text-gray-400">And many more...</p>
            </div>
            <p className="font-semibold text-base">
              $100
              <span className="text-sm  text-gray-500  ml-0.5">/ 24hrs</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
