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
          <div className=" relative w-full">
            <h1 className="fs-4 fw-bold mb-0">Flights</h1>
            <div className="absolute top-2 right-2">
              <AddFlight save={createFlight} />
            </div>

            <div className=" flex space-x-2">
              <Row  className="">
                {loading ? (
                  <Loader />
                ) : (
                  flights.map((flight) => (
                    <Flight key={flight.id} flight={flight} />
                  ))
                )}
              </Row>
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
