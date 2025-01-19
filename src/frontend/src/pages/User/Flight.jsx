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
  }
  const triggerBook = ({ userName, numberOfSeats, flightClass }) => {
    const ticket = {
      userName,
      numberOfSeats,
      flightClass,
    };
    book(ticket, flightId);
    console.log("ticket", ticket);
  }


  return (
    <>
      {!loading ? (
        <div>
          <h1>Flight</h1>
          <h1>{flight.departure}</h1>
          <h1>{flight.destination}</h1>
          <h1>{flight.price}</h1>
          <h1>{flight.airline}</h1>
          <h1>{flight.departureTime}</h1>
          <h1>{flight.arrivalTime}</h1>
          <h1>{flightId}</h1>

          <h1>{flight.totalSeats}</h1>
          <h1>{flight.typeOfPlane}</h1>
          <h1>{flight.flightType}</h1>
          <strong>Flight Classes:</strong>
          <ul>
            {flight.flightClass?.map((classItem, index) => {
              const [className, classDetails] = Object.entries(classItem)[0]; // Extract key and value
              return (
                <li key={index}>
                  <h3>{className}</h3>
                  <p>Price: {classDetails.price.toString()}</p>
                  <p>
                    Available Seats: {classDetails.availableSeats.toString()}
                  </p>
                </li>
              );
            })}
          </ul>

          <BookFlight book={triggerBook} />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default FlightPage;
