import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { BookingData } from "@/types";
import { useCreateBooking } from "@/hooks/useCreateHotel";

interface Props {
  roomId: string;
  hotelId: string;
  roomName: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  roomPrice: string;
}

const BookingModal = ({
  roomId,
  hotelId,
  roomName,
  hotelName,
  checkInDate,
  checkOutDate,
  roomPrice,
}: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const { mutate: createBooking, isPending } = useCreateBooking();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBooking({
      roomId,
      hotelId,
      roomName,
      hotelName,
      checkInDate,
      checkOutDate,
      roomPrice,
      fullName,
      email,
      phone,
      numberOfGuests,
    });
    setFullName("");
    setEmail("");
    setPhone("");
    setNumberOfGuests("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">Book Now</Button>
      </DialogTrigger>
      <DialogContent className="w-[1200px] h-fit">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>
            Please fill in the details below to book your stay.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Full Name</Label>
              <Input
                id="name-1"
                name="name"
                required
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Email Address</Label>
              <Input
                id="username-1"
                name="username"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Phone Number</Label>
              <Input
                id="username-1"
                name="username"
                placeholder="Enter your phone number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Number of Guests</Label>
              <Input
                id="username-1"
                name="username"
                placeholder="Enter the number of guests"
                required
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />
            </div>
            <div className=" flex flex-col gap-3 text-muted-foreground text-xs">
              <div className="">
                <p>
                  Personal Information <br />
                  <li>All details provided must be accurate and complete.</li>
                  <li>
                    Your contact information will be used solely for booking
                    communication.
                  </li>
                </p>
              </div>
              <div>
                <p>
                  Cancellation <br />
                  <li>
                    You may cancel or update your booking request by contacting
                    us at least 24 hours before your intended check-in date.
                  </li>
                  <li>
                    Repeated no-shows may affect your ability to book in the
                    future.
                  </li>
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={isPending}
              className="cursor-pointer"
              type="submit"
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
