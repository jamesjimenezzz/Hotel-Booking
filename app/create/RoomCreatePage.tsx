"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Car, Fan } from "lucide-react";
import { Plug } from "lucide-react";
import { Bed } from "lucide-react";
import { Umbrella } from "lucide-react";
import { Bell } from "lucide-react";
import { Sofa } from "lucide-react";
import { Computer } from "lucide-react";

const RoomCreatePage = () => {
  const [roomTitle, setRoomTitle] = useState<string>("");
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
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl text-center font-bold">
        Submit your Hotel Rooms
      </h1>
      <div>
        <h2 className="font-semibold text-xl">Hotel Title</h2>
        <p className="text-sm text-gray-400">Provide your Hotel Name</p>
        <Input
          className="mt-2 bg-black/20 border-gray-500 py-5"
          placeholder="Budget 2-bed Room..."
          value={roomTitle}
          onChange={(e) => setRoomTitle(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-5 mt-10 ">
        {facilities.map((facility) => (
          <div className="flex items-center gap-2" key={facility.label}>
            <input type="checkbox" className="w-4 h-4" />
            <div>{facility.label}</div>
            <div>{facility.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCreatePage;
