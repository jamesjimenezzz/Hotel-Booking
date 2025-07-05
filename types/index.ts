export interface Hotel {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  images: File[];
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  facilities: string[];
  persons: string;
  images: File[];
  price: string;
}

export interface BookingData {
  roomId: string;
  hotelId: string;
  roomName: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  roomPrice: string;
  fullName: string;
  email: string;
  phone: string;
  numberOfGuests: string;
}
