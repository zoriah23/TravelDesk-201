import React, { act, useEffect, useState } from "react";

import {
  NotificationError,
  NotificationSuccess,
} from "../../components/utlis/Notifications";
import { useLocation } from "react-router";
import { getFlights, bookFlight, getFlight } from "../../utils/endpoints";
import BookFlight from "../../components/Services/Flight/User/BookFlight";

const FlightPage = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [flights, setFlights] = useState([]);
  const [flight, setFlight] = useState({});

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const flightId = params.get("flightId");

  //fetch flights
  const fetchAllFlights = async () => {
    try {
      setLoading(true);
      getFlights().then((resp) => {
        if (resp) {
          setFlights(resp);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchFlights = async () => {
    try {
      const flights = await getFlights();
      const flight = flights.find((flight) => flight.flightId === flightId);

      setFlight(flight);
      console.log("flight", flight);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [flightId]);

  const book = async (ticket, flightId) => {
    try {
      setLoading(true);
      bookFlight(ticket, flightId).then((resp) => {
        if (resp) {
          NotificationSuccess("Flight booked successfully");
        } else {
          NotificationError("Failed to book flight");
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const triggerBook = ({ userName, numberOfSeats, flightClass }) => {
    const ticket = {
      userName,
      numberOfSeats,
      flightClass,
    };
    book(ticket, flightId);
    console.log("ticket", ticket);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!loading ? (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-4">
            Flight Details
          </h1>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Flight ID:</strong> {flightId}
            </p>
            <h1 className="text-xl font-semibold">
              <strong>Airline:</strong> {flight.airline}
            </h1>
            <h1 className="text-xl font-semibold">
              <strong>Price:</strong> {flight.price}
            </h1>
            <p className="text-xl font-semibold">
              <strong>Departure:</strong> {flight.departure} -{" "}
              <strong>Arrival:</strong>
              {flight.destination}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong> - {flight.arrivalTime} -{" "}
              {flight.departureTime}
            </p>
            <div className="mt-4">
              <strong className="text-gray-700">Flight Classes:</strong>
              <ul className="list-disc list-inside mt-2">
                {flight.flightClass?.map((cls, index) => {
                  const [className, details] = Object.entries(cls)[0];
                  return (
                    <li key={index} className="text-gray-600">
                      <strong className="text-gray-700">{className}:</strong>{" "}
                      Seats: {details.availableSeats.toString()}, Price:{" "}
                      <span className="text-green-600 font-medium">
                        ${details.price.toString()}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-3">
            <BookFlight book={triggerBook} />
            <button
              onClick={() =>
                navigate(
                  `/activityCard?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&activityCardId=${activityCardId}`
                )
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              View Card
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
      )}
    </div>
  );
};

export default FlightPage;