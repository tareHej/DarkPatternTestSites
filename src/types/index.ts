export interface Destination {
  code: string;
  name: string;
}

export interface Flight {
  id: number;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  aircraft: string;
  stops: number;
  basePrice: number;
  taxes: number;
  availableSeats: number;
}

export interface SeatMap {
  rows: (string | null)[][];
  occupied: string[];
  prices: {
    standard: number;
    extra_legroom: number;
    front: number;
  };
}

export interface Extra {
  id: string;
  name: string;
  description: string;
  price: number;
  included: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: Date | null;
  returnDate: Date | null;
  passengers: number;
  tripType: 'roundtrip' | 'oneway';
} 