import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  Ok,
  Err,
  ic,
  Principal,
  Opt,
  nat64,
  Result,
  blob,
  bool,
  Canister,
  init,
  Void,
  nat,
  Some,
  None,
  // Duration
} from "azle/experimental";
import { v4 as uuidv4 } from "uuid";
import { bookFlight } from "../frontend/src/utils/endpoints";

const Activity = Record({
  activityId: text,
  activityName: text,
  timestamp: nat64,
  price: nat,
  location: text,
  duration: text,
  equipment: text,
  participants: Vec(text),
  reviews: Vec(text),
});

type Activity = typeof Activity.tsType;

const ActivityPayload = Record({
  activityName: text,
  price: nat,
  location: text,
  duration: text,
  equipment: text,
});
type ActivityPayload = typeof ActivityPayload.tsType;

const Hotels = Record({
  hotelId: text,
  name: text,
  location: text,
  typeOfRoom: text,
  availableRooms: nat,
  amenities: text,
  price: nat,
  numberofRooms: nat,
  rating: Vec(text),
  guests: Vec(text),
  reviews: Vec(text),
});

type Hotels = typeof Hotels.tsType;

const HotelsPayload = Record({
  name: text,
  location: text,
  typeOfRoom: text,
  availableRooms: nat,
  amenities: text,
  price: nat,
  numberofRooms: nat,
  
});

type HotelsPayload = typeof HotelsPayload.tsType;

// const Economy = Record({
//   price: nat,
//   availableSeats: nat64,
// });

// const Business = Record({
//   price: nat,
//   availableSeats: nat64,
// });

// const First = Record({
//   price: nat,
//   availableSeats: nat64,
// });

const FlightClass = Variant({
  Economy: Record({
    price: nat,
    availableSeats: nat,
  }),
  Business: Record({
    price: nat,
    availableSeats: nat,
  }),
  First: Record({
    price: nat,
    availableSeats: nat,
  }),
});

type FlightClass = typeof FlightClass.tsType;

const Flight = Record({
  airline: text,
  flightId: text,
  flightType: text,
  typeOfPlane: text,
  departure: text,
  destination: text,
  departureTime: text,
  arrivalTime: text,
  flightClass: Vec(FlightClass),
  basePrice: nat,
  totalSeats: nat,
  tickets: Vec(text),
});

type Flight = typeof Flight.tsType;

const FlightPayload = Record({
  airline: text,
  flightType: text,
  typeOfPlane: text,
  departure: text,
  destination: text,
  departureTime: text,
  arrivalTime: text,
  flightClass: Vec(FlightClass),
  basePrice: nat,
  totalSeats: nat,
});

type FlightPayload = typeof FlightPayload.tsType;

const BookActivity = Record({
  activityId: text,
  userName: text,
  userPhoneNumber: text,
  date: text,
  numberOfPeople: nat,
});

type BookActivity = typeof BookActivity.tsType;

const BookActivityPayload = Record({
  activityId: text,
  userName: text,
  userPhoneNumber: text,
  date: text,
  numberOfPeople: nat,
});

type BookActivityPayload = typeof BookActivityPayload.tsType;

const RoomTypes = Variant({
  Single: text,
  Double: text,
  Suite: text,
  Deluxe: text,
  Family: text,
  Business: text,
  Honeymoon: text,
  Executive: text,
  Presidential: text,
});

type RoomTypes = typeof RoomTypes.tsType;

const BookHotel = Record({
  hotelId: text,
  userName: text,
  numberOfRooms: nat,
  duration: text,
  typeOfRoom: text,
});

type BookHotel = typeof BookHotel.tsType;

const BookHotelPayload = Record({
  hotelId: text,
  userName: text,
  numberOfRooms: nat,
  duration: text,
  typeOfRoom: text,
});

type BookHotelPayload = typeof BookHotelPayload.tsType;

const Ticket = Record({
  ticketId: text,
  userName: text,
  flightId: text,
  flightClass: text,
  numberOfSeats: nat,
});

type Ticket = typeof Ticket.tsType;

const TicketPayload = Record({
  userName: text,
  flightClass: text,
  numberOfSeats: nat,
});

type TicketPayload = typeof TicketPayload.tsType;

// const BookFlight = Record({
//   flightId: text,

//   userName: text,
//   NumberOfSeats: nat,
//   class: text,
// });

// type BookFlight = typeof BookFlight.tsType;

// const BookFlightPayload = Record({
//   flightId: text,
//   userName: text,
//   NumberOfSeats: nat,
//   class: text,
// });

// type BookFlightPayload = typeof BookFlightPayload.tsType;

// const Services = Variant({
//   Activity: BookActivity,
//   Hotels: BookHotel,
//   Flight: BookFlight,
// });

// type Services = typeof Services.tsType;

// const Booking = Record({
//   bookingId: text,
//   serviceBooked: Services,
// });

// type Booking = typeof Booking.tsType;

//  const BookingPayload = Record({
//    serviceBooked: Services,

//  });

//  type BookingPayload = typeof BookingPayload.tsType;

// const UpdateBookingPayload = Record({
//   bookingId: text,
//   status: text,
// });

const Reviews = Record({
  reviewId: text,
  userId: text,
  hotelId: text,
  flightId: text,
  activityId: text,
  review: text,
  rating: nat,
});

type Reviews = typeof Reviews.tsType;

const ReviewsPayload = Record({
  userId: text,
  hotelId: text,
  flightId: text,
  activityId: text,
  review: text,
  rating: nat,
});

type ReviewsPayload = typeof ReviewsPayload.tsType;

const Message = Variant({
  NotFound: text,
  Success: text,
  Error: text,
  NotAllowed: text,
});

type Message = typeof Message.tsType;

const ActivityStorage = StableBTreeMap<text, Activity>(0);
const HotelsStorage = StableBTreeMap<text, Hotels>(1);
const FlightStorage = StableBTreeMap<text, Flight>(2);
const TicketStorage = StableBTreeMap<text, Ticket>(3);

const ReviewsStorage = StableBTreeMap<text, Reviews>(5);

export default Canister({
  //add activity
  addActivity: update(
    [ActivityPayload],
    Result(Activity, Message),
    (payload) => {
      const activityId = uuidv4();
      const timestamp = ic.time();
      const activity = {
        activityId,
        timestamp,
        participants: [],
        reviews: [],
        ...payload,
      };
      ActivityStorage.insert(activityId, activity);
      return Ok(activity);
    }
  ),

  //get activities
  getActivities: query([], Vec(Activity), () => {
    return ActivityStorage.values();
  }),

  //get activity
  getActivity: query([text], Result(Activity, Message), (id) => {
    const activity = ActivityStorage.get(id);
    return activity ? Ok(activity) : Err("Activity not found");
  }),

  //get list of users who have booked an activity
  getActivityParticipants: query([text], Vec(text), (id) => {
    const activity = ActivityStorage.get(id);
    return activity ? activity.participants : [];
  }),

  //add hotel
  addHotel: update(
    [HotelsPayload],
    Result(Hotels, Message),
    (payload) => {
      const hotelId = uuidv4();
      const hotel = { hotelId, guests: [], reviews: [], rating: [], ...payload };
      HotelsStorage.insert(hotelId, hotel);
      return Ok(hotel);
    }
  ),

  //get hotels
  getHotels: query([], Vec(Hotels), () => {
    return HotelsStorage.values();
  }),

  //get hotel
  getHotel: query([text], Result(Hotels, Message), (id) => {
    const hotel = HotelsStorage.get(id);
    return hotel ? Ok(hotel) : Err("Hotel not found");
  }),

  //add flight
  // addFlight: update(
  //   [FlightPayload],
  //   Result(Vec(Flight), Message),
  //   (payload) => {
  //     const flightId = uuidv4();
  //     const flight = { flightId, tickets: [], ...payload };
  //     FlightStorage.insert(flightId, flight);
  //     return Ok([flight]);
  //   }
  // ),
  addFlight: update([FlightPayload], Result(Flight, Message), (payload) => {
    const flightId = uuidv4();
    //set available seats to a fraction of total seats depending on the class
    const totalSeats = payload.totalSeats;
    payload.flightClass.map((flight) => {
      if (flight.Economy) {
        flight.Economy.availableSeats = totalSeats / BigInt(2);
      }
      if (flight.Business) {
        flight.Business.availableSeats = totalSeats / BigInt(4);
      }
      if (flight.First) {
        flight.First.availableSeats = totalSeats / BigInt(5);
      }
    });

    //set price for each class as a multiple of the base price and the class price
    payload.flightClass.map((flight) => {
      if (flight.Economy) {
        flight.Economy.price = payload.basePrice * flight.Economy.price;
      }
      if (flight.Business) {
        flight.Business.price = payload.basePrice * flight.Business.price;
      }
      if (flight.First) {
        flight.First.price = payload.basePrice * flight.First.price;
      }
    });

    const flight = { flightId, tickets: [], ...payload };
    FlightStorage.insert(flightId, flight);
    return Ok(flight);
  }),
  //get flights
  getFlights: query([], Vec(Flight), () => {
    return FlightStorage.values();
  }),

  //get flight
  getFlight: query([text], Result(Flight, Message), (id) => {
    const flight = FlightStorage.get(id);
    return flight ? Ok(flight) : Err("Flight not found");
  }),

  //get available flights
  getAvailableFlights: query([], Vec(Flight), () => {
    const flights = FlightStorage.values();
    return flights.filter((flight) => flight.totalSeats > 0);
  }),

  //booking

  //book activity
  bookActivity: update(
    [BookActivityPayload],
    Result(Vec(Activity), Message),
    (payload) => {
      const activity = ActivityStorage.get(payload.activityId);
      if (!activity) {
        return Err("Activity not found");
      }
      const { activityId, numberOfPeople } = payload;

      activity.participants.push(payload.userName);
      ActivityStorage.insert(activityId, activity);
      return Ok([activity]);
    }
  ),

  //book hotel
  bookHotel: update(
    [BookHotelPayload],
    Result(Vec(Hotels), Message),
    (payload) => {
      const hotel = HotelsStorage.get(payload.hotelId);
      if (!hotel) {
        return Err("Hotel not found");
      }
      const { hotelId, numberOfRooms } = payload;

      if (hotel.availableRooms < numberOfRooms) {
        return Err("Not enough rooms available");
      }
      hotel.availableRooms -= numberOfRooms;
      HotelsStorage.insert(hotelId, hotel);
      hotel.guests.push(payload.userName);

      return Ok([hotel]);
    }
  ),

  //book flight
  bookFlight: update(
    [TicketPayload, text],
    Result(text, Message),
    (payload, flightId) => {
      const flight = FlightStorage.get(flightId);
      if (!flight) {
        return Err("Flight not found");
      }

      const { flightClass, numberOfSeats } = payload;
      if (flightClass === "Economy") {
        flight.flightClass.map((flight) => {
          if (flight.Economy) {
            flight.Economy.availableSeats -= numberOfSeats;
          }
        });
      }

      if (flightClass === "Business") {
        flight.flightClass.map((flight) => {
          if (flight.Business) {
            flight.Business.availableSeats -= numberOfSeats;
          }
        });
      }
      if (flightClass === "First") {
        flight.flightClass.map((flight) => {
          if (flight.First) {
            flight.First.availableSeats -= numberOfSeats;
          }
        });
      }

      if (flight.totalSeats < numberOfSeats) {
        return Err("Not enough seats available");
      }

      flight.totalSeats -= numberOfSeats;

      const ticketId = uuidv4();
      const ticket = { ticketId, ...payload, flightId: flightId };
      TicketStorage.insert(ticketId, ticket);
      flight.tickets.push(ticket.ticketId);
      FlightStorage.insert(flightId, flight);
      return Ok(ticketId);
    }
  ),

  //book flight and send ticket to passengers
  // bookFlight: update(
  //   [TicketPayload, text],
  //   Result(text, Message),
  //   (payload, id) => {
  //     const flight = FlightStorage.get(id);
  //     if (!flight) {
  //       return Err("Flight not found");
  //     }
  //     const { flightClass, numberOfSeats } = payload;

  //     const totalSeats = flight.totalSeats;
  //     if (flightClass === "Economy") {
  //       flight.flightClass.map((flight) => {
  //         if (flight.Economy) {
  //           flight.Economy.availableSeats -= numberOfSeats;
  //         }
  //       });
  //     }
  //     if (flightClass === "Business") {
  //       flight.flightClass.map((flight) => {
  //         if (flight.Business) {
  //           flight.Business.availableSeats -= numberOfSeats;
  //         }
  //       });
  //     }
  //     if (flightClass === "First") {
  //       flight.flightClass.map((flight) => {
  //         if (flight.First) {
  //           flight.First.availableSeats -= numberOfSeats;
  //         }
  //       });
  //     }

  //     if (flight.totalSeats < numberOfSeats) {
  //       return Err("Not enough seats available");
  //     }

  //     flight.totalSeats -= numberOfSeats;

  //     const ticketId = uuidv4();
  //     const ticket = { ticketId, ...payload, flightId: id };
  //     TicketStorage.insert(ticketId, ticket);
  //     flight.tickets.push(ticket.ticketId);
  //     FlightStorage.insert(id, flight);
  //     return Ok(ticketId);
  //   }
  // ),

  //get ticket
  getTicket: query([text], Result(Ticket, Message), (id) => {
    const ticket = TicketStorage.get(id);
    return ticket ? Ok(ticket) : Err("Ticket not found");
  }),

  //get tickets
  getTickets: query([], Vec(Ticket), () => {
    return TicketStorage.values();
  }),

  //get ticket by flightid
  getTicketByFlightId: query([text], Vec(Ticket), (id) => {
    const tickets = TicketStorage.values();
    return tickets.filter((ticket) => ticket.flightId === id);
  }),

  //get ticket by id
  getTicketById: query([text], Result(Ticket, Message), (id) => {
    const ticket = TicketStorage.get(id);
    return ticket ? Ok(ticket) : Err("Ticket not found");
  }),

  //get user at hotel
  getHotelList: query([text], Vec(text), (hotelId) => {
    const hotel = HotelsStorage.get(hotelId);
    return hotel ? hotel.guests : [];
  }),

  //get users at activity
  getActivityList: query([text], Vec(text), (activityId) => {
    const activity = ActivityStorage.get(activityId);
    return activity ? activity.participants : [];
  }),

  //search for flights based on destination
  searchFlights: query([text], Vec(Flight), (destination) => {
    const flights = FlightStorage.values();
    return flights.filter((flight) => flight.destination === destination);
  }),

  //search for hotels based on location
  searchHotels: query([text], Vec(Hotels), (location) => {
    const hotels = HotelsStorage.values();
    return hotels.filter((hotel) => hotel.location === location);
  }),

  //search for activities based on location
  searchActivities: query([text], Vec(Activity), (location) => {
    const activities = ActivityStorage.values();
    return activities.filter((activity) => activity.location === location);
  }),

  //search for activities based on price

  //search for hotels based on price
  searchHotelsByPrice: query([nat], Vec(Hotels), (price) => {
    const hotels = HotelsStorage.values();
    return hotels.filter((hotel) => hotel.price <= price);
  }),

  //search for flights based on price
  searchFlightsByPrice: query([nat], Vec(Flight), (price) => {
    const flights = FlightStorage.values();
    return flights.filter((flight) => flight.basePrice <= price);
  }),

  //get participants who have booked an activity
  getParticipants: query([text], Vec(text), (activityId) => {
    const activity = ActivityStorage.get(activityId);
    return activity ? activity.participants : [];
  }),

  //get passengers who have booked a flight

  //get guests who have booked a hotel
  getGuests: query([text], Vec(text), (hotelId) => {
    const hotel = HotelsStorage.get(hotelId);
    return hotel ? hotel.guests : [];
  }),

  //add review
  addReview: update(
    [ReviewsPayload],
    Result(Vec(Reviews), Message),
    (payload) => {
      const reviewId = uuidv4();
      const review = { reviewId, ...payload };
      ReviewsStorage.insert(reviewId, review);
      return Ok([review]);
    }
  ),

  //get reviews
  getReviews: query([], Vec(Reviews), () => {
    return ReviewsStorage.values();
  }),

  //get review
  getReview: query([text], Result(Reviews, Message), (id) => {
    const review = ReviewsStorage.get(id);
    return review ? Ok(review) : Err("Review not found");
  }),

  // //book service
  // bookService: update(
  //   [BookingPayload],
  //   Result(Vec(Booking), Message),
  //   (payload) => {

  //     const bookingId = uuidv4();
  //     const booking = { bookingId, ...payload };
  //     BookingStorage.insert(bookingId, booking);
  //    // ActivityStorage.insert(bookingId, booking);
  //     return Ok([booking]);
  //   }
  // ),
});

// const getCurrentDate = () => {
//   const timestamp = new Number(ic.time());
//   const date = new Date(timestamp.valueOf() / 1_000_000); // Convert from nanoseconds to milliseconds
//   return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
// };

// function getJobStatistics(jobPosts:any) {
//   // Initialize counters
//   let totalJobs = jobPosts.length;
//   let openJobs = 0;
//   let closedJobs = 0;
//   let industrySet = new Set();

//   // Loop through each job post and gather statistics
//   jobPosts.forEach((job:any) => {
//     // Count open and closed jobs based on status
//     if (job.status === 'open') {
//       openJobs++;
//     } else if (job.status === 'closed') {
//       closedJobs++;
//     }

//     // Add industry to the set (set automatically handles uniqueness)
//     industrySet.add(job.industry);
//   });

//   // Return the statistics as an object
//   return {
//     totalJobs: totalJobs,
//     openJobs: openJobs,
//     closedJobs: closedJobs,
//     totalIndustries: industrySet.size
//   };
// }
