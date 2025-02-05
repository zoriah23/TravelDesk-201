import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
import { Link } from "react-router-dom";

import { getFlights, getFlight } from "../../../../utils/endpoints";
import Flight from "./Flight";
import NavBar from "../../../User/NavBar";

const Flights = () => {
  const [loading, setLoading] = useState(false);

  const [flights, setFlights] = useState([]);
  const [flight, setFlight] = useState({});
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);
  const [destination, setDestination] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const fetchFlights = async () => {
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
  const getFlight = async () => {
    try {
      const flights = await getFlights();
      const flight = flights.find((flight) => flight.name === flightName);
      setFlight(flight);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //getFlight();
    fetchFlights();
  }, []);

  useEffect(() => {
    if(destination.trim() === "") {
      setResults(flights);
    } else {
      const filteredFlights = flights.filter((flight) =>
        flight.destination.toLowerCase().includes(destination.toLowerCase())
      );
      setResults(filteredFlights);
      setHasSearched(true);

      if (!filteredFlights.length) {
        toast.error("No flights found for the destination");
      }

    }
  }
  , [destination, flights]);

  const handleSearch = (e) => {
    setDestination(e.target.value);
  };




  


  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-blue-800">Flights</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center">
                <Loader />
              </div>
            ) : flights.length ? (
              flights.map((flight) => (
                <Flight key={flight.flightId} flight={flight} />
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No flights available
              </p>
            )}
          </div>
        </div>
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-blue-800">Search Flights</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
          {loading ? (
            <p className="text-center text-gray-600">Loading results...</p>
          ) : hasSearched ? (
            results.length > 0 ? (
              <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                  <h1 className="text-3xl font-bold text-blue-800">
                    Search Results
                  </h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((flight) => (
                    <Flight key={flight.flightId} flight={flight} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No flights found for this destination.
              </p>
            )
          ) : null}{" "}
        </div>
      </div>
    </>
  );
};

export default Flights;
