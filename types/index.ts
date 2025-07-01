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
