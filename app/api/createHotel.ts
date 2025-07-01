import { HotelData, RoomData } from "@/store/formStore";

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
