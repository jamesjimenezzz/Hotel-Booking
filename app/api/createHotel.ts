import { Hotel, Room } from "@/types";

export const createHotel = async (hotel: Hotel, room: Room) => {
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
