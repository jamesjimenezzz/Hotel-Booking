import { HotelData, RoomData } from "@/store/formStore";
import { BookingData } from "@/types";

export const createHotel = async (hotel: HotelData, room: RoomData) => {
  try {
    const res = await fetch("/api/hotel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hotel, room }),
    });

    return res.json();
  } catch (error) {
    console.error("Failed to create hotel");
    return null;
  }
};

export const getHotels = async (page: number, limit: number) => {
  try {
    const res = await fetch(`/api/hotel?page=${page}&limit=${limit} `);
    if (!res.ok) {
      console.error("Failed to get hotels");
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to get hotels");
    return null;
  }
};

export const getHotelById = async (hotelId: string) => {
  try {
    const res = await fetch(`/api/hotel/${hotelId}`);
    if (!res.ok) {
      console.error("Failed to get hotel by id");
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to get hotel by id");
    return null;
  }
};

export const createBooking = async (booking: BookingData) => {
  try {
    const res = await fetch("/api/hotel/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });

    return res.json();
  } catch (error) {
    console.error("Failed to create booking");
    return null;
  }
};

export const getDisabledDates = async (roomId: string) => {
  try {
    const res = await fetch(`/api/room/${roomId}/disabled-dates`);
    if (!res.ok) {
      console.error("Failed to fetch disabled dates");
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to get disabled dates");
    return null;
  }
};
