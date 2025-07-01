"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Car, Fan, Upload } from "lucide-react";
import { Plug } from "lucide-react";
import { Bed } from "lucide-react";
import { Umbrella } from "lucide-react";
import { Bell } from "lucide-react";
import { Sofa } from "lucide-react";
import { Computer } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import Image from "next/image";
import { useFormStore } from "@/store/formStore";

const RoomCreatePage = () => {
  const [roomTitle, setRoomTitle] = useState<string>("");
  const { room, setRoom } = useFormStore();

  // Memoize image URLs to prevent flickering on re-renders
  const imageUrls = useMemo(() => {
    return room.images.map((image) => URL.createObjectURL(image));
  }, [room.images]);

  const handleFacilityChange = (label: string) => {
    const updated = room.facilities.includes(label)
      ? room.facilities.filter((item) => item !== label)
      : [...room.facilities, label];
    setRoom({ ...room, facilities: updated });
  };

  const facilities = [
    { label: "Adapter", icon: <Plug className="w-4 h-4" /> },
    { label: "Air Conditioning", icon: <Fan className="w-4 h-4" /> },
    { label: "Free Parking", icon: <Car className="w-4 h-4" /> },
    { label: "Desk", icon: <Computer className="w-4 h-4" /> },
    { label: "Sofa", icon: <Sofa className="w-4 h-4" /> },
    { label: "Wake up service", icon: <Bell className="w-4 h-4" /> },
    { label: "Linens", icon: <Bed className="w-4 h-4" /> },
    { label: "Umbrella", icon: <Umbrella className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-3xl flex   flex-col gap-10 mx-auto mt-10">
      <h1 className="text-3xl text-center font-bold">
        Submit your Hotel Rooms
      </h1>
      <div>
        <h2 className="font-semibold text-xl">Room Title</h2>
        <p className="text-sm text-gray-400">Provide your Room Name</p>
        <Input
          className="mt-2 bg-black/20 border-gray-500 py-5"
          placeholder="Budget 2-bed Room..."
          value={room.title}
          onChange={(e) => setRoom({ ...room, title: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-3 gap-5  ">
        {facilities.map((facility) => (
          <div className="flex items-center gap-2" key={facility.label}>
            <input
              onChange={() => handleFacilityChange(facility.label)}
              type="checkbox"
              id={facility.label}
              className="w-4 h-4"
              checked={room.facilities.includes(facility.label)}
            />
            <div>{facility.label}</div>
            <div>{facility.icon}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2> Room Pictures </h2>
            <p className="text-sm text-gray-400">Upload your room pictures</p>
          </div>
          <div className="flex items-center gap-2">
            {room.images.length > 0 && (
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex items-center gap-2"
              >
                <input
                  type="file"
                  id="image-upload"
                  onChange={(e) =>
                    setRoom({
                      ...room,
                      images: [
                        ...room.images,
                        ...Array.from(e.target.files || []),
                      ],
                    })
                  }
                  multiple
                  className="hidden"
                />
                <p className="p-2 text-sm outline rounded-lg">Add Picture</p>
              </label>
            )}
            <Select
              value={room.persons}
              onValueChange={(value) => setRoom({ ...room, persons: value })}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Person" />
              </SelectTrigger>

              <SelectContent>
                {Array.from({ length: 10 }).map((_, index) =>
                  index === 0 ? (
                    <SelectItem value={`${index + 1}`}>1 Person</SelectItem>
                  ) : (
                    <SelectItem value={`${index + 1}`}>
                      {index + 1} Persons
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        {room.images.length > 0 ? (
          <div className="mx-auto grid grid-cols-2 items-center justify-center  gap-5  mt-10">
            {room.images.map((picture) => (
              <div key={picture.name}>
                <Image
                  src={imageUrls[room.images.indexOf(picture)]}
                  alt="Room Picture"
                  className="object-cover w-[500px] h-[300px] rounded-lg"
                  width={500}
                  height={500}
                />
              </div>
            ))}
          </div>
        ) : (
          <>
            <label
              htmlFor="image-upload"
              className="cursor-pointer max-w-xl mx-auto border-dashed border-2 border-gray-300 rounded-md mt-10 py-35 flex items-center justify-center"
            >
              <input
                onChange={(e) =>
                  setRoom({ ...room, images: Array.from(e.target.files || []) })
                }
                type="file"
                id="image-upload"
                multiple
                className="hidden"
              />
              <div className="flex flex-col items-center cursor-pointer  gap-3 justify-center  mx-auto">
                <Upload className="w-10 h-10" />
                <span className="font-semibold text-2xl">Choose File</span>
              </div>
            </label>
          </>
        )}
      </div>
      <div className="flex items-center gap-2 ">
        <span className="text-lg">$</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="border-0 border-b-2 w-[5rem] p-2 border-gray-300 focus:ring-0 focus:outline-none text-md "
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            setRoom({ ...room, price: value });
          }}
          value={room.price}
          placeholder="Price"
        />
        <p className="text-lg text-gray-400">Per night</p>
      </div>
    </div>
  );
};

export default RoomCreatePage;
