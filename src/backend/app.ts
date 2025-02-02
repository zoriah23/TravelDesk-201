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

const TypeOfRoom = Variant({
  Single: Record({
    price: nat,
    availableRooms: nat,
  }),
  Double: Record({
    price: nat,
    availableRooms: nat,
  }),
  Suite: Record({
    price: nat,
    availableRooms: nat,
  }),
});

type TypeOfRoom = typeof TypeOfRoom.tsType;

const Hotels = Record({
  hotelId: text,
  name: text,
  location: text,
  typeOfRoom: Vec(TypeOfRoom),
  amenities: Vec(text),
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
  typeOfRoom: Vec(TypeOfRoom),
  amenities: Vec(text),
  price: nat,
  numberofRooms: nat,
  
});

type HotelsPayload = typeof HotelsPayload.tsType;



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

const activityCard = Record({
  activityCardId: text,
  activityId: text,
  userName: text,
  userPhoneNumber: text,
  date: text,
  numberOfPeople: nat,
});

type activityCard = typeof activityCard.tsType;

const ActivityCardPayload = Record({
  userName: text,
  userPhoneNumber: text,
  date: text,
  numberOfPeople: nat,
});

type ActivityCardPayload = typeof ActivityCardPayload.tsType;



const HotelCard = Record({
  hotelCardId: text,
  hotelId: text,
  userName: text,
  userPhoneNumber: text,
  date: text,
  typeOfRoom: text,
  numberOfRooms: nat,
  duration: text,
});

type HotelCard = typeof HotelCard.tsType;

const BookHotelPayload = Record({
  userName: text,
  userPhoneNumber: text,
  date: text,
  typeOfRoom: text,
  numberOfRooms: nat,
  duration: text,
});

type BookHotelPayload = typeof BookHotelPayload.tsType;





const Ticket = Record({
  ticketId: text,
  userName: text,
  flightId: text,
  flightClass: text,
  numberOfSeats: nat,
  price: nat
});

type Ticket = typeof Ticket.tsType;

const TicketPayload = Record({
  userName: text,
  flightClass: text,
  numberOfSeats: nat,
});

type TicketPayload = typeof TicketPayload.tsType;


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
const BookingStorage = StableBTreeMap<text, activityCard | HotelCard |  Ticket>(4);
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

  //get list of users 
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
      
     
      const totalRooms = payload.numberofRooms;
      payload.typeOfRoom.map((room) => {
        if (room.Single) {
          room.Single.availableRooms = totalRooms / room.Single.availableRooms;
        }
        if (room.Double) {
          room.Double.availableRooms = totalRooms / room.Double.availableRooms;
        }
        if (room.Suite) {
          room.Suite.availableRooms = totalRooms / room.Suite.availableRooms;
        }
      });

     
      payload.typeOfRoom.map((room) => {
        if (room.Single) {
          room.Single.price = payload.price * room.Single.price;
        }
        if (room.Double) {
          room.Double.price = payload.price * room.Double.price;
        }
        if (room.Suite) {
          room.Suite.price = payload.price * room.Suite.price;
        }
      });


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

  addFlight: update([FlightPayload], Result(Flight, Message), (payload) => {
    const flightId = uuidv4();
   //set number of seats per class
    const totalSeats = payload.totalSeats;
    payload.flightClass.map((flight) => {
      if (flight.Economy) {
        flight.Economy.availableSeats = totalSeats / flight.Economy.availableSeats;
      }
      if (flight.Business) {
        flight.Business.availableSeats = totalSeats / flight.Business.availableSeats;
      }
      if (flight.First) {
        flight.First.availableSeats = totalSeats / flight.First.availableSeats;
      }
    });

    //set price for each class 
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


  //book activity
  bookActivity: update(
    [ActivityCardPayload, text],
    Result(text, Message),
    (payload, activityId) => {
      const activity = ActivityStorage.get(activityId);
      if (!activity) {
        return Err("Activity not found");
      }
      const activityCardId = uuidv4();
      const activityCard = { activityCardId, ...payload, activityId: activityId };
    BookingStorage.insert(activityCardId, activityCard);
      activity.participants.push(activityCard.activityCardId);
      ActivityStorage.insert(activityId, activity);
      return Ok(activityCardId);
    }
  ),

  //get activity cards
  getActivityCards: query([], Vec(activityCard), () => {
    return BookingStorage.values().filter((booking) => 'activityCardId' in booking);
  }),

  //get activity card for an activity
  getActivityCard: query([text], Result(activityCard, Message), (id) => {
    const activityCard = BookingStorage.get(id);
    return activityCard ? Ok(activityCard) : Err("Activity Card not found");
  }),


  //book hotel
  bookHotel: update(
    [BookHotelPayload, text],
    Result(text, Message),
    (payload, hotelId) => {
      const hotel = HotelsStorage.get(hotelId);
      if (!hotel) {
        return Err("Hotel not found");
      }

     
      const price = hotel.typeOfRoom.reduce((acc, room) => {
        if (room.Single) {
          return acc + room.Single.price * payload.numberOfRooms;
        }
        if (room.Double) {
          return acc + room.Double.price * payload.numberOfRooms;
        }
        if (room.Suite) {
          return acc + room.Suite.price * payload.numberOfRooms;
        }
        return acc;
      }, BigInt(0));

     
     const { typeOfRoom, numberOfRooms } = payload;
      hotel.typeOfRoom.map((room) => {
        if (room.Single && typeOfRoom === "Single") {
          room.Single.availableRooms -= numberOfRooms;
        }
        if (room.Double && typeOfRoom === "Double") {
          room.Double.availableRooms -= numberOfRooms;
        }
        if (room.Suite && typeOfRoom === "Suite") {
          room.Suite.availableRooms -= numberOfRooms;
        }
      });
      
      const hotelCardId = uuidv4();
      const hotelCard = { hotelCardId, ...payload, hotelId: hotelId };
      BookingStorage.insert(hotelCardId, hotelCard);
      hotel.guests.push(hotelCard.hotelCardId);
      HotelsStorage.insert(hotelId, hotel);
      return Ok(hotelCardId);
    }
  ),

  //get hotel cards
  getHotelCards: query([], Vec(HotelCard), () => {
    return BookingStorage.values().filter((booking) => 'hotelCardId' in booking);
  }),

  //get hotel card for a hotel
  getHotelCard: query([text], Result(HotelCard, Message), (id) => {
    const hotelCard = BookingStorage.get(id);
    return hotelCard ? Ok(hotelCard) : Err("Hotel Card not found");
  }),

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


   
      
      const price = flight.flightClass.reduce((acc, flight) => {
        if (flight.Economy && flightClass === "Economy") {
          return acc + flight.Economy.price * numberOfSeats;
        }
        if (flight.Business && flightClass === "Business") {
          return acc + flight.Business.price * numberOfSeats;
        }
        if (flight.First && flightClass === "First") {
          return acc + flight.First.price * numberOfSeats;
        }
        return acc;
      }, BigInt(0));


   
      const ticketId = uuidv4();
      const ticket = { ticketId, ...payload, flightId, price };
      BookingStorage.insert(ticketId, ticket);
      flight.tickets.push(ticketId);
      FlightStorage.insert(flightId, flight);
      return Ok(ticketId);
    }
  ),



  //get ticket
  getTicket: query([text], Result(Ticket, Message), (id) => {
    const ticket = BookingStorage.get(id);
    return ticket ? Ok(ticket) : Err("Ticket not found");
  }),
 

  //get tickets
  getTickets: query([], Vec(Ticket), () => {
    return BookingStorage.values().filter((booking) => 'ticketId' in booking);
  }),


  //get ticket by flightid
  getTicketByFlightId: query([text], Vec(Ticket), (id) => {
    const ticket = BookingStorage.values().filter((booking) => 'ticketId' in booking);
    return ticket ? ticket : [];

    
  }),

  //get ticket by id
  getTicketById: query([text], Result(Ticket, Message), (id) => {
    const ticket = BookingStorage.get(id);
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
    return flights.filter((flight) => flight.destination.toLowerCase() === destination.toLocaleLowerCase());
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


});


