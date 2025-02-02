import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../../utlis/Loader";
import { getFlights, getTickets } from "../../../../utils/endpoints";
import { Table } from "react-bootstrap";

const FlightsList = () => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [flight, setFlight] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const flightId = params.get("flightId");
  console.log(flightId);

  // Fetch flight details by ID
  const fetchFlight = async () => {
    try {
      const flights = await getFlights();
      const flightData = flights.find((flight) => flight.flightId === flightId);
      setFlight(flightData);
      console.log(flightData);
    } catch (error) {
      console.error("Error fetching flight:", error);
    }
  };

  useEffect(() => {
    fetchFlight();
  }, [flightId]);

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      setLoading(true);
      getTickets().then((resp) => {
        if (resp) {
          setTickets(resp);
        }
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-screen-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Flight Details</h1>
      </div>

      {/* Flight Details */}
      {flight ? (
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50 shadow-md">
          <p>
            <strong>AirLine:</strong>
            {flight.airline}
          </p>
          <p className="text-gray-600">
            <strong>Flight ID:</strong> {flightId}
          </p>
          <p className="text-gray-600">
            <strong>Departure:</strong> {flight.departure} -{" "}
            <strong>Arrival:</strong>
            {flight.destination}
          </p>
          <p className="text-gray-600">
            <strong>Date:</strong> - {flight.arrivalTime} -{" "}
            {flight.departureTime}
          </p>
          <p className="text-gray-600">
            <strong>Total Seats:</strong> {flight.totalSeats.toString()}
          </p>
          <p className="text-gray-600">
            <strong>Flight Type:</strong> {flight.flightType}
          </p>
          <p className="text-gray-600">
            <strong>Plane Type:</strong> {flight.typeOfPlane}
          </p>

          {/* Flight Classes */}
          <div className="mt-4">
            <strong className="text-gray-700">Flight Classes:</strong>
            <ul className="list-disc list-inside mt-2">
              {flight.flightClass.map((cls, index) => {
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
      ) : (
        <p className="text-gray-500">No flight details available.</p>
      )}

      {/* Tickets Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Tickets</h3>
        {loading ? (
          <Loader />
        ) : tickets.length ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 shadow-md rounded-lg bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Ticket ID</th>
                  <th className="py-2 px-4 text-left">User Name</th>
                  <th className="py-2 px-4 text-left">Flight Class</th>
                  <th className="py-2 px-4 text-left">Seats</th>
                  <th className="py-2 px-4 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-2 px-4 text-center text-gray-500"
                    >
                      No Tickets available
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="py-2 px-4">{ticket.ticketId}</td>
                      <td className="py-2 px-4">{ticket.userName}</td>
                      <td className="py-2 px-4">{ticket.flightClass}</td>
                      <td className="py-2 px-4">
                        {ticket.numberOfSeats.toString()}
                      </td>
                      <td className="py-2 px-4 text-green-600 font-medium">
                        ${ticket.price.toString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No tickets available.</p>
        )}
      </div>
    </div>
  );
};

export default FlightsList;
