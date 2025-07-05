"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DateRange } from "react-day-picker";
import BookingModal from "@/components/BookingModal";
import { useGetDisabledDates } from "@/hooks/useCreateHotel";
import { Hotel, Room } from "@prisma/client";
import Image from "next/image";
import { ChevronDownIcon, Plug } from "lucide-react";
import { Fan } from "lucide-react";
import { Car } from "lucide-react";
import { Computer } from "lucide-react";
import { Sofa } from "lucide-react";
import { Bell } from "lucide-react";
import { Bed } from "lucide-react";
import { Umbrella } from "lucide-react";
import hotelImage from "@/public/hotel-image.jpg";

// Helper function to format date as YYYY-MM-DD without timezone issues
const formatDateToISO = (date: Date | undefined): string => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const RoomCard = ({ room, hotel }: { room: Room; hotel: Hotel }) => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );
  const dateFrom = formatDateToISO(dateRange?.from);
  const dateTo = formatDateToISO(dateRange?.to);

  const dateFromDisplay = dateRange?.from?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const dateToDisplay = dateRange?.to?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const facilitiesLogo = {
    Adapter: <Plug className="w-4 h-4" />,
    "Air Conditioning": <Fan className="w-4 h-4" />,
    "Free Parking": <Car className="w-4 h-4" />,
    Desk: <Computer className="w-4 h-4" />,
    Sofa: <Sofa className="w-4 h-4" />,
    "Wake up service": <Bell className="w-4 h-4" />,
    Linens: <Bed className="w-4 h-4" />,
    Umbrella: <Umbrella className="w-4 h-4" />,
  };

  const { data: disabledDates } = useGetDisabledDates(room.id);

  return (
    <>
      <Card className="w-md mt-5 h-fit" key={room.id}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-lg">{room.name}</CardTitle>
              <CardDescription className="text-sm">
                {room.persons} Guests
              </CardDescription>
            </div>
            <div>
              <CardTitle>
                <p className="text-sm">4.0 Rating</p>
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <div className="">
            <Image
              src={hotelImage}
              alt="room-image"
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex-wrap flex gap-3">
            {room.facilities.map((facility: string) => (
              <div
                className="flex items-center gap-2 text-xs justify-center text-muted-foreground"
                key={facility}
              >
                <p className="">
                  {facilitiesLogo[facility as keyof typeof facilitiesLogo]}
                </p>
                <p>{facility}</p>
              </div>
            ))}
          </div>
          <div className="border-y py-3 flex justify-between items-center text-sm">
            <div className="">
              <p className="">
                Room Price:{" "}
                <span className="font-bold">
                  {room.price}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}
                    /24hrs
                  </span>
                </span>
              </p>
            </div>

            <div>
              <p>
                Breakfast Price: <span className="font-bold">50</span>
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="date" className="px-1">
                Select Date You Will Stay
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal text-sm"
                  >
                    {dateRange
                      ? dateFromDisplay + "  -  " + dateToDisplay
                      : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    disabled={disabledDates?.map(
                      (date: string) => new Date(date)
                    )}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <p>Do you want to add breakfast?</p>
          </div>
          <div className="">
            <BookingModal
              roomId={room.id}
              hotelId={hotel?.id}
              roomName={room.name}
              hotelName={hotel?.name}
              roomPrice={room.price}
              checkInDate={dateFrom || ""}
              checkOutDate={dateTo || ""}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RoomCard;
