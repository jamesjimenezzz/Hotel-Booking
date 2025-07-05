"use client";
import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Wifi,
  ParkingCircle,
  Utensils,
  Dumbbell,
  Soup,
  Salad,
  Waves,
  Bubbles,
  Martini,
  Bell,
  Shield,
  Upload,
  Plus,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/formStore";
import { Country, State, City } from "country-state-city";

const HotelCreatePage = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const { hotel, setHotel } = useFormStore();

  const handleAmenityChange = (label: string) => {
    const updated = hotel.amenities.includes(label)
      ? hotel.amenities.filter((item) => item !== label)
      : [...hotel.amenities, label];
    setHotel({ ...hotel, amenities: updated });
  };

  const handleDeleteImage = (index: number) => {
    setHotel({
      ...hotel,
      images: hotel.images.filter((_, i) => i != index),
    });
  };

  const imageUrls = useMemo(() => {
    return hotel.images.map((image) => URL.createObjectURL(image));
  }, [hotel.images]);

  const amenities = [
    { label: "Free Wifi", icon: <Wifi className="w-4 h-4" /> },
    { label: "Free Parking", icon: <ParkingCircle className="w-4 h-4" /> },
    { label: "Free Breakfast", icon: <Utensils className="w-4 h-4" /> },
    { label: "Free Dinner", icon: <Soup className="w-4 h-4" /> },
    { label: "Free Lunch", icon: <Salad className="w-4 h-4" /> },
    { label: "Swimming Pool", icon: <Waves className="w-4 h-4" /> },
    { label: "Gym", icon: <Dumbbell className="w-4 h-4" /> },
    { label: "Spa", icon: <Bubbles className="w-4 h-4" /> },
    { label: "Bar", icon: <Martini className="w-4 h-4" /> },
    { label: "Restaurant", icon: <Utensils className="w-4 h-4" /> },
    { label: "Room Service", icon: <Bell className="w-4 h-4" /> },
    { label: "24/7 Security", icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-10">
      <h1 className="font-semibold text-3xl text-center mt-5">
        Submit your Hotel
      </h1>
      <div>
        <h2 className="font-semibold text-xl">Hotel Name</h2>
        <p className="text-sm text-gray-400">Provide your Hotel Name</p>
        <Input
          className="mt-2 bg-black/20 border-gray-500 py-5"
          placeholder="Beach Hotel"
          value={hotel.name}
          onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
        />
      </div>
      <div>
        <div className="flex flex-col gap-6">
          {/* Country */}
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">Country</h2>
            <p className="text-sm text-gray-400">Select your Country</p>
            <select
              value={hotel.country}
              onChange={(e) => setHotel({ ...hotel, country: e.target.value })}
              className="border border-gray-300 rounded-md p-1.5"
            >
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">State</h2>
            <p className="text-sm text-gray-400">Select your State</p>
            <select
              value={hotel.state}
              onChange={(e) => setHotel({ ...hotel, state: e.target.value })}
              className="border border-gray-300 rounded-md p-1.5"
            >
              {State.getStatesOfCountry(hotel.country).map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">City</h2>
            <p className="text-sm text-gray-400">Select your City</p>
            <select
              value={hotel.city}
              onChange={(e) => setHotel({ ...hotel, city: e.target.value })}
              className="border border-gray-300 rounded-md p-1.5"
            >
              {City.getCitiesOfState(hotel.country, hotel.state).map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-xl">Hotel Description</h2>
        <p className="text-sm text-gray-400">Provide your Hotel Description</p>
        <Textarea
          className="mt-2 bg-black/20 border-gray-500 h-30"
          placeholder="Beach Hotel Description"
          value={hotel.description}
          onChange={(e) => setHotel({ ...hotel, description: e.target.value })}
        />
      </div>
      <div>
        <div className="mb-5">
          <h2 className="font-semibold text-xl">Amenities</h2>
          <p className="text-sm text-gray-400">Select Amenities</p>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {amenities.map((amenity) => (
            <div className="flex items-center  gap-2" key={amenity.label}>
              <input
                type="checkbox"
                id={amenity.label}
                name={amenity.label}
                className="w-4 h-4"
                onChange={() => handleAmenityChange(amenity.label)}
                checked={hotel.amenities.includes(amenity.label)}
              />
              <label
                className="flex items-center  gap-2"
                htmlFor={amenity.label}
              >
                <span className="flex-1 text-sm">{amenity.label}</span>
                <span className="text-gray-300"> {amenity.icon}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-10 mt-10   items-center justify-center ">
        <div
          className={`${
            hotel.images.length > 0 ? "flex justify-between items-center " : ""
          }`}
        >
          <div>
            <h2 className="font-semibold text-xl">Hotel Images</h2>
            <p className="text-sm text-gray-400">Upload your Hotel Images</p>
          </div>
          {hotel.images.length > 0 && (
            <label htmlFor="images">
              <input
                onChange={(e) =>
                  setHotel({
                    ...hotel,
                    images: [
                      ...hotel.images,
                      ...Array.from(e.target.files || []),
                    ],
                  })
                }
                type="file"
                id="images"
                multiple
                className="hidden"
              />
              <div className="flex border-2 rounded-lg border-gray-300 p-1.5 hover:bg-white hover:text-black cursor-pointer  transition-all duration-300 items-center gap-2">
                <Plus className="w-4 h-4" />
                <p className="text-sm"> Add Image </p>
              </div>
            </label>
          )}
        </div>
        {hotel.images.length > 0 ? (
          <div className="mx-auto grid grid-cols-2 items-center justify-center max-w-2xl gap-5  mt-10">
            {hotel.images.map((image, index) => (
              <div key={image.name} className="relative group ">
                <Image
                  className="object-cover border-2    hover:blur-xs cursor-pointer transition-all duration-300 border-gray-500 p-0.5 rounded-lg w-md h-[300px]   "
                  src={imageUrls[hotel.images.indexOf(image)]}
                  alt={image.name}
                  width={100}
                  height={100}
                />
                <div
                  onClick={() => handleDeleteImage(index)}
                  className="flex items-center bg-red-500 rounded-lg p-1 cursor-pointer gap-2 absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-all duration-300  z-10 "
                >
                  <Trash className="w-5 h-5 text-gray-100 cursor-pointer rounded-full" />
                  <p className="text-sm text-gray-100">Delete</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex mx-auto items-center py-30 justfiy-center mt-10 max-w-xl  border-dashed border-2 border-gray-500 rounded-md ">
            <label
              htmlFor="images"
              className="flex justify-center items-center gap-2 w-full"
            >
              <input
                onChange={(e) =>
                  setHotel({
                    ...hotel,
                    images: Array.from(e.target.files || []),
                  })
                }
                type="file"
                multiple
                id="images"
                className="hidden"
              />

              <div className="flex flex-col items-center cursor-pointer  gap-3 justify-center  mx-auto">
                <Upload className="w-10 h-10" />
                <span className="font-semibold text-2xl">Choose File</span>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelCreatePage;
