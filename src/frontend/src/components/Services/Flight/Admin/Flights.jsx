import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../../../utlis/Notifications";
import { Link } from "react-router-dom";

import {
addFlight, getFlights, getFlight, 
} from "../../../../utils/endpoints";
import AddFlight from "./AddFlight";
import Flight from "./FlightCard";

const Flights = () => {
  const [loading, setLoading] = useState(false);

    const [flights, setFlights] = useState([]);
    const [flight, setFlight] = useState({});
  const [show, setShow] = useState(false);
 
    const [triggerAdd, setTriggerAdd] = useState(false);

    const fetchFlights = async () => {
        try{
          setLoading(true);
          getFlights().then((resp) => {
            if (resp) {
              setFlights(resp);
            }
          }
          );
          console.log("flights", flights);
          setLoading(false);

        } catch (error) {
          console.log(error);
          setLoading(false);
        }
    }
         const createFlight = async (flight) => {
              try {
                 setLoading(true);
                  addFlight(flight).then((resp) => {
                    if (resp) {
                      NotificationSuccess("Flight added successfully");
                      fetchFlights();
                    } else {
                      NotificationError("Failed to add flight");
                    }
                  });
                  setLoading(false);
                } catch (error) {
                  console.log(error);
                  setLoading(false);
                }
              };
              

                const fetchFlight = async (flightId) => {
                    try {
                        setLoading(true);
                        const flight = await getFlight(flightId);
                        setFlight(flight);
                        setLoading(false);
                    } catch (error) {
                        console.log(error);
                        setLoading(false);
                    }
                }

    useEffect(() => {
        fetchFlights();
    }, [])
  

  return (
    <>
      {!loading ? (
        <>
          <div className="relative w-full p-4 bg-white shadow-md rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-gray-800">Flights</h1>
              <div>
                <AddFlight save={createFlight} />
              </div>
            </div>

            {/* Flight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading ? (
                <div className="col-span-full flex justify-center items-center h-20">
                  <Loader />
                </div>
              ) : (
                flights.map((flight) => (
                  <Flight key={flight.id} flight={flight} />
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Flights;
